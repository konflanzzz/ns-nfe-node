const nsAPI = require('../commons/nsAPI')
const generateFile =  require('../commons/downloadFiles')

const url = "https://nfe.ns.eti.br/nfe/get/event"

class body {
    constructor(chNFe, tpAmb, tpDown, tpEvento, nSeqEvento) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown;
        this.tpEvento = tpEvento;
        this.nSeqEvento = nSeqEvento;
    }
}

class response {
    constructor({ status, motivo, retEvento, erros, xml, pdf, json }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erros;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(json)
    }
}

async function sendPostRequest(conteudo, caminhoSalvar) {
    
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    var idEvento = ""

    switch (conteudo.tpEvento){

        case "CANC":
            idEvento = "110111"
            break
        case "CCE":
            idEvento = "110110"
            break
    }

    if (responseAPI.json != null) {
        generateFile.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chNFe + conteudo.nSeqEvento, "-procEven.json", responseAPI.json)
    }

    if (responseAPI.pdf != null) {
        let data = responseAPI.pdf;
        let buff = Buffer.from(data, 'base64');
        generateFile.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chNFe + conteudo.nSeqEvento, "-procEven.pdf", buff)
    }

    if (responseAPI.xml != null) {
        generateFile.salvarArquivo(caminhoSalvar, idEvento + responseAPI.retEvento.chNFe + conteudo.nSeqEvento, "-procEven.xml", responseAPI.xml)
    }

    return responseAPI
}

// let corpo = new body("43210907364617000135550000000223031183560074","2","XP","CANC","1")

// sendPostRequest(corpo,"../../../NFe/Eventos")

module.exports = { url, body, response, sendPostRequest }

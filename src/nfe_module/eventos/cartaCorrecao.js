const nsAPI = require('../commons/nsAPI')
const downloadEvento = require('./downloadEvento')
const util = require('../commons/util')

const url = "https://nfe.ns.eti.br/nfe/cce"

class body {
    constructor(chNFe, tpAmb, dhEvento, nSeqEvento, xCorrecao) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nSeqEvento = nSeqEvento;
        this.xCorrecao = xCorrecao;
    }
}

class response {
    constructor({ status, motivo, retEvento, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    let downloadEventoBody = new downloadEvento.body(
        responseAPI.retEvento.chNFe,
        conteudo.tpAmb,
        tpDown,
        "CCe",
        conteudo.nSeqEvento
    )

    let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)

    return downloadEventoResponse
}

// let corpo = new body(
//     "43210907364617000135550000000223861693448643",
//     "2",
//     util.dhEmiGet(),
//     "3",
//     "CARTA DE CORRECAO ADICIONADA PARA TESTES DE INTEGRACAO COM EXEMPLO NODE JS"
// )

// sendPostRequest(corpo, "XP", "../../../NFe/Eventos").then(getResponse => { console.log(getResponse)})


module.exports = { url, body, response, sendPostRequest }

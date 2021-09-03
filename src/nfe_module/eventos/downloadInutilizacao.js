const nsAPI = require('../commons/nsAPI')
const generateFile = require('../commons/downloadFiles')

const url = "https://nfe.ns.eti.br/nfe/get/inut"

class body {
    constructor(chave, tpAmb, tpDown) {
        this.chave = chave;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown
    }
}

class response {
    constructor({ status, motivo, retInut, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retInut = retInut;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    if (responseAPI.retInut.json != null) {
        generateFile.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.json", responseAPI.retInut.json)
    }

    if (responseAPI.retInut.pdf != null) {
        let data = responseAPI.retInut.pdf;
        let buff = Buffer.from(data, 'base64');
        generateFile.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.pdf", buff)
    }

    if (responseAPI.retInut.xml != null) {
        generateFile.salvarArquivo(caminhoSalvar, responseAPI.retInut.chave, "-procInut.xml", responseAPI.retInut.xml)
    }

    return responseAPI
}

// let corpo = new body("43210736461700013555000000023061000023061","2","XP")

// sendPostRequest(corpo,"../../../NFe/Inutilizacao")

module.exports = { url, body, response, sendPostRequest }

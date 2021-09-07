const nsAPI = require('../commons/nsAPI')
const configParceiro = require('../../configParceiro')

const url = "https://nfe.ns.eti.br/util/conscad"

class body {
    constructor(CNPJCont, UF, CNPJ) {
        this.CNPJCont = CNPJCont;
        this.UF = UF;
        this.CNPJ = CNPJ;
    }
}

class response {
    constructor({status, motivo, retConsCad, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retConsCad = retConsCad;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// let corpo = new body(configParceiro.CNPJ,"RS","07364617000135")

// sendPostRequest(corpo).then(getResponse =>{console.log(getResponse)})

module.exports = { url, body, response, sendPostRequest }
const nsAPI = require('../commons/nsAPI')
const configParceiro = require('../../configParceiro')

const url = "https://nfe.ns.eti.br/util/wssefazstatus"

class body {
    constructor(CNPJCont, UF, tpAmb, versao) {
        this.CNPJCont = CNPJCont;
        this.UF = UF;
        this.tpAmb = tpAmb;
        this.versao = versao;
    }
}

class response {
    constructor({ status, motivo, retStatusServico, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retStatusServico = retStatusServico;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// let corpo = new body(configParceiro.CNPJ,"43","2","4.00")

// sendPostRequest(corpo).then(getResponse => {console.log(getResponse)})

module.exports = { url, body, response, sendPostRequest }

const nsAPI = require('../commons/nsAPI')
const configParceiro = require('../../configParceiro')

const url = "https://nfe.ns.eti.br/nfe/stats"

class body {
    constructor(licencaCnpj, chNFe, tpAmb, versao) {
        this.licencaCnpj = licencaCnpj;
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.versao = versao;
    }
}

class response {
    constructor({status, motivo, retConsSitNFe, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retConsSitNFe = retConsSitNFe;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// let corpo = new body(configParceiro.CNPJ,"43210807364617000135550000000228481157634045","2","4.00")
// sendPostRequest(corpo).then(getResponse => {console.log(getResponse)})

module.exports = { url, body, response, sendPostRequest }
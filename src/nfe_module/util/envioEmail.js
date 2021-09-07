const nsAPI = require('../commons/nsAPI')
const configParceiro = require('../../configParceiro')

const url = "https://nfe.ns.eti.br/util/resendemail"

class body {
    constructor(chNFe, tpAmb, anexarPDF, anexarEvento, email) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.anexarPDF = anexarPDF;
        this.anexarEvento = anexarEvento;
        this.email = email;
    }
}

class response {
    constructor({ status, motivo, }) {
        this.status = status;
        this.motivo = motivo;
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// let corpo = new body("43210807364617000135550000000228481157634045","2",false,false,"konflanz.info@gmail.com")

// sendPostRequest(corpo).then(getResponse => {console.log(getResponse)})

module.exports = { url, body, response, sendPostRequest }

const nsAPI = require('../commons/nsAPI')
const url = "https://nfe.ns.eti.br/util/list/nsnrecs"

class body {
    constructor(chNFe) {
        this.chNFe = chNFe;
    }
}

class response {
    constructor({ status, motivo, nsNRecs, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.nsNRecs = nsNRecs;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// let corpo = new body("43210807364617000135550000000228481157634045")

// sendPostRequest(corpo).then(getResponse => {console.log(getResponse)})


module.exports = { url, body, response, sendPostRequest }

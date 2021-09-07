const nsAPI = require('../commons/nsAPI')
const conteudoJSON = require('../../../LayoutNFe.json')

const url = "https://nfe.ns.eti.br/util/preview/nfe"

class response {
    constructor({ status, motivo, pdf, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.pdf = pdf;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// sendPostRequest(conteudoJSON).then(getResponse => {console.log(getResponse)})

module.exports = { url, response, sendPostRequest }


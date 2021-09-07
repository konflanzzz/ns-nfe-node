const nsAPI = require('../commons/nsAPI')
const conteudoJSON = require('../../../LayoutNFe.json')
const url = "https://nfe.ns.eti.br/util/generatexml"

class response {
    constructor({ status, motivo, xml, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.xml = xml;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

//sendPostRequest(conteudoJSON).then(getResponse => {console.log(getResponse)})

module.exports = { url, response, sendPostRequest }

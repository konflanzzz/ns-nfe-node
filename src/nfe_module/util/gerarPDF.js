const nsAPI = require('../commons/nsAPI')
const url = "https://nfe.ns.eti.br/util/generatepdf"

class body {
    constructor(xml, printCEAN, obsCanhoto) {
        this.xml = xml;
        this.printCEAN = printCEAN;
        this.obsCanhoto = obsCanhoto;
    }
}

class response {
    constructor({ status, motivo, pdf }) {
        this.status = status;
        this.motivo = motivo;
        this.pdf = pdf;
    }
}

async function sendPostRequest(conteudo) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

// let corpo = new body("xml_aqui",false)

// sendPostRequest(corpo).then(getResponse => {console.log(getResponse)})


module.exports = { url, body, response, sendPostRequest }

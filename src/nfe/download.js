const axios = require("axios")
const configParceiro = require('../configParceiro')

const url = "https://nfe.ns.eti.br/nfe/get"

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

class body {
    constructor(chNFe, tpDown, tpAmb) {
        this.chNFe = chNFe;
        this.tpDown = tpDown;
        this.tpAmb = tpAmb;
    }
}

class response {
    constructor(status, motivo, chNFe, xml, pdf, nfeProc, erros) {
        this.status = status;
        this.motivo = motivo;
        this.chNFe = chNFe;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(nfeProc);
        this.erros = erros
    }
}

async function sendRequest(body) {

    let responseAPI = new response();

    responseAPI = await axios.post(url, JSON.stringify(body), { headers: header })
        .then(getResponse => {
            responseAPI = getResponse.data
            return responseAPI;
        })
        .catch(function (error) { console.log(error) })

    return responseAPI
}

module.exports = { url, body, response, sendRequest }

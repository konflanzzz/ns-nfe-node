
const axios = require('axios')
const configParceiro = require('../configParceiro')

const url = "https://nfe.ns.eti.br/nfe/issue"

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

class response {
    constructor(status, motivo, nsNRec, erros) {
        this.status = status;
        this.motivo = motivo;
        this.nsNRec = nsNRec;
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

module.exports = { url, response, sendRequest }
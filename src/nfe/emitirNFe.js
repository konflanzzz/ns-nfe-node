
const axios = require('axios')
const nfe = require('./LayoutNFe.json')
const configParceiro = require('../configParceiro')

const url = "https://nfe.ns.eti.br/nfe/issue"

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

// class body {
//     constructor(NFe) {
//         this.NFe = NFe;
//     }
// }

class response {
    constructor({ status, motivo, nsNRec, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.nsNRec = nsNRec;
        this.erros = erros
    }
}

async function sendRequest(url, body) {
    const dataResponseAxios = new response(
        await axios.post(url, JSON.stringify(body), { headers: header })
            .then(response => {
                return response.data
            })
            .catch(function (error) { console.log(error) })
    )
    return dataResponseAxios
}

module.exports = { url, response, sendRequest }
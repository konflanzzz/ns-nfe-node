const url = "https://nfe.ns.eti.br/util/conscad"
const axios = require("axios")
const configParceiro = require('../configParceiro')

const body = {
    "CNPJCont": "07364617000135",
    "UF": "RS",
    "CNPJ": "07364617000135"
}

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

class response {
    constructor(status, motivo, retConsCad, erros) {
        this.status = status;
        this.motivo = motivo;
        this.retConsCad = retConsCad;
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
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
    constructor({ status, motivo, retConsCad, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retConsCad = retConsCad;
        this.erros = erros
    }
}

let respostaAPI = new response(axios.post(url, body, { headers: header })
    .then(getResponse => {
        respostaAPI = getResponse.data
        return respostaAPI;
    })
    .catch(function (error) { console.log(error) }))

setTimeout(function () { console.log(respostaAPI)}, 1500)
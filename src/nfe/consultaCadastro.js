const nsAPI = require('./nsAPI')

const url = "https://nfe.ns.eti.br/util/conscad"

const body = {
    "CNPJCont": "07364617000135",
    "UF": "RS",
    "CNPJ": "07364617000135"
}

class response {
    constructor(status, motivo, retConsCad, erros) {
        this.status = status;
        this.motivo = motivo;
        this.retConsCad = retConsCad;
        this.erros = erros
    }
}

let retorno = new response();
retorno = nsAPI.PostRequest(url,body)
setTimeout(() => {
    console.log(retorno)
}, 1000);
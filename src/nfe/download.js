const axios = require("axios")
const configParceiro = require('../configParceiro')

const url = "https://nfe.ns.eti.br/nfe/get"

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

class body {
   constructor(chNFe, tpDown, tpAmb, erro) {
       this.chNFe = chNFe;
       this.tpDown = tpDown;
       this.tpAmb = tpAmb;
       this.erros = erro;
   }
}

class response {
    constructor({status, motivo, chNFe, xml, pdf, nfeProc, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.chNFe = chNFe;
        this.xml = xml;
        this.pdf = pdf;
        this.json = JSON.stringify(nfeProc);
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
        
module.exports = { url, body, response, sendRequest }

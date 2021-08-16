
const axios = require('axios')
const configParceiro = require('../configParceiro')

const url = "https://nfe.ns.eti.br/nfe/issue/status"

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

class body {
   constructor(CNPJ, nsNRec, tpAmb) {
       this.CNPJ = CNPJ;
       this.nsNRec = nsNRec;
       this.tpAmb = tpAmb
   }
}

class response {
    constructor({ status, motivo, chNFe, cStat,xMotivo, xml, nProt, dhRecbto, erro }) {
        this.status = status;
        this.motivo = motivo;
        this.chNFe = chNFe;
        this.cStat = cStat;
        this.xMotivo = xMotivo;
        this.nProt = nProt;
        this.xml = xml;
        this.dhRecbto = dhRecbto;
        this.erro = erro
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

module.exports = { url, body, response, sendRequest}
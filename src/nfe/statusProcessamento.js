
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
    constructor(status, motivo, chNFe, cStat,xMotivo, xml, nProt, dhRecbto, erro) {
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

module.exports = { url, body, response, sendRequest}
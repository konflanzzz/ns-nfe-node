const nsAPI = require('../commons/nsAPI')
const url = "https://nfe.ns.eti.br/nfe/cancel"

class body {
    constructor(chNFe, tpAmb, dhEvento, nProt, xJust) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nProt = nProt;
        this.xJust = xJust;
    }
}

class response {
    constructor({ status, motivo, retEvento, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = JSON.stringify(retEvento);
        this.erros = erros
    }
}

async function cancelarNFe(body){
    nsAPI.PostRequest(url,body)
}

module.exports = { url, body, response, cancelarNFe }
const nsAPI = require('../commons/nsAPI')
const url = "https://nfe.ns.eti.br/nfe/get/event"

class body {
    constructor(chNFe, tpAmb, tpDown, tpEvento, nSeqEvento) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown;
        this.tpEvento = tpEvento;
        this.nSeqEvento = nSeqEvento;
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

async function downloadEvento(body) {
    nsAPI.PostRequest(url, body)
}

module.exports = { url, body, response, downloadEvento }

const nsAPI = require('../commons/nsAPI')

const url = "https://nfe.ns.eti.br/nfe/cce"

class body {
    constructor(chNFe, tpAmb, dhEvento, nSeqEvento, xCorrecao) {
        this.chNFe = chNFe;
        this.tpAmb = tpAmb;
        this.dhEvento = dhEvento;
        this.nSeqEvento = nSeqEvento;
        this.xCorrecao = xCorrecao;
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

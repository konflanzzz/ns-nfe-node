const nsAPI = require('../commons/nsAPI')

const url = "https://nfe.ns.eti.br/nfe/get/inut"

class body {
    constructor(chave, tpAmb, tpDown) {
        this.chave = chave;
        this.tpAmb = tpAmb;
        this.tpDown = tpDown
    }
}

class response {
    constructor({ status, motivo, retInut, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retInut = JSON.stringify(retInut);
        this.erros = erros
    }
}

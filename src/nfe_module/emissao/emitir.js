const url = "https://nfe.ns.eti.br/nfe/issue"

class response {
    constructor({status, motivo, nsNRec, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.nsNRec = nsNRec;
        this.erros = erros
    }
}

module.exports = { url, response }
const url = "https://nfe.ns.eti.br/nfe/get"

class body {
    constructor(chNFe, tpDown, tpAmb) {
        this.chNFe = chNFe;
        this.tpDown = tpDown;
        this.tpAmb = tpAmb;
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

module.exports = { url, body, response }

const nsAPI = require('../commons/nsAPI')

const url = "https://nfe.ns.eti.br/nfe/inut"

class body {
    constructor(cUF, tpAmb, ano, CNPJ, serie, nNFIni, nNFFin, xJust) {
        this.cUF = cUF;
        this.tpAmb = tpAmb;
        this.ano = ano;
        this.CNPJ = CNPJ;
        this.serie = serie;
        this.nNFIni = nNFIni;
        this.nNFFin = nNFFin;
        this.xJust = xJust;

    }
}

class response {
    constructor({ status, motivo, retornoInutNFe, erros }) {
        this.status = status;
        this.motivo = motivo;
        this.retornoInutNFe = JSON.stringify(retornoInutNFe);
        this.erros = erros
    }
}

async function inutilizarNFe(body) {
    nsAPI.PostRequest(url, body)
}

module.exports = { url, body, response, inutilizarNFe }

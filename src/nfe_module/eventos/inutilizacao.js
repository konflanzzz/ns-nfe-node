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
        this.retornoInutNFe = retornoInutNFe;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, caminhoSalvar) {
    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))
    return responseAPI
}

module.exports = { url, body, response, inutilizarNFe }

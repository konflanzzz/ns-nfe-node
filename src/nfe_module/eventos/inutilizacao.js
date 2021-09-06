const nsAPI = require('../commons/nsAPI')
const downloadInut = require("./downloadInutilizacao")
const configParceiro = require('../../configParceiro')

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

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    let downloadInutBody = new downloadInut.body(responseAPI.retornoInutNFe.chave,"2",tpDown)

    let downloadInutResponse = await downloadInut.sendPostRequest(downloadInutBody, caminhoSalvar)

    return downloadInutResponse
}

// let corpo = new body("43", "2", "21", configParceiro.CNPJ, "0", "22390", "22390","INUTILIZACA REALIZADA PARA TESTE DE INTEGRACAO COM EXEMPLO NODE JS")

// sendPostRequest(corpo, "XP", "../../../NFe/Eventos").then(getResponse => { console.log(getResponse) })

module.exports = { url, body, response, sendPostRequest }

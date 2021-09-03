const nsAPI = require('../commons/nsAPI')
const downloadEvento = require('./downloadEvento')

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
    constructor( {status, motivo, retEvento, erros} ) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    let downloadEventoBody = new downloadEvento.body(
        responseAPI.retEvento.chNFe,
        conteudo.tpAmb,
        tpDown,
        "CANC",
        "1"
    )

    let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)

    var retorno = [responseAPI, downloadEventoResponse]

    return retorno
}

// let corpo = new body(
//     "43210907364617000135550000000223711555367475",
//     "2", 
//     "2021-09-03T17:35:00-03:00",
//     "143210000676162",
//     "CANCELAMENTO REALIZADO PARA TESTES DE INTEGRACAO EXEMPLO NODE JS"
// )

// sendPostRequest(corpo, "XP", "../../../NFe/Eventos")

module.exports = { url, body, response, sendPostRequest }
const nsAPI = require('../commons/nsAPI')
const downloadEvento = require('./downloadEvento')
const util = require('../commons/util')

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
    constructor({status, motivo, retEvento, erros}) {
        this.status = status;
        this.motivo = motivo;
        this.retEvento = retEvento;
        this.erros = erros
    }
}

async function sendPostRequest(conteudo, tpDown, caminhoSalvar) {

    let responseAPI = new response(await nsAPI.PostRequest(url, conteudo))

    if (responseAPI.status == 200) {

        if (responseAPI.retEvento.cStat == 135) {

            let downloadEventoBody = new downloadEvento.body(
                responseAPI.retEvento.chNFe,
                conteudo.tpAmb,
                tpDown,
                "CANC",
                "1"
            )

            let downloadEventoResponse = await downloadEvento.sendPostRequest(downloadEventoBody, caminhoSalvar)

            return downloadEventoResponse
        }
    }
    else {

        console.log("OCCOREU UM ERRO AO REALIZAR O CANCELAMENTO")
        
    }
}

let corpo = new body(
    '43210907364617000135550000000223961138859669',
    "2",
    util.dhEmiGet(),
    '143210000729497',
    "CANCELAMENTO REALIZADO PARA TESTES DE INTEGRACAO EXEMPLO NODE JS"
)

sendPostRequest(corpo, "XP", "../../../NFe/Eventos").then(getResponse => { console.log(getResponse) })

module.exports = { url, body, response, sendPostRequest }
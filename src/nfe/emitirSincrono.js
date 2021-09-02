const statusProcessamento = require('./statusProcessamento')
const download = require('./download')
const emitir = require('./emitir')
const configParceiro = require('../configParceiro')
const nsAPI = require('./nsAPI')
const NFeJSON = require("./LayoutNFe.json")

class responseSincrono {
    constructor({statusEnvio, statusConsulta, statusDownload, cStat, motivo, nsNRec, chNFe, nProt, xml, json, pdf, erros}) {
        this.statusEnvio = statusEnvio;
        this.statusConsulta = statusConsulta;
        this.statusDownload = statusDownload;
        this.cStat = cStat;
        this.motivo = motivo;
        this.nsNRec = nsNRec;
        this.chNFe = chNFe;
        this.nProt = nProt;
        this.xml = xml;
        this.json = json;
        this.pdf = pdf;
        this.erros = erros;
    }
}

async function emitirNFeSincrono(conteudo, tpAmb, tpDown) {

    let emissaoResponse = new emitir.response(
        await nsAPI.PostRequest(emitir.url,conteudo)
    )
    
    let statusBody = new statusProcessamento.body(
        configParceiro.CNPJ,
        emissaoResponse.nsNRec,
        tpAmb
    )

    let statusResponse = new statusProcessamento.response(
        await nsAPI.PostRequest(statusProcessamento.url,statusBody)
    )
    
    let downloadBody = new download.body(
        statusResponse.chNFe,
        tpDown,
        tpAmb
    )

    let downloadResponse = new download.response(
        await nsAPI.PostRequest(download.url,downloadBody)
    )

    const respostaSincrona = {
        emissaoResponse,
        statusResponse,
        downloadResponse
    }

    return respostaSincrona
}

emitirNFeSincrono(NFeJSON,"2","X")

module.exports = { responseSincrono, emitirNFeSincrono }
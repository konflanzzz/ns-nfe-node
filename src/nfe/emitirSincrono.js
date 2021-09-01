const statusProcessamento = require('./statusProcessamento')
const download = require('./download')
const emitir = require('./emitirNFe')
const configParceiro = require('../configParceiro')

class responseSincrono {
    constructor(statusEnvio, statusConsulta, statusDownload, cStat, motivo, nsNRec, chNFe, nProt, xml, json, pdf, erros) {
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

    let respostaSincrona = new responseSincrono()

    let respostaEmissao = new emitir.response()
    respostaEmissao = await emitir.sendRequest(conteudo)

    let statusProcessamentoBody = new statusProcessamento.body()

    statusProcessamentoBody = { 
        nsNRec: respostaEmissao.nsNRec, 
        CNPJ: configParceiro.CNPJ,
        tpAmb: tpAmb
    }

    let respostaStatusProcessamento = new statusProcessamento.response()
    respostaStatusProcessamento = await statusProcessamento.sendRequest(statusProcessamentoBody)
    setTimeout(function () { }, 500)

    let downloadNFeBody = new download.body(
        respostaStatusProcessamento.chNFe,
        tpDown,
        tpAmb
    )

    let respostaDownloadNFe = new download.response()
    respostaDownloadNFe = await download.sendRequest(downloadNFeBody)

    setTimeout(function () { console.log(respostaDownloadNFe), 5000 })

    respostaSincrona = {
        statusEnvio: respostaEmissao.status,
        statusConsulta: respostaStatusProcessamento.status,
        statusDownload: respostaDownloadNFe.status,
        cStat: respostaStatusProcessamento.cStat,
        motivo: respostaStatusProcessamento.xMotivo,
        nsNRec: respostaEmissao.nsNRec,
        chNFe: respostaStatusProcessamento.chNFe,
        nProt: respostaStatusProcessamento.nProt,
        xml: respostaDownloadNFe.xml,
        json: respostaDownloadNFe.json,
        pdf: respostaDownloadNFe.pdf,
        erros: respostaStatusProcessamento.erro
    }

    return respostaSincrona
}

module.exports = { responseSincrono, emitirNFeSincrono }
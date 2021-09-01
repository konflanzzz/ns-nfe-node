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

    let respostaEmissao = await emitir.sendRequest(conteudo)

    let statusProcessamentoBody = new statusProcessamento.body(
        configParceiro.CNPJ,
        respostaEmissao.nsNRec,
        tpAmb
    )

    let respostaStatusProcessamento = await statusProcessamento.sendRequest(statusProcessamentoBody)

    let downloadNFeBody = new download.body(
        respostaStatusProcessamento.chNFe,
        tpDown,
        tpAmb
    )

    let respostaDownloadNFe = await download.sendRequest(downloadNFeBody)

    let respostaSincrona = new responseSincrono(
        respostaEmissao.status,
        respostaStatusProcessamento.status,
        respostaDownloadNFe.status,
        respostaStatusProcessamento.cStat,
        respostaStatusProcessamento.xMotivo,
        respostaEmissao.nsNRec,
        respostaStatusProcessamento.chNFe,
        respostaStatusProcessamento.nProt,
        respostaDownloadNFe.xml,
        respostaDownloadNFe.json,
        respostaDownloadNFe.pdf,
        respostaStatusProcessamento.erro
    )

    setTimeout(function () {console.log(respostaSincrona) }, 100)

    return respostaSincrona
}

module.exports = { responseSincrono, emitirNFeSincrono }
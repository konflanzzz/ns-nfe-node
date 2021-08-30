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

    let respostaSincrona = new responseSincrono();

    emitir.sendRequest(emitir.url, conteudo)
        .then(getResponseEmissao => {

            const statusProcessamentoBody = new statusProcessamento.body(
                configParceiro.CNPJ,
                getResponseEmissao.nsNRec,
                tpAmb
            )

            respostaSincrona = {
                statusEnvio: getResponseEmissao.status,
                nsNRec: getResponseEmissao.nsNRec,
                erros: getResponseEmissao.erros
            }

            console.log(respostaSincrona)

            statusProcessamento.sendRequest(statusProcessamento.url, statusProcessamentoBody)
                .then(getResponseStatusProcessamento => {

                    if (getResponseStatusProcessamento.cStat == 100) {

                        respostaSincrona = {
                            statusConsulta: getResponseStatusProcessamento.status,
                            cStat: getResponseStatusProcessamento.cStat,
                            chNFe: getResponseStatusProcessamento.chNFe,
                            nProt: getResponseStatusProcessamento.nProt,
                            xml: getResponseStatusProcessamento.xml,
                            erros: getResponseStatusProcessamento.erro
                        }

                        console.log(respostaSincrona)

                        const downloadNFeBody = new download.body(
                            getResponseStatusProcessamento.chNFe,
                            tpDown,
                            tpAmb
                        )

                        download.sendRequest(download.url, downloadNFeBody)
                            .then(getResponseDownload => {

                                respostaSincrona = {
                                    statusDownload: getResponseDownload.status,
                                    json: getResponseDownload.json,
                                    pdf: getResponseDownload.pdf,
                                    erros: getResponseDownload.erros
                                }

                                console.log(respostaSincrona)
                                return respostaSincrona
                            }
                        )
                    }

                    else {

                        respostaSincrona = {
                            statusConsulta: getResponseStatusProcessamento.status,
                            cStat: getResponseStatusProcessamento.cStat,
                            chNFe: getResponseStatusProcessamento.chNFe,
                            nProt: getResponseStatusProcessamento.nProt,
                            xml: getResponseStatusProcessamento.xml,
                            erros: getResponseStatusProcessamento.erro
                        }

                        console.log(respostaSincrona)
                        return respostaSincrona
                    }
                }
            )
            return respostaSincrona
        }
    )
    return respostaSincrona
}


module.exports = { responseSincrono, emitirNFeSincrono }
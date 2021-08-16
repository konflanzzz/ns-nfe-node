const statusProcessamento = require('./statusProcessamento')
const download = require('./download')
const emitir = require('./emitirNFe')
const NFeJSON = require('./LayoutNFe.json')
const configParceiro = require('../configParceiro')

class responseSincrono {
    constructor(statusEnvio, statusConsulta, statusDownload, cStat, motivo, nsNRec, chNFe, nProt, xml, json, pdf, erros){
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

async function emitirNFeSincrono(conteudo, cnpj, tpAmb, tpDown) {

    let respostaSincrona = new responseSincrono();
    
    const respostaEmissao = new emitir.response(
        emitir.sendRequest(emitir.url, conteudo)
            .then(getResponse => {

                const statusProcessamentoBody = new statusProcessamento.body(
                    cnpj,
                    getResponse.nsNRec,
                    tpAmb
                )

                respostaSincrona = {
                    statusEnvio: getResponse.status,
                    nsNRec: getResponse.nsNRec,
                    erros: getResponse.erros
                }

                console.log(getResponse)

                var respostaStatusProcessamento = new statusProcessamento.response(
                    statusProcessamento.sendRequest(statusProcessamento.url, statusProcessamentoBody)
                        .then(getResponse => {
                            
                            if (getResponse.cStat == 100 ) {

                                console.log(getResponse)

                                respostaSincrona = {
                                    statusConsulta: getResponse.status,
                                    cStat: getResponse.cStat,
                                    chNFe: getResponse.chNFe,
                                    nProt: getResponse.nProt,
                                    xml: getResponse.xml,
                                    erros: getResponse.erro
                                }

                                const downloadNFeBody = new download.body(
                                    getResponse.chNFe,
                                    tpDown,
                                    tpAmb
                                )

                                var respostaDownloadNFe = new download.response(
                                    download.sendRequest(download.url, downloadNFeBody)
                                        .then(getResponse => {
                                               
                                            respostaSincrona = {
                                                statusDownload: getResponse.status,
                                                json: getResponse.json,
                                                pdf: getResponse.pdf,
                                                erros: getResponse.erros
                                            }

                                            console.log(getResponse)
                                        }
                                    )
                                )
                            }

                            else {
                                console.log(getResponse)
                            }
                        }
                    )
                );
            }
        )
    )

    return respostaSincrona
}


module.exports = {responseSincrono, emitirNFeSincrono}
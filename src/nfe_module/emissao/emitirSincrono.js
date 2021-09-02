const statusProcessamento = require('./statusProcessamento')
const download = require('./download')
const emitir = require('./emitir')
const configParceiro = require('../../configParceiro')
const nsAPI = require('../commons/nsAPI')

class responseSincrono {
    constructor(statusEnvio, statusConsulta, statusDownload, cStat, motivo, xMotivo, nsNRec, chNFe, nProt, xml, json, pdf, erros) {
        this.statusEnvio = statusEnvio;
        this.statusConsulta = statusConsulta;
        this.statusDownload = statusDownload;
        this.cStat = cStat;
        this.motivo = motivo;
        this.xMotivo = xMotivo;
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

    let emissaoResponse = new emitir.response(
        await nsAPI.PostRequest(emitir.url,conteudo)
    )

    if ((emissaoResponse.status == 200) || (emissaoResponse.status == -6 || (emissaoResponse.status == -7))){
        
        respostaSincrona.statusEnvio = emissaoResponse.status

        let statusBody = new statusProcessamento.body(
            configParceiro.CNPJ,
            emissaoResponse.nsNRec,
            tpAmb
        )

        let statusResponse = new statusProcessamento.response(
            await nsAPI.PostRequest(statusProcessamento.url, statusBody)
        )

        respostaSincrona.statusConsulta = statusResponse.status

        if ((statusResponse.status == 200)){
            
            respostaSincrona = {
                cStat: statusResponse.cStat,
                xMotivo: statusResponse.xMotivo,
                motivo: statusResponse.motivo
            }

            if ((statusResponse.cStat == 100) || (statusResponse.cStat == 150)){
                
                respostaSincrona = {
                    chNFe: statusResponse.chNFe,
                    nProt: statusResponse.nProt
                }

                let downloadBody = new download.body(
                    statusResponse.chNFe,
                    tpDown,
                    tpAmb
                )

                let downloadResponse = new download.response(
                    await nsAPI.PostRequest(download.url, downloadBody)
                )

            }

            else {
                
            }
        }

        else {
            
        }
    }

    else { console.log(respostaSincrona)}

    return respostaSincrona
}

module.exports = { responseSincrono, emitirNFeSincrono }
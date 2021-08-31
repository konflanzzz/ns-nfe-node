const NFeAPI = require('./nfe/emitirSincrono')
const NFeJSON = require('./nfe/LayoutNFe')
const statusProcessamento = require('./nfe/statusProcessamento')
const download = require('./nfe/download')
const emitir = require('./nfe/emitirNFe')
const configParceiro = require('./configParceiro')

var conteudoJSON = NFeJSON;

var retorno = NFeAPI.emitirNFeSincrono(conteudoJSON, "2", "XP")
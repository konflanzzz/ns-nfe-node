const NFeAPI = require('./nfe/emitirSincrono')
const NFeJSON = require('./nfe/LayoutNFe')

var conteudoJSON = NFeJSON;

var retorno = NFeAPI.emitirNFeSincrono(conteudoJSON, "2", "X")
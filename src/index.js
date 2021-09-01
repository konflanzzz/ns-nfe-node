const NFeAPI = require('./nfe/emitirSincrono')
const NFeJSON = require('./nfe/LayoutNFe')
var retorno = NFeAPI.emitirNFeSincrono(NFeJSON, "2", "X")
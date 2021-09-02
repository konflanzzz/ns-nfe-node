const NFeAPI = require('./nfe_module/emissao/emitirSincrono')
const NFeJSON = require('./nfe_module/emissao/LayoutNFe.json')

var retorno = NFeAPI.emitirNFeSincrono(NFeJSON, "2", "XP","./NFe")

retorno.then(()=>{console.log(retorno)})
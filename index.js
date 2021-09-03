const NFeAPI = require('./src/nfe_module/emissao/emitirSincrono')
const NFeJSON = require('./LayoutNFe.json')

var retorno = NFeAPI.emitirNFeSincrono(NFeJSON, "2", "XP","../NFe")

retorno.then(()=>{console.log(retorno)})
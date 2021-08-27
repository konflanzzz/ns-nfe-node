const NFeAPI = require('./nfe/emitirSincrono')
const NFeJSON = require('./nfe/LayoutNFe')

var conteudoJSON = NFeJSON

NFeAPI.emitirNFeSincrono(conteudoJSON, "2", "X")
.then(async respostaEmissao => {
    setTimeout(function () { console.log(respostaEmissao)}, 2000)
})
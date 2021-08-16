const NFeAPI = require('./nfe/emitirNFeSincrono')
const NFeJSON = require('./nfe/LayoutNFe.json')
const configParceiro = require('./configParceiro')

var conteudoJSON = NFeJSON

var teste = NFeAPI.emitirNFeSincrono(conteudoJSON, configParceiro.CNPJ, "2", "X")
    .then(async respostaEmissao => {
        retorno = respostaEmissao
    }
)

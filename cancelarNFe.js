// Exemplo de cancelamento de NFe

const cancelarNFe = require('./src/nfe_module/eventos/cancelamento')
const util = require('./src/nfe_module/commons/util')

let corpo = new cancelarNFe.body(
    "chave de acesso",
    "2",
    util.dhEmiGet(),
    "nProt",
    "CANCELAMENTO REALIZADO PARA TESTES DE INTEGRACAO EXEMPLO NODE JS"
)

cancelarNFe.sendPostRequest(corpo, "J", "NFe/Eventos").then(getResponse => { console.log(getResponse) })
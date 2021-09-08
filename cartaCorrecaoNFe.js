// Exemplo de carta de correcao de NFe

const cartaCorrecaoNFe = require('./src/nfe_module/eventos/cartaCorrecao')
const util = require('./src/nfe_module/commons/util')

let corpo = new cartaCorrecaoNFe.body(
    "43210907364617000135550000000223861693448643",
    "2",
    util.dhEmiGet(),
    "5",
    "CARTA DE CORRECAO ADICIONADA PARA TESTES DE INTEGRACAO COM EXEMPLO NODE JS"
)

cartaCorrecaoNFe.sendPostRequest(corpo, "X", "NFe/Eventos").then(getResponse => { console.log(getResponse) })
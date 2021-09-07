var fs = require('fs');
const path = require('path')

function dhEmiGet(){

    let dhEmi = new Date()
    dhEmi = dhEmi.toISOString().slice(0, 11) + dhEmi.toLocaleTimeString() + "-03:00"

    return dhEmi
}

// function gravarLinhaLog(registro){
//     var caminhoLog = "../../../NFe/logs"
    
// }

async function salvarArquivo(caminho, nomeArquivo, extensao, conteudo) {

    var caminhoSalvar = path.join(caminho, nomeArquivo + extensao)

    try {
        if (!fs.existsSync(caminho)) {
            fs.mkdirSync(caminho);
        }
    }

    catch (err) {
        console.log(err);
    }

    fs.writeFile(caminhoSalvar, conteudo, function (err) {
        if (err) throw err;
    });

}

module.exports = { salvarArquivo, dhEmiGet }

var fs = require('fs');
const path = require('path')

async function salvarArquivo(caminho, nomeArquivo, extensao, conteudo){

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

module.exports = { salvarArquivo }

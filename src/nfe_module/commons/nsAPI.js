const axios = require('axios')
const configParceiro = require('../../../configParceiro')
const util = require('./util')

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

async function PostRequest(url, body) {

    util.gravarLinhaLog('[URL_ENVIO]: ' + JSON.stringify(url))
    util.gravarLinhaLog('[DADOS_ENVIO]: ' + JSON.stringify(body))
    
    responseAPI = await axios.post(url, JSON.stringify(body), { headers: header })
        .then(getResponse => {

            util.gravarLinhaLog('[DADOS_RESPOSTA]: ' + JSON.stringify(getResponse.data))

            if (getResponse.status == 200){
                responseAPI = getResponse.data
            }

            else {
                console.log(getResponse.data)
            }

            return responseAPI;
        })
        
        .catch(function (error) { console.log(error) })

    return responseAPI
}

module.exports = { PostRequest }

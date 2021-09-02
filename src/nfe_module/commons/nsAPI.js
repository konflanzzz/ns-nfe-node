const axios = require('axios')
const configParceiro = require('../../configParceiro')

const header = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": configParceiro.token
}

async function PostRequest(url, body) {

    responseAPI = await axios.post(url, JSON.stringify(body), { headers: header })
        .then(getResponse => {
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

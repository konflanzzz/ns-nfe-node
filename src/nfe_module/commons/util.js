function dhEmiGet(){
    let dhEmi = new Date().toJSON().slice(0, 19)+"-03:00"
    return dhEmi
}

module.exports = { dhEmiGet }

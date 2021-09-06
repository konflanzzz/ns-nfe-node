function dhEmiGet(){
    let dhEmi = new Date()
    dhEmi = dhEmi.toISOString().slice(0, 11) + dhEmi.toLocaleTimeString() + "-03:00"
    return dhEmi
}

module.exports = { dhEmiGet }

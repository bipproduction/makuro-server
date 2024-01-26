const fs = require('fs')
const path = require('path')
const _ = require('lodash')
module.exports = async function () {
    const fl = require(path.join(__dirname, "./../../package.json"))
    return {
        success: true,
        data: _.entries(fl.dependencies).map((v) => ({
            name: v[0],
            version: v[1].replace("^", "")
        }))
    }
}
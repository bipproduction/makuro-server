const path = require('path')
module.exports = async function (param) {
    const dep = require(path.join(__dirname, "./../../package.json"))
    return dep['dependencies']
}
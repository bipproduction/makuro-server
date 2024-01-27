const fs = require('fs')
const path = require('path')
const _ = require('lodash')

module.exports = async function () {
    const dir = await fs.promises.readdir(path.join(__dirname, "./../app"))
    const list_dir = dir.filter((v) => !_.startsWith(v, "_")).map((v) => ({ name: v.split(".")[0] }))

    return {
        success: true,
        data: list_dir.filter((v) => !_.startsWith(v.name, "_"))
    }
}
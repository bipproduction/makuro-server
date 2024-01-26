const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const _data = {}
const _ = require('lodash')


module.exports = async function (param) {
    
    const apps = await fetch(`${_data.url}/val/app`).then(v => v.json())
    const c = apps.data.map((v) => ([v.name]))
    yargs
        .scriptName("makuro-app")
        .command(c)
        .showHelp()
}
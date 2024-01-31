const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const _ = require('lodash')
module.exports = async function (param) {
    const apps = await fetch(`${param.svr.svr_url}/val/app`).then(v => v.json())
    const c = apps.data.map((v) => ([v.name]))
    yargs
        .scriptName("makuro-app")
        .command(c)
        .showHelp()
}
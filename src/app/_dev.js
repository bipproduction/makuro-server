const yargs = require('yargs')
const { fetch } = require('cross-fetch')
module.exports = async function (param) {
    yargs
        .command(
            'set-dev',
            "set dev",
            yargs => yargs,
            funSetDev
        )
        .command(
            "set-pro",
            "set-pro",
            yargs => yargs,
            funSetPro
        )
        .options({
            "param": {
                alias: "p",
                default: param,
                hidden: true
            }
        })
        .recommendCommands()
        .demandCommand(1)
        .parse(param.argv.splice(1))
}

async function funSetDev(argv) {
    fetch(`${argv.p.svr.svr_url}/dev/set-dev`).then(console.log)
}

async function funSetPro(argv) {
    fetch(`${argv.p.svr.svr_url}/dev/set-pro`).then(console.log)
}
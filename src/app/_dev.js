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
}

async function funSetDev(argv) {
    fetch('https://makuro-server/dev/set-dev').then(console.log)
}

async function funSetPro(argv) {
    fetch('https://makuro-server/dev/set-pro').then(console.log)
}
const { fetch } = require('cross-fetch')
const yargs = require('yargs')
module.exports = async function (param) {

    yargs
        .command(
            "eng",
            "translate english",
            yargs => yargs
                .options({
                    "question": {
                        alias: "q",
                        string: true,
                        demandOption: true
                    }
                }),
            funEng
        )
        .options({
            "param": {
                alias: "p",
                default: param,
                hidden: true
            }
        })
        .example(` makuro-app trs eng -q "halo apa kabar , bagaimana kabarmu sekarang ?"`)
        .demandCommand(1)
        .recommendCommands()
        .parse(param.argv.splice(1))
}

async function funEng(argv) {
    const res = await fetch(`${argv.p.url}/translate/${argv.q}`).then(v => v.text())
    console.log(res)
}
const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const md = require('markdown-table-prettify')
const _data = {}

module.exports = async function (param) {
    yargs
        .scriptName("makuro-app")
        .command(
            "_chat-ai",
            "chat dengan ai",
            yargs => yargs
                .options({
                    "question": {
                        alias: "q",
                        string: true,
                        demandOption: true
                    },
                    "new": {
                        alias: "n",
                        default: false,
                        boolean: true
                    }
                }),
            funChat
        )
        .demandCommand(1)
        .recommendCommands()
        .parse(param.argv)
}

async function funChat(argv) {
    const ora = (await import("ora")).default
    const tunggu = ora("please wait ...").start()
    const val = await fetch('https://makuro-ai.wibudev.com/ask', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            q: argv.q,
            n: argv.n
        })
    }).then(v => v.text())
    tunggu.stop()
    console.log(md.CliPrettify.prettify(val))

}
const yargs = require('yargs');
const markdownIt = require('markdown-it');
const _ = require('lodash')
const md = markdownIt();
const tab = require('tabletojson')
const columnify = require('columnify');

module.exports = async function (param) {
    yargs
        .command(
            "bali",
            "get data report bali",
            yargs => yargs
                .options({
                    "question": {
                        alias: "q",
                        string: true,
                        demandOption: true
                    },
                    "tahun-start": {
                        alias: "s",
                        default: "2020",
                        string: true
                    },
                    "tahun-end": {
                        alias: "e",
                        string: true,
                        default: "2023"
                    }
                }),
            funGetData
        )
        .options({
            "param": {
                alias: "p",
                default: param,
                hidden: true
            }
        })
        .demandCommand(1)
        .recommendCommands()
        .parse(param.argv.splice(1))
}

async function funGetData(argv) {
    const ora = (await import('ora')).default("please wait ...").start()
    const data = await fetch(`${argv.p.svr.ai_url}/ask`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            q: `berikan tabel laporan total ${argv.q} Provinsi Bali per Kecamatan Tahun ${argv.s} dan ${argv.e}`
        })
    }).then(v => v.text())
    ora.stop()

    const txmd = md.render(data)
    const result = columnify(tab.tabletojson.convert(txmd)[0])
    console.log(_.isEmpty(result)? data: result)
}
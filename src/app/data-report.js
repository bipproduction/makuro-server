const yargs = require('yargs');

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
                    },
                    "timeout": {
                        alias: "t",
                        number: true,
                        default: 15
                    },
                    "jenis": {
                        alias: "j",
                        default: "table"
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

    const data = await fetch(`${argv.p.svr.ai_url}/tanya?q=berikan laporan berupa tabel total ${argv.q} di Provinsi Bali per Kecamatan Tahun ${argv.s} dan ${argv.e} &jenis=${argv.j}`).then(v => v.text())
    ora.stop()
    console.log(data)
}
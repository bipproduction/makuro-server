const yargs = require('yargs');


module.exports = async function (param) {
    yargs
        .command(
            "partai",
            "get data report partai",
            yargs => yargs
                .options({
                    "nama-partai": {
                        alias: "q",
                        string: true,
                        demandOption: true
                    },
                    "timeout": {
                        alias: "t",
                        number: true,
                        default: 30
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

    const q = `
berikan informasi Partai ${argv.q} dimalaysia tahun 2023 \n

berikut detail informasi yang saya butuhkan:

* Nama partai
* didirikan kapan
* masih ada atau udah bubar, kalu bubar sertakan kapan dan kenapa
* anggota BOD-nya
* masuk ke koalisi apa
* tokoh politik yang terkenal dari partai terkait (boleh lebih dari 1; sebutin terkenalnnya kenapa)
* hubungan sama keluarga kerajaan, kalo ada sebutin siapa aja, hubungannya apa (contoh: bisnis, ada anggota parpol yang pernah pernah digosipin, dll)
* daerah kekuasaan di mana
* ada kasus atau ngga
* parpolnya identik sama etnis apa
* budaya parpol
* ideologi parpol
* hubungan dengan parpol lain (kalo ada)
* pendukung parpol (contoh: pernah didukung selebriti pas kampanye, dll)
* track record style kampanye
* dll kalo ada nemu boleh tambahin

sajikan semua data ke bentuk tabel markdown
    
    `
    const data = await fetch(`${argv.p.svr.ai_url}/tanya?q=${q}&jenis=text`).then(v => v.text())
    ora.stop()
    console.log(data)

}
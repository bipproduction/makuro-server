const { fetch } = require('cross-fetch')
const { spawn } = require('child_process')
const _data = {}
let prog = "";
module.exports = async function (param) {
    const up = (await import('log-update')).default

    const val = (await fetch(`${_data.url}/val/pkg`).then((v) => v.json())).data.map((v) => v.name).join(" ")
    const child = spawn("bash", ['-c', `cd ${param.dir} && yarn add ${val}`])
    child.stdout.on("data", (data) => {
        prog += "."
        up(prog)
    })
    child.stderr.on("data", (data) => {
        console.log(data.toString())
    })
    child.on("close", () => console.log("finish"))

}
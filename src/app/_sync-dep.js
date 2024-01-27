const { fetch } = require('cross-fetch')
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs')
let prog = "";
module.exports = async function (param) {
    const dep = await fetch(`${param.svr.url}/val/dep`).then(v => v.json())
    let _dep = require(`${param.dir}/package.json`)
    _dep['dependencies'] = dep
    await fs.promises.writeFile(`${param.dir}/package.json`, JSON.stringify(_dep, null, 2))

    const up = (await import('log-update')).default
    const child = spawn("bash", ['-c', `cd ${param.dir} && yarn install`])
    child.stdout.on("data", (data) => {
        prog += "."
        up(prog)
    })
    child.stderr.on("data", (data) => {
        console.log(data.toString())
    })
    child.on("close", () => console.log("finish"))

}
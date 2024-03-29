const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const _ = require('lodash')
const os = require('os')

module.exports = async function ({ argv, dir }) {
    const ora = (await import('ora')).default('loading ...').start()
    // const apps = await fetch(`https://makuro-server.wibudev.com/val/app`).then(v => v.json())
    const svr = await fetch(`https://makuro-server.wibudev.com/val/svr`).then(v => v.json())

    let url = svr.svr_url;
    if (svr.is_dev && os.hostname() === svr.dev_host_name) {
        console.log("\nDEV MODE")
        url = svr.dev_url
    }

    const param = { argv, dir, svr, url }
    console.log('\n');
    (await require('require-from-url/sync')(`${url}/app/${argv[0]}`))(param)
    ora.stop()


}

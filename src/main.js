const yargs = require('yargs')
const { fetch } = require('cross-fetch')
const _ = require('lodash')

module.exports = async function ({ argv, dir }) {
    const ora = (await import('ora')).default('loading ...').start()
    const apps = await fetch(`https://makuro-server.wibudev.com/val/app`).then(v => v.json())
    const svr = await fetch(`https://makuro-server.wibudev.com/val/svr`).then(v => v.json())

    if(svr.is_dev) console.log("DEV MODE")
    const c = apps.data.map((v) => ([v.name]))
    const arg = yargs
        .scriptName("makuro-app")
        .command(c)
        .demandCommand(1)
        .recommendCommands()
        .help()
        .version()
        .parse(argv)

    const param = { argv, dir, svr }

    if (!c.map((v) => v[0])) return yargs.showHelp();
    const url = svr.is_dev ? svr.url : svr.svr_url;
    console.log('\n\n');
    (await require('require-from-url/sync')(`${url}/app/${arg._[0]}`))(param)
    ora.stop()


}

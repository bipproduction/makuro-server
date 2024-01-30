const express = require('express');
const yargs = require('yargs');
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const path = require('path')
const fs = require('fs')
const js = require('js-confuser')
const prisma = new (require('@prisma/client')).PrismaClient

yargs
    .command(
        "start",
        "ya start",
        yargs => yargs
            .options({
                "port": {
                    alias: "p",
                    default: 3000
                }
            }),
        funStart
    )
    .recommendCommands()
    .demandCommand(1)
    .parse(process.argv.splice(2))


async function funStart(argv) {

    app.get('/app/:name?', async (req, res) => {
        const { name } = req.params
        res.setHeader("Contant-Type", "text/javascript")
        try {
            let fl = (await fs.promises.readFile(path.join(__dirname, `./src/app/${name}.js`))).toString()
            // fl = fl.replace("const _data = {}", `const _data = ${JSON.stringify(_data)}`)
            return res.send(await js.obfuscate(fl, { target: "node", "preset": "high" }))
        } catch (error) {
            let fl = (await fs.promises.readFile(path.join(__dirname, "./src/util/_menu.js"))).toString()
            // fl = fl.replace("const _data = {}", `const _data = ${JSON.stringify(_data)}`)
            return res.send(await js.obfuscate(fl, { target: "node", "preset": "high" }))
        }
    })

    app.get('/val/:name?', async (req, res) => {
        const { name } = req.params
        try {
            const val = await require(path.join(__dirname, `./src/val/${name}.js`))()
            return res.json(val)
        } catch (error) {
            console.log(error)
            return res.json({
                success: false,
                message: "val not found | error"
            })
        }
    })

    app.get("/dev/:name?", async (req, res) => {
        const name = req.params.name
        if (!name) return res.json({
            success: false,
            message: "no name"
        })

        switch (name) {
            case "set-dev":
                await prisma.util.upsert({
                    create: {
                        is_dev: true
                    },
                    update: {
                        is_dev: true
                    },
                    where: {
                        id: 1
                    }
                })

                return res.json({
                    success: true
                })
            case "set-pro":
                await prisma.util.upsert({
                    create: {
                        is_dev: false
                    },
                    update: {
                        is_dev: false
                    },
                    where: {
                        id: 1
                    }
                })
                return res.json({
                    success: true
                })
            default: return res.json({
                success: false,
                message: "no option"
            })
        }
    })


    app.listen(argv.p, () => console.log(`app run on port: ${argv.p}`))
}

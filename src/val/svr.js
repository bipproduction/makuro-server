const prisma = new (require('@prisma/client')).PrismaClient
module.exports = async function () {
    const dev = await prisma.util.findUnique({ where: { id: 1 } })

    const _data = {
        svr_url: "https://makuro-app.wibudev.com",
        url: "http://localhost:3000",
        ai_url: "https://makuro-ai.wibudev.com",
        is_dev: dev && dev.is_dev ? true : false
    }

    return _data
}
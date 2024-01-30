const prisma = new (require('@prisma/client')).PrismaClient
module.exports = async function () {
    const dev = await prisma.util.findUnique({ where: { id: 1 } })

    const _data = {
        svr_url: "https://makuro-server.wibudev.com",
        url: dev && dev.is_dev ? "http://localhost:3000" : "https://makuro-ai.wibudev.com",
        ai_url: "https://makuro-ai.wibudev.com",
        is_dev: dev && dev.is_dev ? true : false,
        host_name: "bips-MacBook-Air.local"
    }

    return _data
}
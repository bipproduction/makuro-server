const prisma = new (require('@prisma/client')).PrismaClient
module.exports = async function () {
    const dev = await prisma.util.findUnique({ where: { id: 1 } })
    const _data = {
        url: "http://localhost:3000",
        ai_url: "https://makuro-ai.wibudev.com",
        is_dev: dev.is_dev
    }
    
    return _data
}
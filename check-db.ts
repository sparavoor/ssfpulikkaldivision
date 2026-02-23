import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        const navbar = await prisma.navbar.findMany();
        console.log('Navbar items:', navbar);
    } catch (e) {
        console.error('Error fetching navbar:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();

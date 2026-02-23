import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
    // Create Admin
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await prisma.admin.upsert({
        where: { username: "admin" },
        update: {},
        create: {
            username: "admin",
            password: hashedPassword,
        },
    });

    // Create Hero Initial Content
    await prisma.hero.upsert({
        where: { id: "hero-section" },
        update: {},
        create: {
            id: "hero-section",
            bannerImage: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80",
            title: "SSF Pulikkal Division",
            subtitle: "Empowering the Society through Moral Excellence",
            btn1Text: "Latest Updates",
            btn1Link: "#news",
            btn2Text: "About Us",
            btn2Link: "#about",
        },
    });

    // Create Contact Initial Content
    await prisma.contact.upsert({
        where: { id: "contact-info" },
        update: {},
        create: {
            id: "contact-info",
            address: "Madrassa building, Pulikkal, Malappuram, Kerala 673637",
            phone: "+91 0000 000 000",
            email: "info@ssfpulikkal.org",
            mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15659.458316109968!2d75.9126938!3d11.1235123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba64e43f49352e7%3A0xc3f98229f34f71a0!2sPulikkal%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
        },
    });

    // Create Footer Initial Content
    await prisma.footer.upsert({
        where: { id: "footer-content" },
        update: {},
        create: {
            id: "footer-content",
            aboutText: "SSF Pulikkal Division is a leading youth organization dedicated to moral and educational empowerment.",
            socialLinks: JSON.stringify({
                facebook: "https://facebook.com/ssfpulikkal",
                instagram: "https://instagram.com/ssfpulikkal",
                twitter: "https://twitter.com/ssfpulikkal",
            }),
            copyright: "© 2026 SSF Pulikkal Division. All rights reserved.",
        },
    });

    // Create Navbar Initial Content
    await prisma.navbar.upsert({
        where: { id: "navbar-settings" },
        update: {},
        create: {
            id: "navbar-settings",
            logoText: "Pulikkal",
            links: JSON.stringify([
                { name: "Home", href: "/" },
                { name: "News", href: "/#news" },
                { name: "Gallery", href: "/gallery" },
                { name: "Contact", href: "/#contact" },
            ]),
            loginText: "Login",
            loginLink: "/admin",
        },
    });

    console.log("Seed successful");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

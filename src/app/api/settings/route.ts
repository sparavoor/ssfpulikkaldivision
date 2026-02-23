import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const hero = await prisma.hero.findUnique({ where: { id: "hero-section" } });
        const contact = await prisma.contact.findUnique({ where: { id: "contact-info" } });
        const footer = await prisma.footer.findUnique({ where: { id: "footer-content" } });
        const navbar = await prisma.navbar.findUnique({ where: { id: "navbar-settings" } });

        return NextResponse.json({ hero, contact, footer, navbar });
    } catch (error) {
        console.error("Failed to fetch settings:", error);
        return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const { type, data } = body;

        // Strip id to avoid Prisma unique constraint/input errors
        const { id, ...updateData } = data;

        let result;
        if (type === "hero") {
            result = await prisma.hero.update({
                where: { id: "hero-section" },
                data: updateData,
            });
        } else if (type === "contact") {
            result = await prisma.contact.update({
                where: { id: "contact-info" },
                data: updateData,
            });
        } else if (type === "footer") {
            result = await prisma.footer.update({
                where: { id: "footer-content" },
                data: updateData,
            });
        } else if (type === "navbar") {
            result = await prisma.navbar.update({
                where: { id: "navbar-settings" },
                data: updateData,
            });
        }

        return NextResponse.json(result);
    } catch (error) {
        console.error("Settings update error:", error);
        return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
    }
}

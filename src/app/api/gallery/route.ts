import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
    try {
        const images = await prisma.gallery.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(images);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { image, title } = body;

        if (!image) {
            return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
        }

        const item = await prisma.gallery.create({
            data: { image, title },
        });

        return NextResponse.json(item);
    } catch (error) {
        return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
    }
}

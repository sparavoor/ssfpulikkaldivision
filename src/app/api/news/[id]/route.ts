import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const news = await prisma.news.findUnique({
            where: { id: id },
        });
        if (!news) return NextResponse.json({ error: "News not found" }, { status: 404 });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { title, shortDescription, content, image, isFeatured } = body;

        const data: any = {
            title,
            shortDescription,
            content,
            image,
            isFeatured,
        };

        if (title) {
            data.slug = slugify(title, { lower: true, strict: true }) + "-" + id.slice(-4);
        }

        const news = await prisma.news.update({
            where: { id: id },
            data,
        });

        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update news" }, { status: 500 });
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await prisma.news.delete({
            where: { id: id },
        });
        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete news" }, { status: 500 });
    }
}

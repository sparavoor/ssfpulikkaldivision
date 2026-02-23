import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import slugify from "slugify";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(request: NextRequest) {
    try {
        const news = await prisma.news.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(news);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { title, shortDescription, content, image, isFeatured } = body;

        if (!title || !content || !image) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const slug = slugify(title, { lower: true, strict: true }) + "-" + Date.now().toString().slice(-4);

        const news = await prisma.news.create({
            data: {
                title,
                slug,
                shortDescription,
                content,
                image,
                isFeatured: isFeatured || false,
            },
        });

        return NextResponse.json(news);
    } catch (error) {
        console.error("News creation error:", error);
        return NextResponse.json({ error: "Failed to create news" }, { status: 500 });
    }
}

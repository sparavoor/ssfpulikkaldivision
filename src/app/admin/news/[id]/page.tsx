import NewsEditor from "@/components/admin/NewsEditor";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditNewsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const news = await prisma.news.findUnique({
        where: { id },
    });

    if (!news) notFound();

    return <NewsEditor initialData={news} isEditing />;
}

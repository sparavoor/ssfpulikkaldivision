import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { notFound } from "next/navigation";
import { Calendar, Tag, Share2 } from "lucide-react";
import Link from "next/link";

export const dynamic = 'force-dynamic';

export default async function NewsDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const news = await prisma.news.findUnique({
        where: { slug },
    });

    if (!news) notFound();

    const footer = await prisma.footer.findUnique({ where: { id: "footer-content" } });
    const navbar = await prisma.navbar.findUnique({ where: { id: "navbar-settings" } });
    const contact = await prisma.contact.findUnique({ where: { id: "contact-info" } });

    return (
        <main className="min-h-screen bg-white">
            <Navbar data={navbar as any} />

            {/* Article Header */}
            <div className="pt-40 pb-20 bg-black text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <div className="max-w-4xl">
                        <div className="flex items-center space-x-4 mb-8">
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                                Latest Stories
                            </span>
                            <span className="text-white/20 px-2">•</span>
                            <span className="text-white/40 text-[10px] uppercase font-bold tracking-widest">
                                {new Date(news.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight mb-16">
                            {news.title}
                        </h1>
                        <div className="relative aspect-[21/9] overflow-hidden bg-gray-900">
                            <img src={news.image} className="w-full h-full object-cover grayscale-[0.2]" alt={news.title} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Article Content */}
            <article className="py-20">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-16">
                        <div className="flex-1">
                            <div
                                className="prose prose-lg max-w-none prose-headings:font-display prose-headings:text-gray-900 prose-p:text-gray-600 prose-img:rounded-3xl"
                                dangerouslySetInnerHTML={{ __html: news.content }}
                            />
                        </div>

                        {/* Sidebar */}
                        <div className="lg:w-80 space-y-10">
                            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                                <h4 className="text-xl font-bold mb-6">Share this post</h4>
                                <div className="flex space-x-4">
                                    <button className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#1877F2] shadow-sm hover:scale-110 transition-transform">
                                        <Share2 size={20} />
                                    </button>
                                    <button className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center text-[#25D366] shadow-sm hover:scale-110 transition-transform">
                                        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.438 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </article>

            {footer && <Footer data={footer} contact={contact ?? undefined} />}
        </main>
    );
}

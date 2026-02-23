import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { formatSSF } from "@/lib/ssf-formatter";

export const dynamic = 'force-dynamic';

export default async function NewsListPage() {
    const news = await prisma.news.findMany({
        orderBy: { createdAt: "desc" },
    });
    const footer = await prisma.footer.findUnique({ where: { id: "footer-content" } });
    const navbar = await prisma.navbar.findUnique({ where: { id: "navbar-settings" } });
    const contact = await prisma.contact.findUnique({ where: { id: "contact-info" } });

    return (
        <main className="min-h-screen bg-white">
            <Navbar data={navbar as any} />

            {/* Page Header */}
            <div className="pt-40 pb-20 bg-black text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <span className="inline-block tracking-[0.2em] text-[10px] font-bold text-white/40 uppercase mb-8">News & Media</span>
                    <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight">Latest Stories</h1>
                </div>
            </div>

            <section className="py-32">
                <div className="container mx-auto px-6 md:px-12">
                    {news.length === 0 ? (
                        <p className="text-gray-400 font-light italic py-20 border-t border-gray-100">No news items found.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                            {news.map((item) => (
                                <div key={item.id} className="group cursor-pointer">
                                    <Link href={`/news/${item.slug}`} className="block space-y-8">
                                        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                            />
                                        </div>
                                        <div className="space-y-4">
                                            <div className="text-xs font-bold uppercase tracking-widest text-gray-400">
                                                {new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                            </div>
                                            <h4 className="text-2xl font-display font-medium text-black group-hover:text-primary transition-colors leading-snug">
                                                {formatSSF(item.title)}
                                            </h4>
                                            <p className="text-gray-500 font-light line-clamp-2 leading-relaxed">
                                                {formatSSF(item.shortDescription)}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {footer && <Footer data={footer} contact={contact ?? undefined} />}
        </main>
    );
}

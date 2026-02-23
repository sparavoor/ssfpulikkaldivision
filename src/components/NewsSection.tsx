"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { formatSSF } from "@/lib/ssf-formatter";

interface NewsItem {
    id: string;
    title: string;
    slug: string;
    shortDescription: string;
    image: string;
    createdAt: Date;
}

interface NewsSectionProps {
    news: NewsItem[];
}

export function NewsSection({ news }: NewsSectionProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section id="news" className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 font-sans">News & Media</h2>
                        <h3 className="text-5xl md:text-7xl font-display font-medium text-black">Latest Stories</h3>
                    </div>
                    <Link href="/news" className="group flex items-center text-sm font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors whitespace-nowrap">
                        All Articles <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                    {news.length > 0 ? (
                        news.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 15 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group cursor-pointer"
                            >
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
                                            {mounted ? new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : ""}
                                        </div>
                                        <h4 className="text-2xl font-display font-medium text-black group-hover:text-primary transition-colors leading-snug">
                                            {formatSSF(item.title)}
                                        </h4>
                                        <p className="text-gray-500 font-light line-clamp-2 leading-relaxed">
                                            {formatSSF(item.shortDescription)}
                                        </p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full py-20 border-t border-gray-100 text-gray-400 font-light italic">
                            No news items found.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

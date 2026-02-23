import prisma from "@/lib/prisma";
import Link from "next/link";
import { Newspaper, Image as ImageIcon, Settings, Clock } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const newsCount = await prisma.news.count();
    const galleryCount = await prisma.gallery.count();
    const recentNews = await prisma.news.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
    });

    const stats = [
        { name: "News Articles", value: newsCount, href: "/admin/news", icon: <Newspaper size={20} /> },
        { name: "Gallery Images", value: galleryCount, href: "/admin/gallery", icon: <ImageIcon size={20} /> },
    ];

    return (
        <div className="space-y-12">
            {/* Header */}
            <div className="border-b border-gray-100 pb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Control Panel</p>
                <h1 className="text-4xl font-display font-medium text-black tracking-tight">Dashboard</h1>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stats.map((stat) => (
                    <Link key={stat.name} href={stat.href} className="group bg-white border border-gray-100 rounded-xl p-8 flex items-center justify-between hover:border-black transition-all">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{stat.name}</p>
                            <p className="text-5xl font-display font-medium text-black">{stat.value}</p>
                        </div>
                        <div className="text-gray-200 group-hover:text-black transition-colors">
                            {stat.icon}
                        </div>
                    </Link>
                ))}
            </div>

            {/* Quick Actions */}
            <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Quick Actions</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href="/admin/news/new"
                        className="group border border-gray-100 rounded-xl p-6 hover:bg-black hover:border-black transition-all">
                        <div className="text-gray-300 group-hover:text-white mb-4 transition-colors">
                            <Newspaper size={22} />
                        </div>
                        <p className="font-medium text-black group-hover:text-white transition-colors text-sm">Add News Article</p>
                    </Link>
                    <Link href="/admin/gallery"
                        className="group border border-gray-100 rounded-xl p-6 hover:bg-black hover:border-black transition-all">
                        <div className="text-gray-300 group-hover:text-white mb-4 transition-colors">
                            <ImageIcon size={22} />
                        </div>
                        <p className="font-medium text-black group-hover:text-white transition-colors text-sm">Upload Gallery Photos</p>
                    </Link>
                    <Link href="/admin/settings"
                        className="group border border-gray-100 rounded-xl p-6 hover:bg-black hover:border-black transition-all">
                        <div className="text-gray-300 group-hover:text-white mb-4 transition-colors">
                            <Settings size={22} />
                        </div>
                        <p className="font-medium text-black group-hover:text-white transition-colors text-sm">Edit Page Sections</p>
                    </Link>
                </div>
            </div>

            {/* Recent News */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Recent News</p>
                    <Link href="/admin/news" className="text-xs font-bold uppercase tracking-widest text-black/30 hover:text-black transition-colors">View All →</Link>
                </div>
                <div className="bg-white border border-gray-100 rounded-xl divide-y divide-gray-50">
                    {recentNews.length > 0 ? (
                        recentNews.map((news) => (
                            <Link key={news.id} href={`/admin/news/${news.id}`} className="flex items-center space-x-4 p-5 hover:bg-gray-50 transition-colors group">
                                <img src={news.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0" alt="" />
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-black text-sm truncate group-hover:text-primary transition-colors">{news.title}</p>
                                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                                        <Clock size={10} /> {new Date(news.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                                    </p>
                                </div>
                                <span className="text-gray-200 group-hover:text-gray-400 text-xs transition-colors">→</span>
                            </Link>
                        ))
                    ) : (
                        <p className="text-center text-gray-400 text-sm font-light italic py-12">No news articles yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

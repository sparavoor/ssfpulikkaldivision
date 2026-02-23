"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Search, Edit2, Trash2, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

export default function NewsManagement() {
    const [news, setNews] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchNews = async () => {
        try {
            const res = await fetch("/api/news");
            const data = await res.json();
            setNews(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this news item?")) return;
        try {
            const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
            if (res.ok) {
                setNews(news.filter((item) => item.id !== id));
            }
        } catch (error) {
            alert("Failed to delete");
        }
    };

    const filteredNews = news.filter((item) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-10">
            <div className="border-b border-gray-100 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Content</p>
                    <h1 className="text-4xl font-display font-medium text-black tracking-tight">News Articles</h1>
                </div>
                <Link href="/admin/news/new" className="inline-flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors">
                    <Plus size={16} /> Add New Article
                </Link>
            </div>

            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-gray-100 flex items-center">
                    <div className="relative flex-1 max-w-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-300">
                            <Search size={16} />
                        </div>
                        <input
                            type="text"
                            className="w-full bg-gray-50 border border-gray-100 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-black transition-colors placeholder:text-gray-300"
                            placeholder="Search articles..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-gray-100 text-gray-400 text-[10px] uppercase tracking-[0.15em] font-bold">
                                <th className="px-6 py-4">Article</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center">
                                        <div className="flex items-center justify-center space-x-1.5">
                                            <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                                            <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-75"></div>
                                            <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-150"></div>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredNews.length > 0 ? (
                                filteredNews.map((item) => (
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-6 py-5">
                                            <div className="flex items-center space-x-4">
                                                <img src={item.image} className="w-12 h-12 rounded-lg object-cover bg-gray-100" alt="" />
                                                <div>
                                                    <p className="font-medium text-black text-sm group-hover:text-primary transition-colors">{item.title}</p>
                                                    <p className="text-xs text-gray-400 mt-0.5">/{item.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-5">
                                            {item.isFeatured ? (
                                                <span className="bg-amber-50 text-amber-600 border border-amber-100 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    Featured
                                                </span>
                                            ) : (
                                                <span className="bg-gray-50 text-gray-400 border border-gray-100 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                                                    Normal
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-5">
                                            <p className="text-sm text-gray-400">{new Date(item.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                                        </td>
                                        <td className="px-6 py-5">
                                            <div className="flex items-center justify-end space-x-1">
                                                <Link
                                                    href={`/news/${item.slug}`}
                                                    target="_blank"
                                                    className="p-2 text-gray-300 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                                                >
                                                    <ExternalLink size={16} />
                                                </Link>
                                                <Link
                                                    href={`/admin/news/${item.id}`}
                                                    className="p-2 text-gray-300 hover:text-black transition-colors rounded-lg hover:bg-gray-100"
                                                >
                                                    <Edit2 size={16} />
                                                </Link>
                                                <button
                                                    key={`delete-${item.id}`}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDelete(item.id);
                                                    }}
                                                    className="p-2 text-gray-300 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-16 text-center text-gray-400 text-sm font-light italic">
                                        No news articles found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

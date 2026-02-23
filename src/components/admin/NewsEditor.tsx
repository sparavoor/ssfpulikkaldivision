"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Upload, Loader2, X } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";
import "react-quill/dist/quill.snow.css";
import React from "react";
import ReactDOM from "react-dom";

if (typeof window !== "undefined") {
    // @ts-ignore
    window.ReactDOM = ReactDOM;
    // @ts-ignore
    if (!ReactDOM.findDOMNode) {
        // @ts-ignore
        ReactDOM.findDOMNode = (instance) => {
            if (!instance) return null;
            if (instance instanceof HTMLElement) return instance;
            // @ts-ignore
            return instance.getEditor?.()?.root || null;
        };
    }
}

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false,
    loading: () => <div className="h-40 bg-gray-50 animate-pulse rounded-lg flex items-center justify-center text-gray-300 text-sm">Loading Editor...</div>
});

interface NewsEditorProps {
    initialData?: any;
    isEditing?: boolean;
}

export default function NewsEditor({ initialData, isEditing }: NewsEditorProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || "",
        shortDescription: initialData?.shortDescription || "",
        content: initialData?.content || "",
        image: initialData?.image || "",
        isFeatured: initialData?.isFeatured || false,
    });

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const data = new FormData();
        data.append("file", file);
        try {
            const res = await fetch("/api/upload", { method: "POST", body: data });
            const result = await res.json();
            if (result.url) setFormData({ ...formData, image: result.url });
        } catch { alert("Upload failed"); }
        finally { setUploading(false); }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const url = isEditing ? `/api/news/${initialData.id}` : "/api/news";
        const method = isEditing ? "PUT" : "POST";
        try {
            const res = await fetch(url, {
                method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (res.ok) { router.push("/admin/news"); router.refresh(); }
            else alert("Failed to save news");
        } catch { alert("Error saving news"); }
        finally { setLoading(false); }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b border-gray-100 pb-8 flex items-center gap-4">
                <Link href="/admin/news" className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-black">
                    <ArrowLeft size={18} />
                </Link>
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-1">
                        {isEditing ? "Edit Article" : "New Article"}
                    </p>
                    <h1 className="text-4xl font-display font-medium text-black tracking-tight">
                        {isEditing ? "Edit Article" : "Create Article"}
                    </h1>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border border-gray-100 rounded-xl p-8 space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Title</label>
                            <input
                                type="text"
                                className="w-full border border-gray-100 rounded-lg px-4 py-3 text-black text-lg font-medium placeholder:text-gray-200 focus:outline-none focus:border-black transition-colors"
                                placeholder="Article title..."
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Short Description</label>
                            <textarea
                                className="w-full border border-gray-100 rounded-lg px-4 py-3 text-black text-sm placeholder:text-gray-200 focus:outline-none focus:border-black transition-colors resize-none h-24"
                                placeholder="Brief summary shown on the cards..."
                                value={formData.shortDescription}
                                onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Content</label>
                            <div className="min-h-[400px] border border-gray-100 rounded-lg overflow-hidden">
                                <ReactQuill
                                    theme="snow"
                                    value={formData.content}
                                    onChange={(val) => setFormData({ ...formData, content: val })}
                                    className="h-96"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Image */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Featured Image</p>
                        <div className={cn(
                            "relative aspect-video rounded-lg overflow-hidden border flex flex-col items-center justify-center transition-all",
                            formData.image ? "border-transparent" : "border-dashed border-gray-200 bg-gray-50"
                        )}>
                            {formData.image ? (
                                <>
                                    <img src={formData.image} className="w-full h-full object-cover" alt="" />
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: "" })}
                                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg hover:bg-black transition-colors"
                                    >
                                        <X size={14} />
                                    </button>
                                </>
                            ) : (
                                <div className="text-center p-6">
                                    {uploading
                                        ? <Loader2 className="w-8 h-8 text-gray-300 animate-spin mx-auto mb-2" />
                                        : <Upload className="w-8 h-8 text-gray-200 mx-auto mb-2" />
                                    }
                                    <p className="text-xs text-gray-300">{uploading ? "Uploading..." : "Click to upload"}</p>
                                    <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} accept="image/*" />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Options */}
                    <div className="bg-white border border-gray-100 rounded-xl p-6 space-y-4">
                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">Options</p>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                className="w-4 h-4 rounded border-gray-300 text-black focus:ring-black cursor-pointer"
                                checked={formData.isFeatured}
                                onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            />
                            <span className="text-sm text-gray-600">Mark as Featured</span>
                        </label>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                            {isEditing ? "Update Article" : "Publish Article"}
                        </button>
                        <Link href="/admin/news" className="block text-center py-3 text-sm text-gray-400 hover:text-black transition-colors">
                            Cancel
                        </Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

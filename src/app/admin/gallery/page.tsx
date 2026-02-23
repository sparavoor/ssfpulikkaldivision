"use client";

import { useState, useEffect } from "react";
import { Upload, Trash2, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GalleryManagement() {
    const [images, setImages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [title, setTitle] = useState("");

    const fetchGallery = async () => {
        try {
            const res = await fetch("/api/gallery");
            const data = await res.json();
            setImages(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchGallery(); }, []);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);
        try {
            const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
            const uploadData = await uploadRes.json();
            if (uploadData.url) {
                const saveRes = await fetch("/api/gallery", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ image: uploadData.url, title: title || "" }),
                });
                if (saveRes.ok) { setTitle(""); fetchGallery(); }
            }
        } catch { alert("Upload failed"); }
        finally { setUploading(false); }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this image?")) return;
        try {
            const res = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
            if (res.ok) setImages(images.filter((img) => img.id !== id));
        } catch { alert("Failed to delete"); }
    };

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b border-gray-100 pb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Media</p>
                <h1 className="text-4xl font-display font-medium text-black tracking-tight">Gallery</h1>
            </div>

            {/* Upload panel */}
            <div className="bg-white border border-gray-100 rounded-xl p-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-6">Upload New Photo</p>
                <div className="flex flex-col md:flex-row gap-4">
                    <input
                        type="text"
                        className="flex-1 border border-gray-100 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                        placeholder="Image title or description (optional)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className={cn(
                        "relative md:w-52 h-12 bg-black text-white rounded-lg flex items-center justify-center text-sm font-medium cursor-pointer hover:bg-gray-900 transition-colors",
                        uploading && "opacity-50 pointer-events-none"
                    )}>
                        {uploading ? <Loader2 size={16} className="animate-spin mr-2" /> : <Upload size={16} className="mr-2" />}
                        {uploading ? "Uploading..." : "Select & Upload"}
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleUpload} accept="image/*" />
                    </div>
                </div>
            </div>

            {/* Grid */}
            {loading ? (
                <div className="py-20 flex items-center justify-center space-x-1.5">
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-150"></div>
                </div>
            ) : images.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {images.map((img) => (
                        <div key={img.id} className="group relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                            <img src={img.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="" />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                                {img.title && <p className="text-white text-xs font-medium text-center mb-3 px-3 line-clamp-2">{img.title}</p>}
                                <button
                                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete(img.id); }}
                                    className="bg-white text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-24 border border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center text-center">
                    <ImageIcon className="w-10 h-10 text-gray-200 mb-4" />
                    <p className="text-gray-400 text-sm font-light italic">Your gallery is empty.</p>
                </div>
            )}
        </div>
    );
}

"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { X, Maximize2 } from "lucide-react";

interface GalleryItem {
    id: string;
    image: string;
    title: string | null;
}

interface GallerySectionProps {
    images: GalleryItem[];
}

export function GallerySection({ images }: GallerySectionProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <section id="gallery" className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="mb-20">
                    <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 font-sans">Visual Discovery</h2>
                    <h3 className="text-5xl md:text-7xl font-display font-medium text-black">Gallery</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <motion.div
                                key={img.id}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="relative aspect-square cursor-pointer overflow-hidden bg-gray-100 group"
                                onClick={() => setSelectedImage(img.image)}
                            >
                                <img
                                    src={img.image}
                                    alt={img.title || "Gallery Image"}
                                    className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </motion.div>
                        ))
                    ) : (
                        <div className="col-span-full text-left py-10 text-gray-400 font-light italic">
                            No images in gallery.
                        </div>
                    )}
                </div>
            </div>

            {/* Lightbox */}
            {selectedImage && (
                <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10 transition-all">
                    <button
                        className="absolute top-6 right-6 text-white hover:text-primary transition-colors p-2"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X size={40} />
                    </button>
                    <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        src={selectedImage}
                        className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                        alt="Expanded gallery image"
                    />
                </div>
            )}
        </section>
    );
}

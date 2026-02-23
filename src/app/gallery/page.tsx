import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { GallerySection } from "@/components/GallerySection";
import { formatSSF } from "@/lib/ssf-formatter";

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
    const gallery = await prisma.gallery.findMany({
        orderBy: { createdAt: "desc" },
    });
    const footer = await prisma.footer.findUnique({ where: { id: "footer-content" } });
    const navbar = await prisma.navbar.findUnique({ where: { id: "navbar-settings" } });
    const contact = await prisma.contact.findUnique({ where: { id: "contact-info" } });

    return (
        <main className="min-h-screen">
            <Navbar data={navbar as any} />

            {/* Header Section */}
            <div className="pt-40 pb-20 bg-black text-white">
                <div className="container mx-auto px-6 md:px-12">
                    <span className="inline-block tracking-[0.2em] text-[10px] font-bold text-white/40 uppercase mb-8">Visual Discovery</span>
                    <h1 className="text-6xl md:text-8xl font-display font-medium tracking-tight">Gallery</h1>
                </div>
            </div>

            <div className="pb-24">
                <GallerySection images={gallery} />
            </div>

            {footer && <Footer data={footer} contact={contact ?? undefined} />}
        </main>
    );
}

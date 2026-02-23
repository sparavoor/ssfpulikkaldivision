import prisma from "@/lib/prisma";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { NewsSection } from "@/components/NewsSection";
import { Footer } from "@/components/Footer";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const hero = await prisma.hero.findUnique({ where: { id: "hero-section" } });
  const news = await prisma.news.findMany({
    orderBy: { createdAt: "desc" },
    take: 3,
  });

  const contact = await prisma.contact.findUnique({ where: { id: "contact-info" } });
  const footer = await prisma.footer.findUnique({ where: { id: "footer-content" } });
  const navbar = await prisma.navbar.findUnique({ where: { id: "navbar-settings" } });

  if (!hero || !contact || !footer || !navbar) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500 italic">Initializing content. Please run the seed command.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar data={navbar} />
      <Hero data={hero} />
      <AboutSection />
      <div className="container mx-auto px-6 md:px-12">
        <hr className="border-gray-100" />
      </div>
      <NewsSection news={news} />
      <Footer data={footer} contact={contact} />
    </main>
  );
}

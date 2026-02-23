"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { formatSSF } from "@/lib/ssf-formatter";

interface HeroProps {
    data: {
        bannerImage: string;
        title: string;
        subtitle: string;
        btn1Text: string;
        btn1Link: string;
        btn2Text: string;
        btn2Link: string;
    };
}

export function Hero({ data }: HeroProps) {
    return (
        <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
            {/* Background Image / Subtle Gradient */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat grayscale-[0.2]"
                style={{ backgroundImage: `url(${data.bannerImage})` }}
            >
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            <div className="container mx-auto px-6 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="max-w-4xl"
                >
                    <span className="inline-block tracking-[0.2em] text-[10px] font-bold text-white/60 uppercase mb-8">
                        Established 1973
                    </span>
                    <h1 className="text-6xl md:text-8xl text-white mb-8 leading-[1.1] font-display font-medium tracking-tight">
                        {formatSSF(data.title)}
                    </h1>
                    <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl font-light leading-relaxed">
                        {formatSSF(data.subtitle)}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                        <Link href={data.btn1Link} className="btn-primary w-full sm:w-auto">
                            {data.btn1Text}
                        </Link>
                        <Link href={data.btn2Link} className="btn-secondary w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white hover:text-black">
                            {data.btn2Text}
                        </Link>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

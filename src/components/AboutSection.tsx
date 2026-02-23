"use client";

import { motion } from "framer-motion";
import { formatSSF } from "@/lib/ssf-formatter";

export function AboutSection() {
    return (
        <section className="py-32 bg-white">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    <div className="lg:col-span-4">
                        <h2 className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400 mb-6 font-sans">Our History</h2>
                        <h3 className="text-5xl md:text-6xl font-display font-medium text-black leading-tight">About {formatSSF("SSF")}</h3>
                    </div>
                    <div className="lg:col-span-8 lg:pt-14">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
                                {formatSSF("SSF began its journey in 1970’s, amidst the rising political brawl among the youth in campus and forceful heresy from foreign segments. It rose to uphold the spiritual and cultural values of society.")}
                            </p>
                            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                                {formatSSF("It takes inspiration from the fact that, the true beautiful ways of islamic values will only be promoted if pious ways of Ulemas are disseminated among the students and professionals of the time. It came into official existence as Sunni Students Federation on April 23rd, 1973 under the aegis of Samastha Kerala Jamiyyathul Ulema.")}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

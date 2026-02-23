"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

interface NavbarData {
    logoText: string;
    links: string; // JSON
    loginText: string;
    loginLink: string;
}

export function Navbar({ data }: { data?: NavbarData }) {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navItems = data ? JSON.parse(data.links) : [
        { name: "Home", href: "/" },
        { name: "News", href: "/#news" },
        { name: "Gallery", href: "/gallery" },
        { name: "Contact", href: "/#contact" },
    ];

    const logoText = data?.logoText || "Pulikkal";
    const loginText = data?.loginText || "Login";
    const loginLink = data?.loginLink || "/admin";

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled ? "bg-white/95 backdrop-blur-sm border-b border-gray-100 py-3" : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group">
                    <span className={cn("font-display text-xl tracking-tight transition-colors", scrolled ? "text-primary" : "text-white")}>
                        <span className="ssf-font font-black">SSF</span> <span className="font-light">{logoText}</span>
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-10">
                    {navItems.map((item: any) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors",
                                scrolled ? "text-gray-500 hover:text-black" : "text-white/80 hover:text-white"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <Link
                        href={loginLink}
                        className={cn(
                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                            scrolled
                                ? "bg-black text-white hover:bg-gray-800"
                                : "bg-white text-black hover:bg-gray-100"
                        )}
                    >
                        {loginText}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className={cn("md:hidden p-2 transition-colors", scrolled ? "text-black" : "text-white")}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={cn(
                    "fixed inset-0 bg-white z-[60] flex flex-col items-start justify-start pt-32 px-10 space-y-8 transition-all duration-500 md:hidden",
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
                )}
            >
                <button
                    className="absolute top-6 right-6 text-black p-2"
                    onClick={() => setIsOpen(false)}
                >
                    <X size={24} />
                </button>
                {navItems.map((item: any) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        className="text-4xl font-display font-medium text-black hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                    >
                        {item.name}
                    </Link>
                ))}
                <Link
                    href={loginLink}
                    className="w-full bg-black text-white py-4 rounded-full text-center text-lg font-medium"
                    onClick={() => setIsOpen(false)}
                >
                    {loginText}
                </Link>
            </div>
        </nav>
    );
}

"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signIn("credentials", {
            username,
            password,
            redirect: false,
        });

        if (res?.error) {
            setError("Invalid username or password");
            setLoading(false);
        } else {
            router.push("/admin/dashboard");
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen bg-white flex">
            {/* Left panel — branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-black flex-col justify-between p-16">
                <div>
                    <span className="font-display text-2xl text-white tracking-tight">
                        <span className="ssf-font font-black">SSF</span> <span className="font-light">Pulikkal</span>
                    </span>
                </div>
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6">Admin Panel</p>
                    <h2 className="text-5xl font-display font-medium text-white leading-tight">
                        Manage your<br />website content.
                    </h2>
                </div>
                <p className="text-white/20 text-xs">© 2026 SSF Pulikkal Division</p>
            </div>

            {/* Right panel — form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-sm">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-8">Sign In</p>
                    <h1 className="text-4xl font-display font-medium text-black mb-12 tracking-tight">Welcome back</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Username</label>
                            <input
                                type="text"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                                placeholder="admin"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Password</label>
                            <input
                                type="password"
                                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-black text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : "Sign In"}
                        </button>
                    </form>

                    <p className="mt-10 text-xs text-gray-300 text-center">
                        <a href="/" className="hover:text-black transition-colors">← Return to website</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const inputClass = "w-full border border-gray-100 rounded-lg px-4 py-3 text-sm text-black placeholder:text-gray-300 focus:outline-none focus:border-black transition-colors";
const labelClass = "text-xs font-bold uppercase tracking-widest text-gray-400 block mb-2";
const textareaClass = `${inputClass} resize-none`;

function SaveButton({ saving, label }: { saving: boolean; label: string }) {
    return (
        <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-900 transition-colors disabled:opacity-50"
        >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {label}
        </button>
    );
}

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState("hero");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<any>(null);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => { setSettings(data); setLoading(false); });
    }, []);

    const handleUpdate = async (type: string, data: any) => {
        setSaving(true);
        try {
            const res = await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type, data }),
            });
            if (res.ok) alert("Saved successfully!");
            else { const err = await res.json(); alert(`Failed: ${err.error || res.statusText}`); }
        } catch { alert("Failed to update"); }
        finally { setSaving(false); }
    };

    const tabs = [
        { id: "hero", label: "Hero" },
        { id: "contact", label: "Contact" },
        { id: "footer", label: "Footer" },
        { id: "navbar", label: "Navbar" },
    ];

    if (loading) return (
        <div className="flex items-center justify-center h-64 space-x-1.5">
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-75"></div>
            <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-150"></div>
        </div>
    );

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="border-b border-gray-100 pb-8">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400 mb-3">Configuration</p>
                <h1 className="text-4xl font-display font-medium text-black tracking-tight">Section Editor</h1>
            </div>

            {/* Tabs */}
            <div className="flex space-x-1 border-b border-gray-100">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "px-5 py-3 text-sm font-medium border-b-2 transition-colors -mb-px",
                            activeTab === tab.id
                                ? "border-black text-black"
                                : "border-transparent text-gray-400 hover:text-black"
                        )}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Panel */}
            <div className="bg-white border border-gray-100 rounded-xl p-8">

                {/* Hero */}
                {activeTab === "hero" && (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate("hero", settings.hero); }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-6">
                                <div>
                                    <label className={labelClass}>Banner Title</label>
                                    <input type="text" className={inputClass} value={settings.hero.title}
                                        onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, title: e.target.value } })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Subtitle</label>
                                    <textarea className={textareaClass} rows={4} value={settings.hero.subtitle}
                                        onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, subtitle: e.target.value } })} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Banner Image URL</label>
                                    <input type="text" className={inputClass} value={settings.hero.bannerImage}
                                        onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, bannerImage: e.target.value } })} />
                                </div>
                                <div className="aspect-video rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
                                    {settings.hero.bannerImage
                                        ? <img src={settings.hero.bannerImage} className="w-full h-full object-cover" alt="" />
                                        : <ImageIcon className="text-gray-200 w-10 h-10" />
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8 border-t border-gray-50">
                            <div>
                                <p className={labelClass}>Button 1 (Primary)</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Text</label>
                                        <input type="text" className={inputClass} value={settings.hero.btn1Text}
                                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, btn1Text: e.target.value } })} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Link</label>
                                        <input type="text" className={inputClass} value={settings.hero.btn1Link}
                                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, btn1Link: e.target.value } })} />
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className={labelClass}>Button 2 (Secondary)</p>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className={labelClass}>Text</label>
                                        <input type="text" className={inputClass} value={settings.hero.btn2Text}
                                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, btn2Text: e.target.value } })} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Link</label>
                                        <input type="text" className={inputClass} value={settings.hero.btn2Link}
                                            onChange={(e) => setSettings({ ...settings, hero: { ...settings.hero, btn2Link: e.target.value } })} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-50">
                            <SaveButton saving={saving} label="Save Hero" />
                        </div>
                    </form>
                )}

                {/* Contact */}
                {activeTab === "contact" && (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate("contact", settings.contact); }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div>
                                    <label className={labelClass}>Address</label>
                                    <textarea className={textareaClass} rows={4} value={settings.contact.address}
                                        onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, address: e.target.value } })} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className={labelClass}>Phone</label>
                                        <input type="text" className={inputClass} value={settings.contact.phone}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, phone: e.target.value } })} />
                                    </div>
                                    <div>
                                        <label className={labelClass}>Email</label>
                                        <input type="email" className={inputClass} value={settings.contact.email}
                                            onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, email: e.target.value } })} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Maps Embed URL</label>
                                    <input type="text" className={inputClass} value={settings.contact.mapEmbed}
                                        onChange={(e) => setSettings({ ...settings, contact: { ...settings.contact, mapEmbed: e.target.value } })} />
                                    <p className="text-xs text-gray-300 mt-2">Paste the 'src' value from Google Maps iframe embed code.</p>
                                </div>
                                {settings.contact.mapEmbed && (
                                    <div className="aspect-video rounded-lg overflow-hidden border border-gray-100">
                                        <iframe src={settings.contact.mapEmbed} className="w-full h-full border-0" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <SaveButton saving={saving} label="Save Contact" />
                        </div>
                    </form>
                )}

                {/* Footer */}
                {activeTab === "footer" && (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate("footer", settings.footer); }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div>
                                    <label className={labelClass}>About Text (Footer)</label>
                                    <textarea className={textareaClass} rows={4} value={settings.footer.aboutText}
                                        onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, aboutText: e.target.value } })} />
                                </div>
                                <div>
                                    <label className={labelClass}>Copyright Text</label>
                                    <input type="text" className={inputClass} value={settings.footer.copyright}
                                        onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, copyright: e.target.value } })} />
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Social Links (JSON)</label>
                                <textarea className={cn(textareaClass, "font-mono text-xs")} rows={10} value={settings.footer.socialLinks}
                                    onChange={(e) => setSettings({ ...settings, footer: { ...settings.footer, socialLinks: e.target.value } })} />
                                <p className="text-xs text-gray-300 mt-2">{"Example: {\"facebook\": \"url\", \"instagram\": \"url\"}"}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <SaveButton saving={saving} label="Save Footer" />
                        </div>
                    </form>
                )}

                {/* Navbar */}
                {activeTab === "navbar" && (
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate("navbar", settings.navbar); }} className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-5">
                                <div>
                                    <label className={labelClass}>Logo Text (After SSF)</label>
                                    <input type="text" className={inputClass} value={settings.navbar.logoText}
                                        onChange={(e) => setSettings({ ...settings, navbar: { ...settings.navbar, logoText: e.target.value } })} />
                                </div>
                                <div>
                                    <p className={labelClass}>CTA Button</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className={labelClass}>Text</label>
                                            <input type="text" className={inputClass} value={settings.navbar.loginText}
                                                onChange={(e) => setSettings({ ...settings, navbar: { ...settings.navbar, loginText: e.target.value } })} />
                                        </div>
                                        <div>
                                            <label className={labelClass}>Link</label>
                                            <input type="text" className={inputClass} value={settings.navbar.loginLink}
                                                onChange={(e) => setSettings({ ...settings, navbar: { ...settings.navbar, loginLink: e.target.value } })} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className={labelClass}>Navigation Links (JSON)</label>
                                <textarea className={cn(textareaClass, "font-mono text-xs")} rows={10} value={settings.navbar.links}
                                    onChange={(e) => setSettings({ ...settings, navbar: { ...settings.navbar, links: e.target.value } })} />
                                <p className="text-xs text-gray-300 mt-2">{'Example: [{"name": "Home", "href": "/"}]'}</p>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-gray-50">
                            <SaveButton saving={saving} label="Save Navbar" />
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

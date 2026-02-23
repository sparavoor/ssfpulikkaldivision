import React from "react";

export function formatSSF(text: string) {
    if (!text) return text;

    const parts = text.split(/(SSF)/g);
    return parts.map((part, i) =>
        part === "SSF" ? <span key={i} className="ssf-font">SSF</span> : part
    );
}

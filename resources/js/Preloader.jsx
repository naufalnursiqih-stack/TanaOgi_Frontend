import React, { useState, useEffect } from 'react';

export default function Preloader({ active }) {
    const titles = ["ᨈᨊ ᨕᨚᨁᨗ", "TanaOgi'"];
    const [titleIndex, setTitleIndex] = useState(0);
    const [fadeOutText, setFadeOutText] = useState(false);
    const [shouldRender, setShouldRender] = useState(active);
    const [fadeOverlay, setFadeOverlay] = useState(false);

    // Rotation interval for Lontara/Latin scripts
    useEffect(() => {
        if (!active) return;
        const interval = setInterval(() => {
            setFadeOutText(true);
            setTimeout(() => {
                setTitleIndex((prev) => (prev + 1) % titles.length);
                setFadeOutText(false);
            }, 400); // duration of blur transition
        }, 1800);

        return () => clearInterval(interval);
    }, [active]);

    // Handle overlay fade-out and unmounting
    useEffect(() => {
        let timer;
        if (active) {
            setShouldRender(true);
            setFadeOverlay(false);
        } else {
            setFadeOverlay(true);
            timer = setTimeout(() => {
                setShouldRender(false);
            }, 800); // Sesuai dengan transisi CSS 0.8s
        }

        // Fungsi cleanup harus berada di luar IF-ELSE agar di-return dengan benar oleh useEffect
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [active]);
    if (!shouldRender) return null;

    return (
        <div id="preloader-overlay" className={fadeOverlay ? 'preloader-fade-out' : ''}>
            <div className="loader-center-wrapper">
                <div className="logo-organic-wrapper">
                    <svg className="paper-plane" viewBox="0 0 24 24">
                        <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" />
                    </svg>
                    <img src="/logo TanaOgi.png" alt="Logo Tana Ogi" className="logo-center" />
                </div>
                <div className={`loading-title ${fadeOutText ? 'text-fade-out' : ''}`}>
                    {titles[titleIndex]}
                </div>
            </div>
        </div>
    );
}

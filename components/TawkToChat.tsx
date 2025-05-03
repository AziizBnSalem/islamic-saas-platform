'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        Tawk_API?: any;
        Tawk_LoadStart?: Date;
    }
}

export default function TawkToChat() {
    useEffect(() => {
        var Tawk_API = window.Tawk_API || {};
        var Tawk_LoadStart = new Date();

        const script = document.createElement("script");
        script.async = true;
        script.src = 'https://embed.tawk.to/681576f2be6663190a6c79fe/1iq9th9gp';
        script.charset = 'UTF-8';
        script.setAttribute('crossorigin', '*');
        
        const firstScript = document.getElementsByTagName("script")[0];
        firstScript.parentNode?.insertBefore(script, firstScript);

        return () => {
            // Cleanup on unmount
            const tawkScript = document.querySelector('script[src*="tawk.to"]');
            if (tawkScript) {
                tawkScript.remove();
            }
            // Clean up the global variables
            delete window.Tawk_API;
            delete window.Tawk_LoadStart;
        };
    }, []);

    return null;
}
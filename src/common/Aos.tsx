// components/AOSInitializer.jsx
"use client";

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the AOS CSS

export default function AOSInitializer() {
    useEffect(() => {
        AOS.init({
            // Optional global settings
            duration: 800,
            once: false, // Animation happens every time you scroll to the element
            // ... other settings (offset, easing, delay, etc.)
        });

        // Optional: refresh AOS on component unmount or specific DOM changes
        // return () => {
        //   AOS.refreshHard();
        // };
    }, []);

    return <></>; // This component doesn't render anything itself
}

'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

export const certifications = [
    { id: 15, src: '/certifications/certificate-1.jpg', title: 'Certification 1' },
    { id: 16, src: '/certifications/c2-udacity.jpg', title: 'Certification 2' },
    { id: 3, src: '/certifications/certifi1(2).jpg', title: 'Certification 3' },
    { id: 2, src: '/certifications/certifi1-(1).png', title: 'Certification 2' },
    { id: 5, src: '/certifications/certifi13(3).jpg', title: 'Certification 5' },
    { id: 7, src: '/certifications/certifi14(4).jpg', title: 'Certification 7' },
    { id: 4, src: '/certifications/certifi1-2(2).png', title: 'Certification 4' },
    { id: 6, src: '/certifications/certifi14(3).png', title: 'Certification 6' },
    { id: 1, src: '/certifications/certifi1(1).jpg', title: 'Certification 1' },
    { id: 8, src: '/certifications/certifi15(4).png', title: 'Certification 8' },
    { id: 9, src: '/certifications/certifi15(5).png', title: 'Certification 9' },
    { id: 10, src: '/certifications/certifi16(6).png', title: 'Certification 10' },
    { id: 11, src: '/certifications/certifi18(7).png', title: 'Certification 11' },
    { id: 12, src: '/certifications/certifi19(8).png', title: 'Certification 12' },
    { id: 13, src: '/certifications/certifi110(9).png', title: 'Certification 13' },
    { id: 14, src: '/certifications/certifi1111(10).png', title: 'Certification 14' },
];

interface LightboxProps {
    cert: typeof certifications[number];
    onClose: () => void;
}

const Lightbox = ({ cert, onClose }: LightboxProps) => {
    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.88)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2"
                aria-label="Close"
            >
                <X size={24} />
            </button>

            <div
                className="relative w-full max-w-4xl max-h-[88vh] rounded-2xl overflow-hidden shadow-2xl"
                onClick={e => e.stopPropagation()}
            >
                <Image
                    src={cert.src}
                    alt={cert.title}
                    width={1200}
                    height={900}
                    className="w-full h-auto object-contain"
                    priority
                />
            </div>
        </div>
    );
};

interface CertCardProps {
    cert: typeof certifications[number];
    onOpen: (cert: typeof certifications[number]) => void;
}

const CertCard = ({ cert, onOpen }: CertCardProps) => {
    return (
        <div
            onClick={() => onOpen(cert)}
            className="relative rounded-xl overflow-hidden aspect-[4/3] bg-brand-secondary group cursor-zoom-in"
        >
            <Image
                src={cert.src}
                alt={cert.title}
                fill
                className="w-full object-cover"
            />

            <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30">
                <span className="text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 bg-black/50 px-3 py-1.5 rounded-full">
                    View full size
                </span>
            </div>
        </div>
    );
};

const Certifications = () => {
    const [lightboxCert, setLightboxCert] = useState<typeof certifications[number] | null>(null);

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    My{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                        Certifications
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                {certifications.map((cert) => (
                    <CertCard
                        key={cert.id}
                        cert={cert}
                        onOpen={setLightboxCert}
                    />
                ))}
            </div>

            {lightboxCert && (
                <Lightbox
                    cert={lightboxCert}
                    onClose={() => setLightboxCert(null)}
                />
            )}
        </section>
    );
};

export default Certifications;

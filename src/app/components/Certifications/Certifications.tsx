'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────
export const certifications = [
    { id: 1, src: '/certifications/certifi1(1).jpg', title: 'Certification 1' },
    { id: 2, src: '/certifications/certifi1-(1).png', title: 'Certification 2' },
    { id: 3, src: '/certifications/certifi1(2).jpg', title: 'Certification 3' },
    { id: 4, src: '/certifications/certifi1-2(2).png', title: 'Certification 4' },
    { id: 5, src: '/certifications/certifi13(3).jpg', title: 'Certification 5' },
    { id: 6, src: '/certifications/certifi14(3).png', title: 'Certification 6' },
    { id: 7, src: '/certifications/certifi14(4).jpg', title: 'Certification 7' },
    { id: 8, src: '/certifications/certifi15(4).png', title: 'Certification 8' },
    { id: 9, src: '/certifications/certifi15(5).png', title: 'Certification 9' },
    { id: 10, src: '/certifications/certifi16(6).png', title: 'Certification 10' },
    { id: 11, src: '/certifications/certifi18(7).png', title: 'Certification 11' },
    { id: 12, src: '/certifications/certifi19(8).png', title: 'Certification 12' },
    { id: 13, src: '/certifications/certifi110(9).png', title: 'Certification 13' },
    { id: 14, src: '/certifications/certifi1111(10).png', title: 'Certification 14' },
];

const ORIGINS: Array<'bottom' | 'left' | 'right'> = [
    'bottom', 'left', 'right', 'bottom', 'bottom', 'left',
    'right', 'bottom', 'bottom', 'left', 'right', 'bottom', 'bottom', 'left',
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Particle {
    x: number; y: number;
    vx: number; vy: number;
    life: number;
    size: number;
    type: 'fire' | 'smoke';
    colorPhase: number;
}

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
    cert: typeof certifications[number];
    onClose: () => void;
}

const Lightbox = ({ cert, onClose }: LightboxProps) => {
    // Close on Escape
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
            {/* Close button */}
            <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full p-2 transition-all duration-200 hover:scale-110"
                aria-label="Close"
            >
                <X size={24} />
            </button>

            {/* Image — stop click propagation so clicking the image doesn't close */}
            <div
                className="relative w-full max-w-4xl max-h-[88vh] rounded-2xl overflow-hidden shadow-2xl"
                style={{ animation: 'lbPop 0.35s cubic-bezier(.34,1.56,.64,1) forwards' }}
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
                <div
                    className="absolute bottom-0 left-0 right-0 px-5 py-3 text-sm font-bold text-white"
                    style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
                >
                    {cert.title}
                </div>
            </div>
        </div>
    );
};

// ─── CertCard ─────────────────────────────────────────────────────────────────
interface CertCardProps {
    cert: typeof certifications[number];
    index: number;
    saved: boolean;
    onOpen: (cert: typeof certifications[number]) => void;
}

const CertCard = ({ cert, index, saved, onOpen }: CertCardProps) => {
    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pRef = useRef<Particle[]>([]);
    const rafRef = useRef<number>(0);
    const tRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const drawRef = useRef<() => void>(() => { });

    const side = ORIGINS[index % ORIGINS.length];

    // ── Spawn ──────────────────────────────────────────────────────────────
    const spawn = useCallback(() => {
        const c = canvasRef.current;
        if (!c) return;
        const W = c.width, H = c.height;

        const getPos = (): [number, number] => {
            if (side === 'bottom') return [W * 0.1 + Math.random() * W * 0.8, H - 2];
            if (side === 'left') return [2, H * 0.25 + Math.random() * H * 0.7];
            return [W - 2, H * 0.25 + Math.random() * H * 0.7];
        };

        const windX = side === 'left' ? 0.25 : side === 'right' ? -0.25 : 0;
        const [fx, fy] = getPos();

        pRef.current.push({
            x: fx + (Math.random() - 0.5) * 12,
            y: fy,
            vx: windX + (Math.random() - 0.5) * 0.35,
            vy: -(0.25 + Math.random() * 0.55),
            life: 1,
            size: 10 + Math.random() * 22,
            type: 'fire',
            colorPhase: Math.random(),
        });

        if (Math.random() < 0.4) {
            const [sx, sy] = getPos();
            const smokeY = side === 'bottom'
                ? sy - 20 - Math.random() * 30
                : sy - 10 - Math.random() * 20;
            pRef.current.push({
                x: sx + (Math.random() - 0.5) * 18,
                y: smokeY,
                vx: (Math.random() - 0.5) * 0.4,
                vy: -(0.12 + Math.random() * 0.22),
                life: 1,
                size: 14 + Math.random() * 28,
                type: 'smoke',
                colorPhase: 0,
            });
        }
    }, [side]);

    // ── Draw (ref pattern — avoids "accessed before declared") ────────────
    useEffect(() => {
        drawRef.current = () => {
            const c = canvasRef.current;
            if (!c) return;
            const ctx = c.getContext('2d');
            if (!ctx) return;
            const W = c.width, H = c.height;

            // ── Only clear/draw inside the burn-edge strip ─────────────────
            // This keeps the rest of the image fully visible underneath.
            // Strip covers ~50% from the burn edge.
            let clipX = 0, clipY = 0, clipW = W, clipH = H;
            if (side === 'bottom') { clipY = H * 0.5; clipH = H * 0.5; }
            else if (side === 'left') { clipX = 0; clipW = W * 0.5; }
            else { clipX = W * 0.5; clipW = W * 0.5; }

            // Soft clear only within the strip — ghost trail for continuous flames
            ctx.clearRect(0, 0, W, H);
            ctx.save();
            ctx.beginPath();
            ctx.rect(clipX, clipY, clipW, clipH);
            ctx.clip();

            ctx.fillStyle = 'rgba(0,0,0,0.15)';
            ctx.fillRect(clipX, clipY, clipW, clipH);

            const fire = pRef.current.filter(p => p.type === 'fire');
            const smoke = pRef.current.filter(p => p.type === 'smoke');

            for (const p of fire) {
                const t = 1 - p.life;
                const alpha = p.life * (1 - t * 0.4);
                const g = Math.round(30 + t * 160 + p.colorPhase * 40);
                ctx.save();
                ctx.globalAlpha = Math.max(0, alpha);
                const rx = Math.max(1, p.size * (0.55 - t * 0.3));
                const ry = Math.max(1, p.size * (0.9 + t * 0.1));
                ctx.beginPath();
                ctx.ellipse(p.x, p.y, rx, ry, 0, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(255,${g},${Math.round(t * 20)})`;
                ctx.fill();
                ctx.restore();
            }

            for (const p of smoke) {
                const t = 1 - p.life;
                const alpha = Math.min(p.life * 1.8, 1) * 0.22 * (1 - t * 0.6);
                const grey = Math.round(20 + t * 30);
                ctx.save();
                ctx.globalAlpha = Math.max(0, alpha);
                const r = Math.max(1, p.size * (0.8 + t * 0.5));
                ctx.beginPath();
                ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
                ctx.fillStyle = `rgb(${grey},${grey},${grey})`;
                ctx.fill();
                ctx.restore();
            }

            // Close the burn-edge clip region
            ctx.restore();

            pRef.current = pRef.current.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                if (p.type === 'fire') {
                    p.vx += (Math.random() - 0.5) * 0.08;
                    p.vx *= 0.97;
                    p.vy += 0.004;
                    p.life -= 0.008 + Math.random() * 0.006;
                } else {
                    p.vx += (Math.random() - 0.5) * 0.06;
                    p.vx *= 0.98;
                    p.life -= 0.005 + Math.random() * 0.004;
                }
                return p.life > 0;
            });

            spawn();
            if (Math.random() < 0.5) spawn();

            rafRef.current = requestAnimationFrame(() => drawRef.current());
        };
    });

    // ── Resize ────────────────────────────────────────────────────────────
    const resize = useCallback(() => {
        const wrap = wrapRef.current;
        const c = canvasRef.current;
        if (!wrap || !c) return;
        c.width = wrap.offsetWidth;
        c.height = wrap.offsetHeight;
    }, []);

    useEffect(() => {
        resize();
        const ro = new ResizeObserver(resize);
        if (wrapRef.current) ro.observe(wrapRef.current);
        return () => ro.disconnect();
    }, [resize]);

    // ── Start / stop RAF ──────────────────────────────────────────────────
    useEffect(() => {
        if (saved) {
            if (tRef.current) clearTimeout(tRef.current);
            cancelAnimationFrame(rafRef.current);
            return;
        }
        tRef.current = setTimeout(() => {
            rafRef.current = requestAnimationFrame(() => drawRef.current());
        }, index * 100);

        return () => {
            if (tRef.current) clearTimeout(tRef.current);
            cancelAnimationFrame(rafRef.current);
        };
    }, [saved, index]);

    return (
        <div
            ref={wrapRef}
            onClick={() => saved && onOpen(cert)}
            className={`relative rounded-xl overflow-hidden aspect-[4/3] bg-brand-secondary group
                ${saved ? 'cursor-zoom-in' : 'cursor-default'}`}
        >
            {/* ✅ Image always visible — fire is overlaid on top, not replacing the image */}
            <Image
                src={cert.src}
                alt={cert.title}
                fill
                className={`w-full transition-all duration-[1500ms] ${saved
                    ? 'brightness-100 saturate-100'
                    // While burning: slight darkening but still clearly visible
                    : 'brightness-[0.72] contrast-[1.05]'
                    }`}
            />

            {/* Scorched gradient — only at the burn edge, max 50% of image */}
            <div
                className="absolute pointer-events-none transition-opacity duration-[1500ms]"
                style={{
                    ...(side === 'bottom' ? { bottom: 0, left: 0, right: 0, height: '50%' } :
                        side === 'left' ? { top: 0, left: 0, bottom: 0, width: '50%' } :
                            { top: 0, right: 0, bottom: 0, width: '50%' }),
                    background: side === 'bottom'
                        ? 'linear-gradient(to top,   rgba(0,0,0,0.85) 0%, rgba(10,3,0,0.5) 50%, transparent 100%)'
                        : side === 'left'
                            ? 'linear-gradient(to right,  rgba(0,0,0,0.85) 0%, rgba(10,3,0,0.5) 50%, transparent 100%)'
                            : 'linear-gradient(to left,   rgba(0,0,0,0.85) 0%, rgba(10,3,0,0.5) 50%, transparent 100%)',
                    opacity: saved ? 0 : 1,
                }}
            />

            {/* Fire + smoke canvas — sits above image and gradient */}
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-[1500ms]"
                style={{ opacity: saved ? 0 : 1 }}
            />

            {/* Hover zoom hint — only shown when saved */}
            {saved && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                    <span className="text-white text-xs font-bold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 px-3 py-1.5 rounded-full">
                        View full size
                    </span>
                </div>
            )}

        </div>
    );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const Certifications = () => {
    const [saved, setSaved] = useState(false);
    const [lightboxCert, setLightboxCert] = useState<typeof certifications[number] | null>(null);

    return (
        <section className="py-12 px-4 max-w-7xl mx-auto">
            {/* Title */}
            <div className="text-center mb-6">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    My{' '}
                    <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                        Certifications
                    </span>
                </h2>
            </div>

            {/* Stop Fire button */}
            {!saved && (
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setSaved(true)}
                        className="bg-blue-600 hover:bg-blue-500 active:scale-95 text-white px-10 py-3 rounded-full font-black uppercase tracking-widest text-sm shadow-[0_0_24px_rgba(37,99,235,0.5)] hover:scale-105 transition-all duration-200 animate-bounce"
                    >
                        Stop Fire
                    </button>
                </div>
            )}

            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4">
                {certifications.map((cert, i) => (
                    <CertCard
                        key={cert.id}
                        cert={cert}
                        index={i}
                        saved={saved}
                        onOpen={setLightboxCert}
                    />
                ))}
            </div>

            {/* Lightbox */}
            {lightboxCert && (
                <Lightbox
                    cert={lightboxCert}
                    onClose={() => setLightboxCert(null)}
                />
            )}

            {/* Lightbox pop animation */}
            <style>{`
                @keyframes lbPop {
                    0%   { transform: scale(0.88); opacity: 0; }
                    100% { transform: scale(1);    opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default Certifications;
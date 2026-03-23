'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';

// ─── Skills Data ──────────────────────────────────────────────────────────────
const skills = [
    { name: 'React', level: 'Expert', src: '/images/React-icon.svg.png', color: '#61dafb', x: 6, y: 8 },
    { name: 'Next.js', level: 'Expert', src: '/images/nextjs-original.png', color: '#ffffff', x: 3, y: 30 },
    { name: 'TypeScript', level: 'Advanced', src: '/images/typescript.png', color: '#3178c6', x: 48, y: 20 },
    { name: 'Tailwind', level: 'Expert', src: '/images/tailwind.png', color: '#38bdf8', x: 1, y: 50 },
    { name: 'Node.js', level: 'Advanced', src: '/images/nodejs.png', color: '#68a063', x: 45, y: 60 },
    { name: 'HTML/CSS', level: 'Expert', src: '/images/icone-html-orange.png', color: '#e34c26', x: 8, y: 80 },
    { name: 'MongoDB', level: 'Mid', src: '/images/mongo.png', color: '#47a248', x: 54, y: 75 },
    { name: 'Git', level: 'Expert', src: '/images/git.png', color: '#f05032', x: 54, y: 40 },
];

// ─── Types ────────────────────────────────────────────────────────────────────
interface Bubble {
    x: number; y: number; r: number;
    vy: number; alpha: number;
    wobble: number; wobbleSpeed: number;
}

// ─── SkillCard ────────────────────────────────────────────────────────────────
interface SkillCardProps {
    skill: typeof skills[number];
    index: number;
    saved: boolean;
}

const SkillCard = ({ skill, index, saved }: SkillCardProps) => {
    const delay = index * 0.3 + 0.5;
    const r1 = `${(index % 2 === 0 ? -1 : 1) * (2 + index % 3)}deg`;
    const r2 = `${(index % 2 === 0 ? 1 : -1) * (1 + index % 4)}deg`;
    const dx = `${(index % 2 === 0 ? 8 : -8) + (index % 3)}px`;
    const dy = `${-5 - (index % 4)}px`;

    return (
        <div
            className="absolute flex items-center gap-3 rounded-xl border px-3 py-3 min-w-[150px] transition-[border-color,box-shadow] duration-500"
            style={{
                left: `${skill.x}%`,
                bottom: `${skill.y}%`,
                background: '#111827',
                borderColor: saved ? `${skill.color}55` : 'rgba(255,255,255,0.1)',
                boxShadow: saved ? `0 0 20px ${skill.color}33` : 'none',
                zIndex: 5,
                animation: saved
                    ? `skillSurface 1.1s cubic-bezier(.34,1.3,.64,1) ${delay}s both`
                    : `skillDrift ${3.5 + (index % 5) * 0.3}s ease-in-out ${(index % 7) * 0.25}s infinite alternate`,
                // CSS custom props for keyframe rotation values
                ['--r1' as string]: r1,
                ['--r2' as string]: r2,
                ['--dx' as string]: dx,
                ['--dy' as string]: dy,
            }}
        >
            {/* ✅ Increased icon container: 44px → matches image size better */}
            <div
                className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{ background: `${skill.color}22` }}
            >
                <Image
                    src={skill.src}
                    alt={skill.name}
                    width={30}
                    height={30}
                    className="object-contain"
                />
            </div>
            <div>
                <div className="text-[13px] font-bold text-white/85 leading-none">{skill.name}</div>
                <div className="text-[10px] text-white/35 mt-0.5">{skill.level}</div>
            </div>
        </div>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const SkillsSection = () => {
    const sceneRef = useRef<HTMLDivElement>(null);
    const waterRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // ✅ Fix 2: all refs initialised with null/0 — no missing initialValue error
    const bubblesRef = useRef<Bubble[]>([]);
    const rafRef = useRef<number>(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const [saved, setSaved] = useState(false);

    // ── Resize canvas ──────────────────────────────────────────────────────
    const resizeCanvas = useCallback(() => {
        const scene = sceneRef.current;
        const canvas = canvasRef.current;
        if (!scene || !canvas) return;
        canvas.width = scene.offsetWidth;
        canvas.height = scene.offsetHeight;
    }, []);

    useEffect(() => {
        resizeCanvas();
        const ro = new ResizeObserver(resizeCanvas);
        if (sceneRef.current) ro.observe(sceneRef.current);
        return () => ro.disconnect();
    }, [resizeCanvas]);

    // ✅ Fix 1: declare runBubbles BEFORE the useEffect that references it.
    // Using useRef to store the function avoids stale-closure issues with RAF.
    const runBubblesRef = useRef<() => void>(() => { });

    // Define the actual bubble tick function and store in ref
    // (defined once, always reads latest bubblesRef / canvasRef / waterRef)
    useEffect(() => {
        runBubblesRef.current = () => {
            const canvas = canvasRef.current;
            const water = waterRef.current;
            if (!canvas || !water) return;

            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            const W = canvas.width;
            const H = canvas.height;
            const waterPct = parseFloat(water.style.height || '85') / 100;
            const waterTop = H * (1 - waterPct);

            ctx.clearRect(0, 0, W, H);

            bubblesRef.current = bubblesRef.current.filter(b => {
                b.y -= b.vy;
                b.wobble += b.wobbleSpeed;
                b.x += Math.sin(b.wobble) * 0.6;

                // remove once above water surface
                if (b.y < waterTop - b.r) return false;

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(100,200,255,${b.alpha})`;
                ctx.lineWidth = 1.2;
                ctx.stroke();

                // inner highlight
                ctx.beginPath();
                ctx.arc(b.x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.25, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(200,240,255,${b.alpha * 0.6})`;
                ctx.fill();

                return true;
            });

            rafRef.current = requestAnimationFrame(runBubblesRef.current);
        };
    });

    // ── Start RAF loop ─────────────────────────────────────────────────────
    useEffect(() => {
        // kick off — runBubblesRef.current is always up to date
        rafRef.current = requestAnimationFrame(() => runBubblesRef.current());
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    // ✅ More bubbles: spawn every 150ms instead of 400ms, spawn 2 at a time
    useEffect(() => {
        if (saved) return;

        intervalRef.current = setInterval(() => {
            const canvas = canvasRef.current;
            const water = waterRef.current;
            if (!canvas || !water) return;

            const W = canvas.width;
            const H = canvas.height;
            const waterPct = parseFloat(water.style.height || '85') / 100;
            const surfaceY = H * (1 - waterPct) + 10;

            // spawn 2–3 bubbles per tick
            const count = 2 + Math.floor(Math.random() * 2);
            for (let i = 0; i < count; i++) {
                bubblesRef.current.push({
                    x: 20 + Math.random() * (W - 40),
                    y: surfaceY + Math.random() * H * waterPct * 0.8,
                    r: 2 + Math.random() * 5,
                    vy: 0.35 + Math.random() * 0.55,
                    alpha: 0.25 + Math.random() * 0.4,
                    wobble: Math.random() * Math.PI * 2,
                    wobbleSpeed: 0.015 + Math.random() * 0.025,
                });
            }
        }, 150);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [saved]);

    // ── Save handler ───────────────────────────────────────────────────────
    const handleSave = useCallback(() => {
        if (saved || !waterRef.current || !overlayRef.current) return;



        // Stop spawning bubbles
        if (intervalRef.current) clearInterval(intervalRef.current);

        // Drain water
        gsap.to(waterRef.current, {
            height: '0%',
            duration: 4,
            ease: 'power1.inOut',
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 3,
            ease: 'power1.out',
        });

        setTimeout(() => setSaved(true), 200);
    }, [saved]);

    return (
        <section className="py-12 px-4 mx-auto">
            {/* Title */}
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    My{' '}
                    <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        Skills
                    </span>
                </h2>
            </div>

            {/* Scene */}
            <div
                ref={sceneRef}
                className="relative w-full rounded-2xl overflow-hidden border border-white/5"
                style={{ height: 480, }}
            >
                <div className="absolute inset-0 rounded-2xl border border-sky-400/10 z-10 pointer-events-none" />

                {/* Water */}
                <div
                    ref={waterRef}
                    className="absolute left-0 right-0 bottom-0 z-[3]"
                    style={{ height: '85%', background: '#0d3a5c' }}
                >
                    {/* Wave surface */}
                    <div className="absolute top-0 left-0 right-0 h-[18px] overflow-hidden">
                        <svg
                            className="absolute top-0"
                            style={{
                                left: '-100%',
                                width: '300%',
                                animation: 'waveScroll 3s linear infinite',
                            }}
                            viewBox="0 0 600 18"
                            preserveAspectRatio="none"
                            height="18"
                        >
                            <path
                                d="M0,9 C50,0 100,18 150,9 C200,0 250,18 300,9 C350,0 400,18 450,9 C500,0 550,18 600,9 L600,18 L0,18 Z"
                                fill="#1a5c8a"
                                opacity="0.8"
                            />
                            <path
                                d="M0,12 C40,5 90,18 140,11 C190,4 240,17 290,10 C340,3 390,16 440,9 C490,2 540,15 600,9 L600,18 L0,18 Z"
                                fill="#0d3a5c"
                                opacity="0.9"
                            />
                        </svg>
                    </div>
                </div>

                {/* Water tint overlay */}
                <div
                    ref={overlayRef}
                    className="absolute inset-0 z-[4] pointer-events-none"
                    style={{ background: 'rgba(13,58,92,0.5)' }}
                />

                {/* Bubble canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 z-[6] pointer-events-none" />

                {/* Skill cards */}
                {skills.map((skill, i) => (
                    <SkillCard key={skill.name} skill={skill} index={i} saved={saved} />
                ))}

                {/* Save button */}
                {!saved && (
                    <button
                        onClick={handleSave}
                        className="absolute text-sm bottom-1 left-1/2 -translate-x-1/2 z-20 bg-brand-error text-white p-3 rounded-full font-black uppercase tracking-widest shadow-[0_0_24px_rgba(239,68,68,0.5)] hover:scale-110 active:scale-95 transition-transform animate-bounce"
                    >
                        Save Them!
                    </button>
                )}
            </div>

            <style>{`
                @keyframes waveScroll {
                    to { transform: translateX(33.33%); }
                }
                @keyframes skillDrift {
                    0%   { transform: translate(0, 0) rotate(var(--r1, -2deg)); }
                    100% { transform: translate(var(--dx, 8px), var(--dy, -6px)) rotate(var(--r2, 2deg)); }
                }
                @keyframes skillSurface {
                    0%   { transform: translateY(28px) rotate(var(--r1, -3deg)); opacity: 0.4; }
                    60%  { opacity: 1; }
                    100% { transform: translateY(0) rotate(0deg); opacity: 1; }
                }
            `}</style>
        </section>
    );
};

export default SkillsSection;
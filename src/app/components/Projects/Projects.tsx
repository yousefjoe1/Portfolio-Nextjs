'use client';

import { useRef, useState, useCallback } from 'react';
import ProjectCard from './ProjectCard';

// ─── Project Data ─────────────────────────────────────────────────────────────
const links = ['https://digitalgym.in/v1/app/pages/dashboards/default.html'];

const myProjects = [
    { cat: 'Real world', name: 'SustainGRC', image: '/images/sustainegrc.png', details: 'SustainGRC is a London-based AI platform transforming corporate carbon emissions, ESG risk management and assurance.', tech: ['React.js', 'Next.js', 'Tailwind CSS', 'Shadcn-ui'], link: 'https://www.sustaingrc.com/' },
    { cat: 'Real world', name: 'Eskan El Mansoura', image: '/images/eskan.png', details: 'A real estate website with various properties, filters by price/unit/block, and an admin dashboard.', tech: ['SASS', 'React.js', 'Redux.js', 'Tailwind CSS', 'Chakra-UI'], link: 'https://mansoura-eco-build.com/' },
    { cat: 'Real world', name: 'Abo Taleb', image: '/images/abo-taleb.png', details: 'Online English courses platform for Military Bases Students with payment integration and admin dashboard.', tech: ['React.js', 'Redux.js', 'Tailwind CSS'], link: 'https://www.sirtz.com/' },
    { cat: 'Real world', name: 'Mansoura Outlet', image: '/images/outlet.png', details: 'E-commerce directory of clothing stores structured by city streets.', tech: ['React.js', 'Redux.js', 'Tailwind CSS'], link: 'https://abc-mansoura.com/' },
    { cat: 'Real world', name: 'DGym', image: '/images/first-work-freelance.png', details: 'Gym management platform — memberships, payments, member feedback, reports, accessible from any device.', tech: ['React.js', 'Redux.js', 'Tailwind CSS'], links },
    { cat: 'Scholarship', name: 'Shop', image: '/images/depi-project.png', details: 'E-commerce for clothes with Node.js backend.', tech: ['React.js', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB'], link: 'https://vite-React.js-chi-jet.vercel.app/' },
    { cat: 'Personal', name: 'Productivity', image: '/images/productivity-app.png', details: 'Weekly Tasks feature — mark tasks to the current or desired day, resets every week.', tech: ['Next.js', 'Tailwind CSS', 'SupaBase'], link: 'https://my-tasks-inky.vercel.app/' },
    { cat: 'Personal', name: 'Questions Game', image: '/images/questions.png', details: 'Interactive quiz application with real-time features.', tech: ['HTML', 'CSS', 'JAVASCRIPT', 'React.js', 'MATERIAL-UI', 'FIREBASE', 'REDUX'], link: 'https://questions-game-cd095.web.app/' },
    { cat: 'Personal', name: 'Crypto App', image: '/images/crypto_project.png', details: 'Cryptocurrency tracker and data visualization app.', tech: ['HTML', 'CSS', 'JAVASCRIPT', 'React.js', 'Ant Design'], link: 'https://yousefjoe1.github.io/crypto-project/' },
    { cat: 'Personal', name: 'Memory Game', image: '/images/mem-game.png', details: 'Card matching game to test cognitive skills.', tech: ['React.js', 'TypeScript', 'Tailwind CSS'], link: 'https://yousefjoe1.github.io/Memory-Game/' },
    { cat: 'Personal', name: 'Travel Advisor', image: '/images/Travel_advisor_project.png', details: 'Location-based app to find restaurants and hotels.', tech: ['React.js', 'Google Maps', 'Material-UI'], link: 'https://yousefjoe1.github.io/simple-React.js-travel-advisor-app/' },
    { cat: 'Personal', name: 'Amazon Clone', image: '/images/amazontemp.png', details: 'E-commerce interface clone featuring product listings.', tech: ['HTML', 'CSS', 'JAVASCRIPT', 'React.js'], link: 'https://yousefjoe1.github.io/amazone1/' },
    { cat: 'Personal', name: 'Weather App', image: '/images/weatherapp.png', details: 'Real-time weather forecasting using API data.', tech: ['HTML', 'CSS', 'JAVASCRIPT'], link: 'https://yousefjoe1.github.io/simple-weather-app-js/' },
    { cat: 'Personal', name: 'LinkedIn Clone', image: '/images/linkedin.png', details: 'Social media UI clone focusing on professional networking.', tech: ['React.js', 'Bootstrap'], link: 'https://yousefjoe1.github.io/linkedIn-clone-2022/' },
    { cat: 'Personal', name: 'Discord Clone', image: '/images/discord.png', details: 'Real-time communication platform interface.', tech: ['React.js', 'Bootstrap'], link: 'https://yousefjoe1.github.io/discord-clone/#/' },
    { cat: 'Personal', name: 'Calculator', image: '/images/calc.png', details: 'Clean, functional web calculator.', tech: ['React.js', 'TypeScript', 'Tailwind CSS'], link: 'https://yousefjoe1.github.io/Simple-Calculator/' },
    { cat: 'Personal', name: 'Words Game', image: '/images/wordgame.png', details: 'Word-based puzzle game.', tech: ['React.js', 'TypeScript', 'Tailwind CSS'], link: 'https://yousefjoe1.github.io/Words-Game/' },
];

const BOMB_COLORS = [
    '#5b8dee', '#ee8b5b', '#5bee8b', '#ee5b8d', '#b35bee',
    '#eecb5b', '#5beee0', '#ee5b5b', '#f0a030', '#30d0f0',
    '#80ee5b', '#ee80d0', '#ffd700', '#0a66c2', '#7289da',
    '#a8edba', '#ff9f43',
];

const DELAY_BETWEEN = 1500; // ms between each explosion

// ─── Canvas Explosion ─────────────────────────────────────────────────────────
function explode(cx: number, cy: number, color: string) {
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;z-index:9999;';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;
    const confettiColors = [color, '#fff', '#ffdd57', '#ff6b6b', '#74c0fc', '#f3a0ff'];
    const fireColors = ['#ff4400', '#ff7700', '#ffaa00', '#ffcc00', '#ff2200'];

    interface Particle {
        x: number; y: number; vx: number; vy: number;
        size: number; life: number; color: string;
        type: 'confetti' | 'fire';
    }

    const particles: Particle[] = [];

    for (let i = 0; i < 32; i++) {
        const angle = (i / 32) * Math.PI * 2;
        const speed = 1.5 + Math.random() * 3.5;
        particles.push({ x: cx, y: cy, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed - 1.5, size: 4 + Math.random() * 7, life: 1, color: confettiColors[i % confettiColors.length], type: 'confetti' });
    }
    for (let i = 0; i < 20; i++) {
        particles.push({ x: cx + (Math.random() - 0.5) * 24, y: cy, vx: (Math.random() - 0.5) * 1.8, vy: -(1.5 + Math.random() * 3), size: 10 + Math.random() * 16, life: 1, color: fireColors[i % fireColors.length], type: 'fire' });
    }

    let shockR = 5, shockAlpha = 1, raf: number;

    const tick = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if (shockAlpha > 0) {
            ctx.beginPath(); ctx.arc(cx, cy, shockR, 0, Math.PI * 2);
            ctx.strokeStyle = `rgba(255,210,80,${shockAlpha})`; ctx.lineWidth = 2.5; ctx.stroke();
            shockR += 5; shockAlpha -= 0.04;
        }
        let alive = false;
        for (const p of particles) {
            if (p.life <= 0) continue;
            alive = true;
            p.x += p.vx; p.y += p.vy;
            p.vy += p.type === 'confetti' ? 0.12 : -0.03; p.vx *= 0.985;
            p.life -= p.type === 'confetti' ? 0.014 : 0.022;
            ctx.save(); ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color;
            ctx.beginPath();
            if (p.type === 'fire') ctx.ellipse(p.x, p.y, p.size * 0.45, p.size, 0, 0, Math.PI * 2);
            else ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
            ctx.fill(); ctx.restore();
        }
        if (alive || shockAlpha > 0) raf = requestAnimationFrame(tick);
        else canvas.remove();
    };

    raf = requestAnimationFrame(tick);
    setTimeout(() => { cancelAnimationFrame(raf); canvas.remove(); }, 3500);
}

// ─── Screen shake ─────────────────────────────────────────────────────────────
function shake() {
    document.body.style.transition = 'transform 0.05s';
    document.body.style.transform = 'translate(4px,-3px)';
    setTimeout(() => { document.body.style.transform = 'translate(-3px,2px)'; }, 55);
    setTimeout(() => { document.body.style.transform = ''; document.body.style.transition = ''; }, 110);
}

// ─── Bomb SVG ─────────────────────────────────────────────────────────────────
const BombSVG = ({ name, color, lit }: { name: string; color: string; lit: boolean }) => (
    <svg width="90" height="90" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <radialGradient id={`bb-${name.replace(/[\s/]/g, '')}`} cx="38%" cy="35%">
                <stop offset="0%" stopColor="#4a4a4a" />
                <stop offset="100%" stopColor="#1a1a1a" />
            </radialGradient>
        </defs>
        <line x1="42" y1="18" x2="54" y2="6" stroke="#888" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M54,6 Q64,-4 68,8" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
        {/* Spark — pulses when lit (next-in-line) */}
        <circle cx="70" cy="7" r="6" fill={color} opacity={lit ? '0.6' : '0.25'} style={lit ? { animation: 'sparkPulse 0.35s ease-in-out infinite alternate' } : {}} />
        <circle cx="70" cy="7" r="4" fill="#FFD700" opacity="0.85" />
        <circle cx="70" cy="7" r="2.5" fill="#FF6600" />
        <circle cx="70" cy="7" r="1.2" fill="#fff" opacity="0.9" />
        <circle cx="73" cy="4" r="2" fill="#FFD700" opacity="0.55" />
        <circle cx="67" cy="10" r="1.5" fill="#FF8800" opacity="0.45" />
        <circle cx="40" cy="47" r="30" fill={`url(#bb-${name.replace(/[\s/]/g, '')})`} />
        <circle cx="40" cy="47" r="30" fill="none" stroke={color} strokeWidth="1.5" opacity={lit ? '0.7' : '0.3'} />
        <ellipse cx="30" cy="35" rx="8" ry="10" fill="rgba(255,255,255,0.09)" />
        <text x="40" y="45" textAnchor="middle" fontSize="7" fontWeight="800" fill="rgba(255,255,255,0.7)" fontFamily="sans-serif">
            {name.length > 10 ? name.slice(0, 9) + '…' : name}
        </text>
    </svg>
);

// ─── Slot ─────────────────────────────────────────────────────────────────────
interface SlotProps {
    index: number;
    project: typeof myProjects[number];
    color: string;
    revealed: boolean;
    isNext: boolean;          // the bomb that will explode next
    onManualPop: (index: number, el: HTMLDivElement) => void;
}

const Slot = ({ index, project, color, revealed, isNext, onManualPop }: SlotProps) => {
    const slotRef = useRef<HTMLDivElement>(null);

    if (!revealed) {
        return (
            <div
                ref={slotRef}
                onClick={() => { if (slotRef.current) onManualPop(index, slotRef.current); }}
                className="cursor-pointer select-none flex flex-col items-center justify-center group min-h-[480px] rounded-lg border border-dashed border-white/10 hover:border-white/20 transition-colors"
                style={{
                    animation: `floatBomb ${3 + (index % 5) * 0.4}s ease-in-out ${(index % 7) * 0.3}s infinite alternate`,
                    transformOrigin: 'bottom center',
                    ['--tilt' as string]: `${(index % 2 === 0 ? -1 : 1) * (2 + (index % 4))}deg`,
                    ['--tilt2' as string]: `${(index % 2 === 0 ? 1 : -1) * (2 + (index % 3))}deg`,
                    // glow border when this is the next to go
                    borderColor: isNext ? `${color}66` : undefined,
                    boxShadow: isNext ? `0 0 24px ${color}33, inset 0 0 24px ${color}11` : undefined,
                }}
            >
                <div className="relative" style={{ transform: isNext ? 'scale(1.08)' : undefined, transition: 'transform 0.3s' }}>
                    <BombSVG name={project.name} color={color} lit={isNext} />
                    <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-2xl -z-10" style={{ background: color }} />
                </div>
                {isNext && (
                    <span className="text-[9px] text-white/50 mt-2 font-bold tracking-widest uppercase animate-pulse">
                        next…
                    </span>
                )}
                {!isNext && (
                    <span className="text-[9px] text-white/0 group-hover:text-white/35 transition-colors duration-200 mt-2 font-medium tracking-widest uppercase">
                        detonate
                    </span>
                )}
            </div>
        );
    }

    return (
        <div style={{ animation: 'cardPop 0.55s cubic-bezier(.34,1.56,.64,1) forwards' }}>
            <ProjectCard project={project} />
        </div>
    );
};

// ─── Section Label ────────────────────────────────────────────────────────────
const SectionHeader = ({ label }: { label: string }) => (
    <div className="bg-brand-secondary rounded-2xl p-2 mx-auto w-1/2 mt-12 mb-6">
        <h3 className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent text-3xl text-center font-semibold">
            {label}
        </h3>
    </div>
);

// ─── Detonate All button ──────────────────────────────────────────────────────
interface DetonateButtonProps {
    detonating: boolean;
    done: boolean;
    remaining: number;
    total: number;
    onStart: () => void;
}

const DetonateButton = ({ detonating, done, remaining, total, onStart }: DetonateButtonProps) => {
    if (done) return null;

    return (
        <button
            onClick={onStart}
            disabled={detonating}
            className="relative overflow-hidden group disabled:cursor-not-allowed"
            style={{
                background: detonating ? '#1e293b' : '#dc2626',
                color: '#fff',
                border: 'none',
                borderRadius: 999,
                padding: '14px 40px',
                fontSize: 13,
                fontWeight: 900,
                letterSpacing: '.12em',
                textTransform: 'uppercase',
                cursor: detonating ? 'not-allowed' : 'pointer',
                boxShadow: detonating ? 'none' : '0 0 28px rgba(220,38,38,0.55)',
                animation: detonating ? 'none' : 'btnPulse 1.8s ease-in-out infinite',
                transition: 'background 0.4s, box-shadow 0.4s',
                minWidth: 240,
            }}
        >
            {detonating ? (
                <span className="flex items-center justify-center gap-2">
                    <span
                        className="inline-block w-3 h-3 rounded-full bg-red-500"
                        style={{ animation: 'dotBlink 0.6s ease-in-out infinite' }}
                    />
                    Bomb All {total - remaining + 1} / {total}
                </span>
            ) : (
                '💥 Bomb All'
            )}
            {/* Progress bar */}
            {detonating && (
                <div
                    className="absolute bottom-0 left-0 h-[3px] bg-red-500 transition-all duration-500"
                    style={{ width: `${((total - remaining) / total) * 100}%` }}
                />
            )}
        </button>
    );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
const BalloonProjects = () => {
    const [revealed, setRevealed] = useState<Set<number>>(new Set());
    const [detonating, setDetonating] = useState(false);
    const [nextIndex, setNextIndex] = useState<number | null>(null);

    const slotRefs = useRef<Map<number, HTMLDivElement>>(new Map());

    // Register each slot's div so we can grab its coords for the explosion
    const registerRef = useCallback((index: number, el: HTMLDivElement | null) => {
        if (el) slotRefs.current.set(index, el);
        else slotRefs.current.delete(index);
    }, []);

    // ── Fire one bomb by index ─────────────────────────────────────────────
    const popOne = useCallback((index: number) => {
        const el = slotRefs.current.get(index);
        const rect = el ? el.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.3;

        explode(cx, cy, BOMB_COLORS[index % BOMB_COLORS.length]);
        shake();

        setTimeout(() => {
            setRevealed(prev => new Set(prev).add(index));
        }, 220);
    }, []);

    // ── Manual single pop (click on bomb directly) ─────────────────────────
    const handleManualPop = useCallback((index: number, el: HTMLDivElement) => {
        if (revealed.has(index) || detonating) return;
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height * 0.3;
        explode(cx, cy, BOMB_COLORS[index % BOMB_COLORS.length]);
        shake();
        setTimeout(() => setRevealed(prev => new Set(prev).add(index)), 220);
    }, [revealed, detonating]);

    // ── Sequential detonate all ────────────────────────────────────────────
    const handleDetonateAll = useCallback(() => {
        if (detonating) return;
        setDetonating(true);

        // Build ordered queue of un-revealed indices
        const queue = myProjects
            .map((_, i) => i)
            .filter(i => !revealed.has(i));

        if (queue.length === 0) { setDetonating(false); return; }

        let step = 0;

        const fireNext = () => {
            if (step >= queue.length) {
                setDetonating(false);
                setNextIndex(null);
                return;
            }

            const idx = queue[step];
            // Highlight the next one before it fires
            setNextIndex(queue[step + 1] ?? null);

            popOne(idx);

            step++;
            setTimeout(fireNext, DELAY_BETWEEN);
        };

        // Show first "next" indicator immediately
        setNextIndex(queue[0]);
        // Small pre-delay so the user sees the highlight before the first boom
        setTimeout(fireNext, 400);

    }, [detonating, revealed, popOne]);

    const realWorld = myProjects.filter(p => p.cat === 'Real world');
    const scholarship = myProjects.filter(p => p.cat === 'Scholarship');
    const personal = myProjects.filter(p => p.cat === 'Personal');
    const idxOf = (p: typeof myProjects[number]) => myProjects.indexOf(p);
    const totalLeft = myProjects.length - revealed.size;
    const allDone = revealed.size === myProjects.length;

    return (
        <section data-aos="fade-up" className="py-12 px-4 max-w-7xl mx-auto overflow-hidden">
            {/* Title + controls */}
            <div className="flex flex-col justify-center items-center text-center gap-4 mb-2">
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    My{' '}
                    <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        Projects
                    </span>
                </h2>

                <DetonateButton
                    detonating={detonating}
                    done={allDone}
                    remaining={totalLeft}
                    total={myProjects.length}
                    onStart={handleDetonateAll}
                />
            </div>

            {/* ── Real World ─────────────────────────────────────────────── */}
            <SectionHeader label="Real World Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {realWorld.map(p => {
                    const i = idxOf(p);
                    return (
                        <div key={p.name} ref={el => registerRef(i, el)}>
                            <Slot index={i} project={p} color={BOMB_COLORS[i % BOMB_COLORS.length]}
                                revealed={revealed.has(i)} isNext={nextIndex === i} onManualPop={handleManualPop} />
                        </div>
                    );
                })}
            </div>

            {/* ── Scholarship ────────────────────────────────────────────── */}
            <SectionHeader label="DEPI Scholarship Project" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {scholarship.map(p => {
                    const i = idxOf(p);
                    return (
                        <div key={p.name} ref={el => registerRef(i, el)}>
                            <Slot index={i} project={p} color={BOMB_COLORS[i % BOMB_COLORS.length]}
                                revealed={revealed.has(i)} isNext={nextIndex === i} onManualPop={handleManualPop} />
                        </div>
                    );
                })}
            </div>

            {/* ── Personal ───────────────────────────────────────────────── */}
            <SectionHeader label="Personal & Practical Projects" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {personal.map(p => {
                    const i = idxOf(p);
                    return (
                        <div key={p.name} ref={el => registerRef(i, el)}>
                            <Slot index={i} project={p} color={BOMB_COLORS[i % BOMB_COLORS.length]}
                                revealed={revealed.has(i)} isNext={nextIndex === i} onManualPop={handleManualPop} />
                        </div>
                    );
                })}
            </div>

            <style>{`
                @keyframes floatBomb {
                    0%   { transform: translateY(0px)  rotate(var(--tilt,  -3deg)); }
                    100% { transform: translateY(-14px) rotate(var(--tilt2,  3deg)); }
                }
                @keyframes cardPop {
                    0%   { transform: scale(0.6) rotate(-6deg); opacity: 0; }
                    100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
                }
                @keyframes btnPulse {
                    0%,100% { transform: scale(1); }
                    50%     { transform: scale(1.04); }
                }
                @keyframes dotBlink {
                    0%,100% { opacity: 1; }
                    50%     { opacity: 0.2; }
                }
                @keyframes sparkPulse {
                    0%   { opacity: 0.4; r: 5; }
                    100% { opacity: 1;   r: 8; }
                }
            `}</style>
        </section>
    );
};

export default BalloonProjects;
'use client'

import { useEffect, useRef } from 'react'

/**
 * BrokenGlass
 * -----------
 * Overlay this on any card. Pass `isFixed` to trigger the reassembly animation.
 *
 * Usage:
 *   <div className="relative ...">
 *     {children}
 *     <BrokenGlass isFixed={isFixed} />
 *   </div>
 *
 * The parent must have `position: relative` and `overflow: hidden`.
 */

interface ShardDef {
    id: string
    /** polygon points string for the clip path */
    points: string
    /** initial broken offset */
    dx: number
    dy: number
    rotate: number
    /** chromatic aberration channel (optional) */
    chr?: 'r' | 'b'
    dark?: boolean
    /** tiny random shake amounts */

}

// Shard definitions – 8 irregular tiles that together cover a 340×130 card
// Tweak points / offsets to taste.
const SHARDS: ShardDef[] = [
    { id: 's0', points: '0,0 160,0 130,45 70,60 0,40', dx: -1.5, dy: -2, rotate: -1.2, chr: 'r', },
    { id: 's1', points: '160,0 340,0 340,50 200,55 130,45', dx: 2, dy: -1, rotate: 0.8, dark: true, },
    { id: 's2', points: '0,40 70,60 55,100 0,95', dx: -2, dy: 1.5, rotate: -1, chr: 'b', },
    { id: 's3', points: '70,60 130,45 200,55 185,95 110,110 55,100', dx: 1, dy: 2, rotate: 0.5, },
    { id: 's4', points: '130,45 340,50 340,90 220,100 200,55', dx: 2.5, dy: -1.5, rotate: 1, chr: 'r', dark: true, },
    { id: 's5', points: '220,100 340,90 340,130 250,130', dx: 2, dy: 2, rotate: 1.5, },
    { id: 's6', points: '0,95 55,100 110,110 90,130 0,130', dx: -1, dy: 2.5, rotate: -1, chr: 'b', dark: true, },
    { id: 's7', points: '110,110 185,95 220,100 250,130 90,130', dx: 0, dy: 2, rotate: -0.6, },
]

// Crack path definitions – all lines between shard edges + hairline secondaries
const CRACKS_MAIN = [
    'M130,45 L0,0', 'M130,45 L160,0', 'M130,45 L340,50',
    'M130,45 L70,60', 'M70,60 L0,40', 'M70,60 L55,100',
    'M55,100 L0,95', 'M55,100 L110,110', 'M110,110 L90,130',
    'M110,110 L185,95', 'M185,95 L200,55', 'M200,55 L130,45',
    'M200,55 L220,100', 'M220,100 L250,130', 'M220,100 L340,90',
    'M340,90 L340,50',
]
const CRACKS_HAIR = [
    'M130,45 Q110,20 85,0',
    'M70,60 Q40,65 0,70',
    'M185,95 Q210,80 260,65',
    'M110,110 Q140,125 170,130',
    'M200,55 Q270,48 310,30',
]

interface BrokenGlassProps {
    isFixed: boolean
}

export const BrokenGlass = ({ isFixed }: BrokenGlassProps) => {
    const shardRefs = useRef<(SVGGElement | null)[]>([])
    const overlayRef = useRef<SVGSVGElement>(null)
    const rafRef = useRef<number | null>(null)

    // ── Broken state: shake loop ──────────────────────────────────────────────
    useEffect(() => {
        if (isFixed) return

        let t = 0
        const shake = () => {
            t += 0.18
            shardRefs.current.forEach((el, i) => {
                if (!el) return
                const s = SHARDS[i]
                el.style.transform = `translate(${s.dx}px, ${s.dy}px) rotate(${s.rotate}deg)`
            })
            rafRef.current = requestAnimationFrame(shake)
        }

        rafRef.current = requestAnimationFrame(shake)
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isFixed])

    // ── Fixed state: spring back & fade ──────────────────────────────────────
    useEffect(() => {
        if (!isFixed) return

        // Stop shake loop
        if (rafRef.current) cancelAnimationFrame(rafRef.current)

        // Snap shards to origin with staggered spring
        shardRefs.current.forEach((el, i) => {
            if (!el) return
            setTimeout(() => {
                el.style.transition = 'transform 0.9s cubic-bezier(.34,1.56,.64,1), opacity .8s'
                el.style.transform = 'translate(0,0) rotate(0deg)'
            }, i * 40)
        })

        // Fade out whole overlay after shards settle
        const timer = setTimeout(() => {
            if (overlayRef.current) overlayRef.current.style.opacity = '0'
        }, 600)

        return () => clearTimeout(timer)
    }, [isFixed])

    return (
        <svg
            ref={overlayRef}
            className="pointer-events-none absolute inset-0 w-full h-full transition-opacity duration-1000"
            // preserveAspectRatio="none" so it stretches to any card size
            viewBox="0 0 340 130"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
        >
            <defs>
                {SHARDS.map(({ id, points }) => (
                    <clipPath key={id} id={`bg-${id}`}>
                        <polygon points={points} />
                    </clipPath>
                ))}
            </defs>

            {/* Shard glass faces */}
            {SHARDS.map((shard, i) => (
                <g
                    key={shard.id}
                    ref={(el) => { shardRefs.current[i] = el }}
                    clipPath={`url(#bg-${shard.id})`}
                    style={{
                        transform: `translate(${shard.dx}px, ${shard.dy}px) rotate(${shard.rotate}deg)`,
                        willChange: 'transform',
                    }}
                >
                    {/* Base glass tint */}
                    <rect
                        x="0" y="0" width="340" height="130"
                        fill={shard.dark ? 'rgba(0,0,30,.12)' : 'rgba(160,170,220,.06)'}
                    />

                    {/* Chromatic aberration channels */}
                    {shard.chr === 'r' && (
                        <rect x="-1.5" y="-2" width="340" height="130"
                            fill="rgba(255,60,80,.08)" style={{ mixBlendMode: 'screen' }} />
                    )}
                    {shard.chr === 'b' && (
                        <rect x="1" y="1" width="340" height="130"
                            fill="rgba(60,80,255,.08)" style={{ mixBlendMode: 'screen' }} />
                    )}
                </g>
            ))}

            {/* Main crack lines */}
            {CRACKS_MAIN.map((d, i) => (
                <path
                    key={`cm-${i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,.55)"
                    strokeWidth="1"
                    style={{ filter: 'drop-shadow(0 0 1.5px rgba(200,210,255,.6))' }}
                />
            ))}

            {/* Hairline secondary cracks */}
            {CRACKS_HAIR.map((d, i) => (
                <path
                    key={`ch-${i}`}
                    d={d}
                    fill="none"
                    stroke="rgba(255,255,255,.22)"
                    strokeWidth=".4"
                />
            ))}
        </svg>
    )
}
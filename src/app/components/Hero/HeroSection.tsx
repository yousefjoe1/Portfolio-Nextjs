'use client'
import { myInfo } from '@/constants/infoData'
import { SplitText } from 'gsap/SplitText';
import Image from 'next/image'
import { gsap } from 'gsap';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';

const HeroSection = () => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useGSAP(
        () => {
            gsap.registerPlugin(SplitText)

            const elements = gsap.utils.toArray('.split', containerRef.current) as HTMLElement[]

            const splits = elements.map((el) =>
                SplitText.create(el, { type: 'words, chars' })
            )

            gsap.from(
                splits.flatMap((split) => split.chars),
                {
                    duration: 0.400,
                    y: 100,
                    autoAlpha: 0,
                    stagger: 0.05,
                }
            )
        },
        { scope: containerRef }
    )

    return (
        <div className='grid lg:grid-cols-3 p-4 gap-4'>
            <div className='p-4 rounded-lg lg:col-span-2 md:col-span-2 bg-secondary'>
                <Image src="/images/youssef.png" className='rounded-xl' alt="Hero" width={500} height={600} />
            </div>

            <div className='bg-secondary p-4 rounded-lg shadow-sm shadow-secondary flex flex-col gap-4 w-full'>
                <div ref={containerRef} className='bg-primary p-4 rounded-lg flex items-center justify-between shadow-sm'>
                    <h2 className='text-2xl font-bold split'>
                        <span className='text-brand'> Front-End Developer </span>
                        with 3+ years of hands-on experience building web applications using React.
                    </h2>
                </div>

                <div className='bg-primary p-4 rounded-lg flex items-center justify-between shadow-sm'>
                    <h2 className='text-2xl font-bold split'>
                        I’ve led teams, delivered complex UI solutions, and collaborated with global startups. <span className='text-orange-300'>Always learning</span>, always coding.
                    </h2>
                </div>

                <div className='bg-primary p-4 rounded-lg flex items-center justify-between shadow-sm'>
                    <h2 className='text-2xl font-bold split'>
                        I’m looking to join innovative teams where I can solve real-world problems and keep growing.
                    </h2>
                </div>

                <div className="flex items-center gap-3 justify-between">
                    {myInfo.map((info, id) => (
                        <a key={id} target='_blank' href={info.link}
                            className='bg-primary hover:bg-brand hover:scale-110 transition ease-in-out hover:bg-white hover:text-primary p-4 rounded-lg flex items-center justify-center shadow-sm'>
                            <h2 className='text-2xl font-bold'>{info.icons}</h2>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroSection

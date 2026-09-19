import Image from 'next/image'

const LeftSection = () => {
    return (
        <div className="h-full">
            <div className="p-4 rounded-xl bg-[#111827] flex flex-col items-start h-full">
                <div className="flex items-center lg:flex-row flex-col gap-4 mb-8 w-full">
                    <div className="relative">
                        <Image
                            src="/images/youssef.png"
                            className="rounded-full object-contain"
                            alt="Hero"
                            width={180}
                            height={180}
                        />
                    </div>

                    <h2 className="lg:text-2xl text-xl bg-brand-secondary/50 p-4 rounded-2xl w-full font-bold text-primary border border-brand-border/30">
                        Hello, I am Youssef Mahmoud
                    </h2>
                </div>

                <p className="text-lg leading-relaxed font-medium text-white/70">
                Results-driven Front-End Developer with 4+ years of hands-on experience building scalable, performance-focused, and responsive web applications using React, Next.js, and TypeScript.
                </p>

                <p className="text-lg leading-relaxed font-medium text-white/70 mt-4">
                    Handled 70% of the graduation project in (DEPI 6 months scholarship).
                    While I focus on Front-end and leading the team, I have a solid grasp of Node.js and CRUD operations,
                    ensuring seamless integration with APIs.
                </p>
            </div>
        </div>
    )
}

export default LeftSection

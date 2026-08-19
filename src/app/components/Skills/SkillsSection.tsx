import Image from 'next/image';

const skills = [
    { name: 'React', level: 'Expert', src: '/images/React-icon.svg.png', color: '#61dafb' },
    { name: 'Next.js', level: 'Expert', src: '/images/nextjs-original.png', color: '#ffffff' },
    { name: 'TypeScript', level: 'Advanced', src: '/images/typescript.png', color: '#3178c6' },
    { name: 'Tailwind', level: 'Expert', src: '/images/tailwind.png', color: '#38bdf8' },
    { name: 'Node.js', level: 'Advanced', src: '/images/nodejs.png', color: '#68a063' },
    { name: 'HTML/CSS', level: 'Expert', src: '/images/icone-html-orange.png', color: '#e34c26' },
    { name: 'MongoDB', level: 'Mid', src: '/images/mongo.png', color: '#47a248' },
    { name: 'Git', level: 'Expert', src: '/images/git.png', color: '#f05032' },
];

const SkillsSection = () => {
    return (
        <section className="py-12 px-4 mx-auto">
            <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
                    My{' '}
                    <span className="bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                        Skills
                    </span>
                </h2>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {skills.map((skill) => (
                    <div
                        key={skill.name}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#111827] px-3 py-3"
                    >
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
                            <div className="text-lg font-bold text-white/85 leading-none">{skill.name}</div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;

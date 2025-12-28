import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';

interface Project {
    name: string;
    image: string;
    details: string;
    tech: string[];
    link: string;
    repo?: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
    return (
        <div className='bg-brand-tertiary group relative rounded-lg shadow-md overflow-hidden min-h-[500px] cursor-pointer transition-all duration-300 hover:shadow-xl'>
            <div className='relative h-64 overflow-hidden'>
                <Image
                    width={300}
                    height={300}
                    src={project.image}
                    alt={project.name}
                    className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-105'
                />
            </div>

            <div className='p-4 flex flex-col justify-between h-[calc(500px-16rem)] gap-3 relative'>
                <div>
                    <h3 className='text-lg font-semibold mb-2'>{project.name}</h3>

                    {/* Details that slide up on hover */}
                    <div className='absolute inset-x-0 bottom-full bg-brand-border-secondary/95 text-gray-300 p-4 rounded-lg transform translate-y-0 group-hover:-translate-y-[calc(100%+1rem)] transition-all duration-500 ease-in-out z-10'>
                        {project.details}
                    </div>
                </div>

                <div className='flex items-center flex-wrap gap-2'>
                    {project.tech.map((tech, index) => (
                        <span
                            key={index}
                            className='bg-brand-secondary text-white px-3 py-1 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:bg-brand-primary'
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className='flex items-center mt-2'>
                    <a
                        href={project.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='bg-brand-primary/20 text-white px-4 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300 hover:scale-105 flex items-center group/link'
                    >
                        View
                        <ArrowRightIcon className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1" />
                    </a>
                    {project.repo && (
                        <a
                            href={project.repo}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='ml-3 bg-brand-primary text-white px-4 py-2 rounded-full hover:bg-brand-secondary transition-all duration-300 hover:scale-105'
                        >
                            GitHub
                        </a>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProjectCard
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav className='flex gap-4 items-center justify-center p-4 bg-brand-bg'>
            <Link className='p-2 hover:text-brand border-2 rounded-2xl m-2 hover:bg-white/30' href="/">Home</Link>
            <Link className='p-2 hover:text-brand border-2 rounded-2xl m-2 hover:bg-white/30 ' href="/other-me">
                <span className="bg-gradient-to-r font-bold text-center from-indigo-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">Other Me</span></Link>
        </nav>
    )
}

export default NavBar
import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav className='flex gap-4 items-center justify-center p-4 bg-brand-bg'>
            <Link className='p-2 hover:text-brand border-2 rounded-2xl m-2 hover:bg-white/30' href="/">Home</Link>
        </nav>
    )
}

export default NavBar
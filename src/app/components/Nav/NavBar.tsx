import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (
        <nav className='flex gap-4 items-center bg-brand-bg'>
            <Link href="/">Home</Link>
            <Link href="/other-me">Other Me</Link>
        </nav>
    )
}

export default NavBar
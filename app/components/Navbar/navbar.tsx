import Link from 'next/link';
import React from 'react'

export default function Navbar() {
    return (
      <nav className="flex items-center justify-between p-4 mx-auto sm:max-w-4xl md:max-w-6xl">
        <Link href="/" className="text-xl underline">Tech 
           {"-"}
          <span className='font-bold underline'>Sed</span>
        </Link>
      </nav>
    );
  }
  
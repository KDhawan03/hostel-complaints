'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { getStoredUser, clearUser } from "@/lib/auth";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
      const u = getStoredUser();
      setUser(u);
    }, []);

    function handleLogout () {
        clearUser();
        setUser(null);
        router.push('/');
    }
  return (
    <nav className='flex items-center justify-between px-5 w-full h-16 sticky top-0 bg-white border-b shadow-sm'>
        <div>
            <Link href="/" className='text-3xl font-bold text-blue-500'> Hostel Complaints </Link>
        </div>

        <div>
            {user ? (
                <div className='flex items-center gap-6'>
                    <span className='text-gray-600'>Hi, <span className='font-semibold'>{user.name}</span></span>
                    <button 
                        className='text-red-500 hover:text-red-700 font-medium transition'
                        onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            ) : (
                <div className='space-x-8'>
                    <Link href="/login" className='text-gray-600 hover:text-blue-500 transition'>
                        Login
                    </Link>
                    <Link href="/signup"
                        className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition'>
                        Signup
                    </Link>
                </div>
            )}
        </div>
    </nav>
  )
}

export default Navbar

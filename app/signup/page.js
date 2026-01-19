"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if(storedUser) {
        router.push("/");
      }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
          const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
          });
          const data = await res.json();
          if(res.ok) {
            alert('signup successful');
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          } else {
            alert(data.error);
          }
        } catch(error) {
          alert("something went wrong");
        } finally {
          setLoading(false);
        }
    }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md bg-white p-8 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">Create an Account</h2>
            
            <input 
                type='text' 
                placeholder='Full Name' 
                value={name} 
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                required
            />
            
            <input 
                type='email' 
                placeholder='2024pgcsca070@nitjsr.ac.in' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                required
            />
            
            <input 
                type='password' 
                placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                required
            />
            
            <input 
                type='password' 
                placeholder='Confirm Password' 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-black"
                required
            />
            
            <button 
                type='submit' 
                disabled={loading}
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-colors disabled:bg-gray-400 mt-2"
            >
                {loading ? "Please wait..." : "Sign Up"}
            </button>
            
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                    Login
                </Link>
            </p>
        </form>
    </div>
  )
}

export default Signup
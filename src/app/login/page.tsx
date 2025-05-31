'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Login', username, password);
        // todo: add auth login

        try {
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
              });
          
              const data = await res.json();
              setMessage(data.message || 'Something went wrong');

              if(res.ok) {
                router.push('/dashboard');
              }
        }
        catch (err) {
            setMessage('Unable to connect to server.')
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEC52E]">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <div className="flex justify-center mb-10">
                    <Image src="/cameronLogo.png" alt="Cameron Logo" width={100} height={160} />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <img src="/user-icon.png" alt="User Icon" className="h-8" />
                        <input 
                            type="text" 
                            placeholder="Email"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:outline-none" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/password-icon.png" alt="Password Icon" className="h-8" />
                        <input 
                            type='password'
                            placeholder="Password"
                            className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex flex-col items-center">
                        <button
                            type="submit"
                            className="w-20 h-10 mb-5 bg-black text-white py-2 rounded-md transition-all duration-100 hover:animate-pulse"
                        >
                            Login
                        </button>
                        <Link href="/register" className="text-sm text-blue-600 underline hover:text-blue-800">
                            Don’t have an account? Register here
                        </Link>
                    </div>
                </form>
            {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
            </div>
        </div>
    );
}
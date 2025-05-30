'use client';

import { useState } from "react";

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Login', username, password);
        // todo: add auth login
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FEC52E]">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <div className="flex justify-center mb-16">
                    <img src="/cameronLogo.png" alt="Cameron Logo" className="h-30" />
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex items-center gap-2">
                        <img src="/user-icon.png" alt="User Icon" className="h-8" />
                        <input 
                            type="text" 
                            className="w-full px-3 py-2 border rounded-md focus:outline-none" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/password-icon.png" alt="Password Icon" className="h-8" />
                        <input 
                            type='password'
                            className="w-full px-3 py-2 border rounded-md focus:outline-none"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="w-20 h-10 bg-black text-white py2 rounded-md hover:opacity-60"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';


export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [schoolId, setSchoolId] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        email, 
        password, 
        role,
        ...(role === 'STUDENT' && { schoolId })
      }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  };

  return (
    <div className="min-h-screen text-black flex justify-center items-center bg-[#FEC52E]">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:outline-none" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:outline-none" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <select
            name="role"
            id="role"
            onChange={(e) => setRole(e.target.value.toUpperCase())} // Prisma expects uppercase roles
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>

          {role === 'STUDENT' && (
            <input
              type="text"
              placeholder="School ID"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded text-black focus:outline-none"
              value={schoolId}
              onChange={(e) => setSchoolId(e.target.value)}
            />
          )}

          <div className="flex flex-col items-center">
            <button
              type="submit"
              className="w-20 h-10 mb-5 bg-black text-white py-2 rounded-md transition-all duration-100 hover:animate-pulse"
            >
              Register
            </button>
            <Link href="/login" className="text-sm text-blue-600 underline hover:text-blue-800">
              Already have an account? Login here
            </Link>
          </div>
        </form>
        {message && <p className="mt-4 text-center text-sm text-red-600">{message}</p>}
      </div>
    </div>
  );
}

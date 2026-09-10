'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UserLogin() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    // Save session info locally
    const userRole = 'user';
    localStorage.setItem('user_role', userRole);
    localStorage.setItem('user_email', email);

    // Redirect to homepage after successful login
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-[#EFECE6] p-8 shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-block">
            <div className="w-12 h-12 bg-[#D9531E] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-sm mx-auto">
              HS
            </div>
          </Link>
          <h1 className="text-2xl font-black">
            {isRegister ? 'Create Account' : 'Welcome Back'}
          </h1>
          <p className="text-xs text-[#6E655F]">
            {isRegister ? 'Sign up to manage your orders' : 'Log in to your Habesha Suq account'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
          {isRegister && (
            <div>
              <label className="block mb-1 text-[#6E655F]">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Abebe Bikila"
                className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-[#6E655F]">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none"
            />
          </div>

          {isRegister && (
            <div>
              <label className="block mb-1 text-[#6E655F]">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="0911223344"
                className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-[#6E655F]">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D9531E] hover:bg-[#B84216] text-white py-3.5 rounded-xl font-black text-xs transition shadow-sm mt-2">
            {isRegister ? 'Register' : 'Log In'}
          </button>
        </form>

        {/* Toggle Register / Login */}
        <div className="text-center text-xs text-[#6E655F] pt-2 border-t border-[#EFECE6]">
          {isRegister ? (
            <p>
              Already have an account?{' '}
              <button onClick={() => setIsRegister(false)} className="text-[#D9531E] font-black underline">
                Log In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button onClick={() => setIsRegister(true)} className="text-[#D9531E] font-black underline">
                Register
              </button>
            </p>
          )}
        </div>

      </div>
    </div>
  );
}
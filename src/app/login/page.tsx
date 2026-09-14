'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Authenticate user session
    localStorage.setItem('user_auth', JSON.stringify({
      loginId: identifier,
      isLoggedIn: true,
    }));

    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 text-[#2B231D]">
      <div className="bg-white rounded-2xl border border-[#EFECE6] p-8 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl mx-auto mb-2">
            HS
          </div>
          <h1 className="text-2xl font-black">Welcome Back</h1>
          <p className="text-xs text-[#6E655F]">Log in to manage your orders or seller inventory</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
          <div>
            <label className="block mb-1 text-[#6E655F]">Phone Number or Email</label>
            <input
              required
              type="text"
              placeholder="0912345678 or email@domain.com"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#6E655F]">Password</label>
            <input
              required
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#D9531E] hover:bg-[#B84216] text-white py-3 rounded-xl font-black text-sm transition shadow-sm mt-2"
          >
            Log In
          </button>
        </form>

        <div className="text-center text-xs text-[#6E655F] pt-2 border-t border-[#EFECE6]">
          Don't have an account yet?{' '}
          <Link href="/register" className="text-[#D9531E] font-extrabold hover:underline">
            Register Here
          </Link>
        </div>
      </div>
    </div>
  );
}
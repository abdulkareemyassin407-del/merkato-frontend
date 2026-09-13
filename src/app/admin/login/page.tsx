'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Default Admin Password (Change this to your preferred password)
  const ADMIN_SECRET_KEY = 'admin123';

  const handleAdminAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password === ADMIN_SECRET_KEY) {
      localStorage.setItem('user_role', 'admin');
      router.push('/admin');
    } else {
      setError('Invalid admin password. Access denied.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] flex items-center justify-center p-4">
      <div className="max-w-sm w-full bg-white rounded-3xl border border-[#EFECE6] p-8 shadow-md space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-[#2B231D] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-sm mx-auto">
            🔒
          </div>
          <h1 className="text-xl font-black">Admin Access Control</h1>
          <p className="text-xs text-[#6E655F]">Enter the administrator password to proceed.</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 border border-red-200 text-xs font-bold p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleAdminAuth} className="space-y-4 text-xs font-bold">
          <div>
            <label className="block mb-1 text-[#6E655F]">Admin Password</label>
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
            className="w-full bg-[#2B231D] hover:bg-black text-white py-3.5 rounded-xl font-black text-xs transition shadow-sm">
            Authorize & Access Admin
          </button>
        </form>

        <div className="text-center">
          <Link href="/" className="text-[11px] text-[#6E655F] hover:text-[#D9531E] font-bold">
            ← Back to Storefront
          </Link>
        </div>

      </div>
    </div>
  );
}
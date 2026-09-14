'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'buyer', // 'buyer' or 'seller'
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Save user session locally or submit to your backend API endpoint
    localStorage.setItem('user_auth', JSON.stringify({
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      role: formData.role,
    }));

    // Redirect user back to home or seller dashboard based on selection
    if (formData.role === 'seller') {
      window.location.href = '/seller/dashboard';
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-4 text-[#2B231D]">
      <div className="bg-white rounded-2xl border border-[#EFECE6] p-8 max-w-md w-full shadow-lg space-y-6">
        <div className="text-center space-y-1">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl mx-auto mb-2">
            HS
          </div>
          <h1 className="text-2xl font-black">Create Your Account</h1>
          <p className="text-xs text-[#6E655F]">Join Habesha Suq to buy or sell wholesale products</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-xl text-xs font-bold border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
          <div>
            <label className="block mb-1 text-[#6E655F]">Account Type</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none bg-white font-semibold"
            >
              <option value="buyer">Buyer (Restaurants, Retailers, Individual)</option>
              <option value="seller">Seller / Supplier (Merchant)</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 text-[#6E655F]">Full Name</label>
            <input
              required
              type="text"
              name="fullName"
              placeholder="e.g. Abebe Bikila"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#6E655F]">Phone Number</label>
            <input
              required
              type="tel"
              name="phone"
              placeholder="0912345678"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
            />
          </div>

          <div>
            <label className="block mb-1 text-[#6E655F]">Email Address</label>
            <input
              required
              type="email"
              name="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block mb-1 text-[#6E655F]">Password</label>
              <input
                required
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
              />
            </div>
            <div>
              <label className="block mb-1 text-[#6E655F]">Confirm Password</label>
              <input
                required
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border border-[#EFECE6] rounded-xl p-3 focus:outline-none font-semibold"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D9531E] hover:bg-[#B84216] text-white py-3 rounded-xl font-black text-sm transition shadow-sm mt-2"
          >
            Register Account
          </button>
        </form>

        <div className="text-center text-xs text-[#6E655F] pt-2 border-t border-[#EFECE6]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#D9531E] font-extrabold hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
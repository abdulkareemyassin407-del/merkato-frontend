'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  // In a real session, this role comes from your logged-in user profile.
  // Set this to 'ADMIN' when logged into your account, or null/'CUSTOMER' for regular visitors.
  const [userRole, setUserRole] = useState<'ADMIN' | 'SELLER' | 'CUSTOMER' | null>('ADMIN');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 dark:bg-gray-900 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
            ሀበሻ ሱቅ <span className="text-sm font-semibold text-gray-500">(Habesha Suq)</span>
          </span>
        </Link>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <input
            type="text"
            placeholder="ምርቶችን ይፈልጉ... (Search products...)"
            className="w-full px-4 py-2 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
          />
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/seller/dashboard" className="text-gray-700 hover:text-emerald-600 dark:text-gray-300">
            የሻጭ ገፅ (Seller Hub)
          </Link>

          <Link href="/account" className="text-gray-700 hover:text-emerald-600 dark:text-gray-300">
            የኔ መለያ (My Account)
          </Link>

          {/* ADMIN BUTTON: Only renders if userRole is strictly 'ADMIN' */}
          {userRole === 'ADMIN' && (
            <Link
              href="/admin"
              className="bg-amber-500 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-amber-600 transition shadow-sm"
            >
              👑 አስተዳዳሪ (Admin)
            </Link>
          )}
        </div>

      </div>
    </header>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'favorites' | 'addresses' | 'notifications'>('orders');

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans pb-16">
      {/* Top Header */}
      <header className="bg-white border-b border-[#EFECE6] px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">HS</div>
          <div>
            <span className="text-xl font-black text-[#2B231D]">ሀበሻ ሱቅ</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">Habesha Suq</span>
          </div>
        </Link>
        <Link href="/" className="text-xs font-bold text-[#6E655F] hover:text-[#D9531E]">
          ← Back to Marketplace
        </Link>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {/* User Profile Summary */}
        <div className="bg-white rounded-3xl border border-[#EFECE6] p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[#FFF2ED] text-[#D9531E] border border-[#FFD8CC] rounded-full flex items-center justify-center font-black text-2xl">
              👤
            </div>
            <div>
              <h1 className="text-xl font-black text-[#2B231D]">የኔ መለያ (My Account)</h1>
              <p className="text-xs text-[#6E655F] font-medium">Manage your orders, saved items, and delivery preferences in Addis Ababa.</p>
            </div>
          </div>
          <button className="bg-[#FAF7F2] border border-[#EFECE6] text-xs font-bold px-4 py-2 rounded-xl text-[#6E655F] hover:text-[#D9531E]">
            ⚙️ Edit Settings
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EFECE6] space-x-6 text-xs font-extrabold text-[#6E655F]">
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`pb-3 ${activeTab === 'orders' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            📦 የኔ ትዕዛዞች (My Orders)
          </button>
          <button 
            onClick={() => setActiveTab('favorites')} 
            className={`pb-3 ${activeTab === 'favorites' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            ❤️ የተወደዱ (Favorites)
          </button>
          <button 
            onClick={() => setActiveTab('addresses')} 
            className={`pb-3 ${activeTab === 'addresses' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            📍 አድራሻዎች (Addresses)
          </button>
          <button 
            onClick={() => setActiveTab('notifications')} 
            className={`pb-3 ${activeTab === 'notifications' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            🔔 ማስታወቂያዎች (Notifications)
          </button>
        </div>

        {/* Tab Contents */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-[#2B231D] uppercase tracking-wider">Recent Orders</h2>
            
            {/* Example Active Order Card */}
            <div className="border border-[#EFECE6] rounded-xl p-4 bg-[#FAF7F2] space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="font-black text-[#2B231D]">Order #1024</span>
                <span className="text-[#6E655F]">Placed: September 2026</span>
                <span className="bg-[#E8F5E9] text-[#137333] font-black px-3 py-1 rounded-full text-[10px]">Active Order</span>
              </div>

              {/* Order Status Visual Progress */}
              <div className="space-y-2 pt-2 border-t border-[#EFECE6] text-xs font-bold">
                <div className="flex items-center gap-2 text-[#137333]">
                  <span>🟢</span>
                  <span>Order Received & Confirmed (ተረጋግጧል)</span>
                </div>
                <div className="flex items-center gap-2 text-[#137333]">
                  <span>🟢</span>
                  <span>Seller Preparing Stock (ሻጩ በማዘጋጀት ላይ ነው)</span>
                </div>
                <div className="flex items-center gap-2 text-[#B84216]">
                  <span>🟡</span>
                  <span>Out for Delivery (ለማድረስ ተልኳል - Sub-City: Bole)</span>
                </div>
                <div className="flex items-center gap-2 text-[#9E948C]">
                  <span>⚪</span>
                  <span>Delivered (ደርሷል)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'favorites' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm text-center py-10 space-y-2">
            <span className="text-3xl block">❤️</span>
            <p className="text-xs font-bold text-[#2B231D]">No saved products yet</p>
            <p className="text-[11px] text-[#6E655F]">Browse wholesale foods and click the heart icon to save products here.</p>
          </div>
        )}

        {activeTab === 'addresses' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
            <h2 className="text-sm font-black text-[#2B231D]">Default Delivery Sub-City</h2>
            <div className="p-4 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] text-xs space-y-1">
              <p className="font-bold text-[#2B231D]">📍 Addis Ababa, Bole Sub-City</p>
              <p className="text-[#6E655F]">Contact Hotline: +251 900 000 000</p>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-3">
            <h2 className="text-sm font-black text-[#2B231D]">System Announcements</h2>
            <div className="p-3 border-l-4 border-[#D9531E] bg-[#FFF2ED] text-xs space-y-1">
              <p className="font-bold text-[#B84216]">Welcome to Habesha Suq / ሀበሻ ሱቅ</p>
              <p className="text-[#6E655F]">Your account hub is now configured for Addis wholesale order dispatch notifications.</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
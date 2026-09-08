'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function SellerRegistrationPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Banner Section */}
        <div className="bg-[#2B231D] text-white rounded-3xl p-8 shadow-sm space-y-3">
          <span className="bg-[#D9531E] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            ለአቅራቢዎችና ለንግድ ማህበራት
          </span>
          <h1 className="text-2xl md:text-3xl font-black">የሻጭ ምዝገባ (Become a Verified Seller)</h1>
          <p className="text-xs text-gray-300 max-w-2xl leading-relaxed">
            Expand your wholesale business across Addis Ababa. Sell agricultural products, packaged goods, and local products directly to retail shops and consumers.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6]">
            <span className="text-2xl block mb-2">🚚</span>
            <h3 className="text-xs font-black text-[#2B231D] mb-1">ቀጥታ ማድረስ (Direct Dispatch)</h3>
            <p className="text-[11px] text-[#6E655F]">Seamless order routing to Bole, Merkato, and all 11 Sub-Cities.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6]">
            <span className="text-2xl block mb-2">📊</span>
            <h3 className="text-xs font-black text-[#2B231D] mb-1">የሽያጭ መቆጣጠሪያ (Vendor Dashboard)</h3>
            <p className="text-[11px] text-[#6E655F]">Real-time stock management and automated revenue calculation.</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6]">
            <span className="text-2xl block mb-2">🛡️</span>
            <h3 className="text-xs font-black text-[#2B231D] mb-1">ታማኝ ክፍያ (Verified Settlements)</h3>
            <p className="text-[11px] text-[#6E655F]">Direct digital settlements with clear batch tracking.</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-white rounded-3xl border border-[#EFECE6] p-8 shadow-sm">
          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 bg-[#E8F5E9] text-[#137333] rounded-full flex items-center justify-center text-3xl mx-auto font-black">
                ✓
              </div>
              <h2 className="text-lg font-black text-[#2B231D]">ምዝገባዎ በተሳካ ሁኔታ ተልኳል!</h2>
              <p className="text-xs text-[#6E655F] max-w-md mx-auto">
                Thank you for applying. Our administration team will review your business license and contact you via phone within 24 hours.
              </p>
              <Link href="/seller/dashboard" className="inline-block mt-4 bg-[#D9531E] text-white text-xs font-bold px-6 py-2.5 rounded-xl">
                Go to Seller Dashboard Demo
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-sm font-black text-[#2B231D] uppercase tracking-wider border-b border-[#EFECE6] pb-3">
                Seller Application Form
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-[#2B231D]">
                <div>
                  <label className="block mb-1">የድርጅት ስም (Business Name)</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Addis Agro Wholesale"
                    className="w-full px-4 py-2.5 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
                  />
                </div>
                <div>
                  <label className="block mb-1">ስልክ ቁጥር (Phone Number)</label>
                  <input
                    required
                    type="tel"
                    placeholder="+251 9..."
                    className="w-full px-4 py-2.5 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D9531E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-bold text-[#2B231D]">
                <div>
                  <label className="block mb-1">ክፍለ ከተማ (Sub-City Location)</label>
                  <select className="w-full px-4 py-2.5 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D9531E]">
                    <option>Bole (ቦሌ)</option>
                    <option>Addis Ketema / Merkato (አዲስ ከተማ)</option>
                    <option>Kirkos (ኪርቆስ)</option>
                    <option>Arada (አራዳ)</option>
                    <option>Yeka (የካ)</option>
                    <option>Nifas Silk-Lafto (ንፋስ ስልክ)</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1">የምርት ዓይነት (Primary Category)</label>
                  <select className="w-full px-4 py-2.5 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] focus:outline-none focus:ring-2 focus:ring-[#D9531E]">
                    <option>Agricultural Produce (የግብርና ምርቶች)</option>
                    <option>Packaged Food Items (የታሸጉ ምግቦች)</option>
                    <option>Spices & Seasonings (ቅመማ ቅመሞች)</option>
                    <option>Beverages (መጠጦች)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#D9531E] hover:bg-[#B84216] text-white font-bold py-3 rounded-xl text-xs transition"
                >
                  አመልክት (Submit Seller Application)
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
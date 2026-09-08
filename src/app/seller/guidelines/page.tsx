'use client';

import React from 'react';
import Link from 'next/link';

export default function SellerGuidelinesPage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans pb-16">
      {/* Header */}
      <header className="bg-white border-b border-[#EFECE6] px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">HS</div>
          <div>
            <span className="text-xl font-black text-[#2B231D]">ሀበሻ ሱቅ</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">Habesha Suq</span>
          </div>
        </Link>
        <Link href="/seller/register" className="text-xs font-bold text-[#6E655F] hover:text-[#D9531E]">
          ← Back to Registration
        </Link>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        {/* Title */}
        <div className="bg-[#2B231D] text-white rounded-3xl p-8 shadow-sm space-y-2">
          <span className="bg-[#D9531E] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
            ፖሊሲ እና መመሪያዎች
          </span>
          <h1 className="text-2xl md:text-3xl font-black">የሻጭ መመሪያዎች (Seller Guidelines & Policy)</h1>
          <p className="text-xs text-gray-300">
            Operating rules and quality assurance standards for all listed suppliers on Habesha Suq.
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-4">
          
          {/* Item 1 */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#D9531E] font-black text-sm">
              <span>🌾</span>
              <h2>1. Product Quality & Authenticity (የምርት ጥራት)</h2>
            </div>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              All agricultural produce and packaged goods must meet Ethiopian regulatory safety standards. Sellers are responsible for keeping accurate weight measurements and clear expiration dates on all food items.
            </p>
          </div>

          {/* Item 2 */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#D9531E] font-black text-sm">
              <span>📦</span>
              <h2>2. Packaging & Handover (የእቃ አሸሸግና ማድረስ)</h2>
            </div>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Orders must be safely packaged and ready for dispatch within 2 hours of customer order confirmation. Dispatch teams collect orders directly from your verified shop or store address in Addis Ababa.
            </p>
          </div>

          {/* Item 3 */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#D9531E] font-black text-sm">
              <span>💳</span>
              <h2>3. Commission & Settlements (ክፍያ እና ኮሚሽን)</h2>
            </div>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Habesha Suq processes digital settlements upon verified order delivery. Commissions are calculated according to product tier and transferred according to your agreed payout schedule.
            </p>
          </div>

          {/* Item 4 */}
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-2">
            <div className="flex items-center gap-2 text-[#D9531E] font-black text-sm">
              <span>⚠️</span>
              <h2>4. Cancellations & Penalties (ትዕዛዝ መሰረዝ)</h2>
            </div>
            <p className="text-xs text-[#6E655F] leading-relaxed">
              Repeated order cancellations due to out-of-stock items will result in temporary store suspension to maintain marketplace reliability.
            </p>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-black text-[#2B231D]">Ready to join the network?</h3>
            <p className="text-xs text-[#6E655F]">Register your wholesale store today.</p>
          </div>
          <Link
            href="/seller/register"
            className="bg-[#D9531E] text-white text-xs font-bold px-6 py-2.5 rounded-xl hover:bg-[#B84216] transition"
          >
            የሻጭ ምዝገባ (Apply Now)
          </Link>
        </div>
      </main>
    </div>
  );
}
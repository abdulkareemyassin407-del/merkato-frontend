'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function SellerRegistration() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl border border-[#EFECE6]">
        <Link href="/" className="text-sm font-bold text-[#D9531E] hover:underline mb-4 inline-block">
          ← Back to Homepage
        </Link>
        
        <h1 className="text-2xl font-black mb-2">Become a Seller on Merkato</h1>
        <p className="text-sm text-[#6E655F] mb-6">Register your business to start listing food products for wholesale buyers across Addis Ababa.</p>

        {submitted ? (
          <div className="bg-[#E6F4EA] border border-[#137333] p-6 rounded-xl text-center">
            <h2 className="font-bold text-lg text-[#137333]">Application Submitted!</h2>
            <p className="text-sm mt-2 text-[#137333]">Our admin team will review your business details and contact you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-1">Business / Store Name</label>
              <input required type="text" placeholder="e.g. Merkato Grain Wholesale" className="w-full p-3 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] font-medium" />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Direct Phone Number</label>
              <input required type="tel" placeholder="0911000000" className="w-full p-3 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] font-medium" />
            </div>

            <div>
              <label className="block text-sm font-bold mb-1">Location in Addis Ababa</label>
              <input required type="text" placeholder="e.g. Merkato, Teklehaimanot" className="w-full p-3 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] font-medium" />
            </div>

            <button type="submit" className="w-full bg-[#D9531E] text-white py-3.5 rounded-xl font-bold hover:bg-[#B84216] transition">
              Submit Seller Application
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
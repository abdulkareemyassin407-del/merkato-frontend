'use client';
import React, { useState } from 'react';

export default function ProductDetail() {
  const [qty, setQty] = useState(1);
  
  // Dynamic price settings
  const [basePrice, setBasePrice] = useState(1800);
  const [discountPrice, setDiscountPrice] = useState(1720);
  const [tierThreshold, setTierThreshold] = useState(5);

  // Active unit price calculated dynamically
  const currentUnitPrice = qty >= tierThreshold ? discountPrice : basePrice;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 border border-[#EFECE6] grid md:grid-cols-2 gap-8">
        
        {/* Left Column: Image & Price Editing Control */}
        <div>
          <div className="bg-[#FAF7F2] h-80 rounded-xl flex items-center justify-center text-[#9E948C] font-bold text-xl mb-4">
            QA Test Teff Flour
          </div>

          {/* Quick Price Adjuster Widget */}
          <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EFECE6] space-y-3">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#6E655F]">Dynamic Price Settings</h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-[#6E655F] mb-1 font-semibold">Base Price (ETB)</label>
                <input 
                  type="number" 
                  value={basePrice} 
                  onChange={(e) => setBasePrice(Number(e.target.value))}
                  className="w-full p-2 border border-[#EFECE6] rounded-lg font-bold bg-white"
                />
              </div>
              <div>
                <label className="block text-[#6E655F] mb-1 font-semibold">Tier Price (5+ kg)</label>
                <input 
                  type="number" 
                  value={discountPrice} 
                  onChange={(e) => setDiscountPrice(Number(e.target.value))}
                  className="w-full p-2 border border-[#EFECE6] rounded-lg font-bold bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Details & Live Calculation */}
        <div>
          <span className="text-xs font-bold text-[#B84216] uppercase">QA BRAND</span>
          <h1 className="text-3xl font-black mt-1">QA Test Teff Flour</h1>
          <p className="text-sm text-[#6E655F] mt-1">Beans & Lentils • 1 kg</p>

          <div className="mt-4 p-3 bg-[#FAF7F2] rounded-xl border border-[#EFECE6] flex items-center justify-between">
            <div>
              <p className="font-bold text-sm">Merkato Grain & Oil Wholesale</p>
              <p className="text-xs text-[#6E655F]">Addis Ababa</p>
            </div>
            <span className="bg-[#E6F4EA] text-[#137333] text-xs font-bold px-2.5 py-1 rounded-full">
              ✓ Verified Seller
            </span>
          </div>

          {/* Active Pricing Display */}
          <div className="mt-6">
            <span className="text-3xl font-black">ETB {currentUnitPrice.toLocaleString()}</span>
            <span className="text-sm text-[#6E655F]"> per kg</span>
          </div>

          {/* Dynamic Wholesale Pricing Tiers */}
          <div className="mt-4 border border-[#EFECE6] rounded-xl overflow-hidden text-sm">
            <div className="bg-[#FAF7F2] px-4 py-2 font-bold border-b border-[#EFECE6]">Wholesale pricing</div>
            <div className={`flex justify-between px-4 py-2 border-b border-[#EFECE6] ${qty < tierThreshold ? 'bg-[#FFF2ED] font-bold' : ''}`}>
              <span>1–{tierThreshold - 1} kg {qty < tierThreshold && <span className="text-xs text-[#D9531E] ml-2">YOUR PRICE</span>}</span>
              <span>ETB {basePrice.toLocaleString()}</span>
            </div>
            <div className={`flex justify-between px-4 py-2 ${qty >= tierThreshold ? 'bg-[#FFF2ED] font-bold' : ''}`}>
              <span>{tierThreshold}+ kg {qty >= tierThreshold && <span className="text-xs text-[#D9531E] ml-2">YOUR PRICE</span>}</span>
              <span>ETB {discountPrice.toLocaleString()}</span>
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex items-center gap-4 mt-6">
            <div className="flex items-center border border-[#EFECE6] rounded-lg bg-[#FAF7F2]">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-3 py-1.5 font-bold">-</button>
              <span className="px-4 py-1.5 font-bold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="px-3 py-1.5 font-bold">+</button>
            </div>
            <span className="text-sm text-[#6E655F]">Subtotal: <strong className="text-black">ETB {(currentUnitPrice * qty).toLocaleString()}</strong></span>
          </div>

          <button className="w-full mt-6 bg-[#D9531E] text-white py-3.5 rounded-xl font-bold hover:bg-[#B84216] transition">
            Add to cart
          </button>

          <div className="mt-6 pt-6 border-t border-[#EFECE6] text-center">
            <p className="text-xs text-[#6E655F] font-medium">To complete this order or inquire directly, contact support:</p>
            <div className="flex justify-center gap-4 text-[#D9531E] font-bold text-sm mt-2">
              <a href="tel:0985077474">0985077474</a>
              <a href="tel:0932265781">0932265781</a>
              <a href="tel:0944669703">0944669703</a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
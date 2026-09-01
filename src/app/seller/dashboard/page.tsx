'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function SellerDashboard() {
  const [products, setProducts] = useState([
    { id: 1, title: 'First Grade Teff Flour', category: 'Flour', basePrice: 1800, tierPrice: 1720, tierQty: 5, status: 'Active' },
    { id: 2, title: 'Pure Sunflower Cooking Oil 5L', category: 'Cooking Oil', basePrice: 2400, tierPrice: 2280, tierQty: 10, status: 'Active' },
  ]);

  const [form, setForm] = useState({ title: '', category: 'Flour', basePrice: '', tierPrice: '', tierQty: '5' });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.basePrice) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        title: form.title,
        category: form.category,
        basePrice: Number(form.basePrice),
        tierPrice: Number(form.tierPrice || form.basePrice),
        tierQty: Number(form.tierQty),
        status: 'Active'
      }
    ]);

    setForm({ title: '', category: 'Flour', basePrice: '', tierPrice: '', tierQty: '5' });
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm">
          <div>
            <span className="text-xs font-extrabold text-[#D9531E] uppercase tracking-wider">Verified Wholesale Portal</span>
            <h1 className="text-3xl font-black mt-1">Seller Inventory Management</h1>
            <p className="text-sm text-[#6E655F]">Post wholesale products and configure tier pricing for bulk buyers.</p>
          </div>
          <Link href="/" className="bg-[#FAF7F2] border border-[#EFECE6] hover:bg-[#EFECE6] text-[#2B231D] px-4 py-2.5 rounded-xl font-bold text-sm transition text-center">
            ← View Storefront
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Left Column: Product Listing Form */}
          <div className="md:col-span-1 bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm h-fit">
            <h2 className="text-xl font-extrabold mb-1">Post New Wholesale Product</h2>
            <p className="text-xs text-[#6E655F] mb-6">Enter item details and wholesale bulk pricing tier.</p>

            {showSuccess && (
              <div className="bg-[#E6F4EA] border border-[#137333] text-[#137333] p-3 rounded-xl text-xs font-bold mb-4">
                ✓ Product listed successfully!
              </div>
            )}

            <form onSubmit={handleAddProduct} className="space-y-4 text-xs font-bold">
              <div>
                <label className="block mb-1 text-[#6E655F]">PRODUCT TITLE</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Red Lentils (ምስር)" 
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#EFECE6] bg-[#FAF7F2] font-semibold text-sm focus:outline-[#D9531E]"
                />
              </div>

              <div>
                <label className="block mb-1 text-[#6E655F]">CATEGORY</label>
                <select 
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#EFECE6] bg-[#FAF7F2] font-semibold text-sm focus:outline-[#D9531E]">
                  <option value="Flour">Flour (ዱቄት)</option>
                  <option value="Beans & Lentils">Beans & Lentils (እህል እና ምስር)</option>
                  <option value="Cooking Oil">Cooking Oil (የምግብ ዘይት)</option>
                  <option value="Spices">Spices (ቅመማ ቅመም)</option>
                  <option value="Rice">Rice (ሩዝ)</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-[#6E655F]">BASE UNIT PRICE (ETB)</label>
                <input 
                  required 
                  type="number" 
                  placeholder="1800" 
                  value={form.basePrice}
                  onChange={(e) => setForm({ ...form, basePrice: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#EFECE6] bg-[#FAF7F2] font-semibold text-sm focus:outline-[#D9531E]"
                />
              </div>

              <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#EFECE6] space-y-3">
                <span className="text-[11px] font-extrabold text-[#D9531E] uppercase">Wholesale Tier Discount</span>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[10px] text-[#6E655F] mb-1">MIN QTY (TIER)</label>
                    <input 
                      type="number" 
                      placeholder="5" 
                      value={form.tierQty}
                      onChange={(e) => setForm({ ...form, tierQty: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#EFECE6] bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] text-[#6E655F] mb-1">TIER PRICE (ETB)</label>
                    <input 
                      type="number" 
                      placeholder="1720" 
                      value={form.tierPrice}
                      onChange={(e) => setForm({ ...form, tierPrice: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-[#EFECE6] bg-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full bg-[#D9531E] text-white py-3.5 rounded-xl text-sm font-black hover:bg-[#B84216] transition shadow-sm">
                Publish Wholesale Listing
              </button>
            </form>
          </div>

          {/* Right Column: Live Inventory List */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-extrabold">Active Listings</h2>
              <span className="text-xs font-bold text-[#6E655F] bg-[#FAF7F2] border border-[#EFECE6] px-3 py-1 rounded-full">
                {products.length} Products
              </span>
            </div>

            <div className="space-y-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-xl border border-[#EFECE6] bg-[#FAF7F2] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase text-[#D9531E] bg-[#FFF2ED] px-2 py-0.5 rounded border border-[#FFD8CC]">{p.category}</span>
                    <h3 className="font-bold text-lg mt-1">{p.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-[#6E655F] mt-1 font-medium">
                      <span>Standard: <strong className="text-[#2B231D]">ETB {p.basePrice.toLocaleString()}</strong></span>
                      <span>•</span>
                      <span className="text-[#137333]">Bulk ({p.tierQty}+ units): <strong>ETB {p.tierPrice.toLocaleString()}</strong></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href="/product/1" className="bg-white border border-[#EFECE6] px-3 py-1.5 rounded-lg text-xs font-bold hover:border-[#D9531E] transition">
                      Preview
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
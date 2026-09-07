'use client';
import React, { useState } from 'react';
import Link from 'next/link';

interface ProductInput {
  name: string;
  category: string;
  price: string;
  tierPrice: string;
  tierQty: string;
  sellerPhone: string;
  imageUrl: string;
  origin: string;
}

export default function SellerDashboard() {
  const [formData, setFormData] = useState<ProductInput>({
    name: '',
    category: 'Flour',
    price: '',
    tierPrice: '',
    tierQty: '10',
    sellerPhone: '',
    imageUrl: '',
    origin: 'Addis Ababa Central Depot',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const payload = {
      name: formData.name,
      category: formData.category,
      price: Number(formData.price),
      tierPrice: Number(formData.tierPrice),
      tierQty: Number(formData.tierQty),
      sellerPhone: formData.sellerPhone,
      imageUrl: formData.imageUrl || 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop',
      origin: formData.origin,
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setMessage({ text: 'Product listed successfully! Pending admin dispatch review.', type: 'success' });
        setFormData({
          name: '',
          category: 'Flour',
          price: '',
          tierPrice: '',
          tierQty: '10',
          sellerPhone: '',
          imageUrl: '',
          origin: 'Addis Ababa Central Depot',
        });
      } else {
        setMessage({ text: 'Failed to create product listing. Check your input.', type: 'error' });
      }
    } catch {
      setMessage({ text: 'Backend service unreachable. Check API connection.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EFECE6] px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">HS</div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#2B231D]">HABESHA SUQ</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">የአቅራቢዎች መግቢያ</span>
          </div>
        </Link>
        <Link href="/" className="text-xs font-bold text-[#6E655F] hover:text-[#D9531E] transition">
          ← Exit to Marketplace
        </Link>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10">
        <div className="bg-white rounded-3xl border border-[#EFECE6] p-8 shadow-sm space-y-6">
          <div>
            <span className="bg-[#FFF2ED] text-[#B84216] border border-[#FFD8CC] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">
              Addis Supplier Portal
            </span>
            <h1 className="text-2xl font-black text-[#2B231D]">List Wholesale Inventory</h1>
            <p className="text-xs text-[#6E655F] mt-1 font-medium">
              Submit your bulk food stock to Habesha Suq. All seller contact phone numbers remain protected and accessible only to central order dispatchers.
            </p>
          </div>

          {message && (
            <div className={`p-4 rounded-xl text-xs font-bold ${message.type === 'success' ? 'bg-[#E8F5E9] text-[#137333] border border-[#C8E6C9]' : 'bg-[#FFEBEE] text-[#C62828] border border-[#FFCDD2]'}`}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-bold">
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#6E655F]">Product Name (የምርት ስም)</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. First Grade Magna Teff (ማግና ጤፍ)"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#6E655F]">Product Category</label>
                <select 
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none">
                  <option value="Flour">Flour / Grain (ዱቄትና እህል)</option>
                  <option value="Cooking Oil">Cooking Oil (የምግብ ዘይት)</option>
                  <option value="Beans & Lentils">Beans & Lentils (ምስርና አተር)</option>
                  <option value="Rice">Rice (ሩዝ)</option>
                  <option value="Spices">Spices (ቅመማ ቅመም)</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="text-[#6E655F]">Standard Unit Price (ETB)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 8500"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#137333]">Bulk Wholesale Price (ETB)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 7900"
                  value={formData.tierPrice}
                  onChange={(e) => setFormData({ ...formData, tierPrice: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#137333]">Min Bulk Quantity (Units)</label>
                <input 
                  type="number" 
                  required
                  placeholder="e.g. 10"
                  value={formData.tierQty}
                  onChange={(e) => setFormData({ ...formData, tierQty: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[#2B231D]">Supplier Direct Phone (Hidden Publicly)</label>
                <input 
                  type="tel" 
                  required
                  placeholder="0911XXXXXX"
                  value={formData.sellerPhone}
                  onChange={(e) => setFormData({ ...formData, sellerPhone: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[#6E655F]">Warehouse / Origin Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mercato / Kaliti Depot"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                  className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#6E655F]">Image URL (Optional)</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl p-3 text-xs focus:outline-none"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-[#D9531E] hover:bg-[#B84216] text-white py-3.5 rounded-xl font-extrabold text-xs shadow-md transition">
              {loading ? 'Submitting Listing...' : 'Publish Wholesale Inventory'}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
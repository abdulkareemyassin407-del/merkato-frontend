'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface AdminProduct {
  id: number;
  name: string;
  category: string;
  price: number;
  tierPrice: number;
  tierQty: number;
  sellerPhone?: string;
  origin?: string;
}

export default function AdminPortal() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          setProducts(data.data);
        }
      })
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans">
      
      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EFECE6] px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">HS</div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#2B231D]">HABESHA SUQ</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">Order Dispatch Console</span>
          </div>
        </Link>
        <Link href="/" className="text-xs font-bold text-[#6E655F] hover:text-[#D9531E] transition">
          ← Back to Site
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <span className="bg-[#D9531E] text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">
              Master Admin Control
            </span>
            <h1 className="text-2xl font-black text-[#2B231D]">Dispatch & Inventory Inspection</h1>
          </div>
          <div className="bg-white px-4 py-2 rounded-xl border border-[#EFECE6] text-xs font-bold text-[#6E655F]">
            Total Active Inventory: <strong className="text-[#D9531E]">{products.length}</strong>
          </div>
        </div>

        {loading ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center text-xs font-bold text-[#6E655F]">
            Loading central dispatch inventory...
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center space-y-2">
            <p className="font-bold text-sm text-[#2B231D]">No listings in central database</p>
            <p className="text-xs text-[#6E655F]">Sellers have not published any new products yet.</p>
          </div>
        ) : (
          <div className="bg-white border border-[#EFECE6] rounded-2xl shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#FAF7F2] border-b border-[#EFECE6] text-[#6E655F] font-black uppercase tracking-wider">
                  <th className="p-4">ID</th>
                  <th className="p-4">Product Name</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Unit Price</th>
                  <th className="p-4">Bulk Tier</th>
                  <th className="p-4">Supplier Phone (Internal)</th>
                  <th className="p-4">Origin / Depot</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE6] font-medium">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF7F2] transition">
                    <td className="p-4 font-mono font-bold text-[11px] text-[#6E655F]">#{p.id}</td>
                    <td className="p-4 font-bold text-[#2B231D]">{p.name}</td>
                    <td className="p-4"><span className="bg-[#FFF2ED] text-[#D9531E] px-2.5 py-1 rounded-lg font-bold">{p.category}</span></td>
                    <td className="p-4 font-bold">ETB {p.price.toLocaleString()}</td>
                    <td className="p-4 font-bold text-[#137333]">ETB {p.tierPrice.toLocaleString()} ({p.tierQty}+)</td>
                    <td className="p-4 font-bold text-[#2B231D]">
                      {p.sellerPhone ? (
                        <a href={`tel:${p.sellerPhone}`} className="text-[#D9531E] underline">{p.sellerPhone}</a>
                      ) : (
                        <span className="text-[#9E948C]">Not Provided</span>
                      )}
                    </td>
                    <td className="p-4 text-[#6E655F]">{p.origin || 'Addis Ababa'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
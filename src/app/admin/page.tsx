'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Seller {
  id: number;
  name: string;
  contactPerson: string;
  phone: string;
  location: string;
  status: string;
}

export default function AdminDashboard() {
  const [sellers, setSellers] = useState<Seller[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/admin/sellers`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setSellers(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex text-[#2B231D] font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-[#EFECE6] p-6 flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-9 h-9 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl">M</div>
            <div>
              <span className="font-extrabold text-lg tracking-tight">Merkato Admin</span>
              <span className="block text-[10px] font-bold text-[#D9531E] uppercase tracking-wider">Internal Portal</span>
            </div>
          </div>
        </div>

        <Link href="/" className="text-xs text-[#6E655F] hover:underline font-bold text-center block pt-4 border-t border-[#EFECE6]">
          ← Exit Admin Portal
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black">Marketplace Management</h1>
            <p className="text-sm text-[#6E655F]">Real-time live database records.</p>
          </div>
          <div className="bg-[#FFF2ED] border border-[#FFD8CC] px-4 py-2 rounded-xl flex items-center gap-2 text-xs font-bold text-[#B84216]">
            <span>🔒 Super-Admin Access</span>
          </div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <p className="text-xs text-[#6E655F] font-bold uppercase tracking-wider">Registered Sellers</p>
            <p className="text-3xl font-black mt-2 text-[#2B231D]">{sellers.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <p className="text-xs text-[#6E655F] font-bold uppercase tracking-wider">System Status</p>
            <p className="text-3xl font-black mt-2 text-[#137333]">Live</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
            <p className="text-xs text-[#6E655F] font-bold uppercase tracking-wider">Central Dispatch Desk</p>
            <p className="text-sm font-bold mt-2 text-[#D9531E]">Active (3 Hotlines)</p>
          </div>
        </div>

        {/* Private Directory Table */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm">
          <h2 className="font-extrabold text-xl mb-1">Private Seller Phone Directory</h2>
          <p className="text-xs text-[#D9531E] font-medium mb-4">⚠️ Direct seller phone numbers are confidential and visible only in this portal.</p>

          {sellers.length === 0 ? (
            <div className="py-12 text-center text-[#6E655F] text-sm">
              No registered sellers found. Registered seller accounts will populate here automatically.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-[#EFECE6] text-[#6E655F] text-xs font-bold uppercase">
                    <th className="pb-3">Business Name</th>
                    <th className="pb-3">Contact Person</th>
                    <th className="pb-3">Private Phone</th>
                    <th className="pb-3">Location</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {sellers.map((s) => (
                    <tr key={s.id}>
                      <td className="py-4 font-bold">{s.name}</td>
                      <td className="py-4 text-[#6E655F]">{s.contactPerson}</td>
                      <td className="py-4 font-mono font-bold text-[#D9531E]">{s.phone}</td>
                      <td className="py-4 text-xs">{s.location}</td>
                      <td className="py-4"><span className="bg-[#E6F4EA] text-[#137333] px-2 py-1 rounded-md text-xs font-bold">{s.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface PendingSeller {
  id: string;
  businessName: string;
  phone: string;
  subCity: string;
  category: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
}

interface DispatchOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  subCity: string;
  sellerName: string;
  items: string;
  total: number;
  status: 'RECEIVED' | 'CONFIRMED' | 'PREPARING' | 'OUT_FOR_DELIVERY' | 'DELIVERED';
}

export default function AdminConsolePage() {
  const [activeTab, setActiveTab] = useState<'sellers' | 'dispatch' | 'analytics'>('sellers');

  // Pending Sellers State
  const [sellers, setSellers] = useState<PendingSeller[]>([
    { id: 'SEL-001', businessName: 'Addis Grains PLC', phone: '+251 911 223 344', subCity: 'Merkato', category: 'Grains', status: 'PENDING' },
    { id: 'SEL-002', businessName: 'Bole Fresh Produce', phone: '+251 922 334 455', subCity: 'Bole', category: 'Agricultural', status: 'PENDING' },
  ]);

  // Dispatch Orders State
  const [orders, setOrders] = useState<DispatchOrder[]>([
    {
      id: '1024',
      customerName: 'Abebe Kebede',
      customerPhone: '+251 900 112 233',
      subCity: 'Bole',
      sellerName: 'Addis Agro Wholesale',
      items: '2x Teff (White) 100kg',
      total: 13000,
      status: 'PREPARING',
    },
    {
      id: '1025',
      customerName: 'Tigist Haile',
      customerPhone: '+251 911 445 566',
      subCity: 'Arada',
      sellerName: 'Merkato Spices Co.',
      items: '5kg Berbere',
      total: 2500,
      status: 'RECEIVED',
    },
  ]);

  const updateSellerStatus = (id: string, newStatus: 'APPROVED' | 'REJECTED') => {
    setSellers(sellers.map((s) => (s.id === id ? { ...s, status: newStatus } : s)));
  };

  const updateOrderStatus = (id: string, newStatus: DispatchOrder['status']) => {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans pb-16">
      {/* Admin Navigation Bar */}
      <header className="bg-[#2B231D] text-white px-6 lg:px-12 py-4 flex items-center justify-between border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">
            👑
          </div>
          <div>
            <span className="text-xl font-black">ሀበሻ ሱቅ - Central Dispatch</span>
            <span className="block text-[10px] font-extrabold text-amber-400 uppercase tracking-widest -mt-1">
              Admin & Dispatch Control
            </span>
          </div>
        </div>
        <Link href="/" className="text-xs font-bold text-gray-300 hover:text-white">
          ← Exit Admin Console
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EFECE6] space-x-6 text-xs font-extrabold text-[#6E655F]">
          <button
            onClick={() => setActiveTab('sellers')}
            className={`pb-3 ${activeTab === 'sellers' ? 'border-b-2 border-amber-500 text-amber-600' : 'hover:text-[#2B231D]'}`}
          >
            🏪 የሻጮች ማረጋገጫ (Seller Verification)
          </button>
          <button
            onClick={() => setActiveTab('dispatch')}
            className={`pb-3 ${activeTab === 'dispatch' ? 'border-b-2 border-amber-500 text-amber-600' : 'hover:text-[#2B231D]'}`}
          >
            🚚 ማድረስና ትዕዛዝ (Order Dispatch Console)
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`pb-3 ${activeTab === 'analytics' ? 'border-b-2 border-amber-500 text-amber-600' : 'hover:text-[#2B231D]'}`}
          >
            📈 የፕላትፎርም ስታቲስቲክስ (System Overview)
          </button>
        </div>

        {/* TAB 1: SELLER APPROVALS */}
        {activeTab === 'sellers' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-black text-[#2B231D] uppercase tracking-wider">Pending Seller Registrations</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EFECE6] text-[#6E655F]">
                    <th className="pb-3">Business Name</th>
                    <th className="pb-3">Sub-City</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Phone</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {sellers.map((s) => (
                    <tr key={s.id}>
                      <td className="py-3 font-bold">{s.businessName}</td>
                      <td className="py-3 text-[#6E655F]">{s.subCity}</td>
                      <td className="py-3 text-[#6E655F]">{s.category}</td>
                      <td className="py-3 font-mono">{s.phone}</td>
                      <td className="py-3">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-black ${
                            s.status === 'APPROVED'
                              ? 'bg-green-100 text-green-700'
                              : s.status === 'REJECTED'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-amber-100 text-amber-700'
                          }`}
                        >
                          {s.status}
                        </span>
                      </td>
                      <td className="py-3 space-x-2">
                        {s.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => updateSellerStatus(s.id, 'APPROVED')}
                              className="bg-green-600 text-white text-[10px] px-2.5 py-1 rounded font-bold hover:bg-green-700"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => updateSellerStatus(s.id, 'REJECTED')}
                              className="bg-red-600 text-white text-[10px] px-2.5 py-1 rounded font-bold hover:bg-red-700"
                            >
                              Reject
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: ORDER DISPATCH CONSOLE */}
        {activeTab === 'dispatch' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
            <h2 className="text-xs font-black text-[#2B231D] uppercase tracking-wider">Live Order Status Tracker</h2>
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="border border-[#EFECE6] rounded-xl p-4 bg-[#FAF7F2] space-y-2 text-xs">
                  <div className="flex justify-between items-center font-bold">
                    <span>Order #{ord.id} — Customer: {ord.customerName} ({ord.customerPhone})</span>
                    <span className="text-amber-600 font-black">{ord.total} ETB</span>
                  </div>
                  <p className="text-[#6E655F]">
                    <strong>Sub-City:</strong> {ord.subCity} | <strong>Seller:</strong> {ord.sellerName}
                  </p>
                  <p className="text-[#6E655F]">
                    <strong>Items:</strong> {ord.items}
                  </p>
                  <div className="flex items-center gap-3 pt-2 border-t border-[#EFECE6]">
                    <span className="font-bold">Dispatch Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as DispatchOrder['status'])}
                      className="px-3 py-1 border rounded bg-white font-bold text-xs"
                    >
                      <option value="RECEIVED">Order Received (ትዕዛዝ ተቀብለናል)</option>
                      <option value="CONFIRMED font-bold">Confirmed (ተረጋግጧል)</option>
                      <option value="PREPARING">Seller Preparing (በማዘጋጀት ላይ)</option>
                      <option value="OUT_FOR_DELIVERY">Out for Delivery (ለማድረስ ተልኳል)</option>
                      <option value="DELIVERED">Delivered (ደርሷል)</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SYSTEM OVERVIEW */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm">
              <span className="text-xs font-black text-[#6E655F] uppercase">Active Stores</span>
              <p className="text-2xl font-black text-[#2B231D] mt-2">12 Sellers</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm">
              <span className="text-xs font-black text-[#6E655F] uppercase">Total Wholesale Volume</span>
              <p className="text-2xl font-black text-amber-600 mt-2">184,500 ETB</p>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#EFECE6] shadow-sm">
              <span className="text-xs font-black text-[#6E655F] uppercase">Dispatch Coverage</span>
              <p className="text-2xl font-black text-green-700 mt-2">11 Sub-Cities</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
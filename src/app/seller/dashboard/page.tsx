'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

interface Order {
  id: string;
  customerName: string;
  subCity: string;
  items: string;
  total: number;
  status: 'New' | 'Confirmed' | 'Preparing' | 'Out for delivery' | 'Completed' | 'Cancelled';
}

export default function SellerDashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'orders' | 'profile'>('overview');

  // Sample Products State
  const [products, setProducts] = useState<Product[]>([
    { id: 'P-101', name: 'የሐበሻ ምስር (Red Lentils)', category: 'Grain & Pulses', price: 1200, stock: 45 },
    { id: 'P-102', name: 'ጤፍ / Teff (White)', category: 'Grains', price: 6500, stock: 120 },
  ]);

  // New Product Form State
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState('Grains');
  const [newProdPrice, setNewProdPrice] = useState('');
  const [newProdStock, setNewProdStock] = useState('');

  // Sample Orders State
  const [orders, setOrders] = useState<Order[]>([
    { id: 'ORD-1024', customerName: 'Abebe Kebede', subCity: 'Bole', items: '2x Teff (White)', total: 13000, status: 'Preparing' },
    { id: 'ORD-1025', customerName: 'Tigist Haile', subCity: 'Kirkos', items: '1x Red Lentils', total: 1200, status: 'New' },
  ]);

  // Handle Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdName || !newProdPrice || !newProdStock) return;

    const newProd: Product = {
      id: `P-${Date.now().toString().slice(-3)}`,
      name: newProdName,
      category: newProdCategory,
      price: parseFloat(newProdPrice),
      stock: parseInt(newProdStock),
    };

    setProducts([...products, newProd]);
    setNewProdName('');
    setNewProdPrice('');
    setNewProdStock('');
  };

  // Handle Order Status Change
  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(orders.map(ord => ord.id === orderId ? { ...ord, status: newStatus } : ord));
  };

  // Handle Delete Product
  const deleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans pb-16">
      {/* Header */}
      <header className="bg-white border-b border-[#EFECE6] px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">HS</div>
          <div>
            <span className="text-xl font-black text-[#2B231D]">ሀበሻ ሱቅ</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">Seller Hub</span>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <span className="bg-[#E8F5E9] text-[#137333] border border-[#A5D6A7] text-[10px] font-black px-3 py-1 rounded-full uppercase">
            🟢 Verified Store
          </span>
          <Link href="/" className="text-xs font-bold text-[#6E655F] hover:text-[#D9531E]">
            Exit Dashboard
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#EFECE6] space-x-6 text-xs font-extrabold text-[#6E655F]">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`pb-3 ${activeTab === 'overview' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            📊 ዳሽቦርድ (Overview)
          </button>
          <button 
            onClick={() => setActiveTab('products')} 
            className={`pb-3 ${activeTab === 'products' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            📦 ምርቶች (Products & Stock)
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`pb-3 ${activeTab === 'orders' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            🛍️ ትዕዛዞች (Orders Pipeline)
          </button>
          <button 
            onClick={() => setActiveTab('profile')} 
            className={`pb-3 ${activeTab === 'profile' ? 'border-b-2 border-[#D9531E] text-[#D9531E]' : 'hover:text-[#2B231D]'}`}>
            ⚙️ ፕሮፋይል (Store Profile)
          </button>
        </div>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
                <p className="text-[10px] font-black text-[#6E655F] uppercase">Total Sales</p>
                <p className="text-xl font-black text-[#2B231D] mt-1">14,200 ETB</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
                <p className="text-[10px] font-black text-[#6E655F] uppercase">Pending Orders</p>
                <p className="text-xl font-black text-[#D9531E] mt-1">{orders.filter(o => o.status !== 'Completed' && o.status !== 'Cancelled').length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
                <p className="text-[10px] font-black text-[#6E655F] uppercase">Completed Orders</p>
                <p className="text-xl font-black text-[#137333] mt-1">{orders.filter(o => o.status === 'Completed').length}</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
                <p className="text-[10px] font-black text-[#6E655F] uppercase">Total Stock</p>
                <p className="text-xl font-black text-[#2B231D] mt-1">{products.reduce((acc, p) => acc + p.stock, 0)} Units</p>
              </div>
              <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
                <p className="text-[10px] font-black text-[#6E655F] uppercase">Net Earnings</p>
                <p className="text-xl font-black text-[#137333] mt-1">13,490 ETB</p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm">
              <h3 className="text-xs font-black text-[#2B231D] uppercase tracking-wider mb-4">Quick Actions</h3>
              <div className="flex gap-4">
                <button onClick={() => setActiveTab('products')} className="bg-[#D9531E] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#B84216]">
                  + Add New Product
                </button>
                <button onClick={() => setActiveTab('orders')} className="bg-[#FAF7F2] border border-[#EFECE6] text-xs font-bold px-4 py-2.5 rounded-xl text-[#2B231D]">
                  View Active Orders
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Add Product Form */}
            <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
              <h3 className="text-xs font-black text-[#2B231D] uppercase tracking-wider">Add Wholesale Product</h3>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs font-bold">
                <input
                  type="text"
                  placeholder="Product Name (ምርት ስም)"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="px-4 py-2 border rounded-xl bg-[#FAF7F2]"
                />
                <select
                  value={newProdCategory}
                  onChange={(e) => setNewProdCategory(e.target.value)}
                  className="px-4 py-2 border rounded-xl bg-[#FAF7F2]"
                >
                  <option>Grains (እህል)</option>
                  <option>Grain & Pulses (ጥራጥሬ)</option>
                  <option>Spices (ቅመማ ቅመም)</option>
                </select>
                <input
                  type="number"
                  placeholder="Price (ETB)"
                  value={newProdPrice}
                  onChange={(e) => setNewProdPrice(e.target.value)}
                  className="px-4 py-2 border rounded-xl bg-[#FAF7F2]"
                />
                <input
                  type="number"
                  placeholder="Stock Quantity"
                  value={newProdStock}
                  onChange={(e) => setNewProdStock(e.target.value)}
                  className="px-4 py-2 border rounded-xl bg-[#FAF7F2]"
                />
                <button type="submit" className="md:col-span-4 bg-[#D9531E] text-white py-2.5 rounded-xl font-bold">
                  Publish Item
                </button>
              </form>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm overflow-x-auto">
              <h3 className="text-xs font-black text-[#2B231D] uppercase tracking-wider mb-4">Current Inventory</h3>
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#EFECE6] text-[#6E655F]">
                    <th className="pb-3">Product</th>
                    <th className="pb-3">Category</th>
                    <th className="pb-3">Price</th>
                    <th className="pb-3">Stock</th>
                    <th className="pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 font-bold">{p.name}</td>
                      <td className="py-3 text-[#6E655F]">{p.category}</td>
                      <td className="py-3 font-bold">{p.price} ETB</td>
                      <td className="py-3">{p.stock} units</td>
                      <td className="py-3 space-x-2">
                        <button onClick={() => deleteProduct(p.id)} className="text-red-600 hover:underline font-bold">
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-[#2B231D] uppercase tracking-wider">Order Management Pipeline</h3>
            <div className="space-y-4">
              {orders.map((ord) => (
                <div key={ord.id} className="border border-[#EFECE6] rounded-xl p-4 bg-[#FAF7F2] space-y-3">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span>{ord.id} - {ord.customerName} ({ord.subCity})</span>
                    <span className="text-[#D9531E] font-black">{ord.total} ETB</span>
                  </div>
                  <p className="text-xs text-[#6E655F]">{ord.items}</p>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-bold">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as Order['status'])}
                      className="px-3 py-1 border rounded-lg bg-white font-bold text-xs"
                    >
                      <option value="New">New</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Preparing">Preparing</option>
                      <option value="Out for delivery">Out for delivery</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROFILE TAB */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-[#2B231D] uppercase tracking-wider">Verification & Store Profile</h3>
            <div className="p-4 border border-[#EFECE6] rounded-xl bg-[#FAF7F2] space-y-2 text-xs">
              <p><strong>Business Name:</strong> Addis Agro Wholesale</p>
              <p><strong>Verification Status:</strong> <span className="text-green-700 font-bold">VERIFIED 🟢</span></p>
              <p><strong>Operating Sub-City:</strong> Merkato / Addis Ketema</p>
              <p><strong>License ID:</strong> ETH-AGRO-2026-99</p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
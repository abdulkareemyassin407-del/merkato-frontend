'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  sellerId: string;
  name: string;
  category: string;
  price: number;
  tierPrice: number;
  tierQty: number;
  stock: number;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

interface Order {
  id: string;
  sellerId: string;
  customerName: string;
  items: string;
  total: number;
  status: 'Pending' | 'Dispatched' | 'Delivered';
  date: string;
}

const CATEGORIES = [
  'Flour',
  'Rice',
  'Grains',
  'Coffee',
  'Macaroni & Pasta',
  'Packed Food',
  'Drinks',
  'Oil',
  'Salt & Sugar',
  'Sauces',
  'Canned',
  'Dairy',
  'Baby Foods',
];

const TRANSLATIONS = {
  en: {
    dashboardTitle: "Seller Portal Dashboard",
    overview: "Overview",
    quickActions: "Quick Actions",
    addProduct: "+ Add New Product",
    viewOrders: "View Active Orders",
    inventoryTitle: "Product & Stock Inventory",
    orderPipeline: "Order Pipeline",
    totalProducts: "My Active Products",
    totalOrders: "My Total Orders",
    pendingOrders: "My Pending Orders",
    productName: "Product Name",
    category: "Category",
    price: "Base Price (ETB)",
    tierPrice: "Bulk Price (ETB)",
    stock: "Stock Qty",
    status: "Status",
    actions: "Actions",
    noInventory: "No products added yet. Use '+ Add New Product' to list your items.",
    noOrders: "No active orders found for your account.",
    delete: "Delete",
  },
  am: {
    dashboardTitle: "የአቅራቢዎች መቆጣጠሪያ ሰሌዳ",
    overview: "አጠቃላይ እይታ",
    quickActions: "ፈጣን እርምጃዎች",
    addProduct: "+ አዲስ ምርት ጨምር",
    viewOrders: "ንቁ ትዕዛዞችን ይመልከቱ",
    inventoryTitle: "ምርቶች እና የእቃ ክምችት",
    orderPipeline: "የትዕዛዝ ሂደት",
    totalProducts: "የእኔ ንቁ ምርቶች",
    totalOrders: "የእኔ ጠቅላላ ትዕዛዞች",
    pendingOrders: "የእኔ በመጠባበቅ ላይ ያሉ ትዕዛዞች",
    productName: "የምርት ስም",
    category: "ምድብ",
    price: "መደበኛ ዋጋ (ETB)",
    tierPrice: "የጅምላ ዋጋ (ETB)",
    stock: "የክምችት መጠን",
    status: "ሁኔታ",
    actions: "እርምጃዎች",
    noInventory: "እስካሁን ምንም ምርቶች አልተጨመሩም። ምርቶችዎን ለመዘርዘር '+ አዲስ ምርት ጨምር' ይጠቀሙ።",
    noOrders: "ለእርስዎ መለያ ምንም ንቁ ትዕዛዞች አልተገኙም።",
    delete: "ሰርዝ",
  },
  ar: {
    dashboardTitle: "لوحة تحكم البائع",
    overview: "نظرة عامة",
    quickActions: "إجراءات سريعة",
    addProduct: "+ إضافة منتج جديد",
    viewOrders: "عرض الطلبات النشطة",
    inventoryTitle: "المنتجات والمخزون",
    orderPipeline: "متابعة الطلبات",
    totalProducts: "منتجاتي النشطة",
    totalOrders: "إجمالي طلباتي",
    pendingOrders: "طلباتي قيد الانتظار",
    productName: "اسم المنتج",
    category: "الفئة",
    price: "السعر الأساسي (ETB)",
    tierPrice: "سعر الجملة (ETB)",
    stock: "كمية المخزون",
    status: "الحالة",
    actions: "الإجراءات",
    noInventory: "لم يتم إضافة منتجات بعد. استخدم '+ إضافة منتج جديد' لإدراج منتجاتك.",
    noOrders: "لا توجد طلبات نشطة لحسابك.",
    delete: "حذف",
  }
};

export default function SellerDashboard() {
  const [lang, setLang] = useState<'en' | 'am' | 'ar'>('am');
  const [sellerId, setSellerId] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for New Product
  const [newProductName, setNewProductName] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES[0]);
  const [newPrice, setNewPrice] = useState('');
  const [newTierPrice, setNewTierPrice] = useState('');
  const [newTierQty, setNewTierQty] = useState('10');
  const [newStock, setNewStock] = useState('');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // 1. Retrieve logged-in seller ID or set a default unique session ID
    let currentSeller = localStorage.getItem('logged_seller_id');
    if (!currentSeller) {
      currentSeller = 'seller_' + Date.now();
      localStorage.setItem('logged_seller_id', currentSeller);
    }
    setSellerId(currentSeller);

    // 2. Fetch products and filter strictly by logged-in seller ID
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          const myProducts = data.data.filter((p: Product) => p.sellerId === currentSeller);
          setProducts(myProducts);
        } else {
          setProducts([]);
        }
      })
      .catch(() => setProducts([]));
  }, []);

  // Filter Overview & Data strictly for logged-in user
  const userProducts = products.filter(p => p.sellerId === sellerId);
  const userOrders = orders.filter(o => o.sellerId === sellerId);
  const pendingOrdersCount = userOrders.filter(o => o.status === 'Pending').length;

  // Handle adding product assigned to the logged-in seller ID
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productPayload = {
      sellerId,
      name: newProductName,
      category: newCategory,
      price: Number(newPrice),
      tierPrice: Number(newTierPrice),
      tierQty: Number(newTierQty),
      stock: Number(newStock),
      status: Number(newStock) > 5 ? 'In Stock' : Number(newStock) > 0 ? 'Low Stock' : 'Out of Stock'
    };

    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(productPayload)
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setProducts(prev => [...prev, data.data]);
          setShowAddModal(false);
          setNewProductName('');
          setNewPrice('');
          setNewTierPrice('');
          setNewStock('');
        }
      })
      .catch(err => console.error('Failed to add product:', err));
  };

  // Handle deleting a product by ID
  const handleDeleteProduct = (id: number) => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProducts(prev => prev.filter(p => p.id !== id));
      })
      .catch(() => {
        // Fallback for UI state update if API fails or runs in memory
        setProducts(prev => prev.filter(p => p.id !== id));
      });
  };

  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#EFECE6] px-4 lg:px-12 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-lg shadow-sm">HS</div>
          <div>
            <span className="text-lg font-black tracking-tight text-[#2B231D]">HABESHA SUQ</span>
            <span className="block text-[9px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">Seller Dashboard</span>
          </div>
        </Link>

        {/* Language Switcher */}
        <div className="bg-[#FAF7F2] p-1 rounded-xl border border-[#EFECE6] flex text-[11px] font-bold">
          <button onClick={() => setLang('en')} className={`px-2 py-0.5 rounded-lg ${lang === 'en' ? 'bg-white text-[#D9531E] shadow-sm' : 'text-[#6E655F]'}`}>EN</button>
          <button onClick={() => setLang('am')} className={`px-2 py-0.5 rounded-lg ${lang === 'am' ? 'bg-white text-[#D9531E] shadow-sm' : 'text-[#6E655F]'}`}>አማ</button>
          <button onClick={() => setLang('ar')} className={`px-2 py-0.5 rounded-lg ${lang === 'ar' ? 'bg-white text-[#D9531E] shadow-sm' : 'text-[#6E655F]'}`}>عربي</button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-12 py-8 space-y-8">
        
        {/* Title & Quick Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black">{t.dashboardTitle}</h1>
            <p className="text-xs text-[#6E655F]">Logged ID: <code className="bg-white px-1.5 py-0.5 rounded border border-[#EFECE6]">{sellerId}</code></p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowAddModal(true)}
              className="bg-[#D9531E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#B84216] transition shadow-sm">
              {t.addProduct}
            </button>
            <a href="#orders" className="bg-white border border-[#EFECE6] px-4 py-2 rounded-xl text-xs font-bold text-[#6E655F] hover:bg-[#FAF7F2]">
              {t.viewOrders}
            </a>
          </div>
        </div>

        {/* Overview Cards (Only for Logged-In User) */}
        <div>
          <h2 className="text-sm font-black text-[#6E655F] uppercase tracking-wider mb-3">{t.overview}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
              <span className="text-xs font-bold text-[#6E655F]">{t.totalProducts}</span>
              <p className="text-3xl font-black text-[#2B231D] mt-1">{userProducts.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
              <span className="text-xs font-bold text-[#6E655F]">{t.totalOrders}</span>
              <p className="text-3xl font-black text-[#2B231D] mt-1">{userOrders.length}</p>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-[#EFECE6] shadow-sm">
              <span className="text-xs font-bold text-[#6E655F]">{t.pendingOrders}</span>
              <p className="text-3xl font-black text-[#D9531E] mt-1">{pendingOrdersCount}</p>
            </div>
          </div>
        </div>

        {/* Product & Stock Inventory Table */}
        <div className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-black">{t.inventoryTitle}</h2>
            <span className="text-xs font-bold text-[#6E655F]">{userProducts.length} Items</span>
          </div>

          {userProducts.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#6E655F]">{t.noInventory}</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-[#EFECE6] text-[#6E655F] uppercase font-black">
                    <th className="py-3 px-2">{t.productName}</th>
                    <th className="py-3 px-2">{t.category}</th>
                    <th className="py-3 px-2">{t.price}</th>
                    <th className="py-3 px-2">{t.tierPrice}</th>
                    <th className="py-3 px-2">{t.stock}</th>
                    <th className="py-3 px-2">{t.status}</th>
                    <th className="py-3 px-2">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {userProducts.map((p) => (
                    <tr key={p.id} className="font-semibold">
                      <td className="py-3 px-2 font-bold">{p.name}</td>
                      <td className="py-3 px-2 text-[#6E655F]">{p.category}</td>
                      <td className="py-3 px-2">ETB {p.price?.toLocaleString()}</td>
                      <td className="py-3 px-2 text-[#137333]">ETB {p.tierPrice?.toLocaleString()} ({p.tierQty}+)</td>
                      <td className="py-3 px-2">{p.stock}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          p.status === 'In Stock' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <button 
                          onClick={() => handleDeleteProduct(p.id)}
                          className="bg-red-50 text-red-600 hover:bg-red-100 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-red-200">
                          {t.delete}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Pipeline Section (Only User Orders) */}
        <div id="orders" className="bg-white rounded-2xl border border-[#EFECE6] p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-black">{t.orderPipeline}</h2>

          {userOrders.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#6E655F]">{t.noOrders}</div>
          ) : (
            <div className="divide-y divide-[#EFECE6]">
              {userOrders.map((o) => (
                <div key={o.id} className="py-3 flex justify-between items-center text-xs font-bold">
                  <div>
                    <span className="text-[#D9531E]">#{o.id}</span> - <span>{o.customerName}</span>
                    <p className="text-[11px] text-[#6E655F] font-normal">{o.items}</p>
                  </div>
                  <div className="text-right">
                    <span>ETB {o.total.toLocaleString()}</span>
                    <span className="block text-[10px] uppercase text-[#137333]">{o.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-[#EFECE6] pb-3">
              <h3 className="font-black text-base">{t.addProduct}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs font-bold">
              <div>
                <label className="block mb-1 text-[#6E655F]">{t.productName}</label>
                <input required type="text" value={newProductName} onChange={e => setNewProductName(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" />
              </div>

              <div>
                <label className="block mb-1 text-[#6E655F]">{t.category}</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none bg-white">
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.price}</label>
                  <input required type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" />
                </div>
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.tierPrice}</label>
                  <input required type="number" value={newTierPrice} onChange={e => setNewTierPrice(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-[#6E655F]">Bulk Minimum Qty</label>
                  <input required type="number" value={newTierQty} onChange={e => setNewTierQty(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" />
                </div>
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.stock}</label>
                  <input required type="number" value={newStock} onChange={e => setNewStock(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" />
                </div>
              </div>

              <button type="submit" className="w-full bg-[#D9531E] text-white py-3 rounded-xl font-black text-xs hover:bg-[#B84216] transition mt-2">
                Save Product
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
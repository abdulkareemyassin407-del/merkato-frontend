'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Product {
  id: number;
  sellerId: string;
  name: string;
  category: string;
  kgPrice?: number;
  weightPerPiece: number; // e.g., 1 piece = 25 kg
  tierPrice: number;      // Price in bulk
  minBulkQty: number;     // Minimum order in bulk
  maxBulkQty: number;     // Maximum order in bulk
  stock: number;
  imageUrl: string;
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

// Multi-language translated categories matching Storefront & Database Schema
const CATEGORIES_TRANSLATED = [
  { key: 'Flour', en: 'Flour', am: 'ዱቄት', ar: 'دقيق' },
  { key: 'Rice', en: 'Rice', am: 'ሩዝ', ar: 'أرز' },
  { key: 'Grains', en: 'Grains', am: 'እህል', ar: 'حبوب' },
  { key: 'Coffee', en: 'Coffee', am: 'ቡና', ar: 'قهوة' },
  { key: 'Macroni and Pasta', en: 'Macroni and Pasta', am: 'ማካሮኒ እና ፓስታ', ar: 'معكرونة و بستا' },
  { key: 'Packed Food', en: 'Packed Food', am: 'የታሸጉ ምግቦች', ar: 'أطعمة معلبة' },
  { key: 'Drinks', en: 'Drinks', am: 'መጠጦች', ar: 'مشروبات' },
  { key: 'Oil', en: 'Oil', am: 'ዘይት', ar: 'زيت' },
  { key: 'Salt and Sugar', en: 'Salt and Sugar', am: 'ጨው እና ስኳር', ar: 'ملح وسكر' },
  { key: 'Sauces', en: 'Sauces', am: 'ሶሶች', ar: 'صلصات' },
  { key: 'Canned', en: 'Canned', am: 'የታሸጉ የቆርቆሮ ምግቦች', ar: 'أغذية محفوظة' },
  { key: 'Dairy', en: 'Dairy', am: 'የወተት ተዋጽኦዎች', ar: 'منتجات الألبان' },
  { key: 'Baby Foods', en: 'Baby Foods', am: 'የሕፃናት ምግቦች', ar: 'أغذية الأطفال' },
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
    kgPrice: "Price per Kg (ETB)",
    weightPerPiece: "Kg per Piece/Bag (e.g. 25kg)",
    bulkPrice: "Price in Bulk (ETB)",
    minBulkQty: "Min Bulk Order Qty",
    maxBulkQty: "Max Bulk Order Qty",
    stock: "Stock Qty (Pieces)",
    status: "Status",
    actions: "Actions",
    noInventory: "No products added yet. Use '+ Add New Product' to list your items.",
    noOrders: "No active orders found for your account.",
    delete: "Delete",
    imageFileLabel: "Product Photo (Upload / Camera)",
    saveProduct: "Save Product",
    requiredNotice: "* Required fields",
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
    kgPrice: "የአንድ ኪሎ ዋጋ (ETB)",
    weightPerPiece: "በአንድ ጆንያ/ቁራጭ የኪሎ መጠን (ምሳሌ፡ 25 ኪሎ)",
    bulkPrice: "የጅምላ ዋጋ (ETB)",
    minBulkQty: "አነስተኛ የጅምላ ትዕዛዝ ብዛት",
    maxBulkQty: "ከፍተኛ የጅምላ ትዕዛዝ ብዛት",
    stock: "የክምችት መጠን (በቁራጭ/ጆንያ)",
    status: "ሁኔታ",
    actions: "እርምጃዎች",
    noInventory: "እስካሁን ምንም ምርቶች አልተጨመሩም። ምርቶችዎን ለመዘርዘር '+ አዲስ ምርት ጨምር' ይጠቀሙ።",
    noOrders: "ለእርስዎ መለያ ምንም ንቁ ትዕዛዞች አልተገኙም።",
    delete: "ሰርዝ",
    imageFileLabel: "የምርት ፎቶ (ከፋይል ወይም ካሜራ ይምረጡ)",
    saveProduct: "ምርቱን መዝግብ",
    requiredNotice: "* ግዴታ የሚሞሉ መስኮች",
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
    kgPrice: "السعر لكل كيلو (ETB)",
    weightPerPiece: "الوزن بالكرتون/القطعة (مثال: 25 كجم)",
    bulkPrice: "سعر الجملة (ETB)",
    minBulkQty: "أدنى كمية للطلب بالجملة",
    maxBulkQty: "أقصى كمية للطلب بالجملة",
    stock: "كمية المخزون (بالقطعة)",
    status: "الحالة",
    actions: "الإجراءات",
    noInventory: "لم يتم إضافة منتجات بعد. استخدم '+ إضافة منتج جديد' لإدراج منتجاتك.",
    noOrders: "لا توجد طلبات نشطة لحسابك.",
    delete: "حذف",
    imageFileLabel: "صورة المنتج (تحميل من الجهاز أو الكاميرا)",
    saveProduct: "حفظ المنتج",
    requiredNotice: "* الحقول المطلوبة",
  }
};

export default function SellerDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [lang, setLang] = useState<'en' | 'am' | 'ar'>('am');
  const [sellerId, setSellerId] = useState<string>('');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State
  const [newProductName, setNewProductName] = useState('');
  const [newCategory, setNewCategory] = useState(CATEGORIES_TRANSLATED[0].key);
  const [newImageBase64, setNewImageBase64] = useState('');
  const [newKgPrice, setNewKgPrice] = useState('');
  const [newWeightPerPiece, setNewWeightPerPiece] = useState('25');
  const [newBulkPrice, setNewBulkPrice] = useState('');
  const [newMinBulkQty, setNewMinBulkQty] = useState('1');
  const [newMaxBulkQty, setNewMaxBulkQty] = useState('100');
  const [newStock, setNewStock] = useState('');

  const t = TRANSLATIONS[lang];

  useEffect(() => {
    // Check Authentication Status
    const savedAuth = localStorage.getItem('user_auth');
    const authData = savedAuth ? JSON.parse(savedAuth) : null;

    if (!authData || !authData.isLoggedIn) {
      router.push('/login');
      return;
    } else {
      setIsAuthorized(true);
    }

    // Retrieve logged-in seller ID or set default session ID
    let currentSeller = localStorage.getItem('logged_seller_id');
    if (!currentSeller) {
      currentSeller = 'seller_' + Date.now();
      localStorage.setItem('logged_seller_id', currentSeller);
    }
    setSellerId(currentSeller);

    // Fetch products and filter strictly by logged-in seller ID
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
  }, [router]);

  // Convert uploaded image file to Base64 Data URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImageBase64(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-xs font-bold text-[#6E655F]">
        Checking login status...
      </div>
    );
  }

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
      imageUrl: newImageBase64,
      kgPrice: newKgPrice ? Number(newKgPrice) : undefined,
      weightPerPiece: Number(newWeightPerPiece),
      tierPrice: Number(newBulkPrice),
      minBulkQty: Number(newMinBulkQty),
      maxBulkQty: Number(newMaxBulkQty),
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
          setNewImageBase64('');
          setNewKgPrice('');
          setNewWeightPerPiece('25');
          setNewBulkPrice('');
          setNewMinBulkQty('1');
          setNewMaxBulkQty('100');
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

        {/* Overview Cards */}
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

        {/* Inventory Table */}
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
                    <th className="py-3 px-2">Image</th>
                    <th className="py-3 px-2">{t.productName}</th>
                    <th className="py-3 px-2">{t.category}</th>
                    <th className="py-3 px-2">{t.kgPrice}</th>
                    <th className="py-3 px-2">{t.weightPerPiece}</th>
                    <th className="py-3 px-2">{t.bulkPrice}</th>
                    <th className="py-3 px-2">Bulk Range (Min-Max)</th>
                    <th className="py-3 px-2">{t.stock}</th>
                    <th className="py-3 px-2">{t.status}</th>
                    <th className="py-3 px-2">{t.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE6]">
                  {userProducts.map((p) => (
                    <tr key={p.id} className="font-semibold">
                      <td className="py-3 px-2">
                        {p.imageUrl ? (
                          <img src={p.imageUrl} alt={p.name} className="w-8 h-8 rounded-lg object-cover border border-[#EFECE6]" />
                        ) : (
                          <div className="w-8 h-8 rounded-lg bg-[#FAF7F2] border border-[#EFECE6] flex items-center justify-center text-[10px]">📷</div>
                        )}
                      </td>
                      <td className="py-3 px-2 font-bold">{p.name}</td>
                      <td className="py-3 px-2 text-[#6E655F]">
                        {CATEGORIES_TRANSLATED.find(c => c.key === p.category)?.[lang] || p.category}
                      </td>
                      <td className="py-3 px-2">{p.kgPrice ? `ETB ${p.kgPrice.toLocaleString()}` : '-'}</td>
                      <td className="py-3 px-2">{p.weightPerPiece} kg</td>
                      <td className="py-3 px-2 text-[#137333]">ETB {p.tierPrice?.toLocaleString()}</td>
                      <td className="py-3 px-2">{p.minBulkQty} - {p.maxBulkQty} pcs</td>
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

        {/* Order Pipeline Section */}
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
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 my-8">
            <div className="flex justify-between items-center border-b border-[#EFECE6] pb-3">
              <h3 className="font-black text-base">{t.addProduct}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-lg font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-3 text-xs font-bold">
              {/* Product Photo Upload (Required File Input) */}
              <div>
                <label className="block mb-1 text-[#6E655F]">{t.imageFileLabel} *</label>
                <input 
                  required 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload} 
                  className="w-full border border-[#EFECE6] rounded-xl p-2 focus:outline-none font-normal text-xs" 
                />
                {newImageBase64 && (
                  <div className="mt-2 flex items-center gap-2">
                    <img src={newImageBase64} alt="Preview" className="w-12 h-12 object-cover rounded-lg border border-[#EFECE6]" />
                    <span className="text-[10px] text-green-600 font-bold">Photo ready!</span>
                  </div>
                )}
              </div>

              {/* Product Name */}
              <div>
                <label className="block mb-1 text-[#6E655F]">{t.productName} *</label>
                <input 
                  required 
                  type="text" 
                  placeholder="e.g. Special Teff / Ethiopian Coffee"
                  value={newProductName} 
                  onChange={e => setNewProductName(e.target.value)} 
                  className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                />
              </div>

              {/* Category */}
              <div>
                <label className="block mb-1 text-[#6E655F]">{t.category}</label>
                <select value={newCategory} onChange={e => setNewCategory(e.target.value)} className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none bg-white">
                  {CATEGORIES_TRANSLATED.map(cat => (
                    <option key={cat.key} value={cat.key}>
                      {cat[lang]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Kg Price & Weight Per Piece */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.kgPrice}</label>
                  <input 
                    type="number" 
                    placeholder="e.g. 120"
                    value={newKgPrice} 
                    onChange={e => setNewKgPrice(e.target.value)} 
                    className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.weightPerPiece} *</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="25"
                    value={newWeightPerPiece} 
                    onChange={e => setNewWeightPerPiece(e.target.value)} 
                    className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                  />
                </div>
              </div>

              {/* Price in Bulk & Stock */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.bulkPrice} *</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="e.g. 2500"
                    value={newBulkPrice} 
                    onChange={e => setNewBulkPrice(e.target.value)} 
                    className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.stock} *</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="50"
                    value={newStock} 
                    onChange={e => setNewStock(e.target.value)} 
                    className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                  />
                </div>
              </div>

              {/* Min Bulk Qty & Max Bulk Qty */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.minBulkQty} *</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="1"
                    value={newMinBulkQty} 
                    onChange={e => setNewMinBulkQty(e.target.value)} 
                    className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block mb-1 text-[#6E655F]">{t.maxBulkQty} *</label>
                  <input 
                    required 
                    type="number" 
                    placeholder="100"
                    value={newMaxBulkQty} 
                    onChange={e => setNewMaxBulkQty(e.target.value)} 
                    className="w-full border border-[#EFECE6] rounded-xl p-2.5 focus:outline-none" 
                  />
                </div>
              </div>

              <p className="text-[10px] text-[#6E655F] font-normal">{t.requiredNotice}</p>

              <button type="submit" className="w-full bg-[#D9531E] text-white py-3 rounded-xl font-black text-xs hover:bg-[#B84216] transition mt-2">
                {t.saveProduct}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
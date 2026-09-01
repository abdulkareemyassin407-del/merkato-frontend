'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  tierPrice: number;
  tierQty: number;
  imageUrl?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const TRANSLATIONS = {
  en: {
    heroTitle: "Ethiopia's Direct Wholesale Food Marketplace",
    heroSub: "Connecting verified suppliers in Addis Ababa with restaurants, hotels, and retail stores.",
    becomeSeller: "Seller Portal",
    verified: "Verified Addis Suppliers",
    wholesale: "Dynamic Tier Pricing",
    delivery: "Addis-Wide Delivery",
    categories: "Shop by Category",
    searchPlaceholder: "Search teff, oil, lentils, flour...",
    supportTitle: "Central Order Dispatch Hotlines",
    cartTitle: "Wholesale Order Summary",
    emptyCart: "Your order cart is empty. Add products to generate a hotline quote.",
    noProducts: "No products currently available. Sellers are adding inventory soon!",
    estimatedTotal: "Estimated Total:",
    addToCart: "+ Add to Order Cart",
    viewDetails: "View Full Details",
    readyToOrder: "Ready to lock in this bulk order? Call Central Dispatch:",
  },
  am: {
    heroTitle: "የኢትዮጵያ ቀጥተኛ የጅምላ የምግብ ገበያ",
    heroSub: "በአዲስ አበባ ያሉ የተረጋገጡ አቅራቢዎችን ከሆቴሎች፣ ሬስቶራንቶች እና ሱቆች ጋር ያገናኛል።",
    becomeSeller: "የአቅራቢዎች መግቢያ",
    verified: "የተረጋገጡ አቅራቢዎች",
    wholesale: "የጅምላ ቅናሽ ዋጋ",
    delivery: "መላው አዲስ አበባ ማድረስ",
    categories: "በምድብ ይገብዩ",
    searchPlaceholder: "ጤፍ፣ ዘይት፣ ምስር፣ ዱቄት ይፈልጉ...",
    supportTitle: "የማዕከላዊ ትዕዛዝ አገልግሎት ስልኮች",
    cartTitle: "የጅምላ ትዕዛዝ ማጠቃለያ",
    emptyCart: "የእርስዎ የትዕዛዝ ቅርጫት ባዶ ነው። የደወል ዋጋ ጥቅስ ለማግኘት ምርቶችን ያክሉ።",
    noProducts: "በአሁኑ ጊዜ ምንም ምርቶች የሉም። አቅራቢዎች በቅርቡ ምርቶችን ይጭናሉ!",
    estimatedTotal: "ጠቅላላ ተገመተ ዋጋ:",
    addToCart: "+ ወደ ትዕዛዝ ቅርጫት ጨምር",
    viewDetails: "ሙሉ ዝርዝር ይመልከቱ",
    readyToOrder: "ይህንን የጅምላ ትዕዛዝ ለማረጋገጥ ዝግጁ ነዎት? ወደ ማዕከላዊ ትዕዛዝ ይደውሉ:",
  },
  ar: {
    heroTitle: "سوق المواد الغذائية بالجملة المباشر في إثيوبيا",
    heroSub: "ربط الموردين المعتمدين في أديس أبابا بالمطاعم والفنادق والمتاجر.",
    becomeSeller: "بوابة البائعين",
    verified: "موردون معتمدون",
    wholesale: "أسعار الجملة والتخفيضات",
    delivery: "توصيل لكافة أديس أبابا",
    categories: "التسوق حسب الفئة",
    searchPlaceholder: "ابحث عن دقيق، زيت، عدس...",
    supportTitle: "خطوط استقبال الطلبات المركزية",
    cartTitle: "ملخص طلب الجملة",
    emptyCart: "سلة الطلبات فارغة. أضف منتجات للحصول على تسعيرة فورية.",
    noProducts: "لا توجد منتجات حالياً. سيقوم البائعون بإضافة المنتجات قريباً!",
    estimatedTotal: "الإجمالي التقديري:",
    addToCart: "+ أضف إلى سلة الطلبات",
    viewDetails: "عرض التفاصيل الكاملة",
    readyToOrder: "هل أنت جاهز لتأكيد هذا الطلب بالجملة؟ اتصل بالمركز الرئيسي:",
  }
};

export default function Home() {
  const [lang, setLang] = useState<'en' | 'am' | 'ar'>('en');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const t = TRANSLATIONS[lang];

  // Fetch real products dynamically from backend API
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success) setProducts(data.data);
      })
      .catch(() => setProducts([]));
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (productId: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const totalAmount = cart.reduce((sum, item) => {
    const unitPrice = item.quantity >= item.product.tierQty ? item.product.tierPrice : item.product.price;
    return sum + (unitPrice * item.quantity);
  }, 0);

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className={`min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans ${lang === 'ar' ? 'rtl' : 'ltr'}`}>
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EFECE6] px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">M</div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#2B231D]">Merkato</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">Wholesale Hub</span>
          </div>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="bg-[#FAF7F2] p-1 rounded-xl border border-[#EFECE6] flex text-xs font-bold">
            <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-lg ${lang === 'en' ? 'bg-white text-[#D9531E] shadow-sm' : 'text-[#6E655F]'}`}>EN</button>
            <button onClick={() => setLang('am')} className={`px-2.5 py-1 rounded-lg ${lang === 'am' ? 'bg-white text-[#D9531E] shadow-sm' : 'text-[#6E655F]'}`}>አማ</button>
            <button onClick={() => setLang('ar')} className={`px-2.5 py-1 rounded-lg ${lang === 'ar' ? 'bg-white text-[#D9531E] shadow-sm' : 'text-[#6E655F]'}`}>عربي</button>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative bg-[#FFF2ED] border border-[#FFD8CC] text-[#D9531E] px-4 py-2 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-[#D9531E] hover:text-white transition">
            <span>🛒 Order Cart</span>
            {totalItemsCount > 0 && (
              <span className="bg-[#D9531E] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">
                {totalItemsCount}
              </span>
            )}
          </button>

          <Link href="/seller/dashboard" className="bg-[#FAF7F2] hover:bg-[#EFECE6] border border-[#EFECE6] text-[#2B231D] px-4 py-2 rounded-xl text-xs font-bold transition hidden sm:inline-block">
            {t.becomeSeller}
          </Link>

          <Link href="/admin" className="bg-[#D9531E] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#B84216] transition shadow-sm">
            Admin Portal
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 pt-10 pb-6 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="bg-[#FFF2ED] text-[#B84216] border border-[#FFD8CC] text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-3">
            Addis Ababa Direct Food Marketplace
          </span>
          <h1 className="text-4xl lg:text-5xl font-black leading-tight tracking-tight text-[#2B231D]">
            {t.heroTitle}
          </h1>
          <p className="text-[#6E655F] text-base mt-3 font-medium">
            {t.heroSub}
          </p>

          <div className="mt-6 bg-white p-2 rounded-2xl border border-[#EFECE6] shadow-md flex items-center gap-3">
            <span className="text-xl ml-3 text-[#9E948C]">🔍</span>
            <input 
              type="text" 
              placeholder={t.searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-6 mt-6 text-xs font-bold text-[#6E655F]">
            <span className="flex items-center gap-1.5"><strong className="text-[#137333]">✓</strong> {t.verified}</span>
            <span className="flex items-center gap-1.5"><strong className="text-[#D9531E]">🏷️</strong> {t.wholesale}</span>
            <span className="flex items-center gap-1.5"><strong className="text-[#2B231D]">🚚</strong> {t.delivery}</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#D9531E] to-[#B84216] p-8 rounded-3xl text-white shadow-lg space-y-3">
          <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold">Verified Wholesale Orders</span>
          <h2 className="text-2xl font-black">{t.supportTitle}</h2>
          <p className="text-white/80 text-xs">Add items to your cart and call central dispatch to process order fulfillment immediately.</p>
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-black">
            <a href="tel:0985077474" className="bg-white text-[#D9531E] px-3.5 py-1.5 rounded-xl shadow">📞 0985077474</a>
            <a href="tel:0932265781" className="bg-white text-[#D9531E] px-3.5 py-1.5 rounded-xl shadow">📞 0932265781</a>
          </div>
        </div>
      </section>

      {/* Product Catalog */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <h2 className="text-xl font-black">{t.categories}</h2>
          <div className="flex flex-wrap gap-2 text-xs font-bold">
            {['All', 'Flour', 'Cooking Oil', 'Beans & Lentils', 'Rice', 'Spices'].map((cat) => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl border transition ${selectedCategory === cat ? 'bg-[#D9531E] text-white border-[#D9531E]' : 'bg-white border-[#EFECE6] text-[#6E655F]'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-12 text-center text-[#6E655F] space-y-3">
            <span className="text-4xl block">📦</span>
            <p className="font-bold text-base">{t.noProducts}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl border border-[#EFECE6] p-5 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="bg-[#FAF7F2] h-36 rounded-xl flex items-center justify-center overflow-hidden mb-3">
                    {p.imageUrl ? (
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs font-bold text-[#9E948C]">No Image Attached</span>
                    )}
                  </div>
                  <span className="text-[10px] font-black uppercase text-[#D9531E] tracking-wider">{p.category}</span>
                  <h3 className="font-bold text-base mt-1 line-clamp-1">{p.name}</h3>
                  <div className="mt-3 space-y-0.5">
                    <p className="text-lg font-black text-[#2B231D]">ETB {p.price.toLocaleString()} <span className="text-xs text-[#6E655F] font-normal">/ unit</span></p>
                    <p className="text-xs font-bold text-[#137333]">Bulk ({p.tierQty}+ units): ETB {p.tierPrice.toLocaleString()}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  <button 
                    onClick={() => addToCart(p)}
                    className="w-full bg-[#D9531E] hover:bg-[#B84216] text-white py-2.5 rounded-xl font-extrabold text-xs transition">
                    {t.addToCart}
                  </button>
                  <Link href={`/product/${p.id}`} className="block w-full text-center bg-[#FAF7F2] border border-[#EFECE6] py-2 rounded-xl font-bold text-xs text-[#6E655F]">
                    {t.viewDetails}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Cart Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#EFECE6]">
                <h2 className="text-xl font-black">{t.cartTitle}</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-lg font-black p-1 hover:text-[#D9531E]">✕</button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-12 text-[#6E655F] text-sm">{t.emptyCart}</div>
              ) : (
                <div className="divide-y divide-[#EFECE6] mt-4">
                  {cart.map((item) => {
                    const isTierActive = item.quantity >= item.product.tierQty;
                    const activeUnitPrice = isTierActive ? item.product.tierPrice : item.product.price;
                    return (
                      <div key={item.product.id} className="py-4 space-y-2">
                        <div className="flex justify-between font-bold text-sm">
                          <span>{item.product.name}</span>
                          <span>ETB {(activeUnitPrice * item.quantity).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs text-[#6E655F]">
                          <span>ETB {activeUnitPrice.toLocaleString()} / unit {isTierActive && <strong className="text-[#137333] ml-1">(Bulk Tier Applied)</strong>}</span>
                          <div className="flex items-center border border-[#EFECE6] rounded-lg">
                            <button onClick={() => updateCartQty(item.product.id, -1)} className="px-2 py-1 font-bold">-</button>
                            <span className="px-3 font-bold text-black">{item.quantity}</span>
                            <button onClick={() => updateCartQty(item.product.id, 1)} className="px-2 py-1 font-bold">+</button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="pt-4 border-t border-[#EFECE6] space-y-4">
                <div className="flex justify-between text-lg font-black">
                  <span>{t.estimatedTotal}</span>
                  <span className="text-[#D9531E]">ETB {totalAmount.toLocaleString()}</span>
                </div>
                <div className="bg-[#FAF7F2] p-4 rounded-xl border border-[#EFECE6] text-center space-y-2">
                  <p className="text-xs font-bold text-[#6E655F]">{t.readyToOrder}</p>
                  <div className="flex justify-center gap-4 text-[#D9531E] font-extrabold text-sm">
                    <a href="tel:0985077474">0985077474</a>
                    <a href="tel:0932265781">0932265781</a>
                    <a href="tel:0944669703">0944669703</a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-white border-t border-[#EFECE6] py-10 px-6 text-center text-xs text-[#6E655F] space-y-3 mt-12">
        <p className="font-bold text-sm text-[#2B231D]">{t.supportTitle}</p>
        <div className="flex justify-center gap-6 text-[#D9531E] font-extrabold text-sm py-1">
          <a href="tel:0985077474">0985077474</a>
          <a href="tel:0932265781">0932265781</a>
          <a href="tel:0944669703">0944669703</a>
        </div>
        <p className="max-w-2xl mx-auto text-[11px] leading-relaxed">
          Merkato is an intermediary platform connecting buyers with verified suppliers across Addis Ababa. Direct seller contacts are masked for security and order verification. All transactions are coordinated through central dispatch.
        </p>
      </footer>

    </div>
  );
}
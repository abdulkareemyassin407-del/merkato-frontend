'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  tierPrice: number;
  tierQty: number;
  imageUrl?: string;
  description?: string;
  origin?: string;
  unit?: string;
}

const KEFLE_KETEMAS = [
  'Addis Ketema', 'Bole', 'Akaky Kaliti', 'Arada', 'Gullele',
  'Kirkos', 'Kolfe Keranio', 'Lideta', 'Nifas Silk-Lafto', 'Yeka', 'Lemi Kura'
];

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSubCity, setSelectedSubCity] = useState(KEFLE_KETEMAS[0]);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (!productId) return;
    
    // Fetch product details from backend API
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1'}/products`)
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const found = data.data.find((p: Product) => p.id.toString() === productId.toString());
          if (found) {
            setProduct(found);
            setQuantity(found.tierQty || 1);
          }
        }
      })
      .catch(() => setProduct(null))
      .finally(() => setLoading(false));
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center text-sm font-bold text-[#6E655F]">
        Loading product details...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex flex-col items-center justify-center p-6 text-center space-y-4">
        <span className="text-5xl">⚠️</span>
        <h1 className="text-xl font-black text-[#2B231D]">Product Not Found</h1>
        <p className="text-xs text-[#6E655F]">The requested product is unavailable or has been removed.</p>
        <Link href="/" className="bg-[#D9531E] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm">
          Return to Home
        </Link>
      </div>
    );
  }

  const isTierActive = quantity >= product.tierQty;
  const currentUnitPrice = isTierActive ? product.tierPrice : product.price;
  const totalPrice = currentUnitPrice * quantity;

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2B231D] font-sans">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#EFECE6] px-6 lg:px-12 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-xl shadow-sm">HS</div>
          <div>
            <span className="text-2xl font-black tracking-tight text-[#2B231D]">HABESHA SUQ</span>
            <span className="block text-[10px] font-extrabold text-[#D9531E] uppercase tracking-widest -mt-1">ሀበሻ ሱቅ</span>
          </div>
        </Link>
        <Link href="/" className="text-xs font-bold text-[#6E655F] hover:text-[#D9531E] transition">
          ← Back to Catalog
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
        
        {/* Left Column: Image & Badges */}
        <div className="space-y-4">
          <div className="bg-white rounded-3xl border border-[#EFECE6] h-80 md:h-96 flex items-center justify-center overflow-hidden p-4 shadow-sm">
            {product.imageUrl ? (
              <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center space-y-2">
                <span className="text-4xl block">🌾</span>
                <span className="text-xs font-bold text-[#9E948C]">Verified Stock Listing</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-bold">
            <div className="bg-white border border-[#EFECE6] p-4 rounded-2xl flex items-center gap-3">
              <span className="text-xl">✓</span>
              <div>
                <p className="text-[#2B231D]">Verified Supplier</p>
                <p className="text-[10px] text-[#6E655F] font-normal">Addis Wholesale Market</p>
              </div>
            </div>
            <div className="bg-white border border-[#EFECE6] p-4 rounded-2xl flex items-center gap-3">
              <span className="text-xl">🚚</span>
              <div>
                <p className="text-[#2B231D]">Addis Delivery</p>
                <p className="text-[10px] text-[#6E655F] font-normal">Calculated at Dispatch</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Wholesale Calculator & Order Panel */}
        <div className="space-y-6">
          <div>
            <span className="bg-[#FFF2ED] text-[#B84216] border border-[#FFD8CC] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full inline-block mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl font-black text-[#2B231D]">{product.name}</h1>
            <p className="text-xs text-[#6E655F] mt-1 font-medium">
              Origin: {product.origin || 'Addis Ababa Central Depot'} | Unit: {product.unit || 'Standard Bag/Quintal'}
            </p>
          </div>

          {/* Dynamic Tier Pricing Breakdown */}
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#6E655F]">Wholesale Tier Breakdown</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className={`p-3 rounded-xl border ${!isTierActive ? 'border-[#D9531E] bg-[#FFF2ED]' : 'border-[#EFECE6] bg-[#FAF7F2]'}`}>
                <p className="text-[10px] font-bold text-[#6E655F]">Standard Price (1–{product.tierQty - 1} units)</p>
                <p className="text-lg font-black text-[#2B231D]">ETB {product.price.toLocaleString()}</p>
              </div>
              <div className={`p-3 rounded-xl border ${isTierActive ? 'border-[#137333] bg-[#E8F5E9]' : 'border-[#EFECE6] bg-[#FAF7F2]'}`}>
                <p className="text-[10px] font-bold text-[#137333]">Bulk Discount ({product.tierQty}+ units)</p>
                <p className="text-lg font-black text-[#137333]">ETB {product.tierPrice.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Sub-City Delivery Selector */}
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-2">
            <label className="text-xs font-black uppercase tracking-wider text-[#6E655F] block">
              Select Delivery Sub-City (ክፍለ ከተማ)
            </label>
            <select 
              value={selectedSubCity}
              onChange={(e) => setSelectedSubCity(e.target.value)}
              className="w-full bg-[#FAF7F2] border border-[#EFECE6] rounded-xl px-3 py-2.5 text-xs font-bold focus:outline-none">
              {KEFLE_KETEMAS.map(sc => (
                <option key={sc} value={sc}>{sc} Sub-City</option>
              ))}
            </select>
            <p className="text-[10px] text-[#6E655F]">
              * Delivery fee for {selectedSubCity} will be quoted upon order confirmation call.
            </p>
          </div>

          {/* Quantity Selector & Live Total */}
          <div className="bg-white border border-[#EFECE6] rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-[#2B231D]">Quantity:</span>
              <div className="flex items-center border border-[#EFECE6] rounded-xl bg-[#FAF7F2]">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1.5 font-black hover:text-[#D9531E]">-</button>
                <span className="px-4 font-black text-sm text-[#2B231D]">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-1.5 font-black hover:text-[#D9531E]">+</button>
              </div>
            </div>

            <div className="pt-3 border-t border-[#EFECE6] flex items-center justify-between">
              <div>
                <p className="text-[10px] font-bold text-[#6E655F]">Estimated Total Amount:</p>
                <p className="text-2xl font-black text-[#D9531E]">ETB {totalPrice.toLocaleString()}</p>
              </div>
              <button 
                onClick={() => setIsAdded(true)}
                className="bg-[#D9531E] hover:bg-[#B84216] text-white px-6 py-3 rounded-xl font-extrabold text-xs shadow-md transition">
                {isAdded ? '✓ Order Lock Saved' : 'Confirm & Reserve Quote'}
              </button>
            </div>
          </div>

          {/* Central Order Hotline Confirmation */}
          <div className="bg-gradient-to-br from-[#D9531E] to-[#B84216] p-6 rounded-2xl text-white space-y-2">
            <p className="text-xs font-bold uppercase tracking-wider text-white/80">Lock In Wholesale Quote</p>
            <p className="text-xs font-medium">Call central dispatch to execute delivery to {selectedSubCity}:</p>
            <div className="flex flex-wrap gap-3 pt-2 text-xs font-black">
              <a href="tel:0985077474" className="bg-white text-[#D9531E] px-3.5 py-2 rounded-xl shadow">📞 0985077474</a>
              <a href="tel:0932265781" className="bg-white text-[#D9531E] px-3.5 py-2 rounded-xl shadow">📞 0932265781</a>
              <a href="tel:0944669703" className="bg-white text-[#D9531E] px-3.5 py-2 rounded-xl shadow">📞 0944669703</a>
            </div>
          </div>

        </div>

      </main>

    </div>
  );
}
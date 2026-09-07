import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-8 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand Info */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-3">ሀበሻ ሱቅ (Habesha Suq)</h2>
          <p className="text-sm text-gray-400 mb-4">የእርስዎ ታማኝ የግብይት ማዕከል</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about" className="hover:text-white">ስለ እኛ (About)</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white">እንዴት እንደሚሰራ (How it works)</Link></li>
            <li><Link href="/seller/register" className="hover:text-white">ሻጭ ይሁኑ (Become a seller)</Link></li>
            <li><Link href="/delivery" className="hover:text-white">የማድረስ አገልግሎት (Delivery)</Link></li>
            <li><Link href="/help" className="hover:text-white">የእርዳታ ማዕከል (Help Center)</Link></li>
            <li><Link href="/contact" className="hover:text-white">ያግኙን (Contact Us)</Link></li>
          </ul>
        </div>

        {/* For Sellers */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">ለሻጮች (For Sellers)</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/seller/register" className="hover:text-white">የሻጭ ምዝገባ (Seller registration)</Link></li>
            <li><Link href="/seller/login" className="hover:text-white">የሻጭ መግቢያ (Seller login)</Link></li>
            <li><Link href="/seller/guidelines" className="hover:text-white">የሻጭ መመሪያዎች (Seller guidelines)</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">ሕጋዊ መረጃዎች (Legal)</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:text-white">አጠቃቀም ውሎች (Terms & Conditions)</Link></li>
            <li><Link href="/privacy" className="hover:text-white">የግላዊነት ፖሊሲ (Privacy Policy)</Link></li>
            <li><Link href="/returns" className="hover:text-white">የዕቃ መመለስ ፖሊሲ (Return Policy)</Link></li>
          </ul>
        </div>

        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">አድራሻ (Contact)</h3>
          <div className="space-y-2 text-sm text-gray-400">
            <p>📞 Customer Support: +251 900 000 000</p>
            <p>📧 Email: support@habeshasuq.com</p>
            <p>📍 Addis Ababa, Ethiopia</p>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-gray-800 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Habesha Suq. All rights reserved.
      </div>
    </footer>
  );
}
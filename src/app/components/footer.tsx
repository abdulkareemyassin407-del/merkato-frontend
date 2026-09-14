'use client';

import React from 'react';

interface FooterProps {
  lang?: 'en' | 'am' | 'ar';
}

const TRANSLATIONS = {
  en: {
    footerText: "Empowering local suppliers with modern digital bulk trading.",
    connectWithUs: "Connect With Us",
    centralPhonesTitle: "የማዕከላዊ ትዕዛዝ አገልግሎት ስልኮች",
    disclaimer: "Habesha Suq is an intermediary platform connecting buyers with verified suppliers across Addis Ababa. Direct seller contacts are masked for security and order verification. All transactions are coordinated through central dispatch.",
    allRightsReserved: "All rights reserved.",
  },
  am: {
    footerText: "ሀገር በቀል አቅራቢዎችን በዘመናዊ የዲጂታል ጅምላ ንግድ ማበልፀግ።",
    connectWithUs: "ከእኛ ጋር ይገናኙ",
    centralPhonesTitle: "የማዕከላዊ ትዕዛዝ አገልግሎት ስልኮች",
    disclaimer: "Habesha Suq is an intermediary platform connecting buyers with verified suppliers across Addis Ababa. Direct seller contacts are masked for security and order verification. All transactions are coordinated through central dispatch.",
    allRightsReserved: "መብቱ በህግ የተጠበቀ ነው::",
  },
  ar: {
    footerText: "تمكين الموردين المحليين من خلال التجارة الرقمية الحديثة بالجملة.",
    connectWithUs: "تواصل معنا",
    centralPhonesTitle: "የማዕከላዊ ትዕዛዝ አገልግሎት ስልኮች",
    disclaimer: "Habesha Suq is an intermediary platform connecting buyers with verified suppliers across Addis Ababa. Direct seller contacts are masked for security and order verification. All transactions are coordinated through central dispatch.",
    allRightsReserved: "جميع الحقوق محفوظة.",
  }
};

export default function Footer({ lang = 'am' }: FooterProps) {
  const t = TRANSLATIONS[lang];

  return (
    <footer className="mt-12 bg-white border-t border-[#EFECE6] py-10 px-4 lg:px-12 text-xs">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Column 1: Brand Info & Email */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#D9531E] rounded-xl flex items-center justify-center text-white font-black text-base shadow-sm">HS</div>
              <span className="text-lg font-black tracking-tight text-[#2B231D]">HABESHA SUQ</span>
            </div>
            <p className="text-[#6E655F] leading-relaxed">{t.footerText}</p>
            <div>
              <a 
                href="mailto:habeshasuq@gmail.com" 
                className="inline-flex items-center gap-2 font-bold text-[#D9531E] hover:underline"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                habeshasuq@gmail.com
              </a>
            </div>
          </div>

          {/* Column 2: Central Order Dispatch Phones */}
          <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EFECE6] space-y-2">
            <h4 className="font-black text-[#2B231D] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#D9531E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              {t.centralPhonesTitle}
            </h4>
            <div className="space-y-1 font-bold text-[#2B231D] text-sm">
              <a href="tel:0985077474" className="block hover:text-[#D9531E] transition">0985077474</a>
              <a href="tel:0932265781" className="block hover:text-[#D9531E] transition">0932265781</a>
              <a href="tel:0944669703" className="block hover:text-[#D9531E] transition">0944669703</a>
            </div>
          </div>

          {/* Column 3: Social Media Accounts */}
          <div className="space-y-3">
            <h4 className="font-black text-[#2B231D] uppercase tracking-wider text-[11px]">{t.connectWithUs}</h4>
            <div className="flex flex-col gap-2">
              <a 
                href="https://instagram.com/HabeshaSuq" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#FAF7F2] border border-[#EFECE6] px-3.5 py-2 rounded-xl text-[#2B231D] hover:text-[#D9531E] hover:border-[#D9531E] transition font-bold"
              >
                <svg className="w-4 h-4 fill-current text-[#D9531E]" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                Instagram (@HabeshaSuq)
              </a>

              <a 
                href="https://tiktok.com/@habeshasuq1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#FAF7F2] border border-[#EFECE6] px-3.5 py-2 rounded-xl text-[#2B231D] hover:text-[#D9531E] hover:border-[#D9531E] transition font-bold"
              >
                <svg className="w-4 h-4 fill-current text-[#D9531E]" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.12V9.4a6.33 6.33 0 00-1-.08A6.26 6.26 0 003.1 15.6a6.26 6.26 0 0010.51 4.49v-7.8a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-2.79-3.72z"/>
                </svg>
                TikTok (@habeshasuq1)
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 bg-[#FAF7F2] border border-[#EFECE6] rounded-2xl text-[11px] text-[#6E655F] leading-relaxed">
          {t.disclaimer}
        </div>

        <div className="pt-4 border-t border-[#EFECE6] text-center text-[#6E655F] text-[11px]">
          © {new Date().getFullYear()} HABESHA SUQ. {t.allRightsReserved}
        </div>
      </div>
    </footer>
  );
}
import React from 'react';
import { ShoppingBag, ArrowUpLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const products = [
  { id: 'leotard', name: 'בגד גוף קלאסי', category: 'ביגוד', description: 'פריט בסיס נקי לשיעורי בלט וטכניקה.', price: '129', imageUrl: '/01.png' },
  { id: 'skirt', name: 'חצאית מעטפת', category: 'ביגוד', description: 'שכבה קלה ונוחה לשיעורי בלט והופעות.', price: '69', imageUrl: '/02.png' },
  { id: 'tights', name: 'גרביון מחול', category: 'ציוד', description: 'גרביון אחיד ונוח לעבודה שוטפת בסטודיו.', price: '45', imageUrl: '/03.png' },
  { id: 'shoes', name: 'נעלי בלט', category: 'נעליים', description: 'נעליים רכות לאימון, תרגול ודיוק בכף הרגל.', price: '89', imageUrl: '/04.png' },
  { id: 'bag', name: 'תיק סטודיו', category: 'אביזרים', description: 'תיק מרווח לציוד, בקבוק, נעליים וביגוד.', price: '99', imageUrl: '/logo.png' },
  { id: 'kit', name: 'ערכת התחלה', category: 'סט', description: 'סט בסיסי לתלמידות חדשות עם הפריטים המרכזיים לשנה.', price: '249', imageUrl: '/karaka.png' }
];

export default function ShopPage() {
  return (
    <>
      <Helmet>
        <title>חנות - ריקוד ברוח הטובה</title>
        <meta name="description" content="תצוגת חנות סטטית לפרוויו העיצובי" />
      </Helmet>
      <main className="min-h-screen bg-[#090909] text-white" dir="rtl">
        <section className="border-y border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_.42fr] lg:items-end">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[.28em] text-[#D4AF37]">Studio shop / Preview</p>
                <h1 className="text-[clamp(64px,10vw,150px)] font-semibold leading-[.82] tracking-[-.075em]">החנות<br/><span className="text-transparent [-webkit-text-stroke:1px_rgba(232,180,203,.65)]">של הסטודיו.</span></h1>
              </div>
              <p className="max-w-md text-base leading-8 text-white/45">אזור תצוגה עשיר למוצרים, ציוד וביגוד. כרגע הכול סטטי כדי שאפשר יהיה להתמקד בפריסה, טיפוגרפיה והיררכיה.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#D4AF37]">Essentials</p>
                <h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">ציוד לשנת מחול</h2>
              </div>
              <span className="text-sm text-white/30">{products.length} פריטים</span>
            </div>

            <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, index) => (
                <article key={product.id} className="group relative min-h-[470px] overflow-hidden bg-[#0d0d0d] p-6 sm:p-7">
                  <div className="absolute inset-x-0 top-0 h-[58%] overflow-hidden bg-[#111]">
                    <img src={product.imageUrl} alt="" className="h-full w-full object-contain p-10 opacity-70 grayscale transition duration-700 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />
                  </div>

                  <div className="relative z-10 flex h-full flex-col justify-end pt-[250px]">
                    <div className="mb-5 flex items-center justify-between gap-4">
                      <span className="text-[10px] uppercase tracking-[.24em] text-[#E8B4CB]">{product.category}</span>
                      <span className="text-[10px] tracking-[.2em] text-white/25">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <h3 className="text-3xl font-semibold tracking-[-.04em]">{product.name}</h3>
                    <p className="mt-3 min-h-[56px] text-sm leading-7 text-white/42">{product.description}</p>
                    <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-4">
                      <span className="text-lg font-semibold text-[#D4AF37]">₪{product.price}</span>
                      <button type="button" className="grid h-11 w-11 place-items-center rounded-full border border-white/15 text-white/65 transition hover:border-[#D4AF37] hover:text-[#D4AF37]" aria-label={`תצוגת ${product.name}`}>
                        <ArrowUpLeft className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-16 grid gap-6 border border-white/10 bg-[#0d0d0d] p-8 md:grid-cols-[100px_1fr_auto] md:items-center md:p-10">
              <div className="grid h-16 w-16 place-items-center rounded-full border border-[#E8B4CB]/30 text-[#E8B4CB]"><ShoppingBag className="h-6 w-6" /></div>
              <div><p className="text-[10px] uppercase tracking-[.24em] text-white/30">Preview note</p><h3 className="mt-2 text-2xl font-semibold">הכפתורים כאן הם חלק מהעיצוב בלבד.</h3><p className="mt-2 text-sm leading-7 text-white/40">לא מתבצעת רכישה ולא נשלחים נתונים — זה אזור תצוגה סטטי לצורך עיצוב.</p></div>
              <span className="text-sm font-semibold text-[#D4AF37]">STATIC CONTENT</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

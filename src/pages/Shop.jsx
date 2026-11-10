import React from 'react';
import { ShoppingBag, ArrowUpLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const paymentLinks = [
  { name: 'אלקבץ', url: 'https://secure.cardcom.solutions/EA/EA5/57TnGFNIgUe7xGmsReiSbQ/PaymentSP' },
  { name: 'נווה יעקב', url: 'https://secure.cardcom.solutions/EA/EA5/ZOOiQOeZv06KMkLXb6a3Yg/PaymentSP' },
  { name: 'רמות', url: 'https://secure.cardcom.solutions/EA/EA5/53cVWDh4UCBxIeJ8CStig/PaymentSP' },
  { name: 'רמת שלמה', url: 'https://secure.cardcom.solutions/EA/EA5/P7BvTLJxtUWpcq2R2qvVxA/PaymentSP' },
  { name: 'ביתר', url: 'https://secure.cardcom.solutions/EA/EA5/F3xYsrg30aAPCBbaTlmmA/PaymentSP' },
  { name: 'גאולה', url: 'https://secure.cardcom.solutions/EA/EA5/xpvn7nH6VUakD1cgQWit8A/PaymentSP' },
  { name: 'בית חינוך', url: 'https://secure.cardcom.solutions/EA/EA5/gRIk10yuhU2aWMOdrQsQA/PaymentSP' },
  { name: 'בית שמש', url: 'https://secure.cardcom.solutions/EA/EA5/8AGKdhg4EgCdlDG0J4Cg/PaymentSP' }
];

export default function ShopPage() {
  return (
    <>
      <Helmet>
        <title>חנות - ריקוד ברוח הטובה</title>
        <meta name="description" content="הזמנת פריטים לסטודיו" />
      </Helmet>
      <main className="min-h-screen bg-[#090909] text-white" dir="rtl">
        <section className="border-y border-white/10 px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
          <div className="mx-auto max-w-[1440px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_.42fr] lg:items-end">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[.28em] text-[#D4AF37]">Studio shop</p>
                <h1 className="text-[clamp(64px,10vw,150px)] font-semibold leading-[.82] tracking-[-.075em]">החנות<br/><span className="text-transparent [-webkit-text-stroke:1px_rgba(232,180,203,.65)]">של הסטודיו.</span></h1>
              </div>
              <p className="max-w-md text-base leading-8 text-white/65">ניתן להזמין את הפריטים שחסרים לך / לבתך: וגשי אל המורה עם הקבלה לקבלת פריטי ההזמנה.</p>
            </div>
          </div>
        </section>

        <section className="px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto max-w-[1100px]">
            <div className="mb-10 flex items-end justify-between border-b border-white/10 pb-5">
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#D4AF37]">Payment</p>
                <h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">בחירת קישור לתשלום</h2>
              </div>
              <ShoppingBag className="h-7 w-7 text-[#D4AF37]" />
            </div>
            <div className="grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
              {paymentLinks.map((item, index) => (
                <a key={item.name} href={item.url} target="_blank" rel="noreferrer" className="group flex min-h-[112px] items-center justify-between bg-[#0d0d0d] px-6 py-5 transition hover:bg-[#151515]">
                  <div>
                    <span className="mb-2 block text-[10px] uppercase tracking-[.2em] text-[#D4AF37]">{String(index + 1).padStart(2, '0')}</span>
                    <span className="text-xl font-semibold">{item.name}</span>
                  </div>
                  <ArrowUpLeft className="h-5 w-5 text-white/40 transition group-hover:-translate-x-1 group-hover:text-[#D4AF37]" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

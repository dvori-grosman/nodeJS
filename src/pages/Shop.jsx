import React from 'react';
import { ShoppingBag, ArrowUpLeft } from 'lucide-react';
import { Helmet } from "react-helmet-async";
const paymentLinks = [
{ name:'אלקבץ',url:'https://secure.cardcom.solutions/EA/EA5/57TnGFNIgUe7xGmsReiSbQ/PaymentSP' },
{ name:'נווה יעקב',url:'https://secure.cardcom.solutions/EA/EA5/ZOOiQOeZv06KMkLXb6a3Yg/PaymentSP' },
{ name:'רמות',url:'https://secure.cardcom.solutions/EA/EA5/53cVWDh4UCBxIeJ8CStig/PaymentSP' },
{ name:'רמת שלמה',url:'https://secure.cardcom.solutions/EA/EA5/P7BvTLJxtUWpcq2R2qvVxA/PaymentSP' },
{ name:'ביתר',url:'https://secure.cardcom.solutions/EA/EA5/F3xYsrg30aAPCBbaTlmmA/PaymentSP' },
{ name:'גאולה',url:'https://secure.cardcom.solutions/EA/EA5/xpvn7nH6VUakD1cgQWit8A/PaymentSP' },
{ name:'בית חינוך',url:'https://secure.cardcom.solutions/EA/EA5/gRIk10yuhU2aWMOdrQsQA/PaymentSP' },
{ name:'בית שמש',url:'https://secure.cardcom.solutions/EA/EA5/8AGKdhg4EgCdlDG0J4Cg/PaymentSP' }];
export default function ShopPage(){return (<><Helmet><title>חנות - ריקוד ברוח הטובה</title><meta name="description" content="הזמנת פריטים לסטודיו" /><meta property="og:title" content="חנות - ריקוד ברוח הטובה" /><meta property="og:url" content="https://rikud.netlify.app/Shop" /></Helmet><main className="min-h-screen py-12 dark-bg" dir="rtl">
<section className="relative darker-bg py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-16"><h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">חנות הסטודיו</h1><p className="text-xl text-gray-300 max-w-3xl mx-auto">ניתן להזמין את הפריטים שחסרים לך / לבתך: וגשי אל המורה עם הקבלה לקבלת פריטי ההזמנה</p><div className="w-24 h-1 gold-bg mx-auto mt-8"></div></div></div></section>
<section className="py-16"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><div className="text-center mb-10"><ShoppingBag className="w-8 h-8 gold-text mx-auto mb-3" /><h2 className="text-3xl font-bold gold-text">קישורי תשלום לפי סניף</h2></div><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{paymentLinks.map((item,index)=><a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-between darker-bg border border-gray-700 p-5 transition-all hover:border-yellow-500/60 hover:-translate-y-1"><div><span className="block text-xs tracking-widest gold-text mb-2">{String(index+1).padStart(2,'0')}</span><span className="text-lg font-semibold white-text">{item.name}</span></div><ArrowUpLeft className="w-5 h-5 pink-text transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>)}</div></div></section></main></>);}
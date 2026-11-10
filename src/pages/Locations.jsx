import React from "react";
import { MapPin, Car } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
const branches = [
  {
    "_id": "branch-1",
    "name": "בית חינוך עיוורים",
    "address": "ירושלים — רחוב דגל ראובן 8"
  },
  {
    "_id": "branch-2",
    "name": "מעלה רמות",
    "address": "ירושלים — שדרות גולדה 474"
  },
  {
    "_id": "branch-3",
    "name": "רמת שלמה",
    "address": "ירושלים — קהילות יעקב 10"
  },
  {
    "_id": "branch-4",
    "name": "נווה יעקב",
    "address": "ירושלים — שדרות נווה יעקב 38"
  },
  {
    "_id": "branch-5",
    "name": "גאולה — סטודיו לוסטיג",
    "address": "ירושלים — ישעיהו 19"
  },
  {
    "_id": "branch-6",
    "name": "אולם סנהדרין",
    "address": "ירושלים — מנחת יצחק"
  },
  {
    "_id": "branch-7",
    "name": "גבעת שאול",
    "address": "ירושלים — קורדוברו"
  },
  {
    "_id": "branch-8",
    "name": "ביתר — גבעה B",
    "address": "ביתר עילית — מעזריטש 78"
  },
  {
    "_id": "branch-9",
    "name": "ביתר — גבעה A",
    "address": "ביתר עילית — רוזין 22"
  },
  {
    "_id": "branch-10",
    "name": "רמת אברהם",
    "address": "בית שמש — הרב גרוסמן 8"
  }
];
export default function LocationsPage() { return (<><Helmet><title>סניפים - ריקוד ברוח הטובה</title><meta name="description" content="סניפי ריקוד ברוח הטובה בירושלים, בביתר עילית ובבית שמש" /></Helmet><div className="min-h-screen py-12 dark-bg" dir="rtl">
<section className="relative darker-bg py-20"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"><h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">הסניפים שלנו</h1><p className="text-xl text-gray-300 max-w-3xl mx-auto">ניתן למצוא אותנו בירושלים, בביתר עילית ובבית שמש.</p><div className="w-24 h-1 gold-bg mx-auto mt-8"></div></div></section>
<section className="py-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{branches.map(branch=><Card key={branch._id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 darker-bg border-gray-700 elegant-shadow"><CardHeader className="relative overflow-hidden"><div className="absolute inset-0 gold-bg opacity-90"></div><div className="relative z-10 flex items-center gap-3"><div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"><MapPin className="w-5 h-5 text-white" stroke="white" /></div><CardTitle className="text-xl font-bold text-black">{branch.name}</CardTitle></div></CardHeader><CardContent className="p-6"><div className="flex items-start gap-2"><Car className="w-4 h-4 pink-text mt-1 flex-shrink-0" /><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.address)}`} target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm leading-relaxed underline decoration-gray-500 underline-offset-4 transition-colors hover:text-yellow-400"> {branch.address} </a></div></CardContent></Card>)}</div></div></section>
</div></>); }

import React from 'react';
import { MapPin } from 'lucide-react';

export default function LocationsPreview() {
  const locations = ["ביתר", "בית שמש", "גבעת שאול", "גאולה", "רמות", "רמת שלמה", "עזרת תורה", "שכונות הצפון", "נווה יעקב"];
  
  return (
    <section className="py-16 darker-bg">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold white-text mb-4">
          ובפריסת סניפים רחבה
        </h2>
        <div className="w-24 h-1 gold-bg mx-auto mb-8"></div>
        <div className="flex flex-wrap justify-center gap-4">
          {locations.map(loc => (
            <div key={loc} className="flex items-center gap-2 bg-gray-700/50 text-gray-300 px-4 py-2 rounded-full">
              <MapPin className="w-4 h-4 pink-text" />
              <span>{loc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

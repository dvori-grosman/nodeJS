import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Footprints, Shirt, ShoppingBag, Sparkles, Move, ArrowLeft } from 'lucide-react';
import { Helmet } from "react-helmet-async";

export default function ShopPage() {
  const products = [
    { name: 'נעלי בלט', icon: <Footprints className="w-12 h-12 text-pink-400" /> },
    { name: 'חצאית בלט', icon: <Sparkles className="w-12 h-12 text-pink-400" /> },
    { name: 'גרבי אקרובטיקה', icon: <Move className="w-12 h-12 text-pink-400" /> },
    { name: 'חולצת ספורט', icon: <Shirt className="w-12 h-12 text-pink-400" /> },
    { name: 'תיק', icon: <ShoppingBag className="w-12 h-12 text-pink-400" /> },
  ];

  return (
    <>
      <Helmet>
        <title>חנות - ריקוד ברוח הטובה</title>
            <meta name="description" content="חנות מקוונת עם ציוד ריקוד איכותי, בגדי ריקוד, נעליים וחומרי למידה. הזמינו עכשיו עם משלוח מהיר"/>
            <meta name="keywords" content="חנות ריקוד, ציוד ריקוד, בגדי מחול, נעלי ריקוד, אביזרים"/>
            <meta property="og:title" content="סניפים - ריקוד ברוח הטובה" />
            <meta property="og:description" content="מצאו את הסניף הקרוב אליכם ברחבי הארץ" />
            <meta property="og:url" content="https://rikud.netlify.app/Shop" />
          </Helmet>

          <div className="min-h-screen py-12 dark-bg" dir="rtl">
            {/* Hero Section */}
            <section className="relative darker-bg py-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
                    חנות הסטודיו
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    כל הציוד הדרוש לשנת מחול מושלמת במקום אחד
                  </p>
                  <div className="w-24 h-1 gold-bg mx-auto mt-8"></div>
                </div>
              </div>
            </section>

            {/* Products Grid */}
            <section className="py-16">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                  {products.map((product, index) => (
                    <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 darker-bg border-gray-700 elegant-shadow text-center">
                      <CardContent className="p-8">
                        <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6 transition-all duration-300 group-hover:bg-pink-500/20">
                          {product.icon}
                        </div>
                        <h3 className="text-2xl font-bold white-text mb-6">{product.name}</h3>
                        <Link to={createPageUrl("Contact")}>
                          <Button className="btn-outline-pink w-full">
                            לרכישה
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </>
        );
}
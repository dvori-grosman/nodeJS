import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { useApiCollection } from '@/hooks/useApiCollection';
import { DEFAULT_PURCHASE_URL } from '@/config/site';

export default function ShopPage() {
  const { data: products, loading, error } = useApiCollection('products');

  return (
    <>
      <Helmet>
        <title>חנות - ריקוד ברוח הטובה</title>
        <meta name="description" content="חנות הסטודיו עם ציוד וביגוד למחול" />
      </Helmet>
      <div className="min-h-screen py-12 dark-bg" dir="rtl">
        <section className="relative darker-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">חנות הסטודיו</h1>
            <p className="text-xl text-gray-300">כל הציוד הדרוש לשנת מחול במקום אחד</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && <p className="text-center text-gray-400">טוען מוצרים...</p>}
            {error && <p className="text-center text-red-300">{error}</p>}
            {!loading && !error && products.length === 0 && <p className="text-center text-gray-400">אין מוצרים להצגה כרגע</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {products.map(product => (
                <Card key={product._id} className="group darker-bg border-gray-700 elegant-shadow text-center overflow-hidden">
                  {product.imageUrl ? (
                    <div className="h-56 overflow-hidden"><img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover transition group-hover:scale-105" /></div>
                  ) : (
                    <div className="h-40 flex items-center justify-center"><ShoppingBag className="w-14 h-14 text-pink-400" /></div>
                  )}
                  <CardContent className="p-8">
                    <h3 className="text-2xl font-bold white-text mb-3">{product.name}</h3>
                    {product.description && <p className="text-gray-400 mb-4">{product.description}</p>}
                    {product.price !== null && product.price !== undefined && <p className="gold-text font-semibold mb-5">₪{product.price}</p>}
                    <a href={product.purchaseUrl || DEFAULT_PURCHASE_URL} target="_blank" rel="noopener noreferrer">
                      <Button className="btn-outline-pink w-full">לרכישה</Button>
                    </a>
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

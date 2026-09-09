import React from 'react';
import { Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';
import { useApiCollection } from '@/hooks/useApiCollection';

export default function PerformancesPage() {
  const { data: performances, loading, error } = useApiCollection('performances');

  return (
    <>
      <Helmet>
        <title>מופעים - ריקוד ברוח הטובה</title>
        <meta name="description" content="מופעי הסטודיו והפקות קודמות" />
      </Helmet>
      <div className="min-h-screen py-12 dark-bg">
        <section className="relative darker-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">רגעים קסומים על הבמה</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">המופעים וההפקות של הסטודיו לאורך השנים</p>
          </div>
        </section>

        <section className="py-16 darker-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading && <p className="text-center text-gray-400">טוען מופעים...</p>}
            {error && <p className="text-center text-red-300">{error}</p>}
            {!loading && !error && performances.length === 0 && <p className="text-center text-gray-400">אין מופעים להצגה כרגע</p>}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {performances.map(performance => (
                <Card key={performance._id} className="group overflow-hidden darker-bg border-gray-700 elegant-shadow">
                  {performance.imageUrl && <div className="h-96 w-full overflow-hidden"><img src={performance.imageUrl} alt={performance.alt || performance.title} className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105" /></div>}
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold white-text">{performance.title}</CardTitle>
                    {performance.subtitle && <Badge className="bg-black/20 text-white border-white/30 w-fit">{performance.subtitle}</Badge>}
                  </CardHeader>
                  <CardContent>
                    {performance.description && <p className="text-gray-300 leading-relaxed">{performance.description}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 dark-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="darker-bg border-gray-700 elegant-shadow">
              <CardHeader><CardTitle className="text-2xl font-bold gold-text">אודות המופעים שלנו</CardTitle></CardHeader>
              <CardContent><p className="text-gray-300 flex gap-2"><Star className="w-5 h-5 pink-text shrink-0" /> המופעים מרכזים את העבודה שנעשתה במהלך השנה ומציגים מגוון סגנונות וקבוצות.</p></CardContent>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
}

import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';

const performances = [
  { _id: 'team-2023', title: 'הנבחרת', subtitle: '2023', description: 'מופע להקה.', },
  { _id: 'tears-2025', title: 'לרקוד את הדמעות', subtitle: '2025', description: 'מופע מחול.', },
  { _id: 'olam-2024', title: 'אהבת עולם', subtitle: '2024', description: 'המופע הראשון.', },
  { _id: 'olam-2025', title: 'אהבת עולם', subtitle: '2025', description: 'המופע השני.', },
  { _id: 'mishkan-2026', title: 'משכן', subtitle: 'מופע להקה ונשים · 2026', description: '', },
  { _id: 'part-picture-2026', title: 'חלק מן התמונה', subtitle: 'מופע ילדות · 2026', description: 'מופע ייחודי לשכבת הצעירות.', }
];

export default function PerformancesPage() {
  return (
    <>
      <Helmet>
        <title>מופעים - ריקוד ברוח הטובה</title>
        <meta name="description" content="מופעי הסטודיו והפקות קודמות" />
      </Helmet>
      <div className="min-h-screen py-12 dark-bg" dir="rtl">
        <section className="relative darker-bg py-20 border-y border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-[1fr_.4fr] lg:items-end">
              <div>
                <p className="mb-5 text-[11px] uppercase tracking-[.28em] text-[#D4AF37]">Performances / Archive</p>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold leading-[.9] tracking-[-.06em] white-text">רגעים שנשארים<br/><span className="text-transparent [-webkit-text-stroke:1px_rgba(232,180,203,.65)]">אחרי שהמסך יורד.</span></h1>
              </div>
              <p className="text-lg leading-8 text-gray-400">מופעי ברוח הטובה הם חוויה של תנועה, רגש והשראה. מופעי להקות, מופעי נשים, נערות ומופעי ילדות.</p>
            </div>
          </div>
        </section>

        <section className="py-16 darker-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performances.map((performance, index) => (
                <Card key={performance._id} className="group overflow-hidden darker-bg border-gray-800 elegant-shadow rounded-none">
                  <div className="relative h-64 w-full overflow-hidden bg-[radial-gradient(circle_at_50%_35%,rgba(212,175,55,.18),transparent_40%),linear-gradient(145deg,#202020,#090909)]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-7xl font-semibold tracking-[-.08em] text-white/10">{String(index + 1).padStart(2, '0')}</span>
                    </div>
                    <span className="absolute top-4 left-4 text-[10px] tracking-[.22em] text-white/45">ARCHIVE</span>
                  </div>
                  <CardHeader className="border-t border-white/10">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge className="bg-transparent border-white/20 text-[#E8B4CB] rounded-none">{performance.subtitle}</Badge>
                      <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="text-3xl font-semibold white-text">{performance.title}</CardTitle>
                  </CardHeader>
                  {performance.description && <CardContent><p className="text-gray-400 leading-7">{performance.description}</p></CardContent>}
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 dark-bg border-y border-white/10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-[120px_1fr] md:items-start">
              <div className="text-[#D4AF37] text-sm tracking-[.18em]">WHY STAGE</div>
              <div>
                <h2 className="mb-7 text-4xl md:text-6xl font-semibold tracking-[-.05em] white-text">מה מיוחד במופעים שלנו?</h2>
                <p className="mb-8 text-gray-400 leading-8">במופעי המחול הרבה מעבר לתנועה ומוזיקה – זו דרך לבטא רגשות, לבנות ביטחון עצמי, להתמיד, להשקיע ולגלות את הכוחות הפנימיים שיש בכל אחת. שפת התנועה היא שפה שבה אנו מביעות משהו ללא מילים, ולכן היא נוגעת יותר, עמוק יותר ומחברת יותר. ביצועים מדהימים, כוריאוגרפיות עוצרות נשימה וחוויה בלתי נשכחת.</p>
                <p className="text-gray-400 leading-8">מופע המחול מעניק הן לרקדניות והן לצופות חוויה בלתי נשכחת, חיבור לגוף ולנפש.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

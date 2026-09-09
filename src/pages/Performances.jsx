import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Helmet } from 'react-helmet-async';

const performances = [
  {
    _id: 'olam-5784',
    title: 'אהבת עולם',
    subtitle: 'תשפ״ד',
    description: 'מופע שנתי רחב עם קבוצות בגילים וברמות שונות, קטעים קבוצתיים, רצפים מדויקים ואווירת במה חגיגית.',
    imageUrl: '/אהבת עולם תשפד.png'
  },
  {
    _id: 'olam-5785',
    title: 'אהבת עולם',
    subtitle: 'תשפ״ה',
    description: 'הפקת סוף שנה עם שפה חזותית עשירה, עבודה קבוצתית ותהליך ארוך שמתחבר לערב אחד של תנועה ובמה.',
    imageUrl: '/אהבת עולם תשפה.png'
  },
  {
    _id: 'tears',
    title: 'לרקוד את הדמעות',
    subtitle: 'מופע קונספט',
    description: 'מופע עם קו אמנותי אחיד, מעברים בין קבוצות ויצירת רצף בימתי שמרגיש כמו סיפור אחד שלם.',
    imageUrl: '/לרקוד את הדמעות.png'
  },
  {
    _id: 'team',
    title: 'הנבחרת',
    subtitle: 'פרויקט במה',
    description: 'קטעים שנבנו במיוחד לקבוצה המתקדמת, עם דגש על סנכרון, רפרטואר ונוכחות קבוצתית חזקה.',
    imageUrl: '/הנבחרת.png'
  },
  {
    _id: 'studio-night',
    title: 'ערב סטודיו',
    subtitle: 'מאחורי הקלעים',
    description: 'ערב אינטימי יותר שמציג תהליכי עבודה, קטעים בתהליך ורגעים מהשגרה המקצועית של הקבוצות.',
    imageUrl: '/01.png'
  },
  {
    _id: 'young-stage',
    title: 'במה צעירה',
    subtitle: 'הופעת אמצע שנה',
    description: 'הזדמנות לקבוצות הצעירות לעלות לבמה, להציג מה למדו ולהכיר את חוויית ההופעה כחלק מהתהליך.',
    imageUrl: '/02.png'
  }
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
              <p className="text-lg leading-8 text-gray-400">אוסף סטטי של מופעים, פרויקטים ורגעי במה שמאפשר להמשיך לפתח את השפה החזותית של האתר בלי תלות בשרת.</p>
            </div>
          </div>
        </section>

        <section className="py-16 darker-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performances.map((performance, index) => (
                <Card key={performance._id} className="group overflow-hidden darker-bg border-gray-800 elegant-shadow rounded-none">
                  <div className="relative h-80 w-full overflow-hidden bg-black">
                    <img src={performance.imageUrl} alt={performance.title} className="h-full w-full object-cover object-top opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-100" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] tracking-[.22em] text-white/45">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <CardHeader className="border-t border-white/10">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <Badge className="bg-transparent border-white/20 text-[#E8B4CB] rounded-none">{performance.subtitle}</Badge>
                      <Sparkles className="h-4 w-4 text-[#D4AF37]" />
                    </div>
                    <CardTitle className="text-3xl font-semibold white-text">{performance.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-400 leading-7">{performance.description}</p>
                  </CardContent>
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
                <h2 className="mb-7 text-4xl md:text-6xl font-semibold tracking-[-.05em] white-text">הבמה היא חלק מהדרך.</h2>
                <div className="grid gap-5 md:grid-cols-2 text-gray-400 leading-8">
                  <p className="flex gap-3"><Star className="w-5 h-5 text-[#E8B4CB] shrink-0 mt-1" /> המופעים מרכזים תהליך של חודשים ומחברים בין טכניקה, התמדה ועבודה קבוצתית.</p>
                  <p className="flex gap-3"><Star className="w-5 h-5 text-[#E8B4CB] shrink-0 mt-1" /> כל הפקה מקבלת שפה, קצב ואופי משלה — כך שגם הארכיון באתר יכול להרגיש עשיר ומגוון.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

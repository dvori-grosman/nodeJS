import React from "react";
import { Helmet } from "react-helmet-async";
import { Calendar, Download, Play, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PerformancesPage() {
  const performances = [
    { title: "הנבחרת", year: "2023", image: "הנבחרת.png", alt: "הנבחרת - מופע מחול" },
    { title: "לרקוד את הדמעות", year: "2025", image: "לרקוד את הדמעות.png", alt: "לרקוד את הדמעות - מופע מחול" },
    { title: "אהבת עולם", year: "2024", image: "אהבת עולם תשפד.png", alt: "אהבת עולם - 2024" },
    { title: "אהבת עולם", year: "2025", image: "אהבת עולם תשפה.png", alt: "אהבת עולם - 2025" },
    { title: "משכן", year: "מופע להקה ונשים · 2026",image:"משכן.png", description: "המופע שנולד מתוך רצון להתחבר לדמויות האמהות הגדולות מהתנ״ך" },
    { title: "חלק מן התמונה", year: "מופע ילדות · 2026",image:"חלק_מן_התמונה.png", description: "מופע ייחודי לשכבת הצעירות." }
  ];

  return (
    <>
    <Helmet>
       <title>מופעים - ריקוד ברוח הטובה</title>
      <meta name="description" content="צפו במופעי ריקוד מרגשים ומעוררי השראה. לוח מופעים עתידיים וגלריית מופעים קודמים"/>
      <meta name="keywords" content="מופעי ריקוד, הופעות, במה, מופעים, תיאטרון מחול"/> 
      <meta property="og:title" content="מופעים - ריקוד ברוח הטובה"/>
      <meta property="og:description" content="מופעי ריקוד מרגשים ומעוררי השראה"/>
      <meta property="og:url" content="https://rikud.netlify.app/Performances"/>     
    </Helmet>
    <div className="min-h-screen py-12 dark-bg">
      {/* Hero Section */}
      <section className="relative darker-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
              רגעים קסומים על הבמה
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              מופעי ברוח הטובה הם חוויה של תנועה, רגש והשראה. מופעי להקות, מופעי נשים, נערות ומופעי ילדות.
            </p>
            <div className="w-24 h-1 gold-bg mx-auto"></div>
          </div>
        </div>
      </section>


      {/* Past Performances */}
      <section className="py-16 darker-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gold-text mb-4">מופעים קודמים</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {performances.map((performance, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 overflow-hidden darker-bg border-gray-700 elegant-shadow">
                {performance.image && <div className="h-96 w-full overflow-hidden"><img src={performance.image} alt={performance.alt} className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500" /></div>}

                <CardHeader>
                  <CardTitle className="text-2xl font-bold white-text group-hover:text-pink-400 transition-colors">
                    {performance.title}
                  </CardTitle>
                  <Badge className="bg-black/20 text-white border-white/30 w-fit">
                    {performance.year}
                  </Badge>
                </CardHeader>

                {performance.description && (
                  <CardContent>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      {performance.description}
                    </p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Info */}
      <section className="py-16 dark-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="darker-bg border-gray-700 elegant-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold gold-text">
                אודות המופעים שלנו
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="w-full space-y-4">
                <h4 className="font-semibold white-text flex items-center gap-2">
                  <Star className="w-5 h-5 pink-text" />
                  מה מיוחד במופעים שלנו?
                </h4>
                <p className="text-gray-300 leading-8 w-full">במופעי המחול הרבה מעבר לתנועה ומוזיקה – זו דרך לבטא רגשות, לבנות ביטחון עצמי, להתמיד, להשקיע ולגלות את הכוחות הפנימיים שיש בכל אחת. שפת התנועה היא שפה שבה אנו מביעות משהו ללא מילים, ולכן היא נוגעת יותר, עמוק יותר ומחברת יותר. ביצועים מדהימים, כוריאוגרפיות עוצרות נשימה וחוויה בלתי נשכחת.</p>
              </div>

              <div className="text-center dark-bg p-6 rounded-xl border border-gray-700">
                <p className="pink-text font-medium italic">
                  מופע המחול מעניק הן לרקדניות והן לצופות חוויה בלתי נשכחת, חיבור לגוף ולנפש.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}

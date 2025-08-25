
import React from "react";
import { Calendar, Download, Play, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PerformancesPage() {
  const performances = [
    {
      title: "הנבחרת - מסע אמנותי מסביב לעולם",
      year: "מופע שנתי",
      description: "קבוצות המחול בביצועים וכירולוגרפיות מדהימות: להקת פוינט, בלט קלאסי, מחול מודרני ואקרובטיקה.",
      price: "25",
      status: "available",
      image: "הנבחרת.png",
      alt: "הנבחרת - הופעה של ריקוד ברוח הטובה, חוג מחול בירושלים, מקצועי, איכותי, באוירה שמורה, חוג מחול לילדות , חוג מחול לבנים, חוג מחול לנערות חרדיות, חוג אקרובטיקה"
    },
    {
      title: "לרקוד את הדמעות",
      year: "מופע זמר",
      description: "מופע זמר ייחודי בליווי הרכבי זמר 'שיר אומן' ובשילוב להקת הרקדניות 'ריקוד ברוח טובה'.",
      price: "25",
      status: "available",
      image: "לרקוד את הדמעות.png",
      alt: "הנבחרת - הופעה של ריקוד ברוח הטובה, חוג מחול בירושלים, מקצועי, איכותי, באוירה שמורה, חוג מחול לילדות , חוג מחול לבנים, חוג מחול לנערות חרדיות, חוג אקרובטיקה"
    },
    {
      title: "אהבת עולם",
      year: "הפקה שנתית",
      description: "הפקת מחול אומנותית מטלטלת עם מאות מופיעות בביצוע חי על הבמה.",
      price: "25",
      status: "available",
      image: "אהבת עולם תשפד.png",
      alt: "הנבחרת - הופעה של ריקוד ברוח הטובה, חוג מחול בירושלים, מקצועי, איכותי, באוירה שמורה, חוג מחול לילדות , חוג מחול לבנים, חוג מחול לנערות חרדיות, חוג אקרובטיקה"
    },
    {
      title: "אהבת עולם",
      year: "הפקה שנתית",
      description: "הפקת מחול אומנותית מטלטלת עם מאות מופיעות בביצוע חי על הבמה.",
      price: "25",
      status: "available",
      image: "אהבת עולם תשפה.png",
      alt: "הנבחרת - הופעה של ריקוד ברוח הטובה, חוג מחול בירושלים, מקצועי, איכותי, באוירה שמורה, חוג מחול לילדות , חוג מחול לבנים, חוג מחול לנערות חרדיות, חוג אקרובטיקה"
    }
  ];

  return (
    <div className="min-h-screen py-12 dark-bg">
      {/* Hero Section */}
      <section className="relative darker-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
              רגעים קסומים על הבמה
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              כל שנה אנו מציגות מופע סיום עוצר נשימה המטעים מההישגים המדהימים
              שנרכשו במהלך השנה והחוויה האדירה של התלמידות
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
                {/* Performance Image */}
                <div className="h-96 w-full overflow-hidden">
                  <img src={performance.image} alt={performance.alt} className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>

                <CardHeader>
                  <CardTitle className="text-2xl font-bold white-text group-hover:text-pink-400 transition-colors">
                    {performance.title}
                  </CardTitle>
                  <Badge className="bg-black/20 text-white border-white/30 w-fit">
                    {performance.year}
                  </Badge>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-300 mb-6 leading-relaxed h-24">
                    {performance.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Info */}
      <section className="py-16 dark-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="darker-bg border-gray-700 elegant-shadow">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold gold-text">
                אודות המופעים שלנו
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold white-text flex items-center gap-2">
                    <Star className="w-5 h-5 pink-text" />
                    מה מיוחד במופעים שלנו?
                  </h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                      <span>הצגת כל סוגי השיעורים - בלט, מודרני, אקרודאנס ועוד</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                      <span>תלמידות מכל הגילאים והרמות עולות לבמה</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                      <span>כוראוגרפיות מקוריות ומרהיבות</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                      <span>אווירה חמה ומרגשת לכל המשפחה</span>
                    </li>
                  </ul>
                </div>


              </div>

              <div className="text-center dark-bg p-6 rounded-xl border border-gray-700">
                <p className="pink-text font-medium italic">
                  "המופעים שלנו הם הרגע הקסום שבו רואים את כל העבודה הקשה והמסירות מגיעות לפריחה מלאה.
                  כל בת עולה לבמה עם גאווה ושמחה, והקהל חווה רגעים בלתי נשכחים."
                </p>
                <p className="gold-text mt-2">- צוות ברוח הטובה</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

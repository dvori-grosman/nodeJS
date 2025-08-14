import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Award } from 'lucide-react';
import { Button } from '@/components/ui/button';

// קומפוננטה המציגה את הצוות, הפקת סוף השנה וקריאה לפעולה בעמוד הבית
export default function HomeTeamPhilosophySection() {
  return (
    <section className="py-16 dark-bg">
      <div className="max-w-5xl mx-auto px-6">
        <Card className="darker-bg border-gray-700 elegant-shadow overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-8 md:p-12">
              <h2 className="text-4xl gold-text mb-6">הצוות שלנו :)</h2>
              <p className="text-gray-300 mb-4">מורכב מהמדריכות המובילות בתחום. צוות מקצועי, מנוסה ואיכותי עם גישה חמה ומעצימה לבנות.</p>
              <h2 className="text-4xl gold-text mt-8 mb-6">הפקת סוף שנה</h2>
              <p className="text-gray-300">בסוף שנה מוגשת בביצוע הבנות הפקת סוף שנה עוצרת נשימה, המטעימה מההשגים המדהימים שנרכשו במהלך השנה והחוויה האדירה של התלמידות.</p>
            </div>
            <div className="dark-bg p-8 md:p-12 flex flex-col justify-center items-center text-center">
              <Award className="w-20 h-20 pink-text mb-6" />
              <h3 className="text-3xl white-text mb-6">רוצה להגיע לשיעור נסיון!</h3>
              <a href="https://forms.fillout.com/t/hgAzieMyA7us" target="_blank" rel="noopener noreferrer">
                <Button className="btn-gold text-lg">
                  לחצי כאן להרשמה
                </Button>
              </a>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
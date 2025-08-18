
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ClassCard = ({ title, icon, children, ctaText, ctaLinkText }) => (
  <Card className="darker-bg border-gray-700 p-6">
    <h3 className="text-3xl gold-text mb-4 flex items-center gap-3">
      {icon}
      {title}
    </h3>
    <div className="text-gray-300 space-y-3 mb-6">
      {children}
    </div>
    {ctaLinkText && (
       <a href="https://forms.fillout.com/t/hgAzieMyA7us" target="_blank" rel="noopener noreferrer">
          <Button className="btn-outline-pink w-full">{ctaLinkText}</Button>
       </a>
    )}
  </Card>
);

export default function DetailedClasses() {
  return (
    <section className="py-16 dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold white-text">
            אז איך את הולכת לרקוד את השנה?
          </h2>
          <p className="text-lg text-gray-400 mt-4">מילה - שתיים על ההבדלים בין סגנונות השיעורים:</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <ClassCard title="בלט קלאסי" icon={<span className="text-3xl">🩰</span>}>
            <p>השיעור מחולק לתרגילי בר, אמצע ופינה. המתקדמות לומדות לרקוד בנעלי פוינט.</p>
            <p className="font-semibold pink-text">עבודה מדויקת, אצילית, רכה ואומנותית.</p>
          </ClassCard>
          <ClassCard title="מחול מודרני" icon={<span className="text-3xl">👟</span>}>
            <p>שיעור אנרגטי, חוויתי, עם הרבה זרימה ושחרור. בנוי מתרגילי חימום, רצפה, טכניקה ופינה.</p>
          </ClassCard>
          <ClassCard title="אקרודאנס" icon={<span className="text-3xl">🪩</span>}>
            <p>שילוב טכניקות מחול עם אלמנטים אקרובטיים מדהימים.</p>
          </ClassCard>
          <ClassCard title="טרום בלט (גילאי 3-6)" icon={<span className="text-3xl">✨</span>}>
            <p>שעת תנועה ומוזיקה חוויתית במיוחד! פיתוח מוטוריקה, קורדינציה, ביטחון עצמי וכישורי חברה.</p>
            <p className="font-semibold pink-text">ופשוט לראות את הקטנטנה שלך רוקדת!!!</p>
          </ClassCard>
        </div>
        
        <Card className="darker-bg border-gray-700 p-8 text-center mb-12">
            <h3 className="text-3xl gold-text mb-4">הערך המוסף של המחול</h3>
            <p className="text-gray-300 max-w-3xl mx-auto">
              בשיעורי המחול, הן הקלאסי והן המודרני, מקבלים חוץ מההנאה, הזרימה והשחרור של הריקוד, ערך מוסף של יציבה בריאה, חוזק ועבודה על גמישות, בטחון עצמי, חיזוק יכולות למידה, קורדינציה ועוד. הלמידה עשירה ואומנותית.
            </p>
            <a href="https://forms.fillout.com/t/hgAzieMyA7us" target="_blank" rel="noopener noreferrer">
              <Button className="btn-gold mt-6 text-lg">אני רוצה לרקוד את השנה!!</Button>
            </a>
        </Card>

        <Card className="darker-bg border-pink-500/50 border-2 p-8 text-center">
            <h3 className="text-3xl pink-text mb-4">אקרובטיקה - התעמלות קרקע</h3>
            <p className="text-gray-300">עמידות ידיים, גלגלונים, גשרים, פליק-פלאק, סלטות וכו'. שיעור מלא אנרגיות וחוויה, מחזק ומאתגר :)</p>
            <p className="text-white font-semibold mt-4">ציוד מתקדם ומגוון וצוות אלוף שיעיף אותך קדימה!!!</p>
            <a href="https://forms.fillout.com/t/hgAzieMyA7us" target="_blank" rel="noopener noreferrer">
              <Button className="btn-outline-pink mt-6 text-lg">עופי על זה!! רישום לפליק פלאק</Button>
            </a>
        </Card>
      </div>
    </section>
  )
}

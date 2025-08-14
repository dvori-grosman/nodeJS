import React from 'react';
import { Button } from '@/components/ui/button';

// קומפוננטת קריאה לפעולה סופית בעמוד הבית
export default function HomeFinalCtaSection() {
  return (
    <section className="py-20 dark-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl white-text mb-6">
          מתלבטת? 🤔
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          לא יודעת איזה חוג מחול בירושלים או חוג אקרובטיקה מתאים לך? מוזמנת להתייעץ איתנו בשמחה!
        </p>
        <div className="bg-gray-800/50 p-8 rounded-lg">
          <h3 className="text-4xl gold-text mb-4">לתת ליקרה שלך מתנה</h3>
          <h4 className="text-5xl pink-text font-bold">לרקוד את השנה!!</h4>
          <a href="https://forms.fillout.com/t/hgAzieMyA7us" target="_blank" rel="noopener noreferrer">
            <Button className="btn-gold text-xl mt-8">
              התייעצות ורישום
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
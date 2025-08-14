import React from 'react';
import { MailCheck } from 'lucide-react';

// קומפוננטה המסבירה איך להירשם לשיעור הכרות בעמוד הבית
export default function HomeHowToRegisterSection() {
  return (
    <section className="py-16 darker-bg">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <MailCheck className="w-16 h-16 gold-text mx-auto mb-6" />
        <h2 className="text-4xl white-text mb-4">אני רוצה להגיע לשיעור הכרות! איך להירשם?</h2>
        <p className="text-gray-300 text-lg leading-relaxed">
          <a href="https://forms.fillout.com/t/hgAzieMyA7us" target="_blank" rel="noopener noreferrer" className="font-semibold pink-text hover:underline">פה את משאירה פרטים</a>
          , ותקבלי בחזרה למייל את כל הפרטים על הקבוצה המתאימה לך!
          <br />
          (יום, שעה, כתובת והציוד שיש להביא)
        </p>
      </div>
    </section>
  );
}
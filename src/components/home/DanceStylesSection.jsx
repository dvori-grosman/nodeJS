import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';

// קומפוננטת תצוגת סגנונות המחול
export default function DanceStylesSection() {
  const danceStyles = [
    "בלט קלאסי", 
    "מחול מודרני", 
    "מחול לגיל הרך - טרום בלט", 
    "אקרודאנס", 
    "התעמלות קרקע"
  ];
  
  return (
    <section className="py-16 darker-bg">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <DanceStylesTitle />
        <DanceStylesGrid styles={danceStyles} />
      </div>
    </section>
  );
}

// כותרת סגנונות המחול
function DanceStylesTitle() {
  return (
    <h2 className="text-4xl md:text-5xl font-bold white-text mb-12">
      ברוח הטובה פותחת שנה ולך נותר רק לבחור:
    </h2>
  );
}

// רשת סגנונות המחול
function DanceStylesGrid({ styles }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
      {styles.map(styleName => 
        <DanceStyleCard key={styleName} styleName={styleName} />
      )}
    </div>
  );
}

// כרטיס סגנון מחול יחיד
function DanceStyleCard({ styleName }) {
  return (
    <Card className="darker-bg border-gray-700 text-center p-4 transform hover:scale-105 transition-transform duration-300">
      <CardContent className="p-2">
        <Heart className="w-6 h-6 pink-text mx-auto mb-2" />
        <h3 className="text-xl white-text font-semibold">{styleName}</h3>
      </CardContent>
    </Card>
  );
}
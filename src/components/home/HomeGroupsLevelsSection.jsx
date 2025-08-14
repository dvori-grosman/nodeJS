import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Star, Trophy } from 'lucide-react';

// קומפוננטת עזר ליצירת כרטיס מידע
const InfoCard = ({ title, items, icon }) => (
  <Card className="dark-bg border-gray-700 elegant-shadow h-full">
    <CardHeader className="flex flex-row items-center gap-4">
      {icon}
      <CardTitle className="gold-text text-3xl">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <ul className="space-y-2">
        {items.map(item => (
          <li key={item} className="flex items-center gap-3">
            <div className="w-2 h-2 pink-bg rounded-full"></div>
            <span className="text-gray-300 text-lg">{item}</span>
          </li>
        ))}
      </ul>
    </CardContent>
  </Card>
);

// קומפוננטה המציגה את קבוצות הגילאים והרמות בעמוד הבית
export default function HomeGroupsLevelsSection() {
  return (
    <section className="py-16 dark-bg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <InfoCard title="קבוצות גילאים" items={["נשים", "תיכון", "יסודי", "קטנטנות"]} icon={<Users className="w-8 h-8 pink-text" />} />
          <InfoCard title="כל הרמות" items={["מתחילות", "ממשיכות", "מתקדמות"]} icon={<Star className="w-8 h-8 pink-text" />} />
          <InfoCard title="להקות ונבחרות" items={["נבחרת התעמלות קרקע", "להקת בלט קלאסי + פוינט", "להקת מודרני וקונטקט"]} icon={<Trophy className="w-8 h-8 pink-text" />} />
        </div>
      </div>
    </section>
  );
}
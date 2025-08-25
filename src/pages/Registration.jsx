
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  GraduationCap,
  Users,
  RefreshCw,
  Download,
  Star,
  Heart,
  Clock,
  MapPin,
  CheckCircle,
  FileText
} from 'lucide-react';

export default function RegistrationPage() {
  const [activeTab, setActiveTab] = useState('forms');

  const registrationForms = [
    {
      title: "להרשמה לשיעור ניסיון",
      description: "שיעור הכרות חינם ללא התחייבות - הזדמנות מושלמת להכיר את האווירה!",
      icon: <Star className="w-8 h-8 text-yellow-500" />,
      buttonText: "שיעור ניסיון חינם",
      highlight: true,
      url: "https://forms.fillout.com/t/hgAzieMyA7us",
      external: true
    },
    {
      title: "להרשמה לחוג",
      description: "הרשמה רגילה לשנת הלימודים החדשה - לתלמידות חדשות",
      icon: <GraduationCap className="w-8 h-8 text-pink-400" />,
      buttonText: "הרשמה לחוג חדש",
      highlight: false,
      url: "https://forms.fillout.com/t/gaZ1SxLWjMus",
      external: true
    },
    {
      title: "תלמידה קיימת - רישום לשנה הבאה",
      description: "התלמידות הקיימות שלנו יכולות להירשם כאן להמשך השנה הבאה",
      icon: <RefreshCw className="w-8 h-8 text-green-500" />,
      buttonText: "חידוש הרשמה",
      highlight: false,
      url: "https://forms.fillout.com/t/pE7j5Ymn8xus",
      external: true
    }
  ];

  const priceData = [
    {
      category: "בלט קלאסי",
      levels: [
        { level: "מתחילות", sessions: "שיעור שבועי", price: "180", duration: "45 דק'" },
        { level: "ממשיכות", sessions: "שיעור שבועי", price: "200", duration: "60 דק'" },
        { level: "מתקדמות + פוינט", sessions: "שיעור שבועי", price: "220", duration: "75 דק'" }
      ]
    },
    {
      category: "מחול מודרני",
      levels: [
        { level: "מתחילות", sessions: "שיעור שבועי", price: "180", duration: "45 דק'" },
        { level: "ממשיכות", sessions: "שיעור שבועי", price: "200", duration: "60 דק'" },
        { level: "מתקדמות", sessions: "שיעור שבועי", price: "200", duration: "60 דק'" }
      ]
    },
    {
      category: "מחול לגיל הרך",
      levels: [
        { level: "גילאי 3-4", sessions: "שיעור שבועי", price: "160", duration: "30 דק'" },
        { level: "גילאי 5-6", sessions: "שיעור שבועי", price: "170", duration: "40 דק'" }
      ]
    },
    {
      category: "אקרודאנס",
      levels: [
        { level: "בסיס", sessions: "שיעור שבועי", price: "190", duration: "60 דק'" },
        { level: "מתקדמות", sessions: "שיעור שבועי", price: "210", duration: "60 דק'" }
      ]
    },
    {
      category: "התעמלות קרקע",
      levels: [
        { level: "מתחילות", sessions: "שיעור שבועי", price: "200", duration: "60 דק'" },
        { level: "ממשיכות", sessions: "שיעור שבועי", price: "220", duration: "60 דק'" },
        { level: "מתקדמות", sessions: "שיעור שבועי", price: "240", duration: "75 דק'" },
        { level: "נבחרת", sessions: "שיעור שבועי", price: "260", duration: "90 דק'" }
      ]
    }
  ];

  const handleDownloadRegulations = () => {
    // יצירת תוכן תקנון לדוגמה
    const regulationsContent = `
תקנון סטודיו ריקוד ברוח הטובה
=====================================

1. כללי הרשמה
- ההרשמה מתבצעת באמצעות מילוי טופס רשמי
- התשלום מתבצע בתחילת כל חודש
- שיעור ניסיון ראשון ללא תשלום

2. נוכחות ופיצויים
- במידה ולא ניתן להגיע לשיעור, יש להודיע מראש
- פיצוי שיעורים בכפוף לזמינות

3. ציוד נדרש
- לבוש ספורט נוח ומתאים
- נעליים מתאימות לסוג השיעור
- בקבוק מים

4. התנהגות
- כבוד הדדי בין התלמידות והמדריכות
- שמירה על סביבה נעימה ובטוחה לכולם

5. בטיחות
- השתתפות בשיעורים על אחריות המשתתפת
- חובה להודיע על בעיות רפואיות רלוונטיות

לפרטים נוספים: 03-3130656
    `;

    const blob = new Blob([regulationsContent], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'תקנון-ריקוד-ברוח-הטובה.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Helmet>
        <title>הרשמה - ריקוד ברוח הטובה</title>
        <meta name="description" content="הירשמו עכשיו לשיעורי ריקוד! טופס הרשמה פשוט ומהיר לשיעורים, מופעים וארועים מיוחדים" />
        <meta name="keywords" content="הרשמה לשיעורי ריקוד, רישום, טופס הרשמה, מעוניינים" />
        <meta property="og:title" content="הרשמה - ריקוד ברוח הטובה" />
        <meta property="og:description" content="הירשמו עכשיו לשיעורי ריקוד וארועים מיוחדים" />
        <meta property="og:url" content="https://rikud.netlify.app/Registration" />
      </Helmet>
      <div className="min-h-screen py-12 dark-bg">
        {/* Hero Section */}
        <section className="relative darker-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
                הרשמה לשנת תשפ"ו
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                הצטרפי אלינו לשנת מחול מדהימה! בחרי את האופציה המתאימה לך
              </p>
              <div className="w-24 h-1 gold-bg mx-auto mt-8"></div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="py-8">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-2 bg-gray-800/50 rounded-lg p-2">
              <button
                onClick={() => setActiveTab('forms')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'forms'
                    ? 'btn-gold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
              >
                טפסי הרשמה
              </button>
              <button
                onClick={() => setActiveTab('prices')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === 'prices'
                    ? 'btn-gold'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
              >
                מחירים
              </button>
            </div>
          </div>
        </section>

        {/* Registration Forms Tab */}
        {activeTab === 'forms' && (
          <section className="py-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                {registrationForms.map((form, index) => (
                  <Card
                    key={index}
                    className={`group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 text-center overflow-hidden ${form.highlight
                        ? 'darker-bg border-2 border-yellow-500/50 relative'
                        : 'darker-bg border-gray-700'
                      } elegant-shadow`}
                  >
                    {form.highlight && (
                      <div className="absolute top-0 right-0 bg-yellow-500 text-black px-3 py-1 text-sm font-bold">
                        מומלץ!
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="w-20 h-20 mx-auto mb-4 bg-gray-800 rounded-full flex items-center justify-center group-hover:bg-pink-500/20 transition-all duration-300">
                        {form.icon}
                      </div>
                      <CardTitle className="text-2xl gold-text">{form.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="px-6 pb-8">
                      <p className="text-gray-300 mb-6 leading-relaxed min-h-[60px]">
                        {form.description}
                      </p>
                      {form.external ? (
                        <a href={form.url} target="_blank" rel="noopener noreferrer">
                          <Button className={form.highlight ? 'btn-gold w-full' : 'btn-outline-pink w-full'}>
                            {form.buttonText}
                          </Button>
                        </a>
                      ) : (
                        <Link to={form.url}>
                          <Button className={form.highlight ? 'btn-gold w-full' : 'btn-outline-pink w-full'}>
                            {form.buttonText}
                          </Button>
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Regulations Download */}
              <Card className="max-w-2xl mx-auto darker-bg border-gray-700 elegant-shadow">
                <CardContent className="p-8 text-center">
                  <FileText className="w-16 h-16 pink-text mx-auto mb-6" />
                  <h3 className="text-2xl font-bold white-text mb-4">תקנון הסטודיו</h3>
                  <p className="text-gray-300 mb-6">
                    להורדת תקנון הסטודיו המלא עם כל הכללים וההנחיות
                  </p>
                  <Button
                    onClick={handleDownloadRegulations}
                    className="btn-outline-gold"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    הורד תקנון
                  </Button>
                </CardContent>
              </Card>
            </div>
          </section>
        )}

        {/* Prices Tab */}
        {activeTab === 'prices' && (
          <section className="py-16 animate-in slide-in-from-bottom-4 duration-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-4">מחירון שנת תשפ"ו</h2>
                <p className="text-gray-400">מחירים חודשיים לשיעורים</p>
              </div>

              <div className="space-y-8">
                {priceData.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="darker-bg border-gray-700 elegant-shadow overflow-hidden">
                    <CardHeader className="gold-bg text-black text-center">
                      <CardTitle className="text-2xl font-bold">{category.category}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-800">
                            <tr>
                              <th className="px-6 py-4 text-right white-text font-semibold">רמה</th>
                              <th className="px-6 py-4 text-right white-text font-semibold">תדירות</th>
                              <th className="px-6 py-4 text-right white-text font-semibold">משך שיעור</th>
                              <th className="px-6 py-4 text-right white-text font-semibold">מחיר חודשי</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.levels.map((level, levelIndex) => (
                              <tr
                                key={levelIndex}
                                className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors duration-200"
                              >
                                <td className="px-6 py-4 white-text font-medium">{level.level}</td>
                                <td className="px-6 py-4 text-gray-300">{level.sessions}</td>
                                <td className="px-6 py-4 text-gray-300">{level.duration}</td>
                                <td className="px-6 py-4">
                                  <div className="flex items-center gap-1">
                                    <span className="text-2xl font-bold gold-text">₪{level.price}</span>
                                    <span className="text-gray-400 text-sm">לחודש</span>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
                <Card className="dark-bg border-gray-700 elegant-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-semibold white-text mb-3 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 pink-text" />
                      הנחות ומבצעים
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                        <span>שיעור ניסיון ראשון חינם</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                        <span>הנחה לאחיות - 10% החל מהשנייה</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 gold-bg rounded-full mt-2 flex-shrink-0"></div>
                        <span>הנחה לשילוב שיעורים - 15%</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="dark-bg border-gray-700 elegant-shadow">
                  <CardContent className="p-6">
                    <h4 className="font-semibold white-text mb-3 flex items-center gap-2">
                      <Heart className="w-5 h-5 pink-text" />
                      מה כלול במחיר?
                    </h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full mt-2 flex-shrink-0"></div>
                        <span>שיעורים שבועיים קבועים</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full mt-2 flex-shrink-0"></div>
                        <span>השתתפות במופע סוף השנה</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full mt-2 flex-shrink-0"></div>
                        <span>ליווי אישי של המדריכות</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}

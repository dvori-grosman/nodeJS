import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ClassesPage() {
  const classes = [
    {
      title: "בלט קלאסי",
      subtitle: "עשירה רכה חכמה אומנותית ואצילית",
      description: "שפת התנועה של הבלט הקלאסי הינה עשירה רכה חכמה אומנותית ואצילית.",
      icon: <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6bd424b70_image.png" alt="נעלי בלט" className="w-16 h-16 object-contain" />,
      structure: "לשיעור בלט מבנה קבוע:",
      features: [
        "תרגילי בר - עבודה על יציבה ותנוחה",
        "תרגילי אמצע ופינה - קומבינציות במרכז האולם", 
        "וריאציות - יצירות מחול קלאסיות",
        "פוינט - מתקדמות בבלט קלאסי רוקדות על נעלי פוינט המקנות תחושת קלילות וריחוף"
      ],
      suitableFor: "מתאים לכל מי שאוהבת לרקוד! דורש השקעה והתמדה. עבודה מדויקת, אצילית, חכמה ואומנותית.",
      levels: ["מתחילות", "ממשיכות", "מתקדמות"],
      duration: "60 דקות",
      ages: "יסודי, תיכון, נשים"
    },
    {
      title: "מחול מודרני",
      subtitle: "שפת תנועה מדהימה מלאת הבעה",
      description: "מחול מודרני היא שפת תנועה מדהימה מלאת הבעה, יצירתיות, רגש וזרימה.",
      icon: <span className="text-4xl">💃</span>,
      structure: "השיעור מורכב מ:",
      features: [
        "תרגילי טכניקה - יסודות המחול המודרני",
        "עבודת רצפה - תנועות על הרצפה",
        "קומבינציות - רצפי תנועה מקוריים",
        "אימפרוביזציה - יצירה חופשית",
        "קונטקט - עבודה עם רקדניות אחרות"
      ],
      extraInfo: "נותן לך את המרחב לזוז, ליצור ולהביע ולהנות מהכיף שבריקוד!",
      suitableFor: "מתאים לכל מי שאוהבת לרקוד ומתחברת בנשמה לתנועה.. זה השיעור שלך!",
      levels: ["מתחילות", "ממשיכות", "מתקדמות"],
      duration: "60 דקות", 
      ages: "יסודי, תיכון, נשים"
    },
    {
      title: "מחול לגיל הרך",
      subtitle: "חוג מחול מושלם לילדות קטנות",
      description: "שעה של תנועה, מוזיקה וכיף. הבלרינות הקטנות לומדות את שפת התנועה, צעדי הבסיס, מושגים ופוזיציות מתוך משחק, דמיון וחיבור לעולמן. זהו חוג מחול לילדות קטנות המושלם להתחיל בו את דרכן.",
      icon: <span className="text-4xl">✨</span>,
      structure: "עם בנות הגיל הרך אנו שמות דגש על:",
      features: [
        "פיתוח מוטוריקה גסה ועדינה",
        "קורדינציה וחציית קו אמצע", 
        "פיתוח כישורי למידה וחיזוק חגורת כתפיים",
        "ביטוי, העצמה ובטחון עצמי",
        "כישורי חברה והקשבה"
      ],
      extraInfo: "ופשוט לראות את הקטנטנה שלך רוקדת!!!",
      suitableFor: "מתאים לבנות הגנים וכיתות א-ב. מתנה של התפתחות ריקוד ותנועה!",
      levels: ["גיל הרך"],
      duration: "45 דקות",
      ages: "3-6 שנים"
    },
    {
      title: "אקרודאנס",
      subtitle: "סגנון מחול המשלב בין טכניקות מחול לאלמנטים אקרובטיים",
      description: "אקרודאנס הוא סגנון מחול המשלב בין טכניקות מחול - סיבובים, צעדים, החלקות, עבודת רצפה לאלמנטים מעולם האקרובטיקה.",
      icon: <span className="text-4xl">🤸‍♀️</span>,
      structure: "האלמנטים כוללים:",
      features: [
        "גלגלונים בכל הווריאציות",
        "עמידות ידיים מכל הסוגים",
        "רגל לפנים / לאחור",
        "סלטות ואלמנטים מתקדמים"
      ],
      extraInfo: "אקרודאנס הינו סגנון מאתגר, ייחודי וחדשני דורש למידה של טכניקת מחול ואקרובטיקה יחד ופיתוח כוח וגמישות. לרקוד מושלם ו... לעוף באויר!",
      suitableFor: "מתאים לבנות היסודי, תיכון ומעלה - לרקדניות אמיצות ואוהבות אתגר",
      levels: ["בסיס", "מתקדמות"],
      duration: "60 דקות",
      ages: "יסודי, תיכון, נשים"
    },
    {
      title: "אקרובטיקה - התעמלות קרקע",
      subtitle: "עופי על זה! חוג התעמלות קרקע בירושלים והסביבה",
      description: "תחום פופולרי, אנרגטי, מוציא הרבה אנרגיה, מחזק מאתגר ומהנה מאוד! שיעורי האקרובטיקה וההתעמלות קרקע שלנו מפתחים יכולות שיווי משקל, כוח מתפרץ, אומץ, התמצאות במרחב, גמישות, זריזות ומהירות.",
      icon: <span className="text-4xl">🤸‍♀️</span>,
      structure: "במהלך השנה לומדים ומתרגלים:",
      features: [
        "עמידות ידיים בכל הרמות",
        "גלגלונים וגשרים",
        "ערביות ופליק פלאקים",
        "סלטות ואלמנטים מתקדמים",
        "מרמת בסיס ועד לביצועים עוצרי נשימה!"
      ],
      extraInfo: "חיזוק חגורת הכתפיים, יציבה נכונה ואף קשב וריכוז. שיעור מלא אנרגיה עוצמה וחוויה!",
      equipment: "ציוד מתקדם, אולם ספורט ענק וצוות אלוף שיעיף אותך קדימה!!!",
      suitableFor: "מתאім לכל הגילאים מקטנטנות ועד 120 (טוב, הגזמנו קצת). הקבוצות מחולקות לגילאים ורמות - ממתחילות ועד לקבוצת נבחרת מדהימה",
      levels: ["מתחילות", "ממשיכות", "מתקדמות", "נבחרת"],
      duration: "60 דקות",
      ages: "קטנטנות עד נשים"
    }
  ];

  return (
    <div className="min-h-screen py-12 dark-bg">
      {/* Hero Section */}
      <section className="relative darker-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 white-text">
              <span className="gold-text">בואי לרקוד</span> את השנה!
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              שיעור מחול הינו שעה קסומה של חיבור לעצמך מתוך עולם התנועה המופלא.
              מלבד ההנאה, הזרימה והשחרור של הריקוד - המחול נותן ערך מוסף רב.
            </p>
            <div className="w-24 h-1 gold-bg mx-auto"></div>
          </div>
        </div>
      </section>

      {/* Classes Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {classes.map((classItem, index) => (
              <Card key={index} className="overflow-hidden darker-bg border-gray-700 elegant-shadow hover:shadow-2xl transition-all duration-500">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-cols-2' : ''}`}>
                  {/* Content */}
                  <div className={`p-8 lg:p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-6 mb-6">
                      <div className="flex-shrink-0 w-20 h-20 rounded-full gold-bg flex items-center justify-center">
                        {classItem.icon}
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold white-text">{classItem.title}</h2>
                        <p className="pink-text font-medium">{classItem.subtitle}</p>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-6 leading-relaxed text-lg">
                      {classItem.description}
                    </p>

                    {/* Structure/Features */}
                    <div className="mb-6">
                      <h4 className="font-semibold white-text mb-3">{classItem.structure || "מה כולל השיעור:"}</h4>
                      <div className="space-y-2">
                        {classItem.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <div className="w-2 h-2 gold-bg rounded-full flex-shrink-0 mt-2"></div>
                            <span className="text-gray-400">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Extra Info */}
                    {classItem.extraInfo && (
                      <div className="mb-6 dark-bg p-4 rounded-lg border border-gray-700">
                        <p className="text-gray-300 italic">{classItem.extraInfo}</p>
                      </div>
                    )}

                    {/* Equipment */}
                    {classItem.equipment && (
                      <div className="mb-6 dark-bg p-4 rounded-lg border border-gray-700">
                        <h4 className="font-medium pink-text mb-2">הציוד שלנו:</h4>
                        <p className="text-gray-300">{classItem.equipment}</p>
                      </div>
                    )}

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="dark-bg p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Clock className="w-4 h-4 pink-text" />
                          <span className="font-medium white-text">משך השיעור</span>
                        </div>
                        <p className="text-gray-300">{classItem.duration}</p>
                      </div>
                      <div className="dark-bg p-4 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-2 mb-2">
                          <Users className="w-4 h-4 pink-text" />
                          <span className="font-medium white-text">גילאים</span>
                        </div>
                        <p className="text-gray-300">{classItem.ages}</p>
                      </div>
                    </div>

                    {/* Levels */}
                    <div className="mb-6">
                      <h4 className="font-medium white-text mb-2">רמות:</h4>
                      <div className="flex flex-wrap gap-2">
                        {classItem.levels.map((level, idx) => (
                          <Badge key={idx} className="bg-gray-700 text-gray-300 border-gray-600">
                            {level}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Suitable For */}
                    <div className="dark-bg p-4 rounded-lg mb-6 border border-gray-700">
                      <h4 className="font-medium pink-text mb-2 flex items-center gap-2">
                        <Heart className="w-4 h-4" />
                        מתאים לי?
                      </h4>
                      <p className="text-gray-300">{classItem.suitableFor}</p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-6">
                      <Link to={createPageUrl("Contact")}>
                        <Button className="btn-gold w-full sm:w-auto">
                          טופס הרשמה
                          <ArrowLeft className="mr-2 w-4 h-4" />
                        </Button>
                      </Link>
                      <Link to={createPageUrl("Contact")}>
                        <Button className="btn-outline-pink w-full sm:w-auto">
                          דברי איתנו
                        </Button>
                      </Link>
                    </div>

                    {/* Combination Option */}
                    <div className="bg-gradient-to-r from-pink-600/20 to-yellow-600/20 p-4 rounded-lg text-center">
                      <p className="text-gray-300 text-sm mb-2">
                        <strong className="gold-text">לבחירתך:</strong> ניתן גם לשלב בין שיעורים - מסלול של 2 או 3 שיעורים בשבוע
                      </p>
                      <Link to={createPageUrl("Contact")}>
                        <Button variant="link" className="pink-text text-sm p-0">
                          דברי איתנו לפרטים נוספים
                        </Button>
                      </Link>
                    </div>
                  </div>

                  {/* Visual Section */}
                  <div className={`dark-bg relative overflow-hidden min-h-96 flex items-center justify-center ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="text-center text-white p-8">
                      <div className="mb-6 opacity-30 transform scale-150">
                        {React.cloneElement(classItem.icon, { className: 'text-7xl' })}
                      </div>
                      <h3 className="text-2xl font-bold mb-2 white-text">{classItem.title}</h3>
                      <p className="text-lg text-gray-400">חוויה בלתי נשכחת</p>
                    </div>
                    
                    {/* Decorative Elements */}
                    <div className="sparkles" style={{top: '20%', right: '20%', animationDelay: '0s'}}></div>
                    <div className="sparkles" style={{bottom: '30%', left: '15%', animationDelay: '1s'}}></div>
                    <div className="sparkles" style={{top: '60%', left: '30%', animationDelay: '2s'}}></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 darker-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold white-text mb-6">
            מתלבטת? 🤔
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            לא יודעת איזה סגנון תנועה מתאים לך?
            <br />
            מוזמנת להתייעץ איתנו בשמחה!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={createPageUrl("Contact")}>
              <Button className="btn-gold text-xl">
                צור קשר עכשיו
                <ArrowLeft className="mr-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, Clock, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

export default function ClassesPage() {
  const classes = [
    {
      title: "בלט קלאסי",
      subtitle: "עשירה רכה חכמה אומנותית ואצילית",
      description: "שפת התנועה של הבלט הקלאסי הינה עשירה רכה חכמה אומנותית ואצילית.",
      icon: <img src="/02.png" alt="נעלי בלט" className="w-16 h-16 object-contain" />,
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
      icon: <img src="/01.png" alt="מחול מודרני" className="w-16 h-16 object-contain" />,
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
      icon: <img src="/04.png" alt="מחול לגיל הרך" className="w-16 h-16 object-contain" />,
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
      icon: <img src="/03.png" alt="אקרודאנס" className="w-16 h-16 object-contain" />,
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
      icon: <img src="/01.png" alt="אקרובטיקה" className="w-16 h-16 object-contain" />,
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
    <>
      <Helmet>
        <title>שיעורי ריקוד - ריקוד ברוח הטובה</title>
        <meta name="description" content="שיעורי ריקוד מגוונים לכל הרמות והגילאים. מצאו את השיעור המתאים לכם ובואו לרקוד ברוח הטובה" />
        <meta name="keywords" content="שיעורי ריקוד, מחול, לימוד ריקוד, שיעורים למגוון סגנונות וגילאים, קבוצות ריקוד" />
        <meta property="og:title" content="שיעורי ריקוד - ריקוד ברוח הטובה" />
        <meta property="og:description" content="שיעורי ריקוד מגוונים לכל הרמות והגילאים" />
        <meta property="og:url" content="https://rikud.netlify.app/Classes" />
      </Helmet>

      <style>{`
        .sparkle-dot {
          position: absolute;
          background-color: var(--gold);
          border-radius: 50%;
          opacity: 0;
          transform: scale(0.5);
          transition: opacity 0.5s ease;
        }
        .group:hover .sparkle-dot {
          opacity: 0.8;
        }
        .group:hover .sparkle-dot:nth-child(1) {
          animation: dance-circle-1 4s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(2) {
          animation: dance-wave-2 3.5s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(3) {
          animation: dance-spiral-3 5s linear infinite;
        }
        .group:hover .sparkle-dot:nth-child(4) {
          animation: dance-bounce-4 3s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(5) {
          animation: dance-figure8-5 6s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(6) {
          animation: dance-pulse-6 2.5s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(7) {
          animation: dance-arc-7 4.5s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(8) {
          animation: dance-diagonal-8 3s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(9) {
          animation: dance-zigzag-9 4s linear infinite;
        }
        .group:hover .sparkle-dot:nth-child(10) {
          animation: dance-float-10 5s ease-in-out infinite;
        }
        .group:hover .sparkle-dot:nth-child(11) {
          animation: dance-small-circle-11 2s linear infinite;
        }
        .group:hover .sparkle-dot:nth-child(12) {
          animation: dance-line-12 3.5s ease-in-out infinite;
        }
        
        @keyframes dance-circle-1 {
          0%, 100% {
            transform: translate(0, 0) scale(0.8);
            opacity: 0.6;
          }
          25% {
            transform: translate(15px, -10px) scale(1.2);
            opacity: 1;
          }
          50% {
            transform: translate(30px, 0) scale(0.9);
            opacity: 0.8;
          }
          75% {
            transform: translate(15px, 10px) scale(1.1);
            opacity: 0.9;
          }
        }
        
        @keyframes dance-wave-2 {
          0%, 100% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0.5;
          }
          33% {
            transform: translate(-20px, -15px) scale(1.3);
            opacity: 1;
          }
          66% {
            transform: translate(10px, 5px) scale(0.8);
            opacity: 0.7;
          }
        }
        
        @keyframes dance-spiral-3 {
          0% {
            transform: translate(0, 0) scale(1) rotate(0deg);
            opacity: 0.8;
          }
          25% {
            transform: translate(20px, -20px) scale(1.4) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translate(0, -40px) scale(0.7) rotate(180deg);
            opacity: 0.6;
          }
          75% {
            transform: translate(-20px, -20px) scale(1.2) rotate(270deg);
            opacity: 0.9;
          }
          100% {
            transform: translate(0, 0) scale(1) rotate(360deg);
            opacity: 0.8;
          }
        }
        
        @keyframes dance-bounce-4 {
          0%, 100% {
            transform: translateY(0) scale(0.9);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-25px) scale(1.3);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) scale(0.8);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-20px) scale(1.1);
            opacity: 0.9;
          }
        }
        
        @keyframes dance-figure8-5 {
          0% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          12.5% { transform: translate(25px, -15px) scale(1.2); opacity: 0.9; }
          25% { transform: translate(35px, 0) scale(0.8); opacity: 1; }
          37.5% { transform: translate(25px, 15px) scale(1.1); opacity: 0.8; }
          50% { transform: translate(0, 20px) scale(1.3); opacity: 0.7; }
          62.5% { transform: translate(-25px, 15px) scale(0.9); opacity: 0.9; }
          75% { transform: translate(-35px, 0) scale(1.2); opacity: 1; }
          87.5% { transform: translate(-25px, -15px) scale(0.8); opacity: 0.8; }
          100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
        }

        @keyframes dance-pulse-6 {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.6); opacity: 1; }
        }

        @keyframes dance-arc-7 {
          0%, 100% { transform: translate(0, 0) scale(0.9); }
          25% { transform: translate(20px, -25px) scale(1.2); }
          50% { transform: translate(40px, 0) scale(1); }
          75% { transform: translate(20px, 10px) scale(0.8); }
        }

        @keyframes dance-diagonal-8 {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px) scale(1.3); }
        }

        @keyframes dance-zigzag-9 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(15px, 10px); }
          50% { transform: translate(0px, 20px); }
          75% { transform: translate(-15px, 30px); }
        }

        @keyframes dance-float-10 {
          0%, 100% { transform: translate(0, 0); opacity: 0.7; }
          33% { transform: translate(10px, -15px); opacity: 1; }
          66% { transform: translate(-10px, 5px); opacity: 0.5; }
        }

        @keyframes dance-small-circle-11 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
          50% { transform: translate(10px, -10px) scale(1.1) rotate(180deg); }
        }

        @keyframes dance-line-12 {
            0%, 100% { transform: translateX(0); }
            50% { transform: translateX(40px) scale(1.4); }
        }
      `}</style>
      <div className="min-h-screen py-12 dark-bg">
        {/* Hero Section */}
        <section className="relative darker-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
                בואי לרקוד את השנה!
              </h2>
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
            <div className="space-y-0">
              {classes.map((classItem, index) => (
                <div key={index} className="group">
                  <Card className="relative overflow-hidden darker-bg border-gray-700 elegant-shadow hover:shadow-2xl hover:shadow-yellow-500/10 transition-all duration-500">
                    {/* פס זהב - מחליף צד לפי אינדקס */}
                    <div className={`absolute top-0 h-full w-3 gold-bg transition-all duration-500 group-hover:w-4 ${index % 2 === 0 ? 'right-0' : 'left-0'}`}></div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 lg:p-12">

                      {/* החלק הראשון */}
                      <div>
                        <div className="flex items-center gap-6 mb-6">
                          <div className="flex-shrink-0 w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6">
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

                        <div className="mb-6">
                          <h4 className="font-semibold white-text mb-3">{classItem.structure || "לשיעור מבנה קבוע:"}</h4>
                          <div className="space-y-2">
                            {classItem.features.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <div className="w-2 h-2 gold-bg rounded-full flex-shrink-0 mt-2"></div>
                                <span className="text-gray-400">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold white-text flex items-center gap-2 mb-2">
                              <Clock className="w-4 h-4 pink-text" />
                              משך השיעור:
                            </h4>
                            <p className="text-gray-300">{classItem.duration}</p>
                          </div>

                          <div>
                            <h4 className="font-semibold white-text flex items-center gap-2 mb-2">
                              <Users className="w-4 h-4 pink-text" />
                              גילאים:
                            </h4>
                            <p className="text-gray-300">{classItem.ages}</p>
                          </div>
                        </div>
                      </div>

                      {/* החלק השני */}
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <div className="mb-6">
                            <h4 className="font-semibold white-text mb-3">רמות:</h4>
                            <div className="flex flex-wrap gap-2">
                              {classItem.levels.map((level, idx) => (
                                <Badge key={idx} className="bg-white/5 border border-white/20 text-gray-300 hover:bg-pink-500/10 hover:border-pink-500/40 transition-colors">
                                  {level}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="mb-6 dark-bg p-4 rounded-lg border border-gray-700 transition-colors hover:border-pink-500/50">
                            <h4 className="font-medium pink-text mb-2 flex items-center gap-2">
                              <Heart className="w-4 h-4" />
                              מתאים לי?
                            </h4>
                            <p className="text-gray-300">{classItem.suitableFor}</p>
                          </div>
                        </div>

                        <div>
                          {/* Decorative Burst Element */}
                          <div className="my-8 h-12 relative" aria-hidden="true">
                            <div className="absolute w-full h-full top-0 left-0">
                              <div className="sparkle-dot" style={{ width: '6px', height: '6px', top: '45%', left: '20%' }}></div>
                              <div className="sparkle-dot" style={{ width: '3px', height: '3px', top: '65%', left: '35%' }}></div>
                              <div className="sparkle-dot" style={{ width: '8px', height: '8px', top: '50%', left: '50%', transform: 'translateX(-50%)' }}></div>
                              <div className="sparkle-dot" style={{ width: '4px', height: '4px', top: '30%', left: '75%' }}></div>
                              <div className="sparkle-dot" style={{ width: '5px', height: '5px', top: '70%', left: '85%' }}></div>
                              <div className="sparkle-dot" style={{ width: '7px', height: '7px', top: '10%', left: '10%' }}></div>
                              <div className="sparkle-dot" style={{ width: '4px', height: '4px', top: '25%', left: '55%' }}></div>
                              <div className="sparkle-dot" style={{ width: '6px', height: '6px', top: '80%', left: '45%' }}></div>
                              <div className="sparkle-dot" style={{ width: '3px', height: '3px', top: '90%', left: '70%' }}></div>
                              <div className="sparkle-dot" style={{ width: '5px', height: '5px', top: '5%', left: '80%' }}></div>
                              <div className="sparkle-dot" style={{ width: '4px', height: '4px', top: '55%', left: '5%' }}></div>
                              <div className="sparkle-dot" style={{ width: '7px', height: '7px', top: '75%', left: '25%' }}></div>
                            </div>
                          </div>

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
                      </div>
                    </div>
                  </Card>

                  {/* Decorative Separator */}
                  {index < classes.length - 1 && (
                    <div className="my-12 flex items-center justify-center opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 ease-in-out" aria-hidden="true">
                      <div className="flex-grow h-px bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent"></div>
                      <div className="flex-grow h-px bg-gradient-to-l from-transparent via-yellow-500/30 to-transparent"></div>
                    </div>
                  )}
                </div>
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
    </>
  );

}

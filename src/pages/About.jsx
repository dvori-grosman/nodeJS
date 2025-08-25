
import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Star, Users, ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <>
  <Helmet>
      <title>אודות - ריקוד ברוח הטובה</title>
      <meta name="description" content="הכירו את הסיפור מאחורי ריקוד ברוח הטובה, הפילוסופיה שלנו והדרך שלנו לחיבור בין ריקוד לרוחניות" />
      <meta name="keywords" content="אודות ריקוד ברוח טובה, סיפור, חזון, חדווה ומרים, ריקוד בצניעות," />
      <meta property="og:title" content="אודות - ריקוד ברוח הטובה" />
      <meta property="og:description" content="הכירו את הסיפור והחזון מאחורי ריקוד ברוח הטובה" />
      <meta property="og:url" content="https://rikud.netlify.app/About" />
  </Helmet>
    <div className="min-h-screen py-12 dark-bg">
      {/* Hero Section */}
      <section className="relative darker-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <img 
              src="/logo.png" 
              alt="לוגו ריקוד ברוח הטובה" 
              className="h-32 w-auto mx-auto mb-8" 
            />
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
              אודות ברוח הטובה
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              חזון, אהבה ושליחות להביא לכל בת במגזר החרדי את מתנת המחול
            </p>
            <div className="w-24 h-1 gold-bg mx-auto mt-8"></div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Mission Statement */}
          <Card className="darker-bg border-gray-700 elegant-shadow mb-12">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl gold-text mb-4">החזון שלנו</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center">
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p>
                  ריקוד ברוח הטובה הוקם מתוך <span className="pink-text font-semibold">חזון, אהבה ושליחות</span> להביא לכל בת במגזר החרדי את <span className="gold-text font-semibold">מתנת המחול</span>
                </p>
                <p>
                  בהתאמה מושלמת לצביון עולמה וחיבור לערכים 
                  מתוך <span className="white-text font-semibold">מקצועיות ללא פשרות.</span>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* The Power of Movement */}
          <Card className="darker-bg border-gray-700 elegant-shadow mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Heart className="w-16 h-16 pink-text mx-auto mb-4" />
                <h2 className="text-3xl gold-text">כוחה של התנועה</h2>
              </div>
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p className="text-center">
                  אנו עומדות נפעמות מול <span className="pink-text font-semibold">כוחה של התנועה</span> להוביל צמיחה והתפתחות אישית
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="dark-bg p-6 rounded-lg">
                    <h4 className="font-semibold white-text mb-3">התפתחות אישית</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full"></div>
                        <span>בטחון עצמי</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full"></div>
                        <span>כישורי חברה</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full"></div>
                        <span>שמחת חיים</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 pink-bg rounded-full"></div>
                        <span>משמעת עצמית וסיפוק</span>
                      </li>
                    </ul>
                  </div>
                  <div className="dark-bg p-6 rounded-lg">
                    <h4 className="font-semibold white-text mb-3">פיתוח גופני</h4>
                    <ul className="space-y-2 text-gray-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 gold-bg rounded-full"></div>
                        <span>יציבה בריאה וזקופה</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 gold-bg rounded-full"></div>
                        <span>פיתוח קורדינציה</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 gold-bg rounded-full"></div>
                        <span>כוח וגמישות</span>
                      </li>
                    </ul>
                  </div>
                </div>
                <p className="text-center text-2xl gold-text font-bold mt-8">
                  המחול – שמחולל הכל!!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Our Approach */}
          <Card className="darker-bg border-gray-700 elegant-shadow mb-12">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Star className="w-16 h-16 gold-text mx-auto mb-4" />
                <h2 className="text-3xl pink-text">הגישה שלנו</h2>
              </div>
              <div className="text-lg text-gray-300 leading-relaxed space-y-6">
                <p className="text-center">
                  אנו מאמינות ב<span className="pink-text font-semibold">יחס חם ואישי לכל בת</span>
                </p>
                <p className="text-center">
                  ולמידה מתוך <span className="gold-text font-semibold">אמון, אהבה והעצמה</span>
                </p>
                <p className="text-center">
                  בידיים מקצועיות שמטפחות <span className="white-text font-semibold">השקעה, התמדה ומצויינות</span> ומובילות את התלמידות ל<span className="pink-text font-semibold">השגים מעוררי השראה!!</span>
                </p>
                <div className="bg-gradient-to-r from-pink-600/20 to-yellow-600/20 p-6 rounded-lg text-center mt-8">
                  <p className="text-2xl gold-text font-bold">
                    עם ברוח הטובה... השמיים הם הגבול :)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Philosophy */}
          <Card className="darker-bg border-gray-700 elegant-shadow mb-12">
            <CardContent className="p-8 text-center">
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p>
                  בשבילנו ריקוד הינו <span className="gold-text font-semibold">כלי מבורך לבריאות הגוף והנפש</span>,
                  המעניק לכל אחת מתלמידותינו כל כך הרבה טוב!
                </p>
                <p>
                  הדרך שאנו עושות יחד, במקצועיות, באהבה ובכיף יפה ומרגש...
                </p>
                <p className="text-xl pink-text font-bold">
                  והכי חשוב באווירה איכותית ושמורה - ברוח הטובה!!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Personal Touch */}
          <Card className="darker-bg border-pink-500/50 border-2 elegant-shadow mb-12">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl gold-text mb-6">רוצה את זה בשתי מילים?</h2>
              <div className="text-2xl pink-text font-bold mb-4">
                ברוח הטובה
              </div>
              <div className="text-xl white-text mb-6">
                מרים וחדוה
              </div>
              <div className="w-24 h-1 gold-bg mx-auto"></div>
            </CardContent>
          </Card>

          {/* Welcome Message */}
          <Card className="dark-bg border-gray-700 elegant-shadow">
            <CardContent className="p-8 text-center">
              <Users className="w-16 h-16 pink-text mx-auto mb-6" />
              <h2 className="text-3xl gold-text mb-6">ברוכה הבאה!</h2>
              <div className="text-lg text-gray-300 leading-relaxed space-y-4">
                <p>
                  מוזמנת להציץ באתר ולהכיר אותנו
                </p>
                <p>
                  למצוא את הסניף הקרוב אליך עבור חוג מחול בירושלים, ביתר או בית שמש ואת סגנון השיעור שלך.
                </p>
                <p className="pink-text font-semibold">
                  מחכות לך בסטודיו עם המון אנרגיה טובה 😊
                </p>
                <p className="text-2xl gold-text font-bold">
                  כנסי לקצב... :)
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to={createPageUrl("Classes")}>
                  <Button className="btn-gold">
                    גלי את השיעורים
                    <ArrowLeft className="mr-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to={createPageUrl("Contact")}>
                  <Button className="btn-outline-pink">
                    בואי נכיר!
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
    </>
  );
}

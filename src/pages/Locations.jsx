import React, { useState, useEffect } from "react";
import { MapPin, Phone, Clock, Car, X, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Helmet } from "react-helmet-async";

export default function LocationsPage() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch branches and schedule data from server
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch branches
        const branchesResponse = await fetch('http://localhost:5000/api/branches');
        const branchesData = await branchesResponse.json();
        
        // Fetch schedule
        const scheduleResponse = await fetch('http://localhost:5000/api/classes/schedule');
        const scheduleData = await scheduleResponse.json();
        
        if (branchesData.success && scheduleData.success) {
          setBranches(branchesData.data);
          setSchedule(scheduleData.data);
        } else {
          setError('שגיאה בטעינת נתוני הסניפים');
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('שגיאה בחיבור לשרת');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch schedule for specific branch when selected
  const fetchBranchSchedule = async (branchId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/classes/schedule?branch=${branchId}`);
      const data = await response.json();
      if (data.success) {
        return data.data;
      }
    } catch (err) {
      console.error('Error fetching branch schedule:', err);
    }
    return {};
  };

  const handleBranchClick = async (branch) => {
    const branchSchedule = await fetchBranchSchedule(branch._id);
    setSelectedBranch({
      ...branch,
      schedule: branchSchedule
    });
  };
  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];

  if (loading) {
    return (
      <div className="min-h-screen py-12 dark-bg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="text-gray-300">טוען נתוני סניפים...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-12 dark-bg flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <Button onClick={() => window.location.reload()} className="btn-gold">
            נסה שוב
          </Button>
        </div>
      </div>
    );
  }






  return (
    <>
      <Helmet>
        <title>סניפים - ריקוד ברוח הטובה</title>
        <meta name="description" content="מצאו את הסניף הקרוב אליכם! סניפי ריקוד ברוח הטובה ברחבי הארץ עם מידע על מיקום, זמנים ויצירת קשר" />
        <meta name="keywords" content="סניפי ריקוד, מיקומים, חוג מחול, התעמלות קרקע, אקרובטיקה, אקרודאנס, כתובות, זמנים" />
        <meta property="og:title" content="סניפים - ריקוד ברוח הטובה" />
        <meta property="og:description" content="מצאו את הסניף הקרוב אליכם ברחבי הארץ" />
        <meta property="og:url" content="https://rikud.netlify.app/Locations" />
      </Helmet>
      <div className="min-h-screen py-12 dark-bg">
        {/* Hero Section */}
        <section className="relative darker-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
                מצאי את הסניף הקרוב אליך
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                אנו מציעות חוגי מחול, אקרובטיקה והתעמלות קרקע בירושלים, ביתר ובית שמש. תמיד יש סניף נוח בקרבתך.
              </p>
              <div className="w-24 h-1 gold-bg mx-auto mt-8"></div>
            </div>
          </div>
        </section>

        {/* Locations */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {branches.length > 0 ? (
              <div className="mb-16">
                {/* City Header */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold gold-text mb-4">הסניפים שלנו</h2>
                  <div className="w-24 h-1 gold-bg mx-auto"></div>
                </div>

                {/* Branches Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {branches.map((branch, branchIndex) => (
                    <Card key={branchIndex} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 darker-bg border-gray-700 elegant-shadow flex flex-col">
                      <CardHeader className="relative overflow-hidden">
                        {/* Header Background */}
                        <div className="absolute inset-0 gold-bg opacity-90"></div>

                        {/* Content */}
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                              <MapPin className="w-5 h-5 text-white fill-pink-400" stroke="white" strokeWidth="2" />
                            </div>
                            <CardTitle className="text-xl font-bold text-black">
                              {branch.name}
                            </CardTitle>
                          </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="sparkles" style={{ top: '20%', right: '15%', animationDelay: '0s' }}></div>
                        <div className="sparkles" style={{ bottom: '20%', left: '15%', animationDelay: '1s' }}></div>
                      </CardHeader>

                      <CardContent className="p-6 flex-grow flex flex-col">
                        {/* Address */}
                        <div className="mb-4">
                          <div className="flex items-start gap-2 mb-2">
                            <Car className="w-4 h-4 pink-text mt-1 flex-shrink-0" />
                            <p className="text-gray-300 text-sm leading-relaxed">
                              {branch.address}
                            </p>
                          </div>
                          {branch.phone && (
                            <div className="flex items-center gap-2 mt-2">
                              <Phone className="w-3 h-3 pink-text" />
                              <p className="text-gray-400 text-xs">{branch.phone}</p>
                            </div>
                          )}
                        </div>

                        {/* Contact Info */}
                        {branch.contactPerson && (
                          <div className="mb-4">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 pink-text" />
                              <span className="text-gray-300 text-sm">{branch.contactPerson}</span>
                            </div>
                          </div>
                        )}

                        {/* Schedule Link */}
                        <div className="pt-4 border-t border-gray-700 mt-auto">
                          <Button
                            onClick={() => handleBranchClick(branch)}
                            className="w-full dark-bg p-3 rounded-lg text-center border border-gray-600 hover:bg-gray-700 transition-colors"
                          >
                            <p className="pink-text font-medium text-sm">מערכת שעות תשפ"ו</p>
                            <p className="text-gray-400 text-xs mt-1">לחץ לצפייה במערכת השעות</p>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg">אין סניפים זמינים כרגע</p>
              </div>
            )}
          </div>
        </section>

        {/* Schedule Popup */}
        {selectedBranch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center animate-in fade-in-0 duration-300">
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedBranch(null)}
            ></div>

            {/* Popup Content */}
            <div className="relative z-10 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
              <Card className="darker-bg border-gray-700 elegant-shadow">
                <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
                  <div>
                    <CardTitle className="text-2xl gold-text">מערכת שעות - {selectedBranch.name}</CardTitle>
                    <p className="text-gray-400 text-sm mt-1">שנת תשפ"ו - המערכת עשויה להשתנות</p>
                  </div>
                  <Button
                    onClick={() => setSelectedBranch(null)}
                    className="w-8 h-8 p-0 bg-gray-800 hover:bg-gray-700 text-white"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </CardHeader>

                <CardContent className="p-0">
                  {selectedBranch.schedule && Object.keys(selectedBranch.schedule).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
                      {days.map(day => (
                        <Card key={day} className="darker-bg border-gray-700 hover:border-yellow-500/50 transition-colors">
                          <CardHeader className="pb-3">
                            <CardTitle className="text-xl font-bold gold-text text-center flex items-center justify-center gap-2">
                              <Calendar className="w-5 h-5" />
                              {day}
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {selectedBranch.schedule[day] && selectedBranch.schedule[day].length > 0 ? (
                              <div className="space-y-3">
                                {selectedBranch.schedule[day].map((classItem, index) => (
                                  <div key={index} className="bg-gray-800/50 p-3 rounded-lg border border-gray-600 hover:border-pink-500/50 transition-colors">
                                    <div className="flex items-center gap-2 mb-2">
                                      <Clock className="w-4 h-4 pink-text" />
                                      <span className="font-semibold white-text">{classItem.time}</span>
                                    </div>
                                    
                                    <div className="text-sm text-gray-300 mb-2">
                                      {classItem.description}
                                    </div>
                                    
                                    {classItem.level && (
                                      <Badge className="bg-pink-500/20 text-pink-300 border-pink-500/30 mb-2">
                                        {classItem.level}
                                      </Badge>
                                    )}
                                    
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mb-1">
                                      <User className="w-3 h-3" />
                                      <span>{classItem.teacher?.name || 'לא צוין'}</span>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                      <Clock className="w-3 h-3" />
                                      <span>{classItem.duration} דקות</span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>אין שיעורים ביום זה</p>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-gray-400">מערכת שעות עבור סניף זה תתפרסם בקרוב.</p>
                    </div>
                  )}

                  {/* ציוד נדרש */}
                  <div className="p-6 dark-bg border-t border-gray-700 text-sm text-gray-300">
                    <p className="mb-3">
                      יש להגיע כ5 דק' לפני תחילת השיעור, להתארגן עם שיער אסוף, בקבוק מים ובנוסף:
                    </p>
                    <div className="space-y-2">
                      <p>
                        <span className="font-semibold text-white">מחול - </span>
                        <span className="pink-text">בגד גוף / חולצה נעימה ומתאימה לריקוד, חצאית אורך ברך רחבה וקלילה, טייץ, גרבי קרסול / נעלי בלט</span>
                      </p>
                      <p>
                        <span className="font-semibold text-white">אקרובטיקה - </span>
                        <span className="pink-text">בגד גוף, חצאית אורך ברך רחבה וקלילה, טייץ, גרבים נגד החלקה</span>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <section className="py-16 darker-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold white-text mb-6">
              רוצה לדעת יותר על הסניף הקרוב אליך?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              צרי קשר ונספר לך על המערכת שעות, הזמינות וכל הפרטים הנוספים
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-300">
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5 pink-text" />
                <span className="text-lg">03-3130656</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 gold-text" />
                <span className="text-lg">10:00-16:00 | ראשון-חמישי</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

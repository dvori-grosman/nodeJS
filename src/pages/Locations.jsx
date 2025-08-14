import React, { useState } from "react";
import { MapPin, Phone, Clock, Car, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LocationsPage() {

  const [selectedBranch, setSelectedBranch] = useState(null);

  const locations = [
    {
      city: "חוגי מחול בירושלים",
      branches: [
        {
          name: "גבעת שאול",
          address: "מרכז הספורט בית חינוך עוורים, רחוב דגל ראובן 8",
          facilities: ["סטודיו מחול", "אולם ספורט התעמלות קרקע"],
          extension: "שלוחה לגיל הרך - אלקבץ 16",
          schedule: {
            title: "מערכת שעות - גבעת שאול",
            days: [
              { day: "ראשון", teacher:"חדווה", class: "16:00 - בלט קלאסי מתחילות" },
              { day: "שני", class: "15:30 - מחול לגיל הרך" },
              { day: "רביעי", class: "16:30 - התעמלות קרקע ממשיכות" },
              { day: "חמישי", class: "18:00 - נבחרת התעמלות קרקע" }
            ]
          }
        },
        {
          name: "גאולה", 
          address: "סטודיו מחול ישעיהו 19",
          facilities: ["סטודיו מחול מקצועי"],
          extension: "התעמלות קרקע - אולם ספורט סנהדרין רח' מנחת יצחק 23",
          schedule: {
            title: "מערכת שעות - גאולה",
            days: [
              { day: "ראשון", class: "17:00 - מחול מודרני ממשיכות" },
              { day: "שלישי", class: "17:00 - אקרודאנס" }
            ]
          }
        },
        {
          name: "רמות",
          address: "מתנס מעלה רמות גולה מאיר 474",
          facilities: ["מתנס עירוני"],
          schedule: {
            title: "מערכת שעות - רמות",
            days: [
              { day: "ראשון", class: "18:00 - אקרובטיקה מתקדמות" },
              { day: "שלישי", class: "18:00 - בלט קלאסי מתקדמות + פוינט" }
            ]
          }
        },
        {
          name: "רמת שלמה",
          address: "מתנס רמת שלמה",
          facilities: ["מתנס עירוני"],
          schedule: {
            title: "מערכת שעות - רמת שלמה",
            days: [
              { day: "חמישי", class: "16:00 - בלט קלאסי מתחילות" }
            ]
          }
        },
        {
          name: "עזרת תורה",
          address: "עזרת תורה 16 מתנס נווה חמד",
          facilities: ["מתנס איכותי"],
           schedule: {
            title: "מערכת שעות - עזרת תורה",
            days: [
              { day: "שני", class: "16:30 - בלט קלאסי ממשיכות" },
              { day: "חמישי", class: "17:00 - אקרובטיקה מתחילות" }
            ]
          }
        },
        {
          name: "הגבעה הצרפתית",
          address: "מתנס הגבעה הצרפתית רח' ההגנה 13",
          facilities: ["מתנס מודרני"],
          schedule: {
            title: "מערכת שעות - הגבעה הצרפתית",
            days: [
               { day: "רביעי", class: "17:30 - מחול מודרני מתקדמות" }
            ]
          }
        },
        {
          name: "נווה יעקב",
          address: "מתנס נווה יעקב סטודיו ספארק",
          facilities: ["סטודיו מתקדם"],
          schedule: {
            title: "מערכת שעות - נווה יעקב",
            days: [
              { day: "שלישי", class: "16:00 - מחול מודרני מתחילות" }
            ]
          }
        }
      ]
    },
    {
      city: "חוגי מחול בביתר עילית",
      branches: [
        {
          name: "ביתר עילית",
          address: "המגיד ממעזריטש 78 ביתר עילית",
          facilities: ["התעמלות קרקע סטודיו B"],
          schedule: {
            title: "מערכת שעות - ביתר עילית",
            days: [
               { day: "שני", class: "17:30 - התעמלות קרקע מתחילות" }
            ]
          }
        }
      ]
    },
    {
      city: "חוגי מחול בבית שמש",
      branches: [
        {
          name: "בית שמש",
          address: "רמת אברהם",
          facilities: ["מתנס עירוני"],
          schedule: {
            title: "מערכת שעות - בית שמש",
            days: [
               { day: "רביעי", class: "15:30 - מחול לגיל הרך" }
            ]
          }
        }
      ]
    }
  ];

  return (
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
          {locations.map((cityData, cityIndex) => (
            <div key={cityIndex} className="mb-16">
              {/* City Header */}
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold gold-text mb-4">{cityData.city}</h2>
                <div className="w-24 h-1 gold-bg mx-auto"></div>
              </div>

              {/* Branches Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cityData.branches.map((branch, branchIndex) => (
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
                      <div className="sparkles" style={{top: '20%', right: '15%', animationDelay: '0s'}}></div>
                      <div className="sparkles" style={{bottom: '20%', left: '15%', animationDelay: '1s'}}></div>
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
                        {branch.extension && (
                          <p className="text-gray-400 text-xs mt-2 pr-6">
                            {branch.extension}
                          </p>
                        )}
                      </div>

                      {/* Facilities */}
                      <div className="mb-6">
                        <h4 className="font-semibold white-text mb-2 flex items-center gap-2">
                          <Clock className="w-4 h-4 pink-text" />
                          מתקנים
                        </h4>
                        <div className="space-y-1">
                          {branch.facilities.map((facility, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <div className="w-1.5 h-1.5 gold-bg rounded-full"></div>
                              <span className="text-gray-400 text-sm">{facility}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Schedule Link */}
                      <div className="pt-4 border-t border-gray-700 mt-auto">
                        <Button 
                          onClick={() => setSelectedBranch(branch)}
                          className="w-full dark-bg p-3 rounded-lg text-center border border-gray-600 hover:bg-gray-700 transition-colors"  >
                          <p className="pink-text font-medium text-sm">מערכת שעות תשפ"ו</p>
                          <p className="text-gray-400 text-xs mt-1">לחץ לצפייה במערכת השעות</p>
                        </Button>
                        <DownloadButton/>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))}
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
          <div className="relative z-10 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
            <Card className="darker-bg border-gray-700 elegant-shadow">
              <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
                <div>
                  <CardTitle className="text-2xl gold-text">{selectedBranch.schedule.title}</CardTitle>
                  <p className="text-gray-400 text-sm mt-1">הערה: המערכת עשויה להשתנות</p>
                </div>
                <Button
                  onClick={() => setSelectedBranch(null)}
                  className="w-8 h-8 p-0 bg-gray-700 hover:bg-gray-600"
                >
                  <X className="w-4 h-4 text-gray-300" />
                </Button>
              </CardHeader>
              
              <CardContent className="p-6 max-h-[60vh] overflow-y-auto">
                {selectedBranch.schedule && selectedBranch.schedule.days.length > 0 ? (
                  <div className="space-y-4">
                    {selectedBranch.schedule.days.map((item, index) => (
                      <div key={index} className="dark-bg p-4 rounded-lg border border-gray-700 flex justify-between items-center">
                        <span className="font-semibold white-text">{item.day}</span>
                        <span className="font-semibold white-text">{item.teacher}</span>
                        <span className="gold-text text-left">{item.class}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-300 text-center">מערכת שעות עבור סניף זה תתפרסם בקרוב.</p>
                )}
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
  );
}

const DownloadButton = () => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = '/schedule.pdf'; // שם הקובץ שלך
        link.download = 'schedule.pdf'; // שם הקובץ להורדה
        link.click();
    };

    return (
        <button onClick={handleDownload}>
            הורד את הקובץ PDF
        </button>
    );
};
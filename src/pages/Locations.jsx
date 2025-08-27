import React, { useState } from "react";
import { MapPin, Phone, Clock, Car, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";

export default function LocationsPage() {

  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isPdfOpen, setIsPdfOpen] = useState(false);

  const openPdf = () => {
    setIsPdfOpen(true);
  };

  const closePdf = () => {
    setIsPdfOpen(false);
  };
  /**
   * Helper function to render a single schedule cell.
   * It handles two data formats:
   * 1. Old format: activityString is just the activity name, rowTime is the time for the whole row.
   * 2. New format: activityString includes time (e.g., "HH:MM-HH:MM Activity Name"), rowTime is undefined.
   * @param {string} activityString The string representing the activity for the day.
   * @param {string | undefined} rowTime The time for the entire row (if applicable to the old format).
   * @returns {JSX.Element | null} The JSX to render the cell content, or null if no activity.
   */
  const renderScheduleCell = (activityString, rowTime) => {
    if (!activityString) return null; // No activity for this day/slot

    let displayActivity = activityString;
    let displayTime = rowTime;

    if (!rowTime) { // If there's no row-level time (implies new format)
      const parts = activityString.split(' ');
      // Check if the first part looks like a time range (contains a hyphen)
      if (parts.length > 1 && parts[0].includes('-') && parts[0].includes(':')) {
        displayTime = parts[0];
        displayActivity = parts.slice(1).join(' ');
      } else {
        // It's just an activity name without time prefix (e.g., "שיעונים - ...")
        displayActivity = activityString;
        displayTime = ''; // No time to display
      }
    }

    return (
      <div className="text-gray-300 font-medium text-sm leading-tight">
        <div>{displayActivity}</div>
        {displayTime && <div className="gold-text text-xs mt-1">{displayTime}</div>}
      </div>
    );
  };

  const locations = [
    {
      city: "חוגי מחול בירושלים",
      branches: [
        {
          name: "גבעת שאול",
          src: "/givatShaulSchedule.pdf",
          address: "מרכז הספורט בית חינוך עוורים, רחוב דגל ראובן 8",
          facilities: ["סטודיו מחול", "אולם ספורט התעמלות קרקע"],
          extension: "שלוחה לגיל הרך - אלקבץ 16",
          schedule: {
            title: "מערכת שעות - גבעת שאול",
            titles: { sunday: "מרים", monday: "עדינה", tuesday: "שירה", wednesday: "חדווה ", thursday: "גיטי" },
            timeSlots: [
              { sunday: "", monday: "15:30-16:30 כיתות ג-ד 2", tuesday: "15:30-16:30 כיתות ד-ו מחול מתחילות", wednesday: "", thursday: "" },
              { sunday: "16:15-17:15 התעמלות לבנים", monday: "16:30-17:15 גיל 3-4", tuesday: "16:30-17:15 גן חובה", wednesday: "", thursday: "16:30-17:15 קרקע גן" },
              { sunday: "17:15-18:30 קלאסי 1 ה-ו-ז מתקדמות", monday: "17:15-18:15 מודרני מתקדמות ה-ו", tuesday: "17:15-18:15 כיתות א-ב-ג", wednesday: "17:00-18:45 קלאסי 2+ פוינט", thursday: "17:15-18:15 קרקע א-ב" },
              { sunday: "18:30-20:15 קלאסי 3 פוינט עתודה", monday: "18:30-20:00 מודרני 1", tuesday: "18:30-20:00 קלאסי 1", wednesday: "18:45-20:30 מודרני 3 עתודה", thursday: "18:15-19:30 אקורודנס כיתות ו ומעלה" },
              { sunday: "20:15-22:00 קלאסי 4 פוינט להקה", monday: "20:00-21:30 מודרני 2", tuesday: "התעמלות קרקע: רעות, סימי, מירי", wednesday: "20:30-22:15 מודרני 4 להקה", thursday: "" },
              { sunday: "אלקבץ/אילה מחול", monday: "", tuesday: "15:30-16:30 כיתות ג-ד-ה", wednesday: "", thursday: "" },
              { sunday: "16:15-17:00 גן", monday: "", tuesday: "16:30-17:30 כיתות ו-ז", wednesday: "", thursday: "" },
              { sunday: "17:00-18:00 כיתות א'-ד'", monday: "", tuesday: "17:30-18:45 ח תיכון", wednesday: "", thursday: "" }
            ]
          }
        },
        {
          name: "גאולה",
          // לשנות כאן
          src: "/schedule.pdf",
          address: "סטודיו מחול ישעיהו 19",
          facilities: ["סטודיו מחול מקצועי"],
          extension: "התעמלות קרקע - אולם ספורט סנהדרין רח' מנחת יצחק 23",
          schedule: {
            title: "מערכת שעות - גאולה",
            titles: { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
            timeSlots: [
              { sunday: "", monday: "", tuesday: "המערכת עדיין לא מעודכנת לשנת תשפ''ה", wednesday: "", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" }
            ]
          }
        },
        {
          name: "רמות",
          src: "/ramotSchedule.pdf",
          address: "מתנס מעלה רמות גולה מאיר 474",
          facilities: ["מתנס עירוני"],
          schedule: {
            title: "מערכת שעות - רמות",
            titles: { sunday: "ראשון", monday: "שני", tuesday: "שלישי", wednesday: "רביעי", thursday: "חמישי" },
            timeSlots: [
              { sunday: "15:15-16:15 מחול משולב כיתות ד-ה-ו", monday: "", tuesday: "15:15-16:15 אקרובטיקה מתקדמות", wednesday: "", thursday: "" },
              { sunday: "16:15-17:00 טרום בלט גן", monday: "", tuesday: "16:15-17:15 אקרובטיקה כיתות א-ה", wednesday: "", thursday: "" },
              { sunday: "17:00-18:00 מחול משולב כיתות א-ב-ג", monday: "", tuesday: "17:15-18:30 אקרובטיקה כיתות ו-ז ותיכון", wednesday: "", thursday: "" },
              { sunday: "18:00-19:15 מחול מודרני ז-ח ותיכון", monday: "", tuesday: "18:30-19:45 בלט קלאסי ח ותיכון", wednesday: "", thursday: "" }
            ]
          }
        },
        {
          name: "רמת שלמה",
          src: "/ramatShlomoSchedule.pdf",
          address: "מתנס רמת שלמה",
          facilities: ["מתנס עירוני"],
          schedule: {
            title: "מערכת שעות - רמת שלמה",
            titles: { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
            timeSlots: [
              { sunday: "16:15-17:00 טרום בלט גן", monday: "", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "17:00-18:00 מחול משולב א-ד", monday: "16:15-17:15 אקרודנס א-ה", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "18:00-19:00 מחול משולב כיתות ה-ו-ז", monday: "17:15-18:15 אקרודנס ו-ח ותיכון", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "19:00-20:15 בלט קלאסי ח ותיכון", monday: "", tuesday: "", wednesday: "", thursday: "" }
            ]
          }
        },
        {
          name: "עזרת תורה",
          src: "/neveChemedSchedule.pdf",
          address: "עזרת תורה 16 מתנס נווה חמד",
          facilities: ["מתנס איכותי"],
          schedule: {
            title: "מערכת שעות - עזרת תורה",
            titles: { sunday: "", monday: "", tuesday: "גיטי ברמן", wednesday: "מירי", thursday: "אודל" },
            timeSlots: [
              { sunday: "", monday: "", tuesday: "הגבעה הצרפתית", wednesday: "עזרת תורה", thursday: "" },
              { sunday: "", monday: "", tuesday: "16:15-17:00 אקורודנס קטנות", wednesday: "", thursday: "16:30-17:15 טרום בלט גן" },
              { sunday: "", monday: "", tuesday: "17:00-18:00 אקורודנס א-ד", wednesday: "", thursday: "17:15-18:15 מחול כיתות א-ה" },
              { sunday: "", monday: "", tuesday: "18:00-19:00 אקורודנס ה-ח", wednesday: "", thursday: "18:15-19:15 מחול כיתות ה-ח" },
              { sunday: "", monday: "", tuesday: "", wednesday: "18:00-19:00 אקרודאנס כיתות א-ד", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "19:00-20:00 אקרודאנס כיתות ה-ח", thursday: "" },


            ]
          }
        },
        {
          name: "הגבעה הצרפתית",
          src: "/neveChemedSchedule.pdf",
          address: "מתנס הגבעה הצרפתית רח' ההגנה 13",
          facilities: ["מתנס מודרני"],
          schedule: {
            title: "מערכת שעות - הגבעה הצרפתית",
            titles: { sunday: "", monday: "", tuesday: "גיטי ברמן", wednesday: "מירי", thursday: "אודל" },
            timeSlots: [
              { sunday: "", monday: "", tuesday: "הגבעה הצרפתית", wednesday: "עזרת תורה", thursday: "" },
              { sunday: "", monday: "", tuesday: "16:15-17:00 אקורודנס קטנות", wednesday: "", thursday: "16:30-17:15 טרום בלט גן" },
              { sunday: "", monday: "", tuesday: "17:00-18:00 אקורודנס א-ד", wednesday: "", thursday: "17:15-18:15 מחול כיתות א-ה" },
              { sunday: "", monday: "", tuesday: "18:00-19:00 אקורודנס ה-ח", wednesday: "", thursday: "18:15-19:15 מחול כיתות ה-ח" },
              { sunday: "", monday: "", tuesday: "", wednesday: "18:00-19:00 אקרודאנס כיתות א-ד", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "19:00-20:00 אקרודאנס כיתות ה-ח", thursday: "" },


            ]
          }
        },
        {
          name: "נווה יעקב",
          src: "/neveYaakovSchedule.pdf",
          address: "מתנס נווה יעקב סטודיו ספארק",
          facilities: ["סטודיו מתקדם"],
          schedule: {
            title: "מערכת שעות - נווה יעקב",
            titles: { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
            timeSlots: [
              { sunday: "", monday: "16:15-17:00 טרום בלט גן", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "17:00-18:00 מחול משולב א-ד", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "18:00-19:00 מחול משולב כיתות ה-ו-ז", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "19:00-20:15 בלט קלאסי ח ותיכון", tuesday: "", wednesday: "", thursday: "" }
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
          src: "/beitarSchedule.pdf",
          address: "המגיד ממעזריטש 78 ביתר עילית",
          facilities: ["התעמלות קרקע סטודיו B"],
          schedule: {
            title: "מערכת שעות - ביתר",
            titles: { sunday: "אביגיל", monday: "חדוה", tuesday: "רצי", wednesday: "פייגי", thursday: "רעות" },
            timeSlots: [
              { sunday: "15:15-16:15 קרקע מתקדמות כיתות ג-ו", monday: "", tuesday: "", wednesday: "15:30-16:30 מחול משולב כיתות ד-ה-ו", thursday: "" },
              { sunday: "16:15-17:15 התעמלות קרקע כיתות א-ב", monday: "16:00-17:15 בלט קלאסי 1 ה-ו-ז", tuesday: "", wednesday: "16:30-17:15 טרום בלט", thursday: "" },
              { sunday: "17:15-18:15 קרקע מתקדמות כיתות ג-ו", monday: "17:15-19:00 בלט קלאסי 2 עתודה + פוינט", tuesday: "", wednesday: "17:15-18:15 מחול משולב כיתות א-ב-ג", thursday: "17:00-18:15 התעמלות קרקע נבחרת" },
              { sunday: "", monday: "19:00-20:30 מודרני 3", tuesday: "18:00-19:15 מחול מודרני 1 ז-ח", wednesday: "", thursday: "18:15-19:30 התעמלות קרקע תיכון מתקדמות" },
              { sunday: "", monday: "20:30-22:15 קלאסי 3 להקה פוינט", tuesday: "19:30-21:00 מחול מודרני 2", wednesday: "", thursday: "19:30-20:45 התעמלות קרקע תיכון מתחילות" }
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
          // לשנות כאן
          src: "/schedule.pdf",
          address: "רמת אברהם",
          facilities: ["מתנס עירוני"],
          schedule: {
            title: "מערכת שעות - בית שמש",
            titles: { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
            timeSlots: [
              { sunday: "", monday: "", tuesday: "המערכת עדיין לא מעודכנת לשנת תשפ''ה", wednesday: "", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" },
              { sunday: "", monday: "", tuesday: "", wednesday: "", thursday: "" }
            ]
          }
        }
      ]
    }
  ];






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
            <div className="relative z-10 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-300">
              <Card className="darker-bg border-gray-700 elegant-shadow">
                <CardHeader className="flex flex-row items-center justify-between border-b border-gray-700">
                  <div>
                    <CardTitle className="text-2xl gold-text">{selectedBranch.schedule.title}</CardTitle>
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
                  {selectedBranch.schedule && selectedBranch.schedule.timeSlots && selectedBranch.schedule.timeSlots.length > 0 ? (
                    <div className="overflow-x-auto">
                      {/* הטבלה עצמה */}
                      <table className="w-full text-sm border-collapse">
                        {/* כותרת הטבלה */}
                        <thead>
                          <tr>
                            <th className="gold-bg text-black p-3 text-center font-bold border-r-2 border-white/30">יום א'<br /><span className="font-normal opacity-80">{selectedBranch.schedule.titles.sunday}</span></th>
                            <th className="gold-bg text-black p-3 text-center font-bold border-r-2 border-white/30">יום ב'<br /><span className="font-normal opacity-80">{selectedBranch.schedule.titles.monday}</span></th>
                            <th className="gold-bg text-black p-3 text-center font-bold border-r-2 border-white/30">יום ג'<br /><span className="font-normal opacity-80">{selectedBranch.schedule.titles.tuesday}</span></th>
                            <th className="gold-bg text-black p-3 text-center font-bold border-r-2 border-white/30">יום ד'<br /><span className="font-normal opacity-80">{selectedBranch.schedule.titles.wednesday}</span></th>
                            <th className="gold-bg text-black p-3 text-center font-bold border-r-2 border-white/30">יום ה'<br /><span className="font-normal opacity-80">{selectedBranch.schedule.titles.thursday}</span></th>
                          </tr>
                        </thead>

                        {/* תוכן הטבלה */}
                        <tbody>
                          {selectedBranch.schedule.timeSlots.map((slot, index) => (
                            <tr key={index} className="border-t border-gray-700 hover:bg-gray-800/50 transition-colors">

                              {/* יום א' */}
                              <td className="p-4 text-center border-r-2 border-white/20 min-h-[60px] align-middle">
                                {renderScheduleCell(slot.sunday, slot.time)}
                              </td>

                              {/* יום ב' */}
                              <td className="p-4 text-center border-r-2 border-white/20 min-h-[60px] align-middle">
                                {renderScheduleCell(slot.monday, slot.time)}
                              </td>

                              {/* יום ג' */}
                              <td className="p-4 text-center border-r-2 border-white/20 min-h-[60px] align-middle">
                                {renderScheduleCell(slot.tuesday, slot.time)}
                              </td>

                              {/* יום ד' */}
                              <td className="p-4 text-center border-r-2 border-white/20 min-h-[60px] align-middle">
                                {renderScheduleCell(slot.wednesday, slot.time)}
                              </td>

                              {/* יום ה' */}
                              <td className="p-4 text-center border-r-2 border-white/20 min-h-[60px] align-middle">
                                {renderScheduleCell(slot.thursday, slot.time)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
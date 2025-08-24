import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { Phone, Mail, MapPin, Clock, Heart, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ContactPage() {
  const [inquiryFormData, setInquiryFormData] = useState({
    studentName: "",
    parentPhone: "",
    parentEmail: "",
    inquiryMessage: ""
  });
  
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);
  const [emailSendingStatus, setEmailSendingStatus] = useState('');

  // הגדרת מפתחות EmailJS - עדכן אותם עם הערכים שלך
  const EMAILJS_CONFIG = {
    SERVICE_ID: 'YOUR_SERVICE_ID',       // החלף עם ה-Service ID שלך
    TEMPLATE_ID: 'YOUR_TEMPLATE_ID',     // החלף עם ה-Template ID שלך
    PUBLIC_KEY: 'YOUR_PUBLIC_KEY'        // החלף עם ה-Public Key שלך
  };

  // פונקציה לעדכון נתוני הטופס
  const handleFormInputChange = (fieldName, fieldValue) => {
    setInquiryFormData(previousFormData => ({ 
      ...previousFormData, 
      [fieldName]: fieldValue 
    }));
  };

  // פונקציה לשליחת מייל דרך EmailJS
  const sendEmailViaEmailJS = async (formData) => {
    try {
      // הכנת הנתונים לשליחה לפי פורמט EmailJS
      const emailData = {
        from_name: formData.studentName,
        from_email: formData.parentEmail || 'לא סופק',
        phone: formData.parentPhone,
        message: formData.inquiryMessage,
        to_email: 'b0527182273@gmail.com', // כתובת המייל שתקבל את ההודעות
        subject: `פניה חדשה מהאתר - ${formData.studentName}`
      };

      // שליחת המייל דרך EmailJS
      const result = await emailjs.send(
        EMAILJS_CONFIG.service_xjex7s2,
        EMAILJS_CONFIG.TEMPLATE_ID,
        emailData,
        EMAILJS_CONFIG.PUBLIC_KEY
      );

      console.log('EmailJS הצליח:', result);
      setEmailSendingStatus('המייל נשלח בהצלחה!');
      return true;

    } catch (error) {
      console.error('שגיאה בשליחת EmailJS:', error);
      setEmailSendingStatus('שגיאה בשליחת המייל - אך הפנייה נשמרה במערכת');
      return false;
    }
  };

  // פונקציה לשליחת הטופס
  const handleInquiryFormSubmit = async (formEvent) => {
    formEvent.preventDefault();
    setIsSubmittingInquiry(true);
    setEmailSendingStatus('');
    
    try {
      // יצירת אובייקט פנייה למסד הנתונים
      const newInquiryData = {
        name: inquiryFormData.studentName,
        phone: inquiryFormData.parentPhone,
        email: inquiryFormData.parentEmail,
        message: inquiryFormData.inquiryMessage
      };

      // שמירת הפנייה במסד הנתונים - פעולה קריטית
    
      console.log('פנייה נשמרה במסד הנתונים בהצלחה');
      
      // ניסיון שליחת מייל דרך EmailJS (פעולה משנית)
      await sendEmailViaEmailJS(inquiryFormData);
      
      // הצגת הודעת הצלחה למשתמש
      setHasSubmittedSuccessfully(true);

    } catch (databaseError) {
      // טיפול בשגיאה של שמירה במסד הנתונים
      console.error("שגיאה בשמירת הפנייה במסד הנתונים:", databaseError);
      alert("אירעה שגיאה בשמירת הפנייה. אנא נסי שוב או צרי קשר בטלפון.");
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

  // הצגת עמוד הצלחה לאחר שליחה
  if (hasSubmittedSuccessfully) {
    return (
      <InquirySuccessPage 
        onBackToForm={() => window.location.reload()}
        emailStatus={emailSendingStatus}
      />
    );
  }

  return (
    <>
       <Helmet>
        <title>ריקוד ברוח הטובה – יצירת קשר  </title>
        <meta name="description" content="שיעורי מחול מקצועיים בסגנון קלאסי-מודרני, אווירה חמה ומקצועיות." />
        <link rel="canonical" href="https://rikud.netlify.app/" />
      </Helmet>
    <div className="min-h-screen py-12 dark-bg">
      <InquiryPageHeader />
      <InquiryFormSection 
        formData={inquiryFormData}
        onInputChange={handleFormInputChange}
        onSubmit={handleInquiryFormSubmit}
        isSubmitting={isSubmittingInquiry}
        emailStatus={emailSendingStatus}
      />
    </div>
    </>
  );
}

// קומפוננטת כותרת העמוד
function InquiryPageHeader() {
  return (
    <section className="relative darker-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
            מוכנה להתחיל?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {/* השאירי פרטים ונחזור אליך עם כל המידע על הקבוצה המתאימה לך.
            <br /> */}
            <strong className="pink-text">שיעור הכרות ללא התחייבות!</strong>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-yellow-500 mx-auto mt-8"></div>
        </div>
      </div>
    </section>
  );
}

// קומפוננטת עמוד הצלחה
function InquirySuccessPage({ onBackToForm, emailStatus }) {
  return (
    <div className="min-h-screen flex items-center justify-center dark-bg p-4">
      <Card className="max-w-md w-full text-center darker-bg border-gray-700 elegant-shadow">
        <CardContent className="p-8">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold white-text mb-4">תודה רבה!</h2>
          <p className="text-gray-300 mb-6">
            קיבלנו את הפנייה שלך ונחזור אליך בהקדם עם כל הפרטים על הקבוצה המתאימה.
          </p>
          
          {/* הצגת סטטוס שליחת המייל */}
          {emailStatus && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${
              emailStatus.includes('בהצלחה') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}>
              {emailStatus}
            </div>
          )}
          
          <Button onClick={onBackToForm} className="btn-gold">
            חזור לטופס
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

// קומפוננטת חלק הטופס והמידע
function InquiryFormSection({ formData, onInputChange, onSubmit, isSubmitting, emailStatus }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* <InquiryForm 
          formData={formData}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          emailStatus={emailStatus}
        /> */}
        <ContactInformation />
      </div>
    </div>
  );
}

// קומפוננטת הטופס
function InquiryForm({ formData, onInputChange, onSubmit, isSubmitting, emailStatus }) {
  return (
    <Card className="darker-bg border-gray-700 elegant-shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold white-text text-center">
          שליחת פניה
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <FormInput
            id="studentName"
            label="שם מלא *"
            value={formData.studentName}
            onChange={(value) => onInputChange('studentName', value)}
            placeholder="השם שלך"
            required
          />
          
          <FormInput
            id="parentPhone"
            label="טלפון *"
            type="tel"
            value={formData.parentPhone}
            onChange={(value) => onInputChange('parentPhone', value)}
            placeholder="05X-XXXXXXX"
            required
          />
          
          <FormInput
            id="parentEmail"
            label="מייל"
            type="email"
            value={formData.parentEmail}
            onChange={(value) => onInputChange('parentEmail', value)}
            placeholder="your-email@example.com"
          />

          <FormTextarea
            id="inquiryMessage"
            label="תוכן הפנייה *"
            value={formData.inquiryMessage}
            onChange={(value) => onInputChange('inquiryMessage', value)}
            placeholder="ספרי לנו על גיל הבת, סוג השיעור המעניין אותך, הסניף המועדף, ושאלות נוספות..."
            required
          />

          {/* הצגת סטטוס שליחת מייל בזמן אמת */}
          {emailStatus && (
            <div className={`p-3 rounded-lg text-sm text-center ${
              emailStatus.includes('בהצלחה') 
                ? 'bg-green-100 text-green-800 border border-green-200' 
                : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
            }`}>
              {emailStatus}
            </div>
          )}

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
}

// קומפוננטת שדה טקסט
function FormInput({ id, label, type = "text", value, onChange, placeholder, required = false }) {
  return (
    <div>
      <Label htmlFor={id} className="white-text">{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="mt-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
      />
    </div>
  );
}

// קומפוננטת שדה טקסט מרובה שורות
function FormTextarea({ id, label, value, onChange, placeholder, required = false }) {
  return (
    <div>
      <Label htmlFor={id} className="white-text">{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        required={required}
        className="mt-1 bg-gray-700 border-gray-600 text-white placeholder:text-gray-400"
      />
    </div>
  );
}

// קומפוננטת כפתור שליחה
function SubmitButton({ isSubmitting }) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      className="w-full btn-gold text-lg py-6 transform hover:scale-105 transition-all duration-300"
    >
      {isSubmitting ? (
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
          שולח הודעה...
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Send className="w-5 h-5" />
          שלח פנייה
        </div>
      )}
    </Button>
  );
}

// קומפוננטת מידע ליצירת קשר
function ContactInformation() {
  return (
    <div className="space-y-8">
      <ContactDetailsCard />
      <FrequentlyAskedQuestions />
      <EncouragementCard />
    </div>
  );
}

// קומפוננטת פרטי יצירת קשר
function ContactDetailsCard() {
  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: "מזכירות",
      main: "03-3130656",
      details: ["שלוחה 1: מענה אנושי (10:00-16:00)", "שלוחה 8: השארת הודעות"]
    },
    {
      icon: <Mail className="w-6 h-6 text-white" />,
      title: "מייל",
      main: "b0527182273@gmail.com",
      details: ["נחזור אליך תוך 24 שעות"]
    },
    {
      icon: <Clock className="w-6 h-6 text-white" />,
      title: "שעות פעילות",
      main: "ראשון - חמישי: 10:00-16:00",
      details: ["מחוץ לשעות: השארת הודעות"]
    }
  ];

  return (
    <Card className="darker-bg border-gray-700 elegant-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold white-text">פרטי יצירת קשר</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {contactDetails.map((contact, index) => (
          <ContactDetailItem key={index} {...contact} />
        ))}
      </CardContent>
    </Card>
  );
}

// פריט פרטי קשר
function ContactDetailItem({ icon, title, main, details }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold white-text">{title}</h4>
        <p className="text-gray-300">{main}</p>
        {details.map((detail, index) => (
          <p key={index} className="text-sm text-gray-400">{detail}</p>
        ))}
      </div>
    </div>
  );
}

// קומפוננטת שאלות נפוצות
function FrequentlyAskedQuestions() {
  const faqItems = [
    {
      question: "מה כולל שיעור ההכרות?",
      answer: "שיעור הכרות חינם הוא שיעור מלא בן 45-60 דקות שבו הבת יכולה להכיר את האווירה, המורות והקבוצה ללא התחייבות."
    },
    {
      question: "איך יודעים איזה שיעור מתאים?",
      answer: "לאחר הפנייה שלך, נתקשר ונתייעץ איתך על הגיל, הרמה והעדפות כדי להמליץ על הקבוצה המתאימה ביותר."
    },
    {
      question: "מה צריך להביא לשיעור הראשון?",
      answer: "בגדי ספורט נוחים, בקבוק מים וחיוך! פרטי הציוד המדויק נמסור לך בשיחת הטלפון."
    }
  ];

  return (
    <Card className="darker-bg border-gray-700 elegant-shadow">
      <CardHeader>
        <CardTitle className="text-xl font-bold white-text">שאלות נפוצות</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {faqItems.map((faq, index) => (
          <FaqItem key={index} {...faq} isLast={index === faqItems.length - 1} />
        ))}
      </CardContent>
    </Card>
  );
}

// פריט שאלה נפוצה
function FaqItem({ question, answer, isLast }) {
  return (
    <div className={!isLast ? "border-b border-gray-700 pb-4" : ""}>
      <h5 className="font-semibold white-text mb-2">{question}</h5>
      <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
    </div>
  );
}

// קומפוננטת עידוד
function EncouragementCard() {
  return (
    <Card className="darker-bg border-gray-700 elegant-shadow">
      <CardContent className="p-6 text-center">
        <Heart className="w-12 h-12 pink-text mx-auto mb-4" />
        <h4 className="font-bold white-text mb-2">מתרגשות לפגוש אותך!</h4>
        <p className="text-gray-300">
            כאן עבורך עם כל שאלה ובקשה. מחכות לך בסטודיו עם המון אנרגיה טובה😆 
        </p>
      </CardContent>
    </Card>
  );
}
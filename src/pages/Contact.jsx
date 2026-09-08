import React, { useState } from "react";
import emailjs from '@emailjs/browser';
import { Phone, Mail, Clock, Heart, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const normalizeIsraeliPhone = (phone) => {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return cleaned.startsWith('+972') ? `0${cleaned.slice(4)}` : cleaned;
};

const isValidIsraeliPhone = (phone) => {
  const normalized = normalizeIsraeliPhone(phone);
  return /^0(?:5\d{8}|7\d{8}|[2-4,8-9]\d{7})$/.test(normalized);
};

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

export default function ContactPage() {
  const [inquiryFormData, setInquiryFormData] = useState({
    studentName: "",
    parentPhone: "",
    parentEmail: "",
    inquiryMessage: ""
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmittingInquiry, setIsSubmittingInquiry] = useState(false);
  const [hasSubmittedSuccessfully, setHasSubmittedSuccessfully] = useState(false);
  const [emailSendingStatus, setEmailSendingStatus] = useState('');

  const EMAILJS_CONFIG = {
    SERVICE_ID: 'service_twe1obj',
    TEMPLATE_ID: 'template_t30hd19',
    PUBLIC_KEY: 'Ub_6n8kuhlIM5pW1R'
  };

  const validateForm = () => {
    const errors = {};
    const name = inquiryFormData.studentName.trim();
    const phone = inquiryFormData.parentPhone.trim();
    const email = inquiryFormData.parentEmail.trim();
    const message = inquiryFormData.inquiryMessage.trim();

    if (!name) {
      errors.studentName = 'יש להזין שם מלא';
    } else if (name.length < 2) {
      errors.studentName = 'השם קצר מדי';
    } else if (name.length > 50) {
      errors.studentName = 'השם יכול להכיל עד 50 תווים';
    } else if (!/^[\p{L}\s.'-]+$/u.test(name)) {
      errors.studentName = 'השם יכול להכיל אותיות בלבד';
    }

    if (!phone) {
      errors.parentPhone = 'יש להזין מספר טלפון';
    } else if (!isValidIsraeliPhone(phone)) {
      errors.parentPhone = 'יש להזין מספר טלפון ישראלי תקין';
    }

    if (email && !isValidEmail(email)) {
      errors.parentEmail = 'יש להזין כתובת מייל תקינה';
    }

    if (!message) {
      errors.inquiryMessage = 'יש להזין תוכן לפנייה';
    } else if (message.length < 5) {
      errors.inquiryMessage = 'תוכן הפנייה קצר מדי';
    } else if (message.length > 1000) {
      errors.inquiryMessage = 'תוכן הפנייה יכול להכיל עד 1000 תווים';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormInputChange = (fieldName, fieldValue) => {
    setInquiryFormData(previousFormData => ({
      ...previousFormData,
      [fieldName]: fieldValue
    }));

    if (formErrors[fieldName]) {
      setFormErrors(previousErrors => ({
        ...previousErrors,
        [fieldName]: undefined
      }));
    }
  };

  const sendEmailViaEmailJS = async (formData) => {
    try {
      const emailData = {
        from_name: formData.studentName.trim(),
        name: formData.studentName.trim(),
        from_email: formData.parentEmail.trim() || 'לא סופק',
        email: formData.parentEmail.trim() || 'לא סופק',
        reply_to: formData.parentEmail.trim() || undefined,
        phone: normalizeIsraeliPhone(formData.parentPhone),
        message: formData.inquiryMessage.trim(),
        to_email: 'b0527182273@gmail.com',
        subject: `פניה חדשה מהאתר - ${formData.studentName.trim()}`
      };

      const result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        emailData,
        { publicKey: EMAILJS_CONFIG.PUBLIC_KEY }
      );

      console.log('EmailJS הצליח:', result);
      setEmailSendingStatus('המייל נשלח בהצלחה!');
      return true;
    } catch (error) {
      console.error('שגיאה בשליחת EmailJS:', error);
      setEmailSendingStatus('אירעה שגיאה בשליחת הפנייה. אנא נסי שוב.');
      return false;
    }
  };

  const handleInquiryFormSubmit = async (formEvent) => {
    formEvent.preventDefault();
    setEmailSendingStatus('');

    if (!validateForm()) {
      return;
    }

    setIsSubmittingInquiry(true);

    try {
      const emailSent = await sendEmailViaEmailJS(inquiryFormData);

      if (emailSent) {
        setHasSubmittedSuccessfully(true);
      }
    } finally {
      setIsSubmittingInquiry(false);
    }
  };

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
        <title>יצירת קשר - ריקוד ברוח הטובה</title>
        <meta name="description" content="צרו קשר איתנו! מידע ליצירת קשר, כתובת, טלפון, אימייל וטופס פנייה לשאלות והצעות" />
        <meta name="keywords" content="יצירת קשר, טלפון, אימייל, כתובת, פנייה, שאלות" />
        <meta property="og:title" content="יצירת קשר - ריקוד ברוח הטובה" />
        <meta property="og:description" content="צרו קשר איתנו עבור שאלות, הצעות ומידע נוסף" />
        <meta property="og:url" content="https://rikud.netlify.app/Contact" />
      </Helmet>
      <div className="min-h-screen py-12 dark-bg">
        <InquiryPageHeader />
        <InquiryFormSection
          formData={inquiryFormData}
          formErrors={formErrors}
          onInputChange={handleFormInputChange}
          onSubmit={handleInquiryFormSubmit}
          isSubmitting={isSubmittingInquiry}
          emailStatus={emailSendingStatus}
        />
      </div>
    </>
  );
}

function InquiryPageHeader() {
  return (
    <section className="relative darker-bg py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">
            מוכנה להתחיל?
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            <strong className="pink-text">שיעור הכרות ללא התחייבות!</strong>
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-yellow-500 mx-auto mt-8"></div>
        </div>
      </div>
    </section>
  );
}

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

          {emailStatus && (
            <div className={`mb-4 p-3 rounded-lg text-sm ${emailStatus.includes('בהצלחה')
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

function InquiryFormSection({ formData, formErrors, onInputChange, onSubmit, isSubmitting, emailStatus }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <InquiryForm
          formData={formData}
          formErrors={formErrors}
          onInputChange={onInputChange}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
          emailStatus={emailStatus}
        />
        <ContactInformation />
      </div>
    </div>
  );
}

function InquiryForm({ formData, formErrors, onInputChange, onSubmit, isSubmitting, emailStatus }) {
  return (
    <Card className="darker-bg border-gray-700 elegant-shadow">
      <CardHeader>
        <CardTitle className="text-2xl font-bold white-text text-center">
          שליחת פניה
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <FormInput
            id="studentName"
            label="שם מלא *"
            value={formData.studentName}
            onChange={(value) => onInputChange('studentName', value)}
            placeholder="השם שלך"
            error={formErrors.studentName}
            maxLength={50}
            required
          />

          <FormInput
            id="parentPhone"
            label="טלפון *"
            type="tel"
            inputMode="tel"
            value={formData.parentPhone}
            onChange={(value) => onInputChange('parentPhone', value)}
            placeholder="05X-XXXXXXX"
            error={formErrors.parentPhone}
            maxLength={18}
            required
          />

          <FormInput
            id="parentEmail"
            label="מייל"
            type="email"
            inputMode="email"
            value={formData.parentEmail}
            onChange={(value) => onInputChange('parentEmail', value)}
            placeholder="your-email@example.com"
            error={formErrors.parentEmail}
            maxLength={100}
          />

          <FormTextarea
            id="inquiryMessage"
            label="תוכן הפנייה *"
            value={formData.inquiryMessage}
            onChange={(value) => onInputChange('inquiryMessage', value)}
            placeholder="כתבי כאן את תוכן הפנייה..."
            error={formErrors.inquiryMessage}
            maxLength={1000}
            required
          />

          {emailSendingStatusBlock(emailStatus)}

          <SubmitButton isSubmitting={isSubmitting} />
        </form>
      </CardContent>
    </Card>
  );
}

function emailSendingStatusBlock(emailStatus) {
  if (!emailStatus) return null;

  return (
    <div className={`p-3 rounded-lg text-sm text-center ${emailStatus.includes('בהצלחה')
        ? 'bg-green-100 text-green-800 border border-green-200'
        : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      }`}>
      {emailStatus}
    </div>
  );
}

function FormInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  required = false,
  maxLength,
  inputMode
}) {
  return (
    <div>
      <Label htmlFor={id} className="white-text">{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 bg-gray-700 text-white placeholder:text-gray-400 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-600'}`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-400" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function FormTextarea({ id, label, value, onChange, placeholder, error, required = false, maxLength }) {
  return (
    <div>
      <Label htmlFor={id} className="white-text">{label}</Label>
      <Textarea
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={5}
        required={required}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-1 bg-gray-700 text-white placeholder:text-gray-400 ${error ? 'border-red-500 focus-visible:ring-red-500' : 'border-gray-600'}`}
      />
      <div className="mt-1 flex items-start justify-between gap-3">
        {error ? (
          <p id={`${id}-error`} className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : <span />}
        {maxLength && (
          <span className="text-xs text-gray-500">
            {value.length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
}

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

function ContactInformation() {
  return (
    <div className="space-y-8">
      <ContactDetailsCard />
      <FrequentlyAskedQuestions />
      <EncouragementCard />
    </div>
  );
}

function ContactDetailsCard() {
  const contactDetails = [
    {
      icon: <Phone className="w-6 h-6 text-white" />,
      title: "מזכירות",
      main: "03-3130565",
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

function FaqItem({ question, answer, isLast }) {
  return (
    <div className={!isLast ? "border-b border-gray-700 pb-4" : ""}>
      <h5 className="font-semibold white-text mb-2">{question}</h5>
      <p className="text-gray-300 text-sm leading-relaxed">{answer}</p>
    </div>
  );
}

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
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Helmet } from 'react-helmet-async';
import { SITE_CONTACT } from '@/config/site';

const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_twe1obj',
  TEMPLATE_ID: 'template_t30hd19',
  PUBLIC_KEY: 'Ub_6n8kuhlIM5pW1R'
};

const normalizeIsraeliPhone = phone => {
  const cleaned = phone.replace(/[\s\-()]/g, '');
  return cleaned.startsWith('+972') ? `0${cleaned.slice(4)}` : cleaned;
};

const isValidIsraeliPhone = phone => /^0(?:5\d{8}|7\d{8}|[2-48-9]\d{7})$/.test(normalizeIsraeliPhone(phone));
const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

const validateField = (fieldName, rawValue) => {
  const value = rawValue.trim();
  if (fieldName === 'studentName') {
    if (!value) return 'יש להזין שם מלא';
    if (value.length < 2) return 'השם קצר מדי';
    if (value.length > 50) return 'השם יכול להכיל עד 50 תווים';
    if (!/^[\p{L}\s.'-]+$/u.test(value)) return 'השם יכול להכיל אותיות בלבד';
  }
  if (fieldName === 'parentPhone') {
    if (!value) return 'יש להזין מספר טלפון';
    if (!isValidIsraeliPhone(value)) return 'יש להזין מספר טלפון ישראלי תקין';
  }
  if (fieldName === 'parentEmail') {
    if (!value) return 'יש להזין כתובת מייל';
    if (!isValidEmail(value)) return 'יש להזין כתובת מייל תקינה';
  }
  if (fieldName === 'inquiryMessage') {
    if (!value) return 'יש להזין תוכן לפנייה';
    if (value.length < 5) return 'תוכן הפנייה קצר מדי';
    if (value.length > 1000) return 'תוכן הפנייה יכול להכיל עד 1000 תווים';
  }
  return '';
};

export default function ContactPage() {
  const [formData, setFormData] = useState({ studentName: '', parentPhone: '', parentEmail: '', inquiryMessage: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [status, setStatus] = useState('');

  const updateField = (name, value) => {
    setFormData(current => ({ ...current, [name]: value }));
    const error = validateField(name, value);
    setErrors(current => ({ ...current, [name]: error || undefined }));
  };

  const validateForm = () => {
    const next = {};
    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) next[name] = error;
    });
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async e => {
    e.preventDefault();
    setStatus('');
    if (!validateForm()) return;
    setSubmitting(true);
    try {
      await emailjs.send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, {
        from_name: formData.studentName.trim(),
        name: formData.studentName.trim(),
        from_email: formData.parentEmail.trim(),
        email: formData.parentEmail.trim(),
        reply_to: formData.parentEmail.trim(),
        phone: normalizeIsraeliPhone(formData.parentPhone),
        message: formData.inquiryMessage.trim(),
        to_email: SITE_CONTACT.email,
        subject: `פניה חדשה מהאתר - ${formData.studentName.trim()}`
      }, { publicKey: EMAILJS_CONFIG.PUBLIC_KEY });
      setStatus('המייל נשלח בהצלחה!');
      setSent(true);
    } catch (error) {
      console.error('שגיאה בשליחת EmailJS:', error);
      setStatus('אירעה שגיאה בשליחת הפנייה. אנא נסי שוב.');
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-bg p-4">
        <Card className="max-w-md w-full text-center darker-bg border-gray-700 elegant-shadow">
          <CardContent className="p-8">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-white" /></div>
            <h2 className="text-2xl font-bold white-text mb-4">תודה רבה!</h2>
            <p className="text-gray-300 mb-6">קיבלנו את הפנייה שלך ונחזור אליך בהקדם.</p>
            <Button onClick={() => window.location.reload()} className="btn-gold">חזרה לטופס</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Helmet><title>יצירת קשר - ריקוד ברוח הטובה</title><meta name="description" content="צרו קשר איתנו בטלפון, במייל או דרך טופס הפנייה" /></Helmet>
      <div className="min-h-screen py-12 dark-bg" dir="rtl">
        <section className="relative darker-bg py-20">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 gold-text">מוכנה להתחיל?</h1>
            <p className="text-xl text-gray-300"><strong className="pink-text">שיעור הכרות ללא התחייבות!</strong></p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card className="darker-bg border-gray-700 elegant-shadow">
            <CardHeader><CardTitle className="text-2xl font-bold white-text text-center">שליחת פניה</CardTitle></CardHeader>
            <CardContent>
              <form onSubmit={submit} noValidate className="space-y-6">
                <ValidatedInput id="studentName" label="שם מלא *" value={formData.studentName} onChange={value => updateField('studentName', value)} error={errors.studentName} maxLength={50} />
                <ValidatedInput id="parentPhone" label="טלפון *" type="tel" value={formData.parentPhone} onChange={value => updateField('parentPhone', value)} error={errors.parentPhone} maxLength={18} />
                <ValidatedInput id="parentEmail" label="מייל *" type="email" value={formData.parentEmail} onChange={value => updateField('parentEmail', value)} error={errors.parentEmail} maxLength={100} />
                <div>
                  <Label htmlFor="inquiryMessage" className="white-text">תוכן הפנייה *</Label>
                  <Textarea id="inquiryMessage" rows={5} maxLength={1000} value={formData.inquiryMessage} onChange={e => updateField('inquiryMessage', e.target.value)} className={`mt-1 bg-gray-700 text-white ${errors.inquiryMessage ? 'border-red-500' : 'border-gray-600'}`} />
                  <div className="mt-1 flex justify-between text-xs"><span className="text-red-400">{errors.inquiryMessage || ''}</span><span className="text-gray-500">{formData.inquiryMessage.length}/1000</span></div>
                </div>
                {status && <p className="text-center text-sm text-yellow-300">{status}</p>}
                <Button type="submit" disabled={submitting} className="w-full btn-gold text-lg py-6"><Send className="w-5 h-5 ml-2" />{submitting ? 'שולח הודעה...' : 'שלח פנייה'}</Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card className="darker-bg border-gray-700 elegant-shadow">
              <CardHeader><CardTitle className="text-xl font-bold white-text">פרטי יצירת קשר</CardTitle></CardHeader>
              <CardContent className="space-y-6">
                <ContactRow icon={<Phone className="w-6 h-6" />} title="מזכירות" main={SITE_CONTACT.phone} details={[`מענה אנושי: ${SITE_CONTACT.humanSupportHours}`, 'אפשר להשאיר הודעה מחוץ לשעות הפעילות']} />
                <ContactRow icon={<Mail className="w-6 h-6" />} title="מייל" main={SITE_CONTACT.email} details={['נחזור אליך בהקדם']} />
                <ContactRow icon={<Clock className="w-6 h-6" />} title="שעות פעילות" main={SITE_CONTACT.officeHours} details={['מחוץ לשעות: השארת הודעות']} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

function ValidatedInput({ id, label, type = 'text', value, onChange, error, maxLength }) {
  return (
    <div>
      <Label htmlFor={id} className="white-text">{label}</Label>
      <Input id={id} type={type} value={value} onChange={e => onChange(e.target.value)} maxLength={maxLength} aria-invalid={Boolean(error)} className={`mt-1 bg-gray-700 text-white ${error ? 'border-red-500' : 'border-gray-600'}`} />
      {error && <p className="mt-1.5 text-sm text-red-400" role="alert">{error}</p>}
    </div>
  );
}

function ContactRow({ icon, title, main, details }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center text-white shrink-0">{icon}</div>
      <div><h4 className="font-semibold white-text">{title}</h4><p className="text-gray-300">{main}</p>{details.map(detail => <p key={detail} className="text-sm text-gray-400">{detail}</p>)}</div>
    </div>
  );
}

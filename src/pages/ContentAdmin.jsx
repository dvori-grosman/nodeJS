import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Edit, Plus, RefreshCw, Save, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { API_BASE_URL } from '@/config/site';

const CONFIG = {
  lessons: {
    label: 'שיעורים',
    titleField: 'title',
    empty: { title: '', subtitle: '', description: '', features: '', duration: '', ages: '', levels: '', imageUrl: '', sortOrder: 0 },
    fields: [
      ['title', 'שם השיעור'], ['subtitle', 'כותרת משנה'], ['description', 'תיאור', 'textarea'],
      ['features', 'מאפיינים / נקודות, מופרדים בפסיק'], ['duration', 'משך'], ['ages', 'גילאים'],
      ['levels', 'רמות, מופרדות בפסיק'], ['imageUrl', 'כתובת תמונה'], ['sortOrder', 'סדר תצוגה', 'number']
    ]
  },
  products: {
    label: 'מוצרי חנות',
    titleField: 'name',
    empty: { name: '', description: '', price: '', imageUrl: '', purchaseUrl: '', category: '', sortOrder: 0 },
    fields: [
      ['name', 'שם המוצר'], ['description', 'תיאור', 'textarea'], ['price', 'מחיר', 'number'],
      ['category', 'קטגוריה'], ['imageUrl', 'כתובת תמונה'], ['purchaseUrl', 'קישור לרכישה'], ['sortOrder', 'סדר תצוגה', 'number']
    ]
  },
  performances: {
    label: 'מופעים',
    titleField: 'title',
    empty: { title: '', subtitle: '', description: '', imageUrl: '', alt: '', price: '', status: 'available', purchaseUrl: '', sortOrder: 0 },
    fields: [
      ['title', 'שם המופע'], ['subtitle', 'סוג / שנה'], ['description', 'תיאור', 'textarea'],
      ['imageUrl', 'כתובת תמונה'], ['alt', 'טקסט חלופי לתמונה'], ['price', 'מחיר', 'number'],
      ['status', 'סטטוס'], ['purchaseUrl', 'קישור לרכישה'], ['sortOrder', 'סדר תצוגה', 'number']
    ]
  }
};

const arrays = new Set(['features', 'levels']);
const numbers = new Set(['sortOrder', 'price']);

function toForm(item, config) {
  const result = { ...config.empty };
  Object.keys(result).forEach(key => {
    if (arrays.has(key)) result[key] = Array.isArray(item[key]) ? item[key].join(', ') : '';
    else if (item[key] !== undefined && item[key] !== null) result[key] = item[key];
  });
  return result;
}

function toPayload(form) {
  const payload = { ...form };
  arrays.forEach(key => {
    if (key in payload) payload[key] = String(payload[key] || '').split(',').map(v => v.trim()).filter(Boolean);
  });
  numbers.forEach(key => {
    if (key in payload) payload[key] = payload[key] === '' ? null : Number(payload[key]);
  });
  return payload;
}

export default function ContentAdmin() {
  const [resource, setResource] = useState('lessons');
  const config = CONFIG[resource];
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ ...config.empty });
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('adminToken');

  const headers = useMemo(() => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }), [token]);

  const load = async () => {
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/${resource}/admin`, { headers: { Authorization: `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'שגיאה בטעינת הנתונים');
      setItems((data.data || []).filter(item => item.isActive !== false));
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setEditing(null);
    setForm({ ...CONFIG[resource].empty });
    load();
  }, [resource]);

  const reset = () => {
    setEditing(null);
    setForm({ ...config.empty });
  };

  const submit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const response = await fetch(`${API_BASE_URL}/${resource}${editing ? `/${editing._id}` : ''}`, {
        method: editing ? 'PUT' : 'POST', headers, body: JSON.stringify(toPayload(form))
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.errors?.join(', ') || data.message || 'שגיאה בשמירה');
      setMessage('נשמר בהצלחה');
      reset();
      await load();
    } catch (error) {
      setMessage(error.message);
    } finally {
      setSaving(false);
    }
  };

  const edit = item => {
    setEditing(item);
    setForm(toForm(item, config));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const remove = async item => {
    if (!window.confirm(`להסיר את ${item[config.titleField]} מהאתר?`)) return;
    try {
      const response = await fetch(`${API_BASE_URL}/${resource}/${item._id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (!response.ok) throw new Error('שגיאה במחיקה');
      await load();
    } catch (error) {
      setMessage(error.message);
    }
  };

  if (!token) {
    return <main dir="rtl" className="min-h-screen bg-gray-950 text-white grid place-items-center"><div className="text-center"><p className="mb-4">יש להתחבר קודם לממשק האדמין.</p><Link className="text-yellow-400" to="/admin">מעבר להתחברות</Link></div></main>;
  }

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white pb-16">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-gray-950/90 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div><h1 className="text-xl font-bold">ניהול תוכן האתר</h1><p className="text-xs text-gray-500">שיעורים, מוצרי חנות ומופעים</p></div>
          <div className="flex gap-2"><Link to="/admin" className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"><ArrowRight className="h-4 w-4" /> סניפים ומערכות</Link><Button variant="outline" onClick={load} className="border-white/10 bg-transparent"><RefreshCw className="h-4 w-4" /></Button></div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pt-8">
        <div className="mb-7 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-black/20 p-1">
          {Object.entries(CONFIG).map(([key, value]) => <button key={key} onClick={() => setResource(key)} className={`rounded-lg px-3 py-3 text-sm font-medium transition ${resource === key ? 'bg-yellow-500 text-black' : 'text-gray-400 hover:bg-white/5'}`}>{value.label}</button>)}
        </div>

        <section className="mb-8 rounded-2xl border border-white/10 bg-gray-900/60 p-5">
          <div className="mb-5 flex items-center justify-between"><h2 className="font-bold">{editing ? `עריכת ${config.label}` : `הוספת ${config.label}`}</h2>{editing && <Button variant="outline" onClick={reset} className="border-white/10 bg-transparent"><X className="ml-2 h-4 w-4" /> ביטול עריכה</Button>}</div>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            {config.fields.map(([key, label, type = 'text']) => (
              <label key={key} className={type === 'textarea' ? 'md:col-span-2' : ''}>
                <span className="mb-2 block text-sm text-gray-300">{label}</span>
                {type === 'textarea' ? <textarea rows={4} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="w-full rounded-lg border border-gray-700 bg-black/30 px-3 py-2 outline-none focus:border-yellow-500" /> : <Input type={type} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="border-gray-700 bg-black/30" />}
              </label>
            ))}
            <div className="md:col-span-2"><Button type="submit" disabled={saving} className="bg-yellow-500 text-black hover:bg-yellow-400">{saving ? <RefreshCw className="ml-2 h-4 w-4 animate-spin" /> : editing ? <Save className="ml-2 h-4 w-4" /> : <Plus className="ml-2 h-4 w-4" />}{editing ? 'שמירת שינויים' : 'הוספה'}</Button></div>
          </form>
        </section>

        {message && <div className="mb-6 rounded-lg border border-white/10 bg-black/30 p-3 text-sm text-yellow-200">{message}</div>}

        <section className="overflow-hidden rounded-2xl border border-white/10 bg-gray-900/50">
          <div className="border-b border-white/10 px-5 py-4"><h2 className="font-bold">{config.label} באתר</h2></div>
          {loading ? <div className="p-10 text-center text-gray-500">טוען...</div> : items.length === 0 ? <div className="p-10 text-center text-gray-500">אין פריטים</div> : (
            <div className="divide-y divide-white/5">{items.map(item => <div key={item._id} className="flex flex-wrap items-center justify-between gap-4 px-5 py-4"><div><p className="font-medium">{item[config.titleField]}</p><p className="text-xs text-gray-500">סדר: {item.sortOrder ?? 0}</p></div><div className="flex gap-2"><Button size="sm" onClick={() => edit(item)} className="bg-blue-600 hover:bg-blue-500"><Edit className="h-4 w-4" /></Button><Button size="sm" onClick={() => remove(item)} className="bg-red-700 hover:bg-red-600"><Trash2 className="h-4 w-4" /></Button></div></div>)}</div>
          )}
        </section>
      </div>
    </main>
  );
}

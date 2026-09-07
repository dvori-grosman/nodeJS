import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  ExternalLink,
  FileImage,
  FileText,
  LogOut,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Save,
  Trash2,
  UploadCloud,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_BASE_URL = 'https://dance-studio-server.onrender.com/api';
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'application/pdf'];
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const EMPTY_BRANCH_FORM = {
  name: '',
  address: '',
  phone: '',
  email: '',
  description: ''
};

const formatDate = (value) => {
  if (!value) return 'טרם עודכן';
  return new Intl.DateTimeFormat('he-IL', {
    dateStyle: 'medium',
    timeStyle: 'short'
  }).format(new Date(value));
};

const branchToForm = (branch) => ({
  name: branch.name || '',
  address: branch.address || '',
  phone: branch.phone || '',
  email: branch.email || '',
  description: branch.description || ''
});

function SchedulePreview({ branch }) {
  if (!branch.scheduleFileUrl) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-black/20 px-6 text-center">
        <CalendarDays className="mb-3 h-10 w-10 text-yellow-500/60" />
        <p className="font-medium text-gray-300">עדיין לא הועלתה מערכת שעות</p>
        <p className="mt-1 text-sm text-gray-500">PNG, JPG, WEBP או PDF עד 10MB</p>
      </div>
    );
  }

  if (branch.scheduleFileType === 'application/pdf') {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/25 px-6 text-center">
        <FileText className="mb-3 h-12 w-12 text-yellow-400" />
        <p className="max-w-full truncate text-sm text-gray-300">{branch.scheduleFileName || 'מערכת שעות.pdf'}</p>
        <a
          href={branch.scheduleFileUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-yellow-400 hover:text-yellow-300"
        >
          <ExternalLink className="h-4 w-4" />
          צפייה בקובץ
        </a>
      </div>
    );
  }

  return (
    <a href={branch.scheduleFileUrl} target="_blank" rel="noreferrer" className="block">
      <div className="flex min-h-56 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/25 p-3">
        <img
          src={branch.scheduleFileUrl}
          alt={`מערכת שעות ${branch.name}`}
          className="max-h-72 w-full rounded-xl object-contain transition duration-300 hover:scale-[1.01]"
        />
      </div>
    </a>
  );
}

function BranchScheduleCard({ branch, onChanged, setMessage }) {
  const inputRef = useRef(null);
  const [file, setFile] = useState(null);
  const [year, setYear] = useState(branch.scheduleYear || '');
  const [dragging, setDragging] = useState(false);
  const [working, setWorking] = useState(false);
  const [editingBranch, setEditingBranch] = useState(false);
  const [branchWorking, setBranchWorking] = useState(false);
  const [branchForm, setBranchForm] = useState(() => branchToForm(branch));

  useEffect(() => {
    setYear(branch.scheduleYear || '');
    setFile(null);
  }, [branch._id, branch.scheduleUpdatedAt]);

  useEffect(() => {
    setBranchForm(branchToForm(branch));
  }, [branch._id, branch.name, branch.address, branch.phone, branch.email, branch.description]);

  const validateAndSetFile = (candidate) => {
    if (!candidate) return;
    if (!ACCEPTED_TYPES.includes(candidate.type)) {
      setMessage({ type: 'error', text: 'ניתן להעלות רק PNG, JPG, WEBP או PDF.' });
      return;
    }
    if (candidate.size > MAX_FILE_SIZE) {
      setMessage({ type: 'error', text: 'הקובץ גדול מדי. הגודל המרבי הוא 10MB.' });
      return;
    }
    setFile(candidate);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage({ type: 'error', text: 'יש לבחור קובץ לפני ההעלאה.' });
      return;
    }

    setWorking(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('schedule', file);
      formData.append('scheduleYear', year.trim());

      const response = await fetch(`${API_BASE_URL}/branches/${branch._id}/schedule`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'שגיאה בהעלאת הקובץ');

      setFile(null);
      setMessage({ type: 'success', text: `מערכת השעות של ${branch.name} עודכנה בהצלחה.` });
      await onChanged();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'שגיאה בהעלאת הקובץ' });
    } finally {
      setWorking(false);
    }
  };

  const handleDeleteSchedule = async () => {
    if (!branch.scheduleFileUrl || !window.confirm(`למחוק את מערכת השעות של ${branch.name}?`)) return;

    setWorking(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/branches/${branch._id}/schedule`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'שגיאה במחיקת הקובץ');

      setMessage({ type: 'success', text: `מערכת השעות של ${branch.name} נמחקה.` });
      await onChanged();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'שגיאה במחיקת הקובץ' });
    } finally {
      setWorking(false);
    }
  };

  const handleSaveBranch = async (e) => {
    e.preventDefault();
    const payload = {
      name: branchForm.name.trim(),
      address: branchForm.address.trim(),
      phone: branchForm.phone.trim(),
      email: branchForm.email.trim(),
      description: branchForm.description.trim(),
      isActive: true
    };

    if (!payload.name || !payload.address) {
      setMessage({ type: 'error', text: 'יש להזין שם סניף וכתובת.' });
      return;
    }

    setBranchWorking(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/branches/${branch._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.join(', ') || data.message || 'שגיאה בעדכון הסניף');
      }

      setEditingBranch(false);
      setMessage({ type: 'success', text: `הסניף ${payload.name} עודכן בהצלחה.` });
      await onChanged();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'שגיאה בעדכון הסניף' });
    } finally {
      setBranchWorking(false);
    }
  };

  const handleDeleteBranch = async () => {
    const scheduleWarning = branch.scheduleFileUrl ? ' מערכת השעות המשויכת אליו לא תוצג יותר באתר.' : '';
    if (!window.confirm(`למחוק את הסניף ${branch.name}?${scheduleWarning}`)) return;

    setBranchWorking(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/branches/${branch._id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'שגיאה במחיקת הסניף');

      setMessage({ type: 'success', text: `הסניף ${branch.name} נמחק.` });
      await onChanged();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'שגיאה במחיקת הסניף' });
    } finally {
      setBranchWorking(false);
    }
  };

  const cancelBranchEdit = () => {
    setBranchForm(branchToForm(branch));
    setEditingBranch(false);
  };

  return (
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-gray-900/70 shadow-2xl shadow-black/20 backdrop-blur">
      <div className="border-b border-white/10 p-5 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="text-xl font-bold text-white">{branch.name}</h2>
              {branch.scheduleFileUrl ? (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-300">מערכת פעילה</span>
              ) : (
                <span className="rounded-full bg-gray-700/70 px-2.5 py-1 text-xs font-medium text-gray-400">ללא מערכת</span>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-400">{branch.address}</p>
            {(branch.phone || branch.email) && (
              <p className="mt-1 text-xs text-gray-500">
                {[branch.phone, branch.email].filter(Boolean).join(' · ')}
              </p>
            )}
            {branch.description && (
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">{branch.description}</p>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            <div className="ml-2 text-left text-xs text-gray-500">
              <p>עדכון מערכת</p>
              <p className="mt-1 text-gray-300">{formatDate(branch.scheduleUpdatedAt)}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              disabled={branchWorking}
              onClick={() => setEditingBranch(value => !value)}
              className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
            >
              <Pencil className="ml-2 h-4 w-4" />
              עריכת סניף
            </Button>
            <Button
              type="button"
              variant="outline"
              disabled={branchWorking || working}
              onClick={handleDeleteBranch}
              className="border-red-900/70 bg-red-950/20 text-red-300 hover:bg-red-950/50 hover:text-red-200"
            >
              {branchWorking ? <RefreshCw className="ml-2 h-4 w-4 animate-spin" /> : <Trash2 className="ml-2 h-4 w-4" />}
              מחיקת סניף
            </Button>
          </div>
        </div>

        {editingBranch && (
          <form onSubmit={handleSaveBranch} className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4 sm:p-5">
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="font-semibold text-white">עריכת פרטי הסניף</h3>
              <button type="button" onClick={cancelBranchEdit} className="rounded-lg p-1.5 text-gray-500 hover:bg-white/5 hover:text-white" aria-label="סגירת עריכה">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">שם הסניף *</label>
                <Input
                  value={branchForm.name}
                  onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                  className="border-gray-700 bg-gray-950/60 text-white"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">כתובת *</label>
                <Input
                  value={branchForm.address}
                  onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                  className="border-gray-700 bg-gray-950/60 text-white"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">טלפון</label>
                <Input
                  value={branchForm.phone}
                  onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                  placeholder="02-0000000"
                  className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">אימייל</label>
                <Input
                  type="email"
                  value={branchForm.email}
                  onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                  placeholder="branch@example.com"
                  className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-300">תיאור</label>
                <textarea
                  value={branchForm.description}
                  onChange={(e) => setBranchForm({ ...branchForm, description: e.target.value })}
                  rows={3}
                  maxLength={500}
                  placeholder="פרטים קצרים על הסניף"
                  className="w-full rounded-md border border-gray-700 bg-gray-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/60"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button type="submit" disabled={branchWorking} className="bg-yellow-500 font-semibold text-black hover:bg-yellow-400">
                {branchWorking ? <RefreshCw className="ml-2 h-4 w-4 animate-spin" /> : <Save className="ml-2 h-4 w-4" />}
                שמירת שינויים
              </Button>
              <Button type="button" variant="outline" disabled={branchWorking} onClick={cancelBranchEdit} className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white">
                ביטול
              </Button>
            </div>
          </form>
        )}
      </div>

      <div className="grid gap-6 p-5 sm:p-6 lg:grid-cols-[1.1fr_0.9fr]">
        <SchedulePreview branch={branch} />

        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-300">שנת לימודים</label>
            <Input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder={'לדוגמה: תשפ״ז'}
              className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
            />
          </div>

          <div
            onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
            onDragOver={(e) => e.preventDefault()}
            onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              validateAndSetFile(e.dataTransfer.files?.[0]);
            }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border border-dashed p-6 text-center transition ${
              dragging ? 'border-yellow-400 bg-yellow-500/10' : 'border-white/15 bg-black/20 hover:border-yellow-500/50 hover:bg-yellow-500/5'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/png,image/jpeg,image/webp,application/pdf"
              className="hidden"
              onChange={(e) => validateAndSetFile(e.target.files?.[0])}
            />
            {file ? <FileImage className="mx-auto mb-3 h-9 w-9 text-yellow-400" /> : <UploadCloud className="mx-auto mb-3 h-9 w-9 text-gray-500" />}
            <p className="text-sm font-medium text-gray-200">{file ? file.name : 'גררי לכאן מערכת שעות או לחצי לבחירה'}</p>
            <p className="mt-1 text-xs text-gray-500">PNG / JPG / WEBP / PDF · עד 10MB</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleUpload}
              disabled={!file || working || branchWorking}
              className="flex-1 bg-gradient-to-l from-yellow-500 to-yellow-600 font-semibold text-black hover:from-yellow-400 hover:to-yellow-500"
            >
              {working ? <RefreshCw className="ml-2 h-4 w-4 animate-spin" /> : <UploadCloud className="ml-2 h-4 w-4" />}
              {branch.scheduleFileUrl ? 'החלפת מערכת' : 'העלאת מערכת'}
            </Button>
            {branch.scheduleFileUrl && (
              <Button
                onClick={handleDeleteSchedule}
                disabled={working || branchWorking}
                variant="outline"
                className="border-red-900/70 bg-red-950/20 text-red-300 hover:bg-red-950/50 hover:text-red-200"
              >
                <Trash2 className="ml-2 h-4 w-4" />
                מחיקת מערכת
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ScheduleAdmin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [branches, setBranches] = useState([]);
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [message, setMessage] = useState(null);
  const [showAddBranch, setShowAddBranch] = useState(false);
  const [creatingBranch, setCreatingBranch] = useState(false);
  const [branchForm, setBranchForm] = useState({ ...EMPTY_BRANCH_FORM });

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        setCheckingAuth(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.ok) setIsAuthenticated(true);
        else localStorage.removeItem('adminToken');
      } catch {
        localStorage.removeItem('adminToken');
      } finally {
        setCheckingAuth(false);
      }
    };
    verify();
  }, []);

  const loadBranches = async () => {
    setLoadingBranches(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/branches/admin`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'שגיאה בטעינת הסניפים');
      setBranches((data.data || []).filter(branch => branch.isActive !== false));
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) loadBranches();
  }, [isAuthenticated]);

  const handleCreateBranch = async (e) => {
    e.preventDefault();
    const payload = {
      name: branchForm.name.trim(),
      address: branchForm.address.trim(),
      phone: branchForm.phone.trim(),
      email: branchForm.email.trim(),
      description: branchForm.description.trim()
    };

    if (!payload.name || !payload.address) {
      setMessage({ type: 'error', text: 'יש להזין שם סניף וכתובת.' });
      return;
    }

    setCreatingBranch(true);
    setMessage(null);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/branches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.errors?.join(', ') || data.message || 'שגיאה בהוספת הסניף');
      }

      setBranchForm({ ...EMPTY_BRANCH_FORM });
      setShowAddBranch(false);
      setMessage({ type: 'success', text: `הסניף ${payload.name} נוסף בהצלחה.` });
      await loadBranches();
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'שגיאה בהוספת הסניף' });
    } finally {
      setCreatingBranch(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(null);
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'פרטי ההתחברות אינם נכונים');
      localStorage.setItem('adminToken', data.token);
      setIsAuthenticated(true);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setBranches([]);
  };

  if (checkingAuth) {
    return <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">טוען...</div>;
  }

  if (!isAuthenticated) {
    return (
      <main dir="rtl" className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black px-4 py-12 text-white">
        <form onSubmit={handleLogin} className="mx-auto mt-16 max-w-md rounded-3xl border border-white/10 bg-gray-900/70 p-7 shadow-2xl backdrop-blur">
          <div className="mb-7 text-center">
            <CalendarDays className="mx-auto mb-4 h-11 w-11 text-yellow-400" />
            <h1 className="text-2xl font-bold">ניהול סניפים ומערכות שעות</h1>
            <p className="mt-2 text-sm text-gray-500">כניסה לממשק הניהול</p>
          </div>
          <div className="space-y-4">
            <Input value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} placeholder="שם משתמש" className="border-gray-700 bg-black/30" />
            <Input type="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} placeholder="סיסמה" className="border-gray-700 bg-black/30" />
            <Button type="submit" className="w-full bg-yellow-500 font-semibold text-black hover:bg-yellow-400">כניסה</Button>
          </div>
          {message && <p className="mt-4 text-center text-sm text-red-300">{message.text}</p>}
        </form>
      </main>
    );
  }

  return (
    <main dir="rtl" className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black pb-14 text-white">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-gray-950/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold">ניהול סניפים ומערכות שעות</h1>
            <p className="text-xs text-gray-500">הוספה, עריכה, מחיקה וקובץ מערכת לכל סניף</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setShowAddBranch(value => !value)}
              className="bg-yellow-500 font-semibold text-black hover:bg-yellow-400"
            >
              <Plus className="ml-2 h-4 w-4" />
              הוספת סניף
            </Button>
            <Link to="/admin/legacy" className="rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5">ניהול מתקדם</Link>
            <Button onClick={logout} variant="outline" className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white">
              <LogOut className="ml-2 h-4 w-4" /> יציאה
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <div className="mb-7">
          <p className="max-w-3xl text-sm leading-6 text-gray-400">כאן ניתן לנהל את פרטי הסניפים ולהעלות לכל סניף את מערכת השעות המוכנה. שינויים בפרטי הסניף או במערכת השעות מתעדכנים באתר לאחר השמירה.</p>
        </div>

        {showAddBranch && (
          <form onSubmit={handleCreateBranch} className="mb-7 rounded-3xl border border-yellow-500/20 bg-yellow-500/[0.04] p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-500/10">
                <MapPin className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h2 className="font-bold text-white">הוספת סניף חדש</h2>
                <p className="text-xs text-gray-500">שם וכתובת הם שדות חובה. שאר הפרטים אופציונליים.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">שם הסניף *</label>
                <Input
                  value={branchForm.name}
                  onChange={(e) => setBranchForm({ ...branchForm, name: e.target.value })}
                  placeholder="לדוגמה: רמות"
                  className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
                  autoFocus
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">כתובת *</label>
                <Input
                  value={branchForm.address}
                  onChange={(e) => setBranchForm({ ...branchForm, address: e.target.value })}
                  placeholder="רחוב, מספר, עיר"
                  className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
                  required
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">טלפון</label>
                <Input
                  value={branchForm.phone}
                  onChange={(e) => setBranchForm({ ...branchForm, phone: e.target.value })}
                  placeholder="02-0000000"
                  className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">אימייל</label>
                <Input
                  type="email"
                  value={branchForm.email}
                  onChange={(e) => setBranchForm({ ...branchForm, email: e.target.value })}
                  placeholder="branch@example.com"
                  className="border-gray-700 bg-gray-950/60 text-white placeholder:text-gray-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-300">תיאור</label>
                <textarea
                  value={branchForm.description}
                  onChange={(e) => setBranchForm({ ...branchForm, description: e.target.value })}
                  rows={3}
                  maxLength={500}
                  placeholder="פרטים קצרים על הסניף"
                  className="w-full rounded-md border border-gray-700 bg-gray-950/60 px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-yellow-500/60"
                />
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button type="submit" disabled={creatingBranch} className="bg-yellow-500 font-semibold text-black hover:bg-yellow-400">
                {creatingBranch ? <RefreshCw className="ml-2 h-4 w-4 animate-spin" /> : <Plus className="ml-2 h-4 w-4" />}
                שמירת סניף
              </Button>
              <Button
                type="button"
                variant="outline"
                disabled={creatingBranch}
                onClick={() => {
                  setShowAddBranch(false);
                  setBranchForm({ ...EMPTY_BRANCH_FORM });
                }}
                className="border-white/10 bg-transparent text-gray-300 hover:bg-white/5 hover:text-white"
              >
                ביטול
              </Button>
            </div>
          </form>
        )}

        {message && (
          <div className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 text-sm ${message.type === 'success' ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-200' : 'border-red-500/20 bg-red-500/10 text-red-200'}`}>
            {message.type === 'success' ? <CheckCircle2 className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            {message.text}
          </div>
        )}

        {loadingBranches ? (
          <div className="flex items-center justify-center py-20 text-gray-400"><RefreshCw className="ml-2 h-5 w-5 animate-spin" /> טוען סניפים...</div>
        ) : branches.length ? (
          <div className="space-y-6">
            {branches.map(branch => (
              <BranchScheduleCard key={branch._id} branch={branch} onChanged={loadBranches} setMessage={setMessage} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center text-gray-400">לא נמצאו סניפים פעילים. ניתן להוסיף סניף חדש מהכפתור למעלה.</div>
        )}
      </div>
    </main>
  );
}

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Calendar,
  Users,
  MapPin,
  Plus,
  Edit,
  Trash2,
  LogOut,
  Eye,
  EyeOff,
  CheckCircle2,
  AlertCircle,
  Inbox
} from 'lucide-react';

const API_BASE_URL = 'https://dance-studio-server.onrender.com/api';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Login state
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  // Data states
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [branches, setBranches] = useState([]);

  // Filter states
  const [classFilters, setClassFilters] = useState({
    teacher: '',
    branch: '',
    day: ''
  });

  // Form states
  const [showClassForm, setShowClassForm] = useState(false);
  const [showTeacherForm, setShowTeacherForm] = useState(false);
  const [showBranchForm, setShowBranchForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form data
  const [classForm, setClassForm] = useState({
    day: '',
    time: '',
    branch: '',
    teacher: '',
    description: '',
    level: '',
    maxStudents: 20,
    duration: 60
  });

  const [teacherForm, setTeacherForm] = useState({
    name: '',
    phone: '',
    email: '',
    specialties: ''
  });

  const [branchForm, setBranchForm] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    description: ''
  });

  const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const levels = ['מתחילות', 'ממשיכות', 'מתקדמות', 'גיל הרך', 'בסיס', 'נבחרת'];

  // Check authentication on load
  useEffect(() => {
    checkAuth();
  }, []);

  // Load data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadAllData();
    }
  }, [isAuthenticated]);

  const checkAuth = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/auth/verify`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('adminToken');
    }

    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setIsAuthenticated(true);
        setSuccess('התחברת בהצלחה!');
      } else {
        setError(data.message || 'שגיאה בהתחברות');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    }

    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setLoginData({ username: '', password: '' });
  };

  const loadAllData = async () => {
    await Promise.all([
      loadClasses(),
      loadTeachers(),
      loadBranches()
    ]);
  };

  const loadClasses = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/classes/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setClasses(data.data);
      }
    } catch (error) {
      console.error('Error loading classes:', error);
    }
  };

  const loadTeachers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/teachers/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setTeachers(data.data);
      }
    } catch (error) {
      console.error('Error loading teachers:', error);
    }
  };

  const loadBranches = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/branches/admin`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setBranches(data.data);
      }
    } catch (error) {
      console.error('Error loading branches:', error);
    }
  };

  const resetForms = () => {
    setClassForm({
      day: '',
      time: '',
      branch: '',
      teacher: '',
      description: '',
      level: '',
      maxStudents: 20,
      duration: 60
    });
    setTeacherForm({
      name: '',
      phone: '',
      email: '',
      specialties: ''
    });
    setBranchForm({
      name: '',
      address: '',
      phone: '',
      email: '',
      description: ''
    });
    setEditingItem(null);
  };

  const handleSubmitClass = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingItem
        ? `${API_BASE_URL}/classes/${editingItem._id}`
        : `${API_BASE_URL}/classes`;

      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(classForm)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingItem ? 'השיעור עודכן בהצלחה!' : 'השיעור נוצר בהצלחה!');
        setShowClassForm(false);
        resetForms();
        loadClasses();
      } else {
        setError(data.message || 'שגיאה בשמירת השיעור');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    }

    setLoading(false);
  };

  const handleSubmitTeacher = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingItem
        ? `${API_BASE_URL}/teachers/${editingItem._id}`
        : `${API_BASE_URL}/teachers`;

      const method = editingItem ? 'PUT' : 'POST';

      const teacherData = {
        ...teacherForm,
        specialties: teacherForm.specialties.split(',').map(s => s.trim()).filter(s => s)
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(teacherData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingItem ? 'המורה עודכנה בהצלחה!' : 'המורה נוצרה בהצלחה!');
        setShowTeacherForm(false);
        resetForms();
        loadTeachers();
      } else {
        setError(data.message || 'שגיאה בשמירת המורה');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    }

    setLoading(false);
  };

  const handleSubmitBranch = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const url = editingItem
        ? `${API_BASE_URL}/branches/${editingItem._id}`
        : `${API_BASE_URL}/branches`;

      const method = editingItem ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(branchForm)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(editingItem ? 'הסניף עודכן בהצלחה!' : 'הסניף נוצר בהצלחה!');
        setShowBranchForm(false);
        resetForms();
        loadBranches();
      } else {
        setError(data.message || 'שגיאה בשמירת הסניף');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    }

    setLoading(false);
  };

  const handleEdit = (item, type) => {
    setEditingItem(item);

    if (type === 'class') {
      setClassForm({
        day: item.day,
        time: item.time,
        branch: item.branch._id,
        teacher: item.teacher._id,
        description: item.description,
        level: item.level || '',
        maxStudents: item.maxStudents,
        duration: item.duration
      });
      setShowClassForm(true);
    } else if (type === 'teacher') {
      setTeacherForm({
        name: item.name,
        phone: item.phone,
        email: item.email,
        specialties: item.specialties.join(', ')
      });
      setShowTeacherForm(true);
    } else if (type === 'branch') {
      setBranchForm({
        name: item.name,
        address: item.address,
        phone: item.phone || '',
        email: item.email || '',
        description: item.description || ''
      });
      setShowBranchForm(true);
    }
  };

  const handleDelete = async (id, type) => {
    if (!confirm('האם אתה בטוח שברצונך למחוק פריט זה?')) return;

    setError('');
    setLoading(true);

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/${type}s/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setSuccess('הפריט נמחק בהצלחה!');
        if (type === 'class') loadClasses();
        else if (type === 'teacher') loadTeachers();
        else if (type === 'branch') loadBranches();
      } else {
        setError('שגיאה במחיקת הפריט');
      }
    } catch (error) {
      setError('שגיאה בחיבור לשרת');
    }

    setLoading(false);
  };

  // Filter classes based on selected filters
  const getFilteredClasses = () => {
    return classes.filter(classItem => {
      if (!classItem.isActive) return false;

      // Filter by teacher
      if (classFilters.teacher && classItem.teacher?._id !== classFilters.teacher) {
        return false;
      }

      // Filter by branch
      if (classFilters.branch && classItem.branch?._id !== classFilters.branch) {
        return false;
      }

      // Filter by day
      if (classFilters.day && classItem.day !== classFilters.day) {
        return false;
      }

      return true;
    });
  };

  // Clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => {
        setError('');
        setSuccess('');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  // ---- shared style tokens (presentation only) ----
  const fieldClass =
    "w-full p-2.5 bg-gray-900/60 border border-gray-700 rounded-lg text-white outline-none transition focus:border-yellow-500/70 focus:ring-2 focus:ring-yellow-500/20";
  const inputClass =
    "bg-gray-900/60 border-gray-700 text-white rounded-lg focus-visible:ring-2 focus-visible:ring-yellow-500/30";
  const thClass =
    "text-right p-3 text-xs font-semibold uppercase tracking-wide text-gray-400";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-950 via-gray-900 to-black">
        <div className="text-center">
          <div className="relative mx-auto mb-5 h-14 w-14">
            <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-yellow-400 border-r-yellow-400/40"></div>
            <div className="absolute inset-2 animate-pulse rounded-full bg-yellow-400/10"></div>
          </div>
          <p className="text-gray-300 tracking-wide">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div dir="rtl" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-black px-4">
        {/* glow blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-pink-500/10 blur-3xl"></div>

        <Card className="relative w-full max-w-md rounded-2xl border border-white/10 bg-gray-900/70 backdrop-blur-xl shadow-2xl shadow-black/50">
          <CardHeader className="text-center space-y-3 pt-8">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-400/20 to-pink-500/20 ring-1 ring-white/10 text-3xl">
              🩰
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-to-l from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              כניסה למערכת ניהול
            </CardTitle>
            <p className="text-sm text-gray-400">ריקוד ברוח הטובה</p>
          </CardHeader>
          <CardContent className="pb-8">
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="username" className="text-gray-300">שם משתמש</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className={inputClass}
                  required
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-gray-300">סיסמה</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className={`${inputClass} pl-10`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {error && (
                <Alert className="border-red-500/40 bg-red-500/10 rounded-lg">
                  <AlertDescription className="text-red-300 flex items-center gap-2">
                    <AlertCircle size={16} /> {error}
                  </AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-green-500/40 bg-green-500/10 rounded-lg">
                  <AlertDescription className="text-green-300 flex items-center gap-2">
                    <CheckCircle2 size={16} /> {success}
                  </AlertDescription>
                </Alert>
              )}

              <Button type="submit" className="w-full btn-gold rounded-lg py-2.5 font-semibold shadow-lg shadow-yellow-500/20 hover:brightness-110 transition" disabled={loading}>
                {loading ? 'מתחבר...' : 'כניסה למערכת'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div dir="rtl" className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black pb-12">
      {/* glow blobs */}
      <div className="pointer-events-none fixed -top-32 left-1/3 h-72 w-72 rounded-full bg-yellow-500/5 blur-3xl"></div>

      {/* Sticky glass header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-gray-950/70 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-2xl">🩰</span>
            <span className="bg-gradient-to-l from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
              ריקוד ברוח הטובה
            </span>
            <span className="hidden sm:inline text-sm font-normal text-gray-500">· מערכת ניהול</span>
          </h1>
          <Button onClick={handleLogout} variant="outline" className="btn-outline-pink rounded-lg">
            <LogOut className="w-4 h-4 ml-2" />
            יציאה
          </Button>
        </div>
      </header>

      {/* Floating toast messages */}
      <div className="fixed top-20 inset-x-0 z-40 flex flex-col items-center gap-2 px-4 pointer-events-none">
        {error && (
          <Alert className="w-full max-w-md border-red-500/40 bg-red-950/80 backdrop-blur rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
            <AlertDescription className="text-red-300 flex items-center gap-2">
              <AlertCircle size={16} /> {error}
            </AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="w-full max-w-md border-green-500/40 bg-green-950/80 backdrop-blur rounded-xl shadow-lg animate-in fade-in slide-in-from-top-2">
            <AlertDescription className="text-green-300 flex items-center gap-2">
              <CheckCircle2 size={16} /> {success}
            </AlertDescription>
          </Alert>
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Main Content */}
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 gap-1 rounded-xl bg-gray-900/70 backdrop-blur border border-white/10 p-1">
            <TabsTrigger value="classes" className="rounded-lg data-[state=active]:bg-gradient-to-l data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black data-[state=active]:shadow">
              <Calendar className="w-4 h-4 ml-2" />
              ניהול שיעורים
            </TabsTrigger>
            <TabsTrigger value="teachers" className="rounded-lg data-[state=active]:bg-gradient-to-l data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black data-[state=active]:shadow">
              <Users className="w-4 h-4 ml-2" />
              ניהול מורים
            </TabsTrigger>
            <TabsTrigger value="branches" className="rounded-lg data-[state=active]:bg-gradient-to-l data-[state=active]:from-yellow-500 data-[state=active]:to-yellow-600 data-[state=active]:text-black data-[state=active]:shadow">
              <MapPin className="w-4 h-4 ml-2" />
              ניהול סניפים
            </TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card className="rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur shadow-xl shadow-black/30">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-yellow-400" /> ניהול שיעורים
                </CardTitle>
                <Button
                  onClick={() => {
                    resetForms();
                    setShowClassForm(true);
                  }}
                  className="btn-gold rounded-lg shadow-lg shadow-yellow-500/20 hover:brightness-110 transition"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף שיעור חדש
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {showClassForm && (
                  <Card className="mb-6 rounded-xl border border-yellow-500/20 bg-gray-950/60 ring-1 ring-yellow-500/10">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">
                        {editingItem ? 'עריכת שיעור' : 'הוספת שיעור חדש'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-300">יום</Label>
                          <select
                            value={classForm.day}
                            onChange={(e) => setClassForm({...classForm, day: e.target.value})}
                            className={fieldClass}
                            required
                          >
                            <option value="">בחר יום</option>
                            {days.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">שעה</Label>
                          <Input
                            type="time"
                            value={classForm.time}
                            onChange={(e) => setClassForm({...classForm, time: e.target.value})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">סניף</Label>
                          <select
                            value={classForm.branch}
                            onChange={(e) => setClassForm({...classForm, branch: e.target.value})}
                            className={fieldClass}
                            required
                          >
                            <option value="">בחר סניף</option>
                            {branches.filter(b => b.isActive).map(branch => (
                              <option key={branch._id} value={branch._id}>{branch.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">מורה</Label>
                          <select
                            value={classForm.teacher}
                            onChange={(e) => setClassForm({...classForm, teacher: e.target.value})}
                            className={fieldClass}
                            required
                          >
                            <option value="">בחר מורה</option>
                            {teachers.filter(t => t.isActive).map(teacher => (
                              <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                            ))}
                          </select>
                        </div>

                        <div className="md:col-span-2 space-y-1.5">
                          <Label className="text-gray-300">תיאור השיעור</Label>
                          <Input
                            value={classForm.description}
                            onChange={(e) => setClassForm({...classForm, description: e.target.value})}
                            className={inputClass}
                            placeholder="למשל: בלט מתחילות"
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">רמה</Label>
                          <select
                            value={classForm.level}
                            onChange={(e) => setClassForm({...classForm, level: e.target.value})}
                            className={fieldClass}
                          >
                            <option value="">בחר רמה</option>
                            {levels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">משך השיעור (דקות)</Label>
                          <Input
                            type="number"
                            min="30"
                            max="180"
                            value={classForm.duration}
                            onChange={(e) => setClassForm({...classForm, duration: parseInt(e.target.value)})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="md:col-span-2 flex gap-3 pt-2">
                          <Button type="submit" className="btn-gold rounded-lg shadow-lg shadow-yellow-500/20 hover:brightness-110 transition" disabled={loading}>
                            {loading ? 'שומר...' : (editingItem ? 'עדכן שיעור' : 'שמור שיעור')}
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setShowClassForm(false);
                              resetForms();
                            }}
                            variant="outline"
                            className="btn-outline-pink rounded-lg"
                          >
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Filters */}
                <Card className="mb-6 rounded-xl border border-white/10 bg-gray-950/40">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-gray-200 text-sm font-medium">סינון שיעורים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-gray-400 text-xs">סינון לפי מורה</Label>
                        <select
                          value={classFilters.teacher}
                          onChange={(e) => setClassFilters({...classFilters, teacher: e.target.value})}
                          className={fieldClass}
                        >
                          <option value="">כל המורים</option>
                          {teachers.filter(t => t.isActive).map(teacher => (
                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-gray-400 text-xs">סינון לפי סניף</Label>
                        <select
                          value={classFilters.branch}
                          onChange={(e) => setClassFilters({...classFilters, branch: e.target.value})}
                          className={fieldClass}
                        >
                          <option value="">כל הסניפים</option>
                          {branches.filter(b => b.isActive).map(branch => (
                            <option key={branch._id} value={branch._id}>{branch.name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <Label className="text-gray-400 text-xs">סינון לפי יום</Label>
                        <select
                          value={classFilters.day}
                          onChange={(e) => setClassFilters({...classFilters, day: e.target.value})}
                          className={fieldClass}
                        >
                          <option value="">כל הימים</option>
                          {days.map(day => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={() => setClassFilters({ teacher: '', branch: '', day: '' })}
                          variant="outline"
                          className="w-full btn-outline-pink rounded-lg"
                        >
                          נקה סינון
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Classes Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-950/60">
                      <tr className="border-b border-white/10">
                        <th className={thClass}>יום</th>
                        <th className={thClass}>שעה</th>
                        <th className={thClass}>סניף</th>
                        <th className={thClass}>תיאור השיעור</th>
                        <th className={thClass}>מורה</th>
                        <th className={thClass}>פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredClasses().map(classItem => (
                        <tr key={classItem._id} className="border-b border-white/5 transition hover:bg-white/5">
                          <td className="p-3 text-gray-200">{classItem.day}</td>
                          <td className="p-3 text-gray-300 tabular-nums">{classItem.time}</td>
                          <td className="p-3 text-gray-300">{classItem.branch?.name}</td>
                          <td className="p-3 text-gray-100 font-medium">{classItem.description}</td>
                          <td className="p-3 text-gray-300">{classItem.teacher?.name}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(classItem, 'class')}
                                className="h-8 w-8 p-0 rounded-lg bg-blue-600/90 hover:bg-blue-500 transition"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(classItem._id, 'class')}
                                className="h-8 w-8 p-0 rounded-lg bg-red-600/90 hover:bg-red-500 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {getFilteredClasses().length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
                      <Inbox className="w-8 h-8 opacity-60" />
                      {classes.filter(c => c.isActive).length === 0
                        ? "אין שיעורים להצגה"
                        : "אין שיעורים התואמים לסינון הנבחר"
                      }
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Teachers Tab */}
          <TabsContent value="teachers">
            <Card className="rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur shadow-xl shadow-black/30">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-yellow-400" /> ניהול מורים
                </CardTitle>
                <Button
                  onClick={() => {
                    resetForms();
                    setShowTeacherForm(true);
                  }}
                  className="btn-gold rounded-lg shadow-lg shadow-yellow-500/20 hover:brightness-110 transition"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף מורה חדשה
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {showTeacherForm && (
                  <Card className="mb-6 rounded-xl border border-yellow-500/20 bg-gray-950/60 ring-1 ring-yellow-500/10">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">
                        {editingItem ? 'עריכת מורה' : 'הוספת מורה חדשה'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-300">שם</Label>
                          <Input
                            value={teacherForm.name}
                            onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">טלפון</Label>
                          <Input
                            value={teacherForm.phone}
                            onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">אימייל</Label>
                          <Input
                            type="email"
                            value={teacherForm.email}
                            onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">התמחויות (מופרדות בפסיק)</Label>
                          <Input
                            value={teacherForm.specialties}
                            onChange={(e) => setTeacherForm({...teacherForm, specialties: e.target.value})}
                            className={inputClass}
                            placeholder="בלט, מודרני, גיל רך"
                          />
                        </div>

                        <div className="md:col-span-2 flex gap-3 pt-2">
                          <Button type="submit" className="btn-gold rounded-lg shadow-lg shadow-yellow-500/20 hover:brightness-110 transition" disabled={loading}>
                            {loading ? 'שומר...' : (editingItem ? 'עדכן מורה' : 'שמור מורה')}
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setShowTeacherForm(false);
                              resetForms();
                            }}
                            variant="outline"
                            className="btn-outline-pink rounded-lg"
                          >
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Teachers Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-950/60">
                      <tr className="border-b border-white/10">
                        <th className={thClass}>שם</th>
                        <th className={thClass}>טלפון</th>
                        <th className={thClass}>אימייל</th>
                        <th className={thClass}>התמחויות</th>
                        <th className={thClass}>פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.filter(t => t.isActive).map(teacher => (
                        <tr key={teacher._id} className="border-b border-white/5 transition hover:bg-white/5">
                          <td className="p-3 text-gray-100 font-medium">{teacher.name}</td>
                          <td className="p-3 text-gray-300 tabular-nums">{teacher.phone}</td>
                          <td className="p-3 text-gray-300">{teacher.email}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {teacher.specialties.map((s, i) => (
                                <span key={i} className="inline-flex items-center rounded-full bg-yellow-500/10 px-2 py-0.5 text-xs text-yellow-300 ring-1 ring-yellow-500/20">
                                  {s}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(teacher, 'teacher')}
                                className="h-8 w-8 p-0 rounded-lg bg-blue-600/90 hover:bg-blue-500 transition"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(teacher._id, 'teacher')}
                                className="h-8 w-8 p-0 rounded-lg bg-red-600/90 hover:bg-red-500 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {teachers.filter(t => t.isActive).length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
                      <Inbox className="w-8 h-8 opacity-60" />
                      אין מורים להצגה
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branches Tab */}
          <TabsContent value="branches">
            <Card className="rounded-2xl border border-white/10 bg-gray-900/60 backdrop-blur shadow-xl shadow-black/30">
              <CardHeader className="flex flex-row items-center justify-between border-b border-white/5">
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-yellow-400" /> ניהול סניפים
                </CardTitle>
                <Button
                  onClick={() => {
                    resetForms();
                    setShowBranchForm(true);
                  }}
                  className="btn-gold rounded-lg shadow-lg shadow-yellow-500/20 hover:brightness-110 transition"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף סניף חדש
                </Button>
              </CardHeader>
              <CardContent className="pt-6">
                {showBranchForm && (
                  <Card className="mb-6 rounded-xl border border-yellow-500/20 bg-gray-950/60 ring-1 ring-yellow-500/10">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">
                        {editingItem ? 'עריכת סניף' : 'הוספת סניף חדש'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitBranch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Label className="text-gray-300">שם הסניף</Label>
                          <Input
                            value={branchForm.name}
                            onChange={(e) => setBranchForm({...branchForm, name: e.target.value})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">כתובת</Label>
                          <Input
                            value={branchForm.address}
                            onChange={(e) => setBranchForm({...branchForm, address: e.target.value})}
                            className={inputClass}
                            required
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">טלפון</Label>
                          <Input
                            value={branchForm.phone}
                            onChange={(e) => setBranchForm({...branchForm, phone: e.target.value})}
                            className={inputClass}
                          />
                        </div>

                        <div className="space-y-1.5">
                          <Label className="text-gray-300">אימייל</Label>
                          <Input
                            type="email"
                            value={branchForm.email}
                            onChange={(e) => setBranchForm({...branchForm, email: e.target.value})}
                            className={inputClass}
                          />
                        </div>

                        <div className="md:col-span-2 space-y-1.5">
                          <Label className="text-gray-300">תיאור</Label>
                          <Input
                            value={branchForm.description}
                            onChange={(e) => setBranchForm({...branchForm, description: e.target.value})}
                            className={inputClass}
                            placeholder="תיאור קצר של הסניף"
                          />
                        </div>

                        <div className="md:col-span-2 flex gap-3 pt-2">
                          <Button type="submit" className="btn-gold rounded-lg shadow-lg shadow-yellow-500/20 hover:brightness-110 transition" disabled={loading}>
                            {loading ? 'שומר...' : (editingItem ? 'עדכן סניף' : 'שמור סניף')}
                          </Button>
                          <Button
                            type="button"
                            onClick={() => {
                              setShowBranchForm(false);
                              resetForms();
                            }}
                            variant="outline"
                            className="btn-outline-pink rounded-lg"
                          >
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Branches Table */}
                <div className="overflow-x-auto rounded-xl border border-white/10">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-950/60">
                      <tr className="border-b border-white/10">
                        <th className={thClass}>שם הסניף</th>
                        <th className={thClass}>כתובת</th>
                        <th className={thClass}>פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.filter(b => b.isActive).map(branch => (
                        <tr key={branch._id} className="border-b border-white/5 transition hover:bg-white/5">
                          <td className="p-3 text-gray-100 font-medium">{branch.name}</td>
                          <td className="p-3 text-gray-300">{branch.address}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(branch, 'branch')}
                                className="h-8 w-8 p-0 rounded-lg bg-blue-600/90 hover:bg-blue-500 transition"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(branch._id, 'branch')}
                                className="h-8 w-8 p-0 rounded-lg bg-red-600/90 hover:bg-red-500 transition"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {branches.filter(b => b.isActive).length === 0 && (
                    <div className="flex flex-col items-center justify-center gap-2 py-12 text-gray-500">
                      <Inbox className="w-8 h-8 opacity-60" />
                      אין סניפים להצגה
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

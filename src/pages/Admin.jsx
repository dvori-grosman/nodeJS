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
  EyeOff
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-bg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
          <p className="white-text">טוען...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center dark-bg">
        <Card className="w-full max-w-md darker-bg border-gray-700">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl gold-text">כניסה למערכת ניהול</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username" className="white-text">שם משתמש</Label>
                <Input
                  id="username"
                  type="text"
                  value={loginData.username}
                  onChange={(e) => setLoginData({...loginData, username: e.target.value})}
                  className="bg-gray-800 border-gray-600 text-white"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password" className="white-text">סיסמה</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                    className="bg-gray-800 border-gray-600 text-white pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              {error && (
                <Alert className="border-red-500 bg-red-500/10">
                  <AlertDescription className="text-red-400">{error}</AlertDescription>
                </Alert>
              )}
              
              {success && (
                <Alert className="border-green-500 bg-green-500/10">
                  <AlertDescription className="text-green-400">{success}</AlertDescription>
                </Alert>
              )}
              
              <Button type="submit" className="w-full btn-gold" disabled={loading}>
                {loading ? 'מתחבר...' : 'כניסה למערכת'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen dark-bg py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gold-text">🏠 ריקוד ברוח הטובה - מערכת ניהול</h1>
          <Button onClick={handleLogout} variant="outline" className="btn-outline-pink">
            <LogOut className="w-4 h-4 ml-2" />
            יציאה
          </Button>
        </div>

        {/* Messages */}
        {error && (
          <Alert className="mb-6 border-red-500 bg-red-500/10">
            <AlertDescription className="text-red-400">{error}</AlertDescription>
          </Alert>
        )}
        
        {success && (
          <Alert className="mb-6 border-green-500 bg-green-500/10">
            <AlertDescription className="text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        {/* Main Content */}
        <Tabs defaultValue="classes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger value="classes" className="data-[state=active]:bg-yellow-600">
              <Calendar className="w-4 h-4 ml-2" />
              ניהול שיעורים
            </TabsTrigger>
            <TabsTrigger value="teachers" className="data-[state=active]:bg-yellow-600">
              <Users className="w-4 h-4 ml-2" />
              ניהול מורים
            </TabsTrigger>
            <TabsTrigger value="branches" className="data-[state=active]:bg-yellow-600">
              <MapPin className="w-4 h-4 ml-2" />
              ניהול סניפים
            </TabsTrigger>
          </TabsList>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card className="darker-bg border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="white-text">ניהול שיעורים</CardTitle>
                <Button 
                  onClick={() => {
                    resetForms();
                    setShowClassForm(true);
                  }}
                  className="btn-gold"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף שיעור חדש
                </Button>
              </CardHeader>
              <CardContent>
                {showClassForm && (
                  <Card className="mb-6 bg-gray-800 border-gray-600">
                    <CardHeader>
                      <CardTitle className="white-text">
                        {editingItem ? 'עריכת שיעור' : 'הוספת שיעור חדש'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="white-text">יום</Label>
                          <select
                            value={classForm.day}
                            onChange={(e) => setClassForm({...classForm, day: e.target.value})}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                            required
                          >
                            <option value="">בחר יום</option>
                            {days.map(day => (
                              <option key={day} value={day}>{day}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <Label className="white-text">שעה</Label>
                          <Input
                            type="time"
                            value={classForm.time}
                            onChange={(e) => setClassForm({...classForm, time: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">סניף</Label>
                          <select
                            value={classForm.branch}
                            onChange={(e) => setClassForm({...classForm, branch: e.target.value})}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                            required
                          >
                            <option value="">בחר סניף</option>
                            {branches.filter(b => b.isActive).map(branch => (
                              <option key={branch._id} value={branch._id}>{branch.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <Label className="white-text">מורה</Label>
                          <select
                            value={classForm.teacher}
                            onChange={(e) => setClassForm({...classForm, teacher: e.target.value})}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                            required
                          >
                            <option value="">בחר מורה</option>
                            {teachers.filter(t => t.isActive).map(teacher => (
                              <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label className="white-text">תיאור השיעור</Label>
                          <Input
                            value={classForm.description}
                            onChange={(e) => setClassForm({...classForm, description: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="למשל: בלט מתחילות"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">רמה</Label>
                          <select
                            value={classForm.level}
                            onChange={(e) => setClassForm({...classForm, level: e.target.value})}
                            className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                          >
                            <option value="">בחר רמה</option>
                            {levels.map(level => (
                              <option key={level} value={level}>{level}</option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <Label className="white-text">משך השיעור (דקות)</Label>
                          <Input
                            type="number"
                            min="30"
                            max="180"
                            value={classForm.duration}
                            onChange={(e) => setClassForm({...classForm, duration: parseInt(e.target.value)})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div className="md:col-span-2 flex gap-4">
                          <Button type="submit" className="btn-gold" disabled={loading}>
                            {loading ? 'שומר...' : (editingItem ? 'עדכן שיעור' : 'שמור שיעור')}
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => {
                              setShowClassForm(false);
                              resetForms();
                            }}
                            variant="outline"
                            className="btn-outline-pink"
                          >
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Filters */}
                <Card className="mb-6 bg-gray-800 border-gray-600">
                  <CardHeader>
                    <CardTitle className="white-text text-lg">סינון שיעורים</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <Label className="white-text">סינון לפי מורה</Label>
                        <select
                          value={classFilters.teacher}
                          onChange={(e) => setClassFilters({...classFilters, teacher: e.target.value})}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        >
                          <option value="">כל המורים</option>
                          {teachers.filter(t => t.isActive).map(teacher => (
                            <option key={teacher._id} value={teacher._id}>{teacher.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label className="white-text">סינון לפי סניף</Label>
                        <select
                          value={classFilters.branch}
                          onChange={(e) => setClassFilters({...classFilters, branch: e.target.value})}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
                        >
                          <option value="">כל הסניפים</option>
                          {branches.filter(b => b.isActive).map(branch => (
                            <option key={branch._id} value={branch._id}>{branch.name}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <Label className="white-text">סינון לפי יום</Label>
                        <select
                          value={classFilters.day}
                          onChange={(e) => setClassFilters({...classFilters, day: e.target.value})}
                          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
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
                          className="w-full btn-outline-pink"
                        >
                          נקה סינון
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Classes Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-right p-3 white-text">יום</th>
                        <th className="text-right p-3 white-text">שעה</th>
                        <th className="text-right p-3 white-text">סניף</th>
                        <th className="text-right p-3 white-text">תיאור השיעור</th>
                        <th className="text-right p-3 white-text">מורה</th>
                        <th className="text-right p-3 white-text">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getFilteredClasses().map(classItem => (
                        <tr key={classItem._id} className="border-b border-gray-700 hover:bg-gray-800">
                          <td className="p-3 text-gray-300">{classItem.day}</td>
                          <td className="p-3 text-gray-300">{classItem.time}</td>
                          <td className="p-3 text-gray-300">{classItem.branch?.name}</td>
                          <td className="p-3 text-gray-300">{classItem.description}</td>
                          <td className="p-3 text-gray-300">{classItem.teacher?.name}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(classItem, 'class')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(classItem._id, 'class')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {getFilteredClasses().length === 0 && (
                    <div className="text-center py-8 text-gray-400">
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
            <Card className="darker-bg border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="white-text">ניהול מורים</CardTitle>
                <Button 
                  onClick={() => {
                    resetForms();
                    setShowTeacherForm(true);
                  }}
                  className="btn-gold"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף מורה חדשה
                </Button>
              </CardHeader>
              <CardContent>
                {showTeacherForm && (
                  <Card className="mb-6 bg-gray-800 border-gray-600">
                    <CardHeader>
                      <CardTitle className="white-text">
                        {editingItem ? 'עריכת מורה' : 'הוספת מורה חדשה'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitTeacher} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="white-text">שם</Label>
                          <Input
                            value={teacherForm.name}
                            onChange={(e) => setTeacherForm({...teacherForm, name: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">טלפון</Label>
                          <Input
                            value={teacherForm.phone}
                            onChange={(e) => setTeacherForm({...teacherForm, phone: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">אימייל</Label>
                          <Input
                            type="email"
                            value={teacherForm.email}
                            onChange={(e) => setTeacherForm({...teacherForm, email: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">התמחויות (מופרדות בפסיק)</Label>
                          <Input
                            value={teacherForm.specialties}
                            onChange={(e) => setTeacherForm({...teacherForm, specialties: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="בלט, מודרני, גיל רך"
                          />
                        </div>
                        
                        <div className="md:col-span-2 flex gap-4">
                          <Button type="submit" className="btn-gold" disabled={loading}>
                            {loading ? 'שומר...' : (editingItem ? 'עדכן מורה' : 'שמור מורה')}
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => {
                              setShowTeacherForm(false);
                              resetForms();
                            }}
                            variant="outline"
                            className="btn-outline-pink"
                          >
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Teachers Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-right p-3 white-text">שם</th>
                        <th className="text-right p-3 white-text">טלפון</th>
                        <th className="text-right p-3 white-text">אימייל</th>
                        <th className="text-right p-3 white-text">התמחויות</th>
                        <th className="text-right p-3 white-text">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {teachers.filter(t => t.isActive).map(teacher => (
                        <tr key={teacher._id} className="border-b border-gray-700 hover:bg-gray-800">
                          <td className="p-3 text-gray-300">{teacher.name}</td>
                          <td className="p-3 text-gray-300">{teacher.phone}</td>
                          <td className="p-3 text-gray-300">{teacher.email}</td>
                          <td className="p-3 text-gray-300">{teacher.specialties.join(', ')}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(teacher, 'teacher')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(teacher._id, 'teacher')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {teachers.filter(t => t.isActive).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
                      אין מורים להצגה
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Branches Tab */}
          <TabsContent value="branches">
            <Card className="darker-bg border-gray-700">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="white-text">ניהול סניפים</CardTitle>
                <Button 
                  onClick={() => {
                    resetForms();
                    setShowBranchForm(true);
                  }}
                  className="btn-gold"
                >
                  <Plus className="w-4 h-4 ml-2" />
                  הוסף סניף חדש
                </Button>
              </CardHeader>
              <CardContent>
                {showBranchForm && (
                  <Card className="mb-6 bg-gray-800 border-gray-600">
                    <CardHeader>
                      <CardTitle className="white-text">
                        {editingItem ? 'עריכת סניף' : 'הוספת סניף חדש'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmitBranch} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label className="white-text">שם הסניף</Label>
                          <Input
                            value={branchForm.name}
                            onChange={(e) => setBranchForm({...branchForm, name: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">כתובת</Label>
                          <Input
                            value={branchForm.address}
                            onChange={(e) => setBranchForm({...branchForm, address: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">טלפון</Label>
                          <Input
                            value={branchForm.phone}
                            onChange={(e) => setBranchForm({...branchForm, phone: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        
                        <div>
                          <Label className="white-text">אימייל</Label>
                          <Input
                            type="email"
                            value={branchForm.email}
                            onChange={(e) => setBranchForm({...branchForm, email: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <Label className="white-text">תיאור</Label>
                          <Input
                            value={branchForm.description}
                            onChange={(e) => setBranchForm({...branchForm, description: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="תיאור קצר של הסניף"
                          />
                        </div>
                        
                        <div className="md:col-span-2 flex gap-4">
                          <Button type="submit" className="btn-gold" disabled={loading}>
                            {loading ? 'שומר...' : (editingItem ? 'עדכן סניף' : 'שמור סניף')}
                          </Button>
                          <Button 
                            type="button" 
                            onClick={() => {
                              setShowBranchForm(false);
                              resetForms();
                            }}
                            variant="outline"
                            className="btn-outline-pink"
                          >
                            ביטול
                          </Button>
                        </div>
                      </form>
                    </CardContent>
                  </Card>
                )}

                {/* Branches Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-600">
                        <th className="text-right p-3 white-text">שם הסניף</th>
                        <th className="text-right p-3 white-text">כתובת</th>
                        <th className="text-right p-3 white-text">פעולות</th>
                      </tr>
                    </thead>
                    <tbody>
                      {branches.filter(b => b.isActive).map(branch => (
                        <tr key={branch._id} className="border-b border-gray-700 hover:bg-gray-800">
                          <td className="p-3 text-gray-300">{branch.name}</td>
                          <td className="p-3 text-gray-300">{branch.address}</td>
                          <td className="p-3">
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleEdit(branch, 'branch')}
                                className="bg-blue-600 hover:bg-blue-700"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                size="sm"
                                onClick={() => handleDelete(branch._id, 'branch')}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  
                  {branches.filter(b => b.isActive).length === 0 && (
                    <div className="text-center py-8 text-gray-400">
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

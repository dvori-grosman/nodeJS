import React, { useEffect, useState } from 'react';
import { ExternalLink, FileText, MapPin, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const API_BASE_URL = 'https://dance-studio-server.onrender.com/api';

function ScheduleModal({ branch, onClose }) {
  if (!branch) return null;
  const isPdf = branch.scheduleFileType === 'application/pdf';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} aria-label="סגירה" />
      <div className="relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-gray-950 shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl">מערכת שעות - {branch.name}</h2>
            <p className="mt-1 text-sm text-gray-500">{branch.scheduleYear || 'מערכת שעות עדכנית'}</p>
          </div>
          <Button onClick={onClose} variant="outline" className="h-10 w-10 rounded-full border-white/10 bg-white/5 p-0 text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-auto bg-black/30 p-3 sm:p-6">
          {!branch.scheduleFileUrl ? (
            <div className="flex min-h-[50vh] items-center justify-center text-center text-gray-400">
              <div>
                <FileText className="mx-auto mb-4 h-12 w-12 text-gray-600" />
                <p>מערכת השעות עבור סניף זה תתפרסם בקרוב.</p>
              </div>
            </div>
          ) : isPdf ? (
            <div className="flex min-h-[65vh] flex-col">
              <iframe
                src={branch.scheduleFileUrl}
                title={`מערכת שעות ${branch.name}`}
                className="min-h-[65vh] w-full flex-1 rounded-2xl bg-white"
              />
              <a href={branch.scheduleFileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-yellow-400 hover:text-yellow-300">
                <ExternalLink className="h-4 w-4" /> פתיחה בחלון חדש
              </a>
            </div>
          ) : (
            <div className="flex min-h-[50vh] items-start justify-center">
              <img src={branch.scheduleFileUrl} alt={`מערכת שעות ${branch.name}`} className="h-auto max-h-none w-auto max-w-full rounded-2xl object-contain shadow-2xl" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function LocationsWithSchedules() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error('שגיאה בטעינת הסניפים');
        setBranches(data.data || []);
      } catch (err) {
        setError(err.message || 'שגיאה בחיבור לשרת');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedBranch ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selectedBranch]);

  return (
    <>
      <Helmet>
        <title>סניפים ומערכות שעות - ריקוד ברוח הטובה</title>
        <meta name="description" content="סניפי ריקוד ברוח הטובה ומערכות השעות העדכניות לכל סניף." />
      </Helmet>

      <main className="min-h-screen dark-bg py-12" dir="rtl">
        <section className="relative darker-bg py-20">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h1 className="gold-text text-4xl font-bold md:text-6xl">מצאי את הסניף הקרוב אליך</h1>
            <div className="gold-bg mx-auto mt-8 h-1 w-24" />
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="py-20 text-center text-gray-400">טוען סניפים...</div>
            ) : error ? (
              <div className="mx-auto max-w-xl rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-center text-red-200">{error}</div>
            ) : (
              <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
                {branches.map(branch => (
                  <Card key={branch._id} className="group flex flex-col overflow-hidden border-gray-700 darker-bg elegant-shadow transition duration-300 hover:-translate-y-1 hover:border-yellow-500/40">
                    <CardHeader className="relative overflow-hidden border-b border-white/10 bg-gradient-to-l from-yellow-500 to-yellow-600">
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-black/10"><MapPin className="h-5 w-5 text-black" /></span>
                        <div>
                          <CardTitle className="text-xl font-bold text-black">{branch.name}</CardTitle>
                          {branch.scheduleYear && <p className="mt-1 text-xs font-medium text-black/70">מערכת {branch.scheduleYear}</p>}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="flex flex-1 flex-col p-6">
                      <p className="min-h-12 text-sm leading-6 text-gray-300">{branch.address}</p>
                      {branch.description && <p className="mt-3 line-clamp-3 text-xs leading-5 text-gray-500">{branch.description}</p>}

                      <div className="mt-auto pt-6">
                        <Button
                          onClick={() => setSelectedBranch(branch)}
                          disabled={!branch.scheduleFileUrl}
                          className={`w-full rounded-xl py-6 font-semibold ${branch.scheduleFileUrl ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'cursor-not-allowed bg-gray-800 text-gray-500'}`}
                        >
                          {branch.scheduleFileUrl ? 'צפייה במערכת השעות' : 'מערכת שעות תתפרסם בקרוב'}
                        </Button>
                        {branch.scheduleUpdatedAt && <p className="mt-3 text-center text-[11px] text-gray-600">עודכן {new Date(branch.scheduleUpdatedAt).toLocaleDateString('he-IL')}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <ScheduleModal branch={selectedBranch} onClose={() => setSelectedBranch(null)} />
    </>
  );
}

import React, { useEffect, useMemo, useState } from 'react';
import { ExternalLink, FileText, MapPin, X, ArrowUpLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const API_BASE_URL = 'https://dance-studio-server.onrender.com/api';
const BRANCHES_CACHE_KEY = 'rikud-branches-cache-v1';

function getCachedBranches() {
  try {
    const cached = localStorage.getItem(BRANCHES_CACHE_KEY);
    if (!cached) return [];
    const parsed = JSON.parse(cached);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveBranchesToCache(branches) {
  try {
    localStorage.setItem(BRANCHES_CACHE_KEY, JSON.stringify(branches));
  } catch {
    // Cache failure should never block the page.
  }
}

const jerusalemFallbackPositions = [
  { left: 58, top: 36 },
  { left: 63, top: 31 },
  { left: 53, top: 44 },
  { left: 66, top: 46 },
  { left: 48, top: 37 },
  { left: 57, top: 52 },
  { left: 71, top: 35 },
  { left: 50, top: 29 },
];

function getBranchPosition(branch, index) {
  const text = `${branch.name || ''} ${branch.address || ''}`.toLowerCase();

  if (text.includes('בית שמש')) return { left: 18, top: 76 };
  if (text.includes('ביתר')) return { left: 31, top: 62 };
  if (text.includes('מעלה אדומים')) return { left: 82, top: 44 };

  if (text.includes('רמות')) return { left: 50, top: 25 };
  if (text.includes('רמת שלמה')) return { left: 61, top: 25 };
  if (text.includes('נווה יעקב')) return { left: 70, top: 21 };
  if (text.includes('פסגת זאב')) return { left: 72, top: 29 };
  if (text.includes('הר נוף')) return { left: 44, top: 37 };
  if (text.includes('רוממה')) return { left: 52, top: 34 };
  if (text.includes('גילה')) return { left: 55, top: 58 };
  if (text.includes('קטמון')) return { left: 55, top: 49 };
  if (text.includes('ארנונה')) return { left: 64, top: 51 };
  if (text.includes('שמואל הנביא')) return { left: 61, top: 35 };

  return jerusalemFallbackPositions[index % jerusalemFallbackPositions.length];
}

function ScheduleModal({ branch, onClose }) {
  if (!branch) return null;
  const isPdf = branch.scheduleFileType === 'application/pdf';

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-3 sm:p-6" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} aria-label="סגירה" />
      <div className="relative z-10 flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden border border-white/15 bg-[#0a0a0a] shadow-2xl">
        <header className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-7">
          <div>
            <p className="mb-1 text-[11px] uppercase tracking-[.24em] text-[#C9F31D]">Schedule</p>
            <h2 className="text-xl font-semibold text-white sm:text-2xl">מערכת שעות — {branch.name}</h2>
            <p className="mt-1 text-sm text-white/40">{branch.scheduleYear || 'מערכת שעות עדכנית'}</p>
          </div>
          <Button onClick={onClose} variant="outline" className="h-10 w-10 rounded-full border-white/15 bg-transparent p-0 text-white hover:bg-white/10">
            <X className="h-5 w-5" />
          </Button>
        </header>

        <div className="min-h-0 flex-1 overflow-auto bg-black/30 p-3 sm:p-6">
          {!branch.scheduleFileUrl ? (
            <div className="flex min-h-[50vh] items-center justify-center text-center text-white/50">
              <div>
                <FileText className="mx-auto mb-4 h-12 w-12 text-white/25" />
                <p>מערכת השעות עבור סניף זה תתפרסם בקרוב.</p>
              </div>
            </div>
          ) : isPdf ? (
            <div className="flex min-h-[65vh] flex-col">
              <iframe src={branch.scheduleFileUrl} title={`מערכת שעות ${branch.name}`} className="min-h-[65vh] w-full flex-1 bg-white" />
              <a href={branch.scheduleFileUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center justify-center gap-2 text-sm font-medium text-[#C9F31D] hover:text-white">
                <ExternalLink className="h-4 w-4" /> פתיחה בחלון חדש
              </a>
            </div>
          ) : (
            <div className="flex min-h-[50vh] items-start justify-center">
              <img src={branch.scheduleFileUrl} alt={`מערכת שעות ${branch.name}`} className="h-auto max-h-none w-auto max-w-full object-contain" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MapArtwork() {
  return (
    <svg viewBox="0 0 1200 760" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="mapFade" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#171717" />
          <stop offset="1" stopColor="#090909" />
        </linearGradient>
        <filter id="softGlow"><feGaussianBlur stdDeviation="12" /></filter>
      </defs>
      <rect width="1200" height="760" fill="url(#mapFade)" />

      <path d="M90 610 C190 540 250 530 330 470 C430 395 450 305 545 260 C635 215 735 230 830 190 C960 134 1040 120 1150 82" fill="none" stroke="#262626" strokeWidth="34" />
      <path d="M22 522 C130 500 240 438 336 421 C472 396 563 423 680 385 C835 334 932 264 1190 245" fill="none" stroke="#202020" strokeWidth="22" />
      <path d="M420 72 C455 164 504 224 500 315 C496 414 442 495 482 604 C504 666 558 714 616 752" fill="none" stroke="#242424" strokeWidth="18" />
      <path d="M688 38 C661 142 690 215 743 292 C808 387 845 442 838 562 C835 615 806 683 776 758" fill="none" stroke="#1f1f1f" strokeWidth="15" />

      <g fill="none" stroke="#313131" strokeWidth="2">
        <path d="M180 665 C266 613 323 620 384 552 C436 494 459 449 544 432 C627 415 702 439 780 407" />
        <path d="M508 180 C586 202 654 191 713 224 C771 256 803 312 873 330" />
        <path d="M527 540 C605 520 658 537 720 573 C772 603 818 640 904 654" />
        <path d="M584 275 C614 326 658 344 711 350 C780 357 826 336 893 367" />
        <path d="M345 338 C410 329 455 346 518 373" />
      </g>

      <g fill="#161616" stroke="#2b2b2b" strokeWidth="1.5">
        <path d="M442 214 L545 178 L625 208 L660 283 L613 350 L526 361 L454 307 Z" />
        <path d="M522 368 L635 355 L713 400 L698 486 L606 521 L516 471 Z" />
        <path d="M640 221 L758 201 L833 258 L820 344 L714 368 L658 307 Z" />
      </g>

      <ellipse cx="615" cy="363" rx="166" ry="146" fill="#C9F31D" opacity=".035" filter="url(#softGlow)" />
      <text x="615" y="382" textAnchor="middle" fill="#ffffff" opacity=".08" fontSize="88" fontWeight="800">JERUSALEM</text>
      <text x="167" y="673" fill="#ffffff" opacity=".18" fontSize="25" fontWeight="600">בית שמש</text>
      <text x="300" y="545" fill="#ffffff" opacity=".18" fontSize="22" fontWeight="600">ביתר</text>
      <text x="625" y="205" fill="#ffffff" opacity=".13" fontSize="20">צפון ירושלים</text>
      <text x="618" y="566" fill="#ffffff" opacity=".13" fontSize="20">דרום ירושלים</text>
    </svg>
  );
}

function BranchPin({ branch, index, active, onActivate, onOpenSchedule }) {
  const position = getBranchPosition(branch, index);
  const hasSchedule = Boolean(branch.scheduleFileUrl);

  return (
    <div
      className={`branch-pin absolute z-10 ${active ? 'is-active z-30' : ''}`}
      style={{ left: `${position.left}%`, top: `${position.top}%` }}
      onMouseEnter={() => onActivate(branch._id)}
      onMouseLeave={() => onActivate(null)}
    >
      <button
        type="button"
        className="pin-button relative grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/50 bg-[#C9F31D] text-black transition duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/70"
        onClick={() => onActivate(active ? null : branch._id)}
        aria-label={`סניף ${branch.name}`}
      >
        <MapPin className="h-5 w-5" strokeWidth={2.4} />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#C9F31D]/25" />
      </button>

      <div className={`pin-popover absolute bottom-[34px] right-1/2 w-[260px] translate-x-1/2 border border-white/15 bg-[#0b0b0b]/95 p-4 text-right backdrop-blur-xl transition duration-200 ${active ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0 group-hover:opacity-100'}`}>
        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-[.22em] text-[#C9F31D]">Branch {String(index + 1).padStart(2, '0')}</p>
            <h3 className="mt-1 text-lg font-semibold text-white">{branch.name}</h3>
          </div>
          <span className="mt-1 h-2 w-2 rounded-full bg-[#C9F31D]" />
        </div>
        <p className="mb-4 text-sm leading-6 text-white/55">{branch.address}</p>
        <button
          type="button"
          disabled={!hasSchedule}
          onClick={(event) => {
            event.stopPropagation();
            if (hasSchedule) onOpenSchedule(branch);
          }}
          className={`flex w-full items-center justify-between border-t border-white/10 pt-3 text-sm font-semibold transition ${hasSchedule ? 'text-white hover:text-[#C9F31D]' : 'cursor-not-allowed text-white/25'}`}
        >
          <span>{hasSchedule ? 'למערכת השעות' : 'מערכת שעות בקרוב'}</span>
          <ArrowUpLeft className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function LocationsWithSchedules() {
  const cachedBranches = useMemo(() => getCachedBranches(), []);
  const [branches, setBranches] = useState(cachedBranches);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [activeBranchId, setActiveBranchId] = useState(null);
  const [loading, setLoading] = useState(cachedBranches.length === 0);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/branches`);
        const data = await response.json();
        if (!response.ok || !data.success) throw new Error('שגיאה בטעינת הסניפים');
        const freshBranches = data.data || [];
        setBranches(freshBranches);
        saveBranchesToCache(freshBranches);
        setError('');
      } catch (err) {
        if (cachedBranches.length === 0) setError(err.message || 'שגיאה בחיבור לשרת');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [cachedBranches]);

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

      <main className="min-h-screen bg-[#090909] text-white" dir="rtl">
        <section className="border-b border-white/10 px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-16 lg:pt-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[.26em] text-white/35">
              <span className="h-px w-12 bg-[#C9F31D]" />
              LOCATIONS / 01
            </div>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_.42fr]">
              <h1 className="text-[clamp(62px,10vw,155px)] font-semibold leading-[.82] tracking-[-.075em]">
                הסניפים<br/><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.45)]">שלנו.</span>
              </h1>
              <p className="max-w-md pb-2 text-base leading-8 text-white/50">
                עברי עם העכבר על נקודה במפה — או לחצי עליה — כדי לראות את פרטי הסניף ולפתוח את מערכת השעות.
              </p>
            </div>
          </div>
        </section>

        <section className="px-4 py-8 sm:px-8 lg:px-12 lg:py-14">
          <div className="mx-auto max-w-[1440px]">
            {loading ? (
              <div className="grid min-h-[620px] place-items-center border border-white/10 bg-[#0d0d0d] text-white/45">טוען סניפים...</div>
            ) : error ? (
              <div className="grid min-h-[420px] place-items-center border border-red-500/20 bg-red-500/5 p-8 text-center text-red-200">{error}</div>
            ) : (
              <>
                <div className="relative min-h-[620px] overflow-hidden border border-white/10 bg-[#0d0d0d] sm:min-h-[700px] lg:min-h-[760px]">
                  <MapArtwork />
                  <div className="absolute inset-x-0 top-0 z-[2] flex items-center justify-between border-b border-white/10 bg-black/20 px-4 py-3 text-[10px] uppercase tracking-[.22em] text-white/35 backdrop-blur-sm sm:px-6">
                    <span>Interactive branch map</span>
                    <span>{branches.length} locations</span>
                  </div>

                  {branches.map((branch, index) => (
                    <BranchPin
                      key={branch._id || `${branch.name}-${index}`}
                      branch={branch}
                      index={index}
                      active={activeBranchId === branch._id}
                      onActivate={setActiveBranchId}
                      onOpenSchedule={setSelectedBranch}
                    />
                  ))}

                  <div className="absolute bottom-4 left-4 z-[3] border border-white/10 bg-black/45 px-3 py-2 text-[10px] text-white/35 backdrop-blur-sm sm:bottom-6 sm:left-6">
                    מפה סכמטית להמחשת פריסת הסניפים
                  </div>
                </div>

                <div className="mt-8 grid border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3">
                  {branches.map((branch, index) => (
                    <button
                      key={`mobile-${branch._id || index}`}
                      type="button"
                      onClick={() => setActiveBranchId(branch._id)}
                      className="group flex items-center justify-between gap-5 border-b border-white/10 px-1 py-5 text-right transition hover:bg-white/[.025] sm:px-5 sm:[&:nth-child(odd)]:border-l lg:border-l lg:[&:nth-child(3n)]:border-l-0"
                    >
                      <div className="min-w-0">
                        <p className="mb-1 text-[10px] tracking-[.2em] text-[#C9F31D]">{String(index + 1).padStart(2, '0')}</p>
                        <p className="truncate text-base font-medium text-white">{branch.name}</p>
                        <p className="mt-1 truncate text-xs text-white/35">{branch.address}</p>
                      </div>
                      <MapPin className="h-5 w-5 shrink-0 text-white/25 transition group-hover:text-[#C9F31D]" />
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      </main>

      <ScheduleModal branch={selectedBranch} onClose={() => setSelectedBranch(null)} />
    </>
  );
}

import React, { useState } from 'react';
import { ArrowUpLeft, MapPin, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

const branches = [
  { _id: 'ramot', name: 'רמות', address: 'ירושלים — רמות', scheduleYear: 'תשפ״ז', hours: ['א׳ 16:00–20:00', 'ג׳ 16:00–20:00', 'ה׳ 17:00–20:00'] },
  { _id: 'har-nof', name: 'הר נוף', address: 'ירושלים — הר נוף', scheduleYear: 'תשפ״ז', hours: ['ב׳ 16:30–20:30', 'ד׳ 16:00–20:00'] },
  { _id: 'gilo', name: 'גילה', address: 'ירושלים — גילה', scheduleYear: 'תשפ״ז', hours: ['א׳ 17:00–20:30', 'ד׳ 16:00–20:30'] },
  { _id: 'romema', name: 'רוממה', address: 'ירושלים — רוממה', scheduleYear: 'תשפ״ז', hours: ['ב׳ 16:00–20:00', 'ה׳ 16:00–20:00'] },
  { _id: 'pisgat-zeev', name: 'פסגת זאב', address: 'ירושלים — פסגת זאב', scheduleYear: 'תשפ״ז', hours: ['א׳ 16:30–20:30', 'ג׳ 16:30–20:30'] },
  { _id: 'beit-shemesh', name: 'בית שמש', address: 'בית שמש', scheduleYear: 'תשפ״ז', hours: ['ב׳ 16:00–20:00', 'ד׳ 16:00–20:00'] },
  { _id: 'beitar', name: 'ביתר עילית', address: 'ביתר עילית', scheduleYear: 'תשפ״ז', hours: ['א׳ 16:00–20:00', 'ג׳ 16:00–20:00'] },
  { _id: 'neve-yaakov', name: 'נווה יעקב', address: 'ירושלים — נווה יעקב', scheduleYear: 'תשפ״ז', hours: ['ב׳ 17:00–20:30', 'ה׳ 16:00–20:00'] }
];

const jerusalemFallbackPositions = [
  { left: 58, top: 36 }, { left: 48, top: 37 }, { left: 55, top: 58 }, { left: 52, top: 34 },
  { left: 72, top: 29 }, { left: 18, top: 76 }, { left: 31, top: 62 }, { left: 70, top: 21 }
];

function MapArtwork() {
  return (
    <svg viewBox="0 0 1200 760" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      <defs><linearGradient id="mapFade" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#171717"/><stop offset="1" stopColor="#090909"/></linearGradient></defs>
      <rect width="1200" height="760" fill="url(#mapFade)"/>
      <path d="M90 610 C190 540 250 530 330 470 C430 395 450 305 545 260 C635 215 735 230 830 190 C960 134 1040 120 1150 82" fill="none" stroke="#262626" strokeWidth="34"/>
      <path d="M22 522 C130 500 240 438 336 421 C472 396 563 423 680 385 C835 334 932 264 1190 245" fill="none" stroke="#202020" strokeWidth="22"/>
      <path d="M420 72 C455 164 504 224 500 315 C496 414 442 495 482 604 C504 666 558 714 616 752" fill="none" stroke="#242424" strokeWidth="18"/>
      <path d="M688 38 C661 142 690 215 743 292 C808 387 845 442 838 562 C835 615 806 683 776 758" fill="none" stroke="#1f1f1f" strokeWidth="15"/>
      <text x="615" y="382" textAnchor="middle" fill="#ffffff" opacity=".08" fontSize="88" fontWeight="800">JERUSALEM</text>
      <text x="167" y="673" fill="#ffffff" opacity=".18" fontSize="25" fontWeight="600">בית שמש</text>
      <text x="300" y="545" fill="#ffffff" opacity=".18" fontSize="22" fontWeight="600">ביתר</text>
    </svg>
  );
}

function ScheduleModal({ branch, onClose }) {
  if (!branch) return null;
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button className="absolute inset-0 bg-black/85 backdrop-blur-md" onClick={onClose} aria-label="סגירה" />
      <div className="relative z-10 w-full max-w-xl border border-white/15 bg-[#0b0b0b] p-7 shadow-2xl">
        <div className="mb-8 flex items-start justify-between gap-4">
          <div><p className="text-[10px] uppercase tracking-[.24em] text-[#D4AF37]">Static schedule</p><h2 className="mt-2 text-3xl font-semibold">{branch.name}</h2><p className="mt-2 text-sm text-white/35">{branch.address} · {branch.scheduleYear}</p></div>
          <Button onClick={onClose} variant="outline" className="h-10 w-10 rounded-full border-white/15 bg-transparent p-0 text-white hover:bg-white/10"><X className="h-5 w-5"/></Button>
        </div>
        <div className="space-y-px bg-white/10">
          {branch.hours.map((hour, index) => <div key={hour} className="flex items-center justify-between bg-[#111] px-5 py-4"><span className="text-sm text-white/45">{String(index + 1).padStart(2,'0')}</span><span className="font-medium">{hour}</span></div>)}
        </div>
        <p className="mt-6 text-xs leading-6 text-white/30">מערכת לדוגמה לצורכי פרוויו ועיצוב בלבד.</p>
      </div>
    </div>
  );
}

export default function LocationsWithSchedules() {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [activeBranchId, setActiveBranchId] = useState(null);

  return (
    <>
      <Helmet><title>סניפים ומערכות שעות - ריקוד ברוח הטובה</title><meta name="description" content="תצוגת סניפים סטטית לפרוויו העיצובי" /></Helmet>
      <main className="min-h-screen bg-[#090909] text-white" dir="rtl">
        <section className="border-b border-white/10 px-5 pb-10 pt-16 sm:px-8 lg:px-12 lg:pb-16 lg:pt-24">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-6 flex items-center gap-3 text-[11px] uppercase tracking-[.26em] text-white/35"><span className="h-px w-12 bg-[#D4AF37]"/>LOCATIONS / STATIC</div>
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_.42fr]">
              <h1 className="text-[clamp(62px,10vw,155px)] font-semibold leading-[.82] tracking-[-.075em]">הסניפים<br/><span className="text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,.45)]">שלנו.</span></h1>
              <p className="max-w-md pb-2 text-base leading-8 text-white/50">שמונה סניפים לדוגמה, מפה אינטראקטיבית ומערכות שעות סטטיות — מספיק תוכן כדי לפתח את העיצוב בלי API.</p>
            </div>
          </div>
        </section>

        <section className="px-4 py-10 sm:px-8 lg:px-12 lg:py-16">
          <div className="mx-auto max-w-[1440px]">
            <div className="mb-10 flex items-end justify-between gap-6 border-b border-white/10 pb-5">
              <div><p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#D4AF37]">Choose a branch</p><h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">בחרי את הסניף שלך</h2></div>
              <span className="text-sm text-white/30">{branches.length} סניפים</span>
            </div>

            <div className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {branches.map((branch, index) => (
                <article key={branch._id} className="group flex min-h-[260px] flex-col bg-[#0d0d0d] p-6 transition hover:bg-[#111]">
                  <div className="mb-8 flex items-start justify-between gap-4"><div><p className="mb-3 text-[10px] uppercase tracking-[.24em] text-[#D4AF37]">Branch {String(index + 1).padStart(2,'0')}</p><h3 className="text-2xl font-semibold">{branch.name}</h3></div><MapPin className="h-5 w-5 text-white/30 group-hover:text-[#E8B4CB]"/></div>
                  <p className="text-sm leading-7 text-white/40">{branch.address}</p>
                  <button type="button" onClick={() => setSelectedBranch(branch)} className="mt-auto flex items-center justify-between border-t border-white/10 pt-4 text-sm font-semibold text-white transition hover:text-[#D4AF37]"><span>מערכת שעות לדוגמה</span><ArrowUpLeft className="h-4 w-4"/></button>
                </article>
              ))}
            </div>

            <div className="mb-8 mt-20 flex items-end justify-between gap-6 border-b border-white/10 pb-5"><div><p className="mb-2 text-[10px] uppercase tracking-[.24em] text-[#D4AF37]">Interactive map</p><h2 className="text-3xl font-semibold tracking-[-.04em] sm:text-4xl">מפת הסניפים</h2></div><p className="hidden max-w-sm text-left text-sm leading-6 text-white/35 md:block">עברו עם העכבר או לחצו על פין כדי לראות את שם הסניף.</p></div>

            <div className="relative min-h-[620px] overflow-hidden border border-white/10 bg-[#0d0d0d] sm:min-h-[700px] lg:min-h-[760px]">
              <MapArtwork />
              {branches.map((branch, index) => {
                const position = jerusalemFallbackPositions[index];
                const active = activeBranchId === branch._id;
                return <div key={branch._id} className="absolute z-10" style={{left:`${position.left}%`,top:`${position.top}%`}} onMouseEnter={() => setActiveBranchId(branch._id)} onMouseLeave={() => setActiveBranchId(null)}>
                  <button type="button" onClick={() => setActiveBranchId(active ? null : branch._id)} className="relative grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-black/50 bg-[#D4AF37] text-black transition hover:scale-110"><MapPin className="h-5 w-5"/></button>
                  <div className={`absolute bottom-[34px] right-1/2 w-[220px] translate-x-1/2 border border-white/15 bg-[#0b0b0b]/95 p-4 text-right backdrop-blur-xl transition ${active ? 'pointer-events-auto opacity-100' : 'pointer-events-none translate-y-2 opacity-0'}`}><p className="text-[10px] uppercase tracking-[.22em] text-[#D4AF37]">Branch {String(index+1).padStart(2,'0')}</p><h3 className="mt-1 text-lg font-semibold">{branch.name}</h3><p className="mt-2 text-sm text-white/45">{branch.address}</p></div>
                </div>;
              })}
              <div className="absolute bottom-4 left-4 z-[3] border border-white/10 bg-black/45 px-3 py-2 text-[10px] text-white/35 backdrop-blur-sm">מפה סכמטית לצורכי עיצוב</div>
            </div>
          </div>
        </section>
      </main>
      <ScheduleModal branch={selectedBranch} onClose={() => setSelectedBranch(null)} />
    </>
  );
}

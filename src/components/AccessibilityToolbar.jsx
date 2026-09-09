import { useEffect, useState } from 'react';
import {
  Accessibility,
  Contrast,
  Eye,
  Link as LinkIcon,
  RotateCcw,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import './AccessibilityToolbar.css';

const STORAGE_KEY = 'rikud-accessibility-settings';

const defaultSettings = {
  fontLevel: 0,
  highContrast: false,
  grayscale: false,
  underlineLinks: false,
};

function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    const root = document.documentElement;

    root.classList.toggle('a11y-font-large', settings.fontLevel === 1);
    root.classList.toggle('a11y-font-larger', settings.fontLevel === 2);
    root.classList.toggle('a11y-high-contrast', settings.highContrast);
    root.classList.toggle('a11y-grayscale', settings.grayscale);
    root.classList.toggle('a11y-underline-links', settings.underlineLinks);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const increaseText = () => {
    setSettings((current) => ({
      ...current,
      fontLevel: Math.min(current.fontLevel + 1, 2),
    }));
  };

  const decreaseText = () => {
    setSettings((current) => ({
      ...current,
      fontLevel: Math.max(current.fontLevel - 1, 0),
    }));
  };

  const toggleSetting = (key) => {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  };

  const reset = () => setSettings(defaultSettings);

  return (
    <div className="accessibility-toolbar" dir="rtl">
      <button
        type="button"
        className="accessibility-trigger"
        aria-label="פתיחת תפריט נגישות"
        aria-expanded={isOpen}
        aria-controls="accessibility-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        <Accessibility aria-hidden="true" size={28} />
      </button>

      {isOpen && (
        <div
          id="accessibility-menu"
          className="accessibility-menu"
          role="dialog"
          aria-label="אפשרויות נגישות"
        >
          <div className="accessibility-menu__header">
            <strong>נגישות</strong>
            <button
              type="button"
              className="accessibility-close"
              onClick={() => setIsOpen(false)}
              aria-label="סגירת תפריט נגישות"
            >
              ×
            </button>
          </div>

          <div className="accessibility-actions">
            <button type="button" onClick={increaseText} disabled={settings.fontLevel === 2}>
              <ZoomIn aria-hidden="true" size={20} />
              הגדלת טקסט
            </button>

            <button type="button" onClick={decreaseText} disabled={settings.fontLevel === 0}>
              <ZoomOut aria-hidden="true" size={20} />
              הקטנת טקסט
            </button>

            <button
              type="button"
              className={settings.highContrast ? 'is-active' : ''}
              aria-pressed={settings.highContrast}
              onClick={() => toggleSetting('highContrast')}
            >
              <Contrast aria-hidden="true" size={20} />
              ניגודיות גבוהה
            </button>

            <button
              type="button"
              className={settings.grayscale ? 'is-active' : ''}
              aria-pressed={settings.grayscale}
              onClick={() => toggleSetting('grayscale')}
            >
              <Eye aria-hidden="true" size={20} />
              גווני אפור
            </button>

            <button
              type="button"
              className={settings.underlineLinks ? 'is-active' : ''}
              aria-pressed={settings.underlineLinks}
              onClick={() => toggleSetting('underlineLinks')}
            >
              <LinkIcon aria-hidden="true" size={20} />
              הדגשת קישורים
            </button>

            <button type="button" onClick={reset}>
              <RotateCcw aria-hidden="true" size={20} />
              איפוס הגדרות
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AccessibilityToolbar;

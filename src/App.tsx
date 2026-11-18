import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { COURSE_MODULES } from './data/courseData';
import { CourseOverview } from './components/CourseOverview';
import { ModuleWorkspace } from './components/ModuleWorkspace';
import { LabsGallery } from './components/LabsGallery';
import { PracticeHub } from './components/PracticeHub';

type ViewMode = 'overview' | 'modules' | 'labs' | 'practice';

const STORAGE_COMPLETED = 'mth101_completed_modules_v1';
const STORAGE_SOLVED = 'mth101_solved_tutorials_v1';
const STORAGE_THEME = 'mth101_theme_v1';

export default function App() {
  const [view, setView] = useState<ViewMode>('overview');
  const [activeModuleId, setActiveModuleId] = useState<number>(1);
  const [focusLab, setFocusLab] = useState<boolean>(false);

  const [completedModules, setCompletedModules] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMPLETED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [solvedTutorials, setSolvedTutorials] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_SOLVED);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem(STORAGE_THEME) === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      localStorage.setItem(STORAGE_THEME, isDark ? 'dark' : 'light');
    } catch {
      // ignore storage failure
    }
  }, [isDark]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_COMPLETED, JSON.stringify(completedModules));
    } catch {
      // ignore
    }
  }, [completedModules]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SOLVED, JSON.stringify(solvedTutorials));
    } catch {
      // ignore
    }
  }, [solvedTutorials]);

  const handleOpenModule = (moduleId: number, shouldFocusLab = false) => {
    setActiveModuleId(moduleId);
    setFocusLab(shouldFocusLab);
    setView('modules');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleModuleComplete = (moduleId: number) => {
    setCompletedModules((prev) =>
      prev.includes(moduleId) ? prev.filter((id) => id !== moduleId) : [...prev, moduleId]
    );
  };

  const toggleTutorialSolved = (tutorialId: number) => {
    setSolvedTutorials((prev) =>
      prev.includes(tutorialId) ? prev.filter((id) => id !== tutorialId) : [...prev, tutorialId]
    );
  };

  const resetAllProgress = () => {
    setCompletedModules([]);
    setSolvedTutorials([]);
  };

  const activeModule =
    COURSE_MODULES.find((m) => m.id === activeModuleId) ?? COURSE_MODULES[0];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-xs dark:border-slate-800 dark:bg-slate-950/95">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3.5 sm:px-6">
          {/* Zone 1: Single-Element Brand Wordmark */}
          <button
            type="button"
            onClick={() => setView('overview')}
            className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 dark:text-white"
          >
            MTH 101
          </button>

          {/* Zone 2: 4 Single-Line Text Nav Links */}
          <nav className="flex items-center gap-5 sm:gap-7 overflow-x-auto" aria-label="Primary navigation">
            {(
              [
                { id: 'overview', label: 'Overview' },
                { id: 'modules', label: 'Modules' },
                { id: 'labs', label: 'Visual Labs' },
                { id: 'practice', label: 'Practice' },
              ] as const
            ).map((item) => {
              const active = view === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setFocusLab(false);
                    setView(item.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`border-b-2 py-1 text-sm font-medium whitespace-nowrap shrink-0 transition-colors ${
                    active
                      ? 'border-sky-600 text-slate-900 dark:border-sky-400 dark:text-white'
                      : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="shrink-0 hidden sm:block">
            <button
              type="button"
              onClick={() => {
                setView('practice');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-sky-700 whitespace-nowrap shrink-0"
            >
              Start Practice
            </button>
          </div>
        </div>
      </header>

      {/* Secondary Workspace Utility Bar (below header) */}
      <div className="border-b border-slate-200/80 bg-white dark:border-slate-800/80 dark:bg-slate-900/40">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-slate-500 sm:px-6 dark:text-slate-400">
          <div className="truncate">
            Elementary Mathematics I (Algebra &amp; Trigonometry) · NUC CCMAS
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="hidden sm:inline font-mono">
              Modules {completedModules.length}/9 · Tutorials {solvedTutorials.length}/8
            </span>
            <button
              type="button"
              onClick={() => setIsDark((d) => !d)}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              className="inline-flex items-center gap-1.5 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {isDark ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
              <span>{isDark ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        {view === 'overview' && (
          <CourseOverview
            completedModules={completedModules}
            solvedTutorials={solvedTutorials}
            onOpenModule={handleOpenModule}
            onOpenPractice={() => {
              setView('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {view === 'modules' && (
          <ModuleWorkspace
            module={activeModule}
            allModules={COURSE_MODULES}
            isCompleted={completedModules.includes(activeModule.id)}
            initialFocusLab={focusLab}
            onSelectModule={(id) => handleOpenModule(id, false)}
            onToggleComplete={toggleModuleComplete}
          />
        )}

        {view === 'labs' && (
          <LabsGallery
            onOpenModuleNotes={(id) => handleOpenModule(id, false)}
          />
        )}

        {view === 'practice' && (
          <PracticeHub
            solvedTutorials={solvedTutorials}
            onToggleSolved={toggleTutorialSolved}
            onJumpToModule={(id) => handleOpenModule(id, false)}
            onResetProgress={resetAllProgress}
          />
        )}
      </main>

      {/* Clean Academic Footer */}
      <footer className="border-t border-slate-200 bg-white py-5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 sm:px-6">
          <span>MTH 101 · Elementary Mathematics I (Algebra and Trigonometry)</span>
          <span>2 Credit Units · 30 Lecture Hours · NUC CCMAS Standard</span>
        </div>
      </footer>
    </div>
  );
}

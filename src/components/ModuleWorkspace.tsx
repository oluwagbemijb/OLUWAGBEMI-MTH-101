import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Eye,
  SlidersHorizontal,
} from 'lucide-react';
import { CourseModule } from '../data/courseData';
import { MathFormula, MathProse } from './MathText';
import { ModuleLabHost } from './labs/ModuleLabHost';

interface ModuleWorkspaceProps {
  module: CourseModule;
  allModules: CourseModule[];
  isCompleted: boolean;
  initialFocusLab?: boolean;
  onSelectModule: (moduleId: number) => void;
  onToggleComplete: (moduleId: number) => void;
}

export const ModuleWorkspace: React.FC<ModuleWorkspaceProps> = ({
  module,
  allModules,
  isCompleted,
  initialFocusLab = false,
  onSelectModule,
  onToggleComplete,
}) => {
  const [showLab, setShowLab] = useState(true);
  const [revealedSteps, setRevealedSteps] = useState<Record<string, number>>({});
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});

  useEffect(() => {
    setRevealedSteps({});
    setSelectedAnswers({});
    if (initialFocusLab) {
      setShowLab(true);
    }
  }, [module.id, initialFocusLab]);

  const revealNextStep = (exId: string, maxSteps: number) => {
    setRevealedSteps((prev) => {
      const current = prev[exId] ?? 0;
      return { ...prev, [exId]: Math.min(maxSteps, current + 1) };
    });
  };

  const revealAllSteps = (exId: string, maxSteps: number) => {
    setRevealedSteps((prev) => ({ ...prev, [exId]: maxSteps }));
  };

  const hideSteps = (exId: string) => {
    setRevealedSteps((prev) => ({ ...prev, [exId]: 0 }));
  };

  const prevModule = allModules.find((m) => m.id === module.id - 1);
  const nextModule = allModules.find((m) => m.id === module.id + 1);

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
      {/* Left Sidebar Module Index */}
      <aside className="lg:col-span-3 space-y-3">
        <div className="rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
          <div className="px-2 pb-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
            Course Modules (1–9)
          </div>
          <nav className="space-y-1" aria-label="Course modules">
            {allModules.map((m) => {
              const active = m.id === module.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => onSelectModule(m.id)}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-left text-xs font-medium transition-colors ${
                    active
                      ? 'bg-sky-50 text-sky-900 dark:bg-sky-950/60 dark:text-sky-200'
                      : 'text-slate-700 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <span className="truncate">
                    <span className="font-mono mr-1.5 text-slate-400">0{m.id}.</span>
                    {m.shortTitle}
                  </span>
                  <span className="font-mono text-[11px] text-slate-400 shrink-0 ml-2">
                    {m.hours}h
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Module Content */}
      <div className="lg:col-span-9 space-y-8">
        {/* Module Header */}
        <header className="space-y-3 border-b border-slate-200 pb-6 dark:border-slate-800">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
              <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
                {module.code}
              </span>
              <span aria-hidden="true">·</span>
              <span>{module.weeks}</span>
              <span aria-hidden="true">·</span>
              <span>{module.hours} Lecture Hours</span>
            </div>

            <button
              type="button"
              onClick={() => onToggleComplete(module.id)}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 ${
                isCompleted
                  ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                  : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <CheckCircle2 className="h-3.5 w-3.5" />
              {isCompleted ? 'Marked as Studied' : 'Mark as Studied'}
            </button>
          </div>

          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl text-balance dark:text-white">
            {module.title}
          </h1>
          <div className="text-sm text-slate-600 dark:text-slate-300">
            <MathProse text={module.summary} />
          </div>
        </header>

        {/* Interactive Visual Lab Section */}
        <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-white">
                <SlidersHorizontal className="h-4 w-4 text-sky-600 dark:text-sky-400" />
                <span>Interactive Visual Lab: {module.labTitle}</span>
              </div>
              <div className="text-xs text-slate-600 dark:text-slate-400">
                <MathProse text={module.labDescription} />
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowLab((v) => !v)}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
            >
              {showLab ? (
                <>
                  Hide Lab <ChevronUp className="h-3.5 w-3.5" />
                </>
              ) : (
                <>
                  Show Lab <ChevronDown className="h-3.5 w-3.5" />
                </>
              )}
            </button>
          </div>

          {showLab && (
            <div className="mt-5">
              <ModuleLabHost moduleId={module.id} />
            </div>
          )}
        </section>

        {/* Lecture Notes Subsections */}
        <section className="space-y-6">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Lecture Notes &amp; Core Theory
          </h2>

          <div className="space-y-6">
            {module.sections.map((section) => (
              <div
                key={section.id}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                  {section.title}
                </h3>

                {section.intro && (
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    <MathProse text={section.intro} />
                  </div>
                )}

                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {section.items.map((item, idx) => (
                    <div key={idx} className="py-3 first:pt-0 last:pb-0 space-y-1.5">
                      {item.term && (
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">
                          <MathProse text={item.term} />
                        </div>
                      )}
                      <div className="text-sm text-slate-700 dark:text-slate-300">
                        <MathProse text={item.content} />
                      </div>
                      {item.formula && (
                        <div className="mt-2 rounded-lg bg-slate-50 px-4 py-2.5 dark:bg-slate-800/60">
                          <MathFormula math={item.formula} block />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Worked Examples */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Worked Examples
          </h2>

          <div className="space-y-4">
            {module.workedExamples.map((ex) => {
              const shownCount = revealedSteps[ex.id] ?? ex.steps.length;
              const allShown = shownCount >= ex.steps.length;

              return (
                <div
                  key={ex.id}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                    <div>
                      <div className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400">
                        {ex.label}
                      </div>
                      <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                        <MathProse text={ex.title} />
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {shownCount > 0 ? (
                        <button
                          type="button"
                          onClick={() => hideSteps(ex.id)}
                          className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                          Practice Hide
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => revealNextStep(ex.id, ex.steps.length)}
                          className="inline-flex items-center gap-1 rounded-lg bg-sky-600 px-3 py-1 text-xs font-medium text-white hover:bg-sky-700"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Step 1
                        </button>
                      )}
                      {!allShown && (
                        <>
                          {shownCount > 0 && (
                            <button
                              type="button"
                              onClick={() => revealNextStep(ex.id, ex.steps.length)}
                              className="rounded-lg bg-sky-600 px-2.5 py-1 text-xs font-medium text-white hover:bg-sky-700"
                            >
                              Next Step ({shownCount}/{ex.steps.length})
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => revealAllSteps(ex.id, ex.steps.length)}
                            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
                          >
                            Show All
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="rounded-lg bg-slate-50 p-3.5 text-sm font-medium text-slate-800 dark:bg-slate-800/50 dark:text-slate-200">
                    <MathProse text={ex.problem} />
                  </div>

                  {shownCount > 0 && (
                    <div className="space-y-2.5">
                      {ex.steps.slice(0, shownCount).map((step, sIdx) => (
                        <div
                          key={sIdx}
                          className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300"
                        >
                          <span className="mt-0.5 font-mono text-xs font-semibold text-slate-400">
                            {sIdx + 1}.
                          </span>
                          <div className="flex-1 min-w-0">
                            <MathProse text={step} />
                          </div>
                        </div>
                      ))}

                      {allShown && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-3.5 py-2.5 text-sm font-medium text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200">
                          <span className="font-mono text-xs font-bold mr-2">ANSWER:</span>
                          <MathProse text={ex.finalAnswer} className="inline-block" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Check Questions */}
        <section className="space-y-4">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Module Concept Check
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {module.quickCheck.map((q) => {
              const picked = selectedAnswers[q.id];
              const answered = picked !== undefined;
              const isCorrect = picked === q.correctIndex;

              return (
                <div
                  key={q.id}
                  className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900"
                >
                  <div className="text-sm font-medium text-slate-900 dark:text-white">
                    <MathProse text={q.prompt} />
                  </div>
                  <div className="space-y-1.5">
                    {q.options.map((opt, idx) => {
                      const isPicked = picked === idx;
                      const isRight = idx === q.correctIndex;
                      let style =
                        'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800';
                      if (answered) {
                        if (isRight) {
                          style =
                            'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200';
                        } else if (isPicked) {
                          style =
                            'border-red-500 bg-red-50 text-red-900 dark:border-red-600 dark:bg-red-950/40 dark:text-red-200';
                        }
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAnswers((p) => ({ ...p, [q.id]: idx }))}
                          className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${style}`}
                        >
                          <MathProse text={opt} />
                        </button>
                      );
                    })}
                  </div>
                  {answered && (
                    <div
                      className={`rounded-lg p-2.5 text-xs ${
                        isCorrect
                          ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/30 dark:text-emerald-300'
                          : 'bg-amber-50 text-amber-800 dark:bg-amber-950/30 dark:text-amber-300'
                      }`}
                    >
                      <div className="font-mono font-bold mb-0.5">
                        {isCorrect ? '✓ CORRECT' : '✕ REVIEW EXPLANATION'}
                      </div>
                      <MathProse text={q.explanation} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom Module Pagination */}
        <footer className="flex items-center justify-between gap-4 border-t border-slate-200 pt-6 dark:border-slate-800">
          {prevModule ? (
            <button
              type="button"
              onClick={() => onSelectModule(prevModule.id)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Module {prevModule.id}: {prevModule.shortTitle}
            </button>
          ) : (
            <div />
          )}

          {nextModule && (
            <button
              type="button"
              onClick={() => onSelectModule(nextModule.id)}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-700"
            >
              Module {nextModule.id}: {nextModule.shortTitle}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </footer>
      </div>
    </div>
  );
};

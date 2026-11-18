import React, { useState } from 'react';
import { CheckCircle2, Eye, HelpCircle, RotateCcw } from 'lucide-react';
import { TUTORIAL_EXERCISES } from '../data/courseData';
import { MathProse } from './MathText';

interface PracticeHubProps {
  solvedTutorials: number[];
  onToggleSolved: (id: number) => void;
  onJumpToModule: (moduleId: number) => void;
  onResetProgress: () => void;
}

export const PracticeHub: React.FC<PracticeHubProps> = ({
  solvedTutorials,
  onToggleSolved,
  onJumpToModule,
  onResetProgress,
}) => {
  const [topicFilter, setTopicFilter] = useState<string>('all');
  const [openHints, setOpenHints] = useState<Record<number, boolean>>({});
  const [openSolutions, setOpenSolutions] = useState<Record<number, boolean>>({});
  const [mcqPicks, setMcqPicks] = useState<Record<number, number>>({});

  const topics = ['all', ...Array.from(new Set(TUTORIAL_EXERCISES.map((t) => t.topic)))];

  const filtered =
    topicFilter === 'all'
      ? TUTORIAL_EXERCISES
      : TUTORIAL_EXERCISES.filter((t) => t.topic === topicFilter);

  const handleMcqPick = (probId: number, idx: number, correctIdx: number) => {
    setMcqPicks((prev) => ({ ...prev, [probId]: idx }));
    if (idx === correctIdx && !solvedTutorials.includes(probId)) {
      onToggleSolved(probId);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-6 dark:border-slate-800">
        <div className="space-y-2">
          <div className="text-xs font-mono font-semibold text-sky-700 dark:text-sky-400">
            MTH 101 · TUTORIAL WORKBOOK
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Tutorial &amp; Practice Exercises
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Work through all eight official tutorial problems across the syllabus. Reveal hints before checking full step-by-step derivations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-semibold text-slate-700 dark:text-slate-300">
            Solved: {solvedTutorials.length} / {TUTORIAL_EXERCISES.length}
          </span>
          <button
            type="button"
            onClick={onResetProgress}
            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset Progress
          </button>
        </div>
      </header>

      {/* Topic Filter Segmented Control */}
      <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
        {topics.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setTopicFilter(topic)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              topicFilter === topic
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {topic === 'all' ? 'All Topics (8)' : topic}
          </button>
        ))}
      </div>

      {/* Problem Cards */}
      <div className="space-y-5">
        {filtered.map((prob) => {
          const isSolved = solvedTutorials.includes(prob.id);
          const hintOpen = !!openHints[prob.id];
          const solOpen = !!openSolutions[prob.id];
          const picked = mcqPicks[prob.id];

          return (
            <article
              key={prob.id}
              className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-mono font-bold text-sky-700 dark:text-sky-400">
                    Exercise {prob.id}
                  </span>
                  <span aria-hidden="true">·</span>
                  <span className="font-medium text-slate-700 dark:text-slate-300">{prob.topic}</span>
                  <span aria-hidden="true">·</span>
                  <button
                    type="button"
                    onClick={() => onJumpToModule(prob.moduleId)}
                    className="text-sky-600 hover:underline dark:text-sky-400"
                  >
                    Module {prob.moduleId} Notes
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleSolved(prob.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${
                    isSolved
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800 dark:border-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                      : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400'
                  }`}
                >
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {isSolved ? 'Completed' : 'Mark Complete'}
                </button>
              </div>

              <div className="text-sm font-medium text-slate-900 dark:text-white">
                <MathProse text={prob.question} />
              </div>

              {/* Interactive Verification Check */}
              {prob.checkQuestion && (
                <div className="rounded-lg bg-slate-50 p-3.5 space-y-2.5 dark:bg-slate-800/50">
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <MathProse text={prob.checkQuestion.prompt} />
                  </div>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {prob.checkQuestion.options.map((opt, idx) => {
                      const answered = picked !== undefined;
                      const isPicked = picked === idx;
                      const isRight = idx === prob.checkQuestion!.correctIndex;
                      let cls =
                        'border-slate-200 bg-white text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300';
                      if (answered) {
                        if (isRight) {
                          cls =
                            'border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-200';
                        } else if (isPicked) {
                          cls =
                            'border-red-500 bg-red-50 text-red-900 dark:border-red-600 dark:bg-red-950/40 dark:text-red-200';
                        }
                      }
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() =>
                            handleMcqPick(prob.id, idx, prob.checkQuestion!.correctIndex)
                          }
                          className={`rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${cls}`}
                        >
                          <MathProse text={opt} />
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Hint & Solution Actions */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setOpenHints((p) => ({ ...p, [prob.id]: !p[prob.id] }))
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <HelpCircle className="h-3.5 w-3.5" />
                  {hintOpen ? 'Hide Hint' : 'Show Hint'}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setOpenSolutions((p) => ({ ...p, [prob.id]: !p[prob.id] }))
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
                >
                  <Eye className="h-3.5 w-3.5" />
                  {solOpen ? 'Hide Solution' : 'Reveal Full Solution'}
                </button>
              </div>

              {hintOpen && (
                <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                  <span className="font-mono font-bold mr-1.5">HINT:</span>
                  <MathProse text={prob.hint} className="inline-block" />
                </div>
              )}

              {solOpen && (
                <div className="space-y-2.5 rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/50">
                  <div className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                    STEP-BY-STEP SOLUTION
                  </div>
                  {prob.solutionSteps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                    >
                      <span className="mt-0.5 font-mono text-xs font-semibold text-slate-400">
                        {sIdx + 1}.
                      </span>
                      <div className="flex-1 min-w-0">
                        <MathProse text={step} />
                      </div>
                    </div>
                  ))}
                  <div className="mt-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200">
                    <span className="font-mono mr-2">FINAL ANSWER:</span>
                    <MathProse text={prob.answer} className="inline-block" />
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};

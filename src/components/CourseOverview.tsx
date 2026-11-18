import React from 'react';
import { ArrowRight, BookOpen, CheckCircle2, SlidersHorizontal } from 'lucide-react';
import {
  COURSE_METADATA,
  COURSE_MODULES,
  LEARNING_OUTCOMES,
  TEXTBOOKS,
} from '../data/courseData';
import { MathProse } from './MathText';

interface CourseOverviewProps {
  completedModules: number[];
  solvedTutorials: number[];
  onOpenModule: (moduleId: number, focusLab?: boolean) => void;
  onOpenPractice: () => void;
}

export const CourseOverview: React.FC<CourseOverviewProps> = ({
  completedModules,
  solvedTutorials,
  onOpenModule,
  onOpenPractice,
}) => {
  return (
    <div className="space-y-12">
      {/* Hero / Course Specification */}
      <section className="grid grid-cols-1 gap-8 border-b border-slate-200 pb-10 lg:grid-cols-12 lg:items-start dark:border-slate-800">
        <div className="lg:col-span-8 space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
              {COURSE_METADATA.code}
            </span>
            <span aria-hidden="true">·</span>
            <span>{COURSE_METADATA.creditUnits}</span>
            <span aria-hidden="true">·</span>
            <span>{COURSE_METADATA.lectureHours}</span>
          </div>

          <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-balance dark:text-white">
            {COURSE_METADATA.title}
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-slate-600 dark:text-slate-300">
            {COURSE_METADATA.overview}
          </p>

          <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
            Standard: {COURSE_METADATA.standard}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => onOpenModule(1, false)}
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-sky-700 whitespace-nowrap shrink-0"
            >
              <BookOpen className="h-4 w-4" />
              Start Module 1
            </button>
            <button
              type="button"
              onClick={() => onOpenModule(1, true)}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Explore Visual Labs
            </button>
          </div>
        </div>

        {/* Clean Progress Summary Card */}
        <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-display text-base font-semibold text-slate-900 dark:text-white">
            Study Progress
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Modules Studied</div>
              <div className="mt-1 font-mono text-2xl font-bold text-slate-900 dark:text-white">
                {completedModules.length}/9
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
              <div className="text-xs text-slate-500 dark:text-slate-400">Tutorials Solved</div>
              <div className="mt-1 font-mono text-2xl font-bold text-sky-700 dark:text-sky-400">
                {solvedTutorials.length}/8
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 pt-3 dark:border-slate-800">
            <button
              type="button"
              onClick={onOpenPractice}
              className="flex w-full items-center justify-between text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
            >
              <span>Open Tutorial &amp; Practice Exercises</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Course Learning Outcomes */}
      <section className="space-y-4">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Course Learning Outcomes
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          At the end of the course, students should be able to:
        </p>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {LEARNING_OUTCOMES.map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900"
            >
              <span className="font-mono text-xs font-bold text-sky-700 dark:text-sky-400 pt-0.5">
                0{index + 1}.
              </span>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {outcome}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 9-Module Lecture Plan */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
            Course Outline &amp; Lecture Plan (30 Hours)
          </h2>
          <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
            9 Modules · 15 Weeks
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COURSE_MODULES.map((mod) => {
            const isDone = completedModules.includes(mod.id);
            return (
              <div
                key={mod.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-colors hover:border-sky-300 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-sky-700"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
                      {mod.code} · {mod.weeks} · {mod.hours} LH
                    </span>
                    {isDone && (
                      <span className="inline-flex items-center gap-1 font-medium text-emerald-700 dark:text-emerald-400">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Studied
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white">
                    {mod.title}
                  </h3>

                  <div className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                    <MathProse text={mod.summary} />
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => onOpenModule(mod.id, false)}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300"
                  >
                    Read Notes
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenModule(mod.id, true)}
                    className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                  >
                    Open Lab
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recommended Textbooks / References */}
      <section className="space-y-4 border-t border-slate-200 pt-8 dark:border-slate-800">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Recommended Textbooks &amp; References
        </h2>
        <div className="divide-y divide-slate-200 rounded-xl border border-slate-200 bg-white dark:divide-slate-800 dark:border-slate-800 dark:bg-slate-900">
          {TEXTBOOKS.map((book) => (
            <div key={book.id} className="flex flex-wrap items-baseline justify-between gap-2 px-5 py-3.5 text-sm">
              <div>
                <span className="font-mono text-xs font-semibold text-slate-400 mr-3">
                  0{book.id}.
                </span>
                <span className="font-medium text-slate-900 dark:text-white">{book.authors}</span>{' '}
                <em className="text-slate-700 dark:text-slate-300">{book.title}</em>
              </div>
              <span className="text-xs text-slate-500 dark:text-slate-400">{book.publisher}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { COURSE_MODULES } from '../data/courseData';
import { MathProse } from './MathText';
import { ModuleLabHost } from './labs/ModuleLabHost';

interface LabsGalleryProps {
  onOpenModuleNotes: (moduleId: number) => void;
}

export const LabsGallery: React.FC<LabsGalleryProps> = ({ onOpenModuleNotes }) => {
  const [activeLabId, setActiveLabId] = useState<number>(1);
  const currentMod = COURSE_MODULES.find((m) => m.id === activeLabId) ?? COURSE_MODULES[0];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-semibold text-sky-700 dark:text-sky-400">
            INTERACTIVE MATHEMATICAL SIMULATIONS
          </div>
          <h1 className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            Visual Laboratories (Modules 1–9)
          </h1>
          <p className="max-w-2xl text-sm text-slate-600 dark:text-slate-400">
            Experiment directly with Venn operations, number classifications, induction chains, sequences, quadratics, binomial expansions, Argand vectors, De Moivre roots, and trigonometry.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenModuleNotes(currentMod.id)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-800 hover:bg-slate-50 whitespace-nowrap shrink-0 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          Read Module {currentMod.id} Notes
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </header>

      {/* Lab Selector Tabs */}
      <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
        {COURSE_MODULES.map((mod) => (
          <button
            key={mod.id}
            type="button"
            onClick={() => setActiveLabId(mod.id)}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              activeLabId === mod.id
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            {mod.id}. {mod.shortTitle}
          </button>
        ))}
      </div>

      {/* Active Lab Container */}
      <section className="rounded-xl border border-slate-200 bg-slate-50/60 p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="space-y-1">
          <h2 className="font-display text-lg font-bold text-slate-900 dark:text-white">
            {currentMod.code}: {currentMod.labTitle}
          </h2>
          <div className="text-xs text-slate-600 dark:text-slate-400">
            <MathProse text={currentMod.labDescription} />
          </div>
        </div>
        <ModuleLabHost moduleId={currentMod.id} />
      </section>
    </div>
  );
};

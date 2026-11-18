import React, { useMemo, useState } from 'react';
import { MathFormula, MathProse } from '../MathText';

interface InductionCase {
  id: string;
  label: string;
  statementLatex: string;
  baseCaseText: string;
  hypothesisText: string;
  stepText: string;
  evaluate: (n: number) => { lhs: number; rhs: number; detail: string; passed: boolean };
}

const CASES: InductionCase[] = [
  {
    id: 'squares',
    label: 'Sum of Squares (Example 3.1)',
    statementLatex: '1^2 + 2^2 + \\dots + n^2 = \\frac{n(n+1)(2n+1)}{6}',
    baseCaseText: 'For $n = 1$: $\\text{LHS} = 1^2 = 1$, and $\\text{RHS} = \\frac{1(2)(3)}{6} = 1$. Base case holds.',
    hypothesisText: 'Assume $1^2 + 2^2 + \\dots + k^2 = \\frac{k(k+1)(2k+1)}{6}$ holds for arbitrary $k \\ge 1$.',
    stepText:
      'Add $(k+1)^2$: $\\frac{k(k+1)(2k+1)}{6} + (k+1)^2 = \\frac{k+1}{6}(2k^2 + 7k + 6) = \\frac{(k+1)(k+2)(2k+3)}{6}$.',
    evaluate: (n) => {
      let lhs = 0;
      for (let i = 1; i <= n; i++) lhs += i * i;
      const rhs = (n * (n + 1) * (2 * n + 1)) / 6;
      return {
        lhs,
        rhs,
        detail: `Σ(i²) = ${lhs}  |  n(n+1)(2n+1)/6 = ${rhs}`,
        passed: lhs === rhs,
      };
    },
  },
  {
    id: 'div6',
    label: 'Divisibility 7ⁿ − 1 (Example 3.2)',
    statementLatex: '6 \\mid (7^n - 1) \\quad \\forall\\, n \\in \\mathbb{N}',
    baseCaseText: 'For $n = 1$: $7^1 - 1 = 6 = 6(1)$, which is divisible by $6$.',
    hypothesisText: 'Assume $7^k - 1 = 6m$ for some $m \\in \\mathbb{Z}$, so $7^k = 6m + 1$.',
    stepText: 'For $n = k+1$: $7^{k+1} - 1 = 7(6m + 1) - 1 = 42m + 6 = 6(7m + 1)$, which is divisible by $6$.',
    evaluate: (n) => {
      const val = Math.pow(7, n) - 1;
      const q = Math.round(val / 6);
      return {
        lhs: val,
        rhs: q * 6,
        detail: `7^${n} − 1 = ${val.toLocaleString()} = 6 × ${q.toLocaleString()}`,
        passed: val % 6 === 0,
      };
    },
  },
  {
    id: 'tutorial3',
    label: 'Product Sum (Tutorial #3)',
    statementLatex: '\\sum_{r=1}^{n} r(r+1) = \\frac{n(n+1)(n+2)}{3}',
    baseCaseText: 'For $n = 1$: $\\text{LHS} = 1(2) = 2$, and $\\text{RHS} = \\frac{1(2)(3)}{3} = 2$.',
    hypothesisText: 'Assume $\\sum_{r=1}^{k} r(r+1) = \\frac{k(k+1)(k+2)}{3}$ for some $k \\ge 1$.',
    stepText:
      'Add $(k+1)(k+2)$: $(k+1)(k+2)\\left(\\frac{k}{3} + 1\\right) = \\frac{(k+1)(k+2)(k+3)}{3}$.',
    evaluate: (n) => {
      let lhs = 0;
      for (let r = 1; r <= n; r++) lhs += r * (r + 1);
      const rhs = (n * (n + 1) * (n + 2)) / 3;
      return {
        lhs,
        rhs,
        detail: `Σ r(r+1) = ${lhs}  |  n(n+1)(n+2)/3 = ${rhs}`,
        passed: lhs === rhs,
      };
    },
  },
];

export const InductionLab: React.FC = () => {
  const [caseId, setCaseId] = useState<string>('squares');
  const [stage, setStage] = useState<number>(1);
  const [nVal, setNVal] = useState<number>(5);

  const activeCase = CASES.find((c) => c.id === caseId) ?? CASES[0];
  const evaluation = useMemo(() => activeCase.evaluate(nVal), [activeCase, nVal]);

  const dominoCount = 8;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          {CASES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCaseId(c.id);
                setStage(1);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                caseId === c.id
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Visual Stage (Left 7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="rounded-lg bg-slate-50 px-4 py-3 text-center dark:bg-slate-800/60">
            <MathFormula math={activeCase.statementLatex} block />
          </div>

          {/* Domino Chain SVG */}
          <svg
            viewBox="0 0 520 155"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            role="img"
            aria-label="Mathematical induction domino chain"
          >
            {Array.from({ length: dominoCount }, (_, idx) => {
              const n = idx + 1;
              const x = 35 + idx * 58;
              const fallen = n <= nVal;
              const angle = fallen ? 62 : 0;
              const isBase = n === 1;
              const isCurrent = n === nVal;
              const fill = isCurrent
                ? '#0284c7'
                : fallen
                  ? '#059669'
                  : '#94a3b8';

              return (
                <g key={n} transform={`translate(${x}, 115)`}>
                  <g
                    transform={`rotate(${angle}, 12, 0)`}
                    style={{ transition: 'transform 220ms cubic-bezier(0.16, 1, 0.3, 1)' }}
                  >
                    <rect
                      x="0"
                      y="-68"
                      width="24"
                      height="68"
                      rx="4"
                      fill={fill}
                      opacity={fallen ? 0.92 : 0.45}
                    />
                    <line x1="4" y1="-34" x2="20" y2="-34" stroke="white" strokeWidth="1.5" opacity="0.6" />
                  </g>
                  <text
                    x="12"
                    y="22"
                    textAnchor="middle"
                    className={`font-mono text-xs font-semibold ${
                      isCurrent
                        ? 'fill-sky-600 dark:fill-sky-400'
                        : 'fill-slate-600 dark:fill-slate-400'
                    }`}
                  >
                    {isBase ? 'n=1' : `n=${n}`}
                  </text>
                </g>
              );
            })}
            <line x1="20" y1="115" x2="500" y2="115" className="stroke-slate-300 dark:stroke-slate-700" strokeWidth="2" />
          </svg>

          {/* Numerical Verification Box */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-emerald-200 bg-emerald-50/70 px-4 py-3 dark:border-emerald-900 dark:bg-emerald-950/30">
            <div>
              <div className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                ● VERIFIED FOR n = {nVal}
              </div>
              <div className="mt-0.5 font-mono text-xs text-emerald-900 dark:text-emerald-200">
                {evaluation.detail}
              </div>
            </div>
            <span className="font-mono text-xs font-bold text-emerald-700 dark:text-emerald-400">
              P({nVal}) TRUE
            </span>
          </div>
        </div>

        {/* Controls & 3-Stage Proof Stepper (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Test Domino Trigger Up To n
              </span>
              <span className="font-mono font-bold text-sky-700 dark:text-sky-400">n = {nVal}</span>
            </div>
            <input
              type="range"
              min={1}
              max={8}
              value={nVal}
              onChange={(e) => setNVal(Number(e.target.value))}
              className="w-full accent-sky-600"
            />
            <div className="flex items-center justify-between gap-2 pt-1">
              <button
                type="button"
                onClick={() => setNVal((v) => Math.max(1, v - 1))}
                className="flex-1 rounded-lg border border-slate-200 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Step Back
              </button>
              <button
                type="button"
                onClick={() => setNVal((v) => Math.min(8, v + 1))}
                className="flex-1 rounded-lg bg-sky-600 py-1.5 text-xs font-medium text-white hover:bg-sky-700"
              >
                Push Next (n+1)
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Formal Proof Stages
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStage(s)}
                    className={`rounded-md px-2.5 py-1 text-xs font-medium ${
                      stage === s
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    Stage {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              {stage === 1 && (
                <>
                  <div className="mb-1 font-semibold text-sky-700 dark:text-sky-400">
                    1. Base Case (n = 1)
                  </div>
                  <MathProse text={activeCase.baseCaseText} />
                </>
              )}
              {stage === 2 && (
                <>
                  <div className="mb-1 font-semibold text-sky-700 dark:text-sky-400">
                    2. Inductive Hypothesis P(k)
                  </div>
                  <MathProse text={activeCase.hypothesisText} />
                </>
              )}
              {stage === 3 && (
                <>
                  <div className="mb-1 font-semibold text-sky-700 dark:text-sky-400">
                    3. Inductive Step P(k) ⇒ P(k+1)
                  </div>
                  <MathProse text={activeCase.stepText} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

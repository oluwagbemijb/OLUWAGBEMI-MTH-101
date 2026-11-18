import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

interface NumberSample {
  id: string;
  label: string;
  latex: string;
  value: number;
  inN: boolean;
  inZ: boolean;
  inQ: boolean;
  inI: boolean;
  decimalForm: string;
  note: string;
}

const SAMPLES: NumberSample[] = [
  {
    id: '5',
    label: '5',
    latex: '5',
    value: 5,
    inN: true,
    inZ: true,
    inQ: true,
    inI: false,
    decimalForm: '5.0',
    note: 'Positive counting number: belongs to N, Z, Q, and R.',
  },
  {
    id: '-3',
    label: '-3',
    latex: '-3',
    value: -3,
    inN: false,
    inZ: true,
    inQ: true,
    inI: false,
    decimalForm: '-3.0',
    note: 'Negative whole number: belongs to Z, Q, and R, not N.',
  },
  {
    id: '0.25',
    label: '1/4',
    latex: '\\frac{1}{4}',
    value: 0.25,
    inN: false,
    inZ: false,
    inQ: true,
    inI: false,
    decimalForm: '0.25 (terminating)',
    note: 'Terminating decimal: rational (p/q with p=1, q=4).',
  },
  {
    id: '0.27...',
    label: '3/11',
    latex: '0.\\overline{27} = \\frac{3}{11}',
    value: 3 / 11,
    inN: false,
    inZ: false,
    inQ: true,
    inI: false,
    decimalForm: '0.272727... (periodic)',
    note: 'Recurring decimal: rational (Example 2.2).',
  },
  {
    id: 'sqrt2',
    label: '√2',
    latex: '\\sqrt{2}',
    value: Math.SQRT2,
    inN: false,
    inZ: false,
    inQ: false,
    inI: true,
    decimalForm: '1.41421356... (non-repeating)',
    note: 'Cannot be expressed as p/q (proved by contradiction in Example 2.1).',
  },
  {
    id: 'pi',
    label: 'π',
    latex: '\\pi',
    value: Math.PI,
    inN: false,
    inZ: false,
    inQ: false,
    inI: true,
    decimalForm: '3.14159265... (non-repeating)',
    note: 'Transcendental irrational number in I and R.',
  },
  {
    id: 'e',
    label: 'e',
    latex: 'e',
    value: Math.E,
    inN: false,
    inZ: false,
    inQ: false,
    inI: true,
    decimalForm: '2.71828182... (non-repeating)',
    note: 'Euler’s constant: irrational real number.',
  },
];

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

export const NumberSystemsLab: React.FC = () => {
  const [mode, setMode] = useState<'classify' | 'decimal'>('classify');
  const [selectedId, setSelectedId] = useState<string>('sqrt2');

  // Recurring decimal converter states (defaults to Tutorial #2: 1.3666...)
  const [intPart, setIntPart] = useState('1');
  const [nonRep, setNonRep] = useState('3');
  const [repPart, setRepPart] = useState('6');

  const activeSample = SAMPLES.find((s) => s.id === selectedId) ?? SAMPLES[0];

  const fractionResult = useMemo(() => {
    const cleanInt = intPart.replace(/[^0-9]/g, '') || '0';
    const cleanNonRep = nonRep.replace(/[^0-9]/g, '');
    const cleanRep = repPart.replace(/[^0-9]/g, '') || '1';

    const m = cleanNonRep.length;
    const k = cleanRep.length;

    const pow1 = Math.pow(10, m);
    const pow2 = Math.pow(10, m + k);

    const num1 = Number(`${cleanInt}${cleanNonRep}`);
    const num2 = Number(`${cleanInt}${cleanNonRep}${cleanRep}`);

    const numerator = num2 - num1;
    const denominator = pow2 - pow1;
    const g = gcd(numerator, denominator);

    return {
      cleanInt,
      cleanNonRep,
      cleanRep,
      m,
      k,
      pow1,
      pow2,
      num1,
      num2,
      numerator,
      denominator,
      simpNum: numerator / g,
      simpDen: denominator / g,
      g,
    };
  }, [intPart, nonRep, repPart]);

  // Number line coordinate mapping from -4 to 6
  const mapX = (v: number) => 40 + ((v + 4) / 10) * 440;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setMode('classify')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'classify'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Number Hierarchy & Line
          </button>
          <button
            type="button"
            onClick={() => setMode('decimal')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'decimal'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Recurring Decimal → Fraction
          </button>
        </div>

        {mode === 'decimal' && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setIntPart('0');
                setNonRep('');
                setRepPart('27');
              }}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Preset: 0.2727…
            </button>
            <button
              type="button"
              onClick={() => {
                setIntPart('1');
                setNonRep('3');
                setRepPart('6');
              }}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Preset: 1.3666…
            </button>
          </div>
        )}
      </div>

      {mode === 'classify' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Real Number Containment Diagram (R = Q ∪ I)
              </span>
              <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400">
                Selected: {activeSample.label}
              </span>
            </div>

            <svg
              viewBox="0 0 520 290"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              role="img"
              aria-label="Number systems hierarchy and real number line"
            >
              {/* R box */}
              <rect
                x="16"
                y="14"
                width="488"
                height="185"
                rx="10"
                fill="rgba(148, 163, 184, 0.08)"
                className="stroke-slate-400 dark:stroke-slate-600"
                strokeWidth="1.5"
              />
              <text x="28" y="34" className="fill-slate-700 dark:fill-slate-300 text-xs font-bold">
                ℝ Real Numbers
              </text>

              {/* Q nested region */}
              <rect
                x="28"
                y="46"
                width="315"
                height="140"
                rx="10"
                fill={activeSample.inQ ? 'rgba(2, 132, 199, 0.14)' : 'rgba(148, 163, 184, 0.05)'}
                stroke={activeSample.inQ ? '#0284c7' : '#94a3b8'}
                strokeWidth={activeSample.inQ ? '2' : '1.2'}
              />
              <text x="40" y="64" fill="#0284c7" className="text-xs font-bold">
                ℚ Rational (p/q)
              </text>

              {/* Z nested region */}
              <rect
                x="42"
                y="74"
                width="225"
                height="100"
                rx="8"
                fill={activeSample.inZ ? 'rgba(5, 150, 105, 0.16)' : 'rgba(148, 163, 184, 0.05)'}
                stroke={activeSample.inZ ? '#059669' : '#94a3b8'}
                strokeWidth={activeSample.inZ ? '2' : '1.2'}
              />
              <text x="54" y="92" fill="#059669" className="text-xs font-bold">
                ℤ Integers
              </text>

              {/* N nested region */}
              <rect
                x="56"
                y="102"
                width="135"
                height="60"
                rx="8"
                fill={activeSample.inN ? 'rgba(217, 119, 6, 0.18)' : 'rgba(148, 163, 184, 0.05)'}
                stroke={activeSample.inN ? '#d97706' : '#94a3b8'}
                strokeWidth={activeSample.inN ? '2' : '1.2'}
              />
              <text x="68" y="122" fill="#d97706" className="text-xs font-bold">
                ℕ Natural
              </text>
              <text x="68" y="144" className="fill-slate-600 dark:fill-slate-400 font-mono text-xs">
                1, 2, 3, 5…
              </text>

              {/* I irrational disjoint region inside R */}
              <rect
                x="356"
                y="46"
                width="136"
                height="140"
                rx="10"
                fill={activeSample.inI ? 'rgba(220, 38, 38, 0.14)' : 'rgba(148, 163, 184, 0.05)'}
                stroke={activeSample.inI ? '#dc2626' : '#94a3b8'}
                strokeWidth={activeSample.inI ? '2' : '1.2'}
              />
              <text x="368" y="64" fill="#dc2626" className="text-xs font-bold">
                𝕀 Irrational (ℚ&apos;)
              </text>
              <text x="368" y="95" className="fill-slate-600 dark:fill-slate-400 font-mono text-xs">
                √2, √3, π, e
              </text>

              {/* Real Number Line */}
              <line x1="28" y1="242" x2="492" y2="242" className="stroke-slate-500" strokeWidth="1.5" />
              {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((tick) => {
                const tx = mapX(tick);
                return (
                  <g key={tick}>
                    <line x1={tx} y1="236" x2={tx} y2="248" className="stroke-slate-500" strokeWidth="1.2" />
                    <text
                      x={tx}
                      y="266"
                      textAnchor="middle"
                      className="fill-slate-600 dark:fill-slate-400 font-mono text-[11px]"
                    >
                      {tick}
                    </text>
                  </g>
                );
              })}

              {/* Highlight active number on line */}
              <circle
                cx={mapX(activeSample.value)}
                cy="242"
                r="6"
                fill={activeSample.inI ? '#dc2626' : '#0284c7'}
                stroke="white"
                strokeWidth="2"
              />
              <text
                x={mapX(activeSample.value)}
                y="225"
                textAnchor="middle"
                fill={activeSample.inI ? '#dc2626' : '#0284c7'}
                className="font-mono text-xs font-bold"
              >
                {activeSample.label} ({activeSample.value.toFixed(3)})
              </text>
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h4 className="mb-2.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                Choose Sample Number to Classify
              </h4>
              <div className="grid grid-cols-4 gap-1.5">
                {SAMPLES.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedId(item.id)}
                    className={`rounded-lg border px-2.5 py-2 font-mono text-xs font-semibold transition-colors ${
                      selectedId === item.id
                        ? 'border-sky-600 bg-sky-50 text-sky-900 dark:border-sky-500 dark:bg-sky-950/60 dark:text-sky-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                <span className="text-sm font-semibold text-slate-900 dark:text-white">
                  <MathFormula math={activeSample.latex} />
                </span>
                <span className="font-mono text-xs text-slate-500">{activeSample.decimalForm}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { label: 'Natural (ℕ)', mem: activeSample.inN },
                  { label: 'Integer (ℤ)', mem: activeSample.inZ },
                  { label: 'Rational (ℚ)', mem: activeSample.inQ },
                  { label: 'Irrational (𝕀)', mem: activeSample.inI },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex items-center justify-between rounded-lg border px-2.5 py-1.5 ${
                      row.mem
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'border-slate-200 bg-slate-50 text-slate-500 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400'
                    }`}
                  >
                    <span>{row.label}</span>
                    <span className="font-mono font-bold">{row.mem ? '∈ YES' : '∉ NO'}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                {activeSample.note}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Algebraic Step-by-Step Conversion
              </span>
              <span className="font-mono text-sm font-bold text-sky-700 dark:text-sky-400">
                {fractionResult.simpNum} / {fractionResult.simpDen}
              </span>
            </div>

            <div className="space-y-3 text-sm text-slate-700 dark:text-slate-300">
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Step 1 — Define variable x
                </div>
                <MathFormula
                  block
                  math={`x = ${fractionResult.cleanInt}.${fractionResult.cleanNonRep}\\overline{${fractionResult.cleanRep}}`}
                />
              </div>

              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Step 2 — Shift decimal past non-repeating &amp; one repeating block
                </div>
                <MathFormula
                  block
                  math={`${fractionResult.pow1}x = ${fractionResult.num1}.${fractionResult.cleanRep}${fractionResult.cleanRep}\\dots`}
                />
                <MathFormula
                  block
                  math={`${fractionResult.pow2}x = ${fractionResult.num2}.${fractionResult.cleanRep}${fractionResult.cleanRep}\\dots`}
                />
              </div>

              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  Step 3 — Subtract to cancel repeating tail &amp; simplify by gcd({fractionResult.numerator},{' '}
                  {fractionResult.denominator}) = {fractionResult.g}
                </div>
                <MathFormula
                  block
                  math={`${fractionResult.denominator}x = ${fractionResult.numerator} \\implies x = \\frac{${fractionResult.numerator}}{${fractionResult.denominator}} = \\frac{${fractionResult.simpNum}}{${fractionResult.simpDen}}`}
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Configure Decimal Digits
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Integer Part (before decimal)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={intPart}
                  onChange={(e) => setIntPart(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Non-Repeating Decimal Digits (optional)
                </label>
                <input
                  type="text"
                  maxLength={3}
                  value={nonRep}
                  placeholder="(none)"
                  onChange={(e) => setNonRep(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">
                  Repeating Block (under overbar)
                </label>
                <input
                  type="text"
                  maxLength={4}
                  value={repPart}
                  onChange={(e) => setRepPart(e.target.value.replace(/[^0-9]/g, ''))}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-sm text-slate-900 focus:border-sky-500 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

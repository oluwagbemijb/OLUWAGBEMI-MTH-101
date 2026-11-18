import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

type SetOp =
  | 'union'
  | 'intersection'
  | 'diffAB'
  | 'diffBA'
  | 'symDiff'
  | 'compA'
  | 'demorganUnion'
  | 'demorganInter';

const UNIVERSE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const DEFAULT_A = [2, 4, 6, 8, 10];
const DEFAULT_B = [1, 2, 3, 4, 5];

const OPERATIONS: { id: SetOp; label: string; latex: string; desc: string }[] = [
  { id: 'union', label: 'A ∪ B', latex: 'A \\cup B', desc: 'Elements in A or B (or both)' },
  { id: 'intersection', label: 'A ∩ B', latex: 'A \\cap B', desc: 'Elements common to both A and B' },
  { id: 'diffAB', label: 'A − B', latex: 'A - B', desc: 'Elements in A only (not in B)' },
  { id: 'diffBA', label: 'B − A', latex: 'B - A', desc: 'Elements in B only (not in A)' },
  { id: 'symDiff', label: 'A Δ B', latex: 'A \\Delta B', desc: 'Elements in A or B, but not both' },
  { id: 'compA', label: "A'", latex: "A'", desc: 'Elements in U outside A' },
  {
    id: 'demorganUnion',
    label: "(A ∪ B)' = A' ∩ B'",
    latex: "(A \\cup B)' = A' \\cap B'",
    desc: 'De Morgan I: Outside both A and B',
  },
  {
    id: 'demorganInter',
    label: "(A ∩ B)' = A' ∪ B'",
    latex: "(A \\cap B)' = A' \\cup B'",
    desc: 'De Morgan II: Everywhere except A ∩ B',
  },
];

export const SetTheoryLab: React.FC = () => {
  const [mode, setMode] = useState<'algebra' | 'survey'>('algebra');
  const [op, setOp] = useState<SetOp>('demorganUnion');
  const [setA, setSetA] = useState<number[]>(DEFAULT_A);
  const [setB, setSetB] = useState<number[]>(DEFAULT_B);

  // 3-Set Survey (defaults to Worked Example 1.1)
  const [totalU, setTotalU] = useState(60);
  const [nP, setNP] = useState(30);
  const [nC, setNC] = useState(25);
  const [nB, setNB] = useState(20);
  const [nPC, setNPC] = useState(12);
  const [nPB, setNPB] = useState(10);
  const [nCB, setNCB] = useState(8);
  const [nPCB, setNPCB] = useState(5);

  const toggleInSet = (el: number, target: 'A' | 'B') => {
    if (target === 'A') {
      setSetA((prev) =>
        prev.includes(el) ? prev.filter((x) => x !== el) : [...prev, el].sort((a, b) => a - b)
      );
    } else {
      setSetB((prev) =>
        prev.includes(el) ? prev.filter((x) => x !== el) : [...prev, el].sort((a, b) => a - b)
      );
    }
  };

  const regionMembership = useMemo(() => {
    const onlyA = UNIVERSE.filter((x) => setA.includes(x) && !setB.includes(x));
    const both = UNIVERSE.filter((x) => setA.includes(x) && setB.includes(x));
    const onlyB = UNIVERSE.filter((x) => !setA.includes(x) && setB.includes(x));
    const neither = UNIVERSE.filter((x) => !setA.includes(x) && !setB.includes(x));
    return { onlyA, both, onlyB, neither };
  }, [setA, setB]);

  const activeRegions = useMemo(() => {
    switch (op) {
      case 'union':
        return { onlyA: true, both: true, onlyB: true, outside: false };
      case 'intersection':
        return { onlyA: false, both: true, onlyB: false, outside: false };
      case 'diffAB':
        return { onlyA: true, both: false, onlyB: false, outside: false };
      case 'diffBA':
        return { onlyA: false, both: false, onlyB: true, outside: false };
      case 'symDiff':
        return { onlyA: true, both: false, onlyB: true, outside: false };
      case 'compA':
        return { onlyA: false, both: false, onlyB: true, outside: true };
      case 'demorganUnion':
        return { onlyA: false, both: false, onlyB: false, outside: true };
      case 'demorganInter':
        return { onlyA: true, both: false, onlyB: true, outside: true };
    }
  }, [op]);

  const resultElements = useMemo(() => {
    const res: number[] = [];
    if (activeRegions.onlyA) res.push(...regionMembership.onlyA);
    if (activeRegions.both) res.push(...regionMembership.both);
    if (activeRegions.onlyB) res.push(...regionMembership.onlyB);
    if (activeRegions.outside) res.push(...regionMembership.neither);
    return res.sort((a, b) => a - b);
  }, [activeRegions, regionMembership]);

  const surveyCalc = useMemo(() => {
    const unionAll = nP + nC + nB - nPC - nPB - nCB + nPCB;
    const onlyPC = nPC - nPCB;
    const onlyPB = nPB - nPCB;
    const onlyCB = nCB - nPCB;
    const onlyP = nP - onlyPC - onlyPB - nPCB;
    const onlyC = nC - onlyPC - onlyCB - nPCB;
    const onlyB = nB - onlyPB - onlyCB - nPCB;
    const none = totalU - unionAll;
    const valid =
      onlyP >= 0 &&
      onlyC >= 0 &&
      onlyB >= 0 &&
      onlyPC >= 0 &&
      onlyPB >= 0 &&
      onlyCB >= 0 &&
      none >= 0;
    return { unionAll, onlyPC, onlyPB, onlyCB, onlyP, onlyC, onlyB, none, valid };
  }, [totalU, nP, nC, nB, nPC, nPB, nCB, nPCB]);

  const activeOpObj = OPERATIONS.find((o) => o.id === op)!;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setMode('algebra')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'algebra'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            2-Set Algebra & De Morgan
          </button>
          <button
            type="button"
            onClick={() => setMode('survey')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'survey'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            3-Set Survey (Example 1.1)
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            if (mode === 'algebra') {
              setSetA(DEFAULT_A);
              setSetB(DEFAULT_B);
              setOp('demorganUnion');
            } else {
              setTotalU(60);
              setNP(30);
              setNC(25);
              setNB(20);
              setNPC(12);
              setNPB(10);
              setNCB(8);
              setNPCB(5);
            }
          }}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          Reset Defaults
        </button>
      </div>

      {mode === 'algebra' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Interactive Venn Canvas (Left 7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="text-sm font-medium text-slate-700 dark:text-slate-300">
                <MathFormula math={activeOpObj.latex} /> — {activeOpObj.desc}
              </div>
              <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                n(Result) = {resultElements.length}
              </span>
            </div>

            <svg
              viewBox="0 0 520 300"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              role="img"
              aria-label="Interactive two-set Venn diagram"
            >
              <defs>
                <clipPath id="clipCircleA">
                  <circle cx="205" cy="150" r="95" />
                </clipPath>
                <clipPath id="clipCircleB">
                  <circle cx="315" cy="150" r="95" />
                </clipPath>
                <mask id="maskOutside">
                  <rect x="0" y="0" width="520" height="300" fill="white" />
                  <circle cx="205" cy="150" r="95" fill="black" />
                  <circle cx="315" cy="150" r="95" fill="black" />
                </mask>
                <mask id="maskOnlyA">
                  <rect x="0" y="0" width="520" height="300" fill="white" />
                  <circle cx="315" cy="150" r="95" fill="black" />
                </mask>
                <mask id="maskOnlyB">
                  <rect x="0" y="0" width="520" height="300" fill="white" />
                  <circle cx="205" cy="150" r="95" fill="black" />
                </mask>
              </defs>

              {/* Universe outside region */}
              {activeRegions.outside && (
                <rect
                  x="12"
                  y="12"
                  width="496"
                  height="276"
                  rx="10"
                  fill="rgba(2, 132, 199, 0.18)"
                  mask="url(#maskOutside)"
                />
              )}

              {/* Only A */}
              {activeRegions.onlyA && (
                <circle
                  cx="205"
                  cy="150"
                  r="95"
                  fill="rgba(2, 132, 199, 0.25)"
                  mask="url(#maskOnlyA)"
                />
              )}

              {/* Only B */}
              {activeRegions.onlyB && (
                <circle
                  cx="315"
                  cy="150"
                  r="95"
                  fill="rgba(2, 132, 199, 0.25)"
                  mask="url(#maskOnlyB)"
                />
              )}

              {/* Intersection A and B */}
              {activeRegions.both && (
                <g clipPath="url(#clipCircleA)">
                  <circle cx="315" cy="150" r="95" fill="rgba(2, 132, 199, 0.36)" />
                </g>
              )}

              {/* Universe Border */}
              <rect
                x="12"
                y="12"
                width="496"
                height="276"
                rx="10"
                fill="none"
                className="stroke-slate-400 dark:stroke-slate-600"
                strokeWidth="1.5"
              />
              <text
                x="26"
                y="34"
                className="fill-slate-700 dark:fill-slate-300 font-mono text-xs font-semibold"
              >
                U = {'{1..10}'}
              </text>

              {/* Circle Outlines */}
              <circle
                cx="205"
                cy="150"
                r="95"
                fill="none"
                stroke="#0284c7"
                strokeWidth="2"
              />
              <circle
                cx="315"
                cy="150"
                r="95"
                fill="none"
                stroke="#059669"
                strokeWidth="2"
              />

              {/* Set Labels */}
              <text x="145" y="45" fill="#0284c7" className="text-sm font-bold">
                Set A
              </text>
              <text x="345" y="45" fill="#059669" className="text-sm font-bold">
                Set B
              </text>

              {/* Elements inside regions */}
              <text
                x="152"
                y="148"
                textAnchor="middle"
                className="fill-slate-900 dark:fill-slate-100 font-mono text-xs font-semibold"
              >
                {regionMembership.onlyA.length ? regionMembership.onlyA.join(', ') : '∅'}
              </text>
              <text
                x="260"
                y="148"
                textAnchor="middle"
                className="fill-slate-900 dark:fill-slate-100 font-mono text-xs font-semibold"
              >
                {regionMembership.both.length ? regionMembership.both.join(', ') : '∅'}
              </text>
              <text
                x="368"
                y="148"
                textAnchor="middle"
                className="fill-slate-900 dark:fill-slate-100 font-mono text-xs font-semibold"
              >
                {regionMembership.onlyB.length ? regionMembership.onlyB.join(', ') : '∅'}
              </text>
              <text
                x="480"
                y="272"
                textAnchor="end"
                className="fill-slate-700 dark:fill-slate-300 font-mono text-xs font-semibold"
              >
                Outside: {regionMembership.neither.length ? regionMembership.neither.join(', ') : '∅'}
              </text>
            </svg>

            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 px-3 py-2 text-xs dark:bg-slate-800/60">
              <span className="font-medium text-slate-600 dark:text-slate-300">
                Highlighted Roster:
              </span>
              <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
                {resultElements.length ? `{ ${resultElements.join(', ')} }` : '∅ (Empty Set)'}
              </span>
            </div>
          </div>

          {/* Controls Deck (Right 5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
              <h4 className="mb-2.5 text-xs font-semibold tracking-wide text-slate-500 dark:text-slate-400">
                Select Set Operation or Law
              </h4>
              <div className="grid grid-cols-2 gap-1.5">
                {OPERATIONS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setOp(item.id)}
                    className={`rounded-lg border px-2.5 py-2 text-left text-xs font-medium transition-colors whitespace-nowrap truncate ${
                      op === item.id
                        ? 'border-sky-600 bg-sky-50 text-sky-900 dark:border-sky-500 dark:bg-sky-950/60 dark:text-sky-200'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                  Toggle Elements in Set A (n = {setA.length})
                </h4>
                <span className="font-mono text-xs text-slate-500">
                  |P(A)| = {Math.pow(2, setA.length)}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {UNIVERSE.map((n) => (
                  <button
                    key={`A-${n}`}
                    type="button"
                    onClick={() => toggleInSet(n, 'A')}
                    className={`rounded-md py-1.5 font-mono text-xs font-medium transition-colors ${
                      setA.includes(n)
                        ? 'bg-sky-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                  Toggle Elements in Set B (n = {setB.length})
                </h4>
                <span className="font-mono text-xs text-slate-500">
                  |P(B)| = {Math.pow(2, setB.length)}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1.5">
                {UNIVERSE.map((n) => (
                  <button
                    key={`B-${n}`}
                    type="button"
                    onClick={() => toggleInSet(n, 'B')}
                    className={`rounded-md py-1.5 font-mono text-xs font-medium transition-colors ${
                      setB.includes(n)
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                3-Subject Survey Venn Diagram
              </span>
              <span
                className={`font-mono text-xs font-semibold ${
                  surveyCalc.valid
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {surveyCalc.valid ? '● CONSISTENT COUNTS' : '▲ CHECK OVERLAP CONSTRAINTS'}
              </span>
            </div>

            <svg
              viewBox="0 0 520 330"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              role="img"
              aria-label="Three-set inclusion-exclusion Venn diagram"
            >
              <rect
                x="14"
                y="14"
                width="492"
                height="302"
                rx="10"
                fill="none"
                className="stroke-slate-400 dark:stroke-slate-600"
                strokeWidth="1.5"
              />
              <text
                x="28"
                y="36"
                className="fill-slate-700 dark:fill-slate-300 font-mono text-xs font-semibold"
              >
                n(U) = {totalU}
              </text>

              {/* Circles P (top-left), C (top-right), B (bottom) */}
              <circle
                cx="215"
                cy="135"
                r="82"
                fill="rgba(2, 132, 199, 0.14)"
                stroke="#0284c7"
                strokeWidth="2"
              />
              <circle
                cx="305"
                cy="135"
                r="82"
                fill="rgba(5, 150, 105, 0.14)"
                stroke="#059669"
                strokeWidth="2"
              />
              <circle
                cx="260"
                cy="210"
                r="82"
                fill="rgba(217, 119, 6, 0.14)"
                stroke="#d97706"
                strokeWidth="2"
              />

              {/* Set Titles */}
              <text x="132" y="72" fill="#0284c7" className="text-xs font-bold">
                Physics ({nP})
              </text>
              <text x="328" y="72" fill="#059669" className="text-xs font-bold">
                Chemistry ({nC})
              </text>
              <text x="260" y="306" textAnchor="middle" fill="#d97706" className="text-xs font-bold">
                Biology ({nB})
              </text>

              {/* Region Counts */}
              <text x="175" y="122" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-sm font-bold">
                {surveyCalc.onlyP}
              </text>
              <text x="345" y="122" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-sm font-bold">
                {surveyCalc.onlyC}
              </text>
              <text x="260" y="255" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-sm font-bold">
                {surveyCalc.onlyB}
              </text>
              <text x="260" y="114" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-xs font-semibold">
                {surveyCalc.onlyPC}
              </text>
              <text x="216" y="188" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-xs font-semibold">
                {surveyCalc.onlyPB}
              </text>
              <text x="304" y="188" textAnchor="middle" className="fill-slate-900 dark:fill-slate-100 font-mono text-xs font-semibold">
                {surveyCalc.onlyCB}
              </text>
              <text x="260" y="164" textAnchor="middle" className="fill-slate-900 dark:fill-white font-mono text-sm font-bold">
                {nPCB}
              </text>
              <text x="488" y="298" textAnchor="end" className="fill-slate-700 dark:fill-slate-300 font-mono text-xs font-semibold">
                None: {surveyCalc.none}
              </text>
            </svg>

            <div className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <MathFormula
                math={`n(P\\cup C\\cup B) = ${nP} + ${nC} + ${nB} - ${nPC} - ${nPB} - ${nCB} + ${nPCB} = ${surveyCalc.unionAll} \\implies \\text{None} = ${totalU} - ${surveyCalc.unionAll} = ${surveyCalc.none}`}
              />
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Adjust Survey Cardinalities
            </h4>
            {[
              { label: 'Total Survey n(U)', val: totalU, set: setTotalU, min: 20, max: 120 },
              { label: 'Physics n(P)', val: nP, set: setNP, min: 5, max: 60 },
              { label: 'Chemistry n(C)', val: nC, set: setNC, min: 5, max: 60 },
              { label: 'Biology n(B)', val: nB, set: setNB, min: 5, max: 60 },
              { label: 'P ∩ C', val: nPC, set: setNPC, min: 0, max: 30 },
              { label: 'P ∩ B', val: nPB, set: setNPB, min: 0, max: 30 },
              { label: 'C ∩ B', val: nCB, set: setNCB, min: 0, max: 30 },
              { label: 'All Three (P ∩ C ∩ B)', val: nPCB, set: setNPCB, min: 0, max: 20 },
            ].map((ctrl) => (
              <div key={ctrl.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {ctrl.label}
                  </span>
                  <span className="font-mono font-semibold text-slate-900 dark:text-white">
                    {ctrl.val}
                  </span>
                </div>
                <input
                  type="range"
                  min={ctrl.min}
                  max={ctrl.max}
                  value={ctrl.val}
                  onChange={(e) => ctrl.set(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

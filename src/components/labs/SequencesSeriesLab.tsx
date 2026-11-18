import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

export const SequencesSeriesLab: React.FC = () => {
  const [kind, setKind] = useState<'AP' | 'GP'>('GP');
  // AP parameters (defaults to Example 4.1: a=5, d=3, n=10)
  const [apA, setApA] = useState(5);
  const [apD, setApD] = useState(3);
  const [apN, setApN] = useState(10);

  // GP parameters (defaults to Example 4.2: a=12, r=1/3, n=8)
  const [gpA, setGpA] = useState(12);
  const [gpR, setGpR] = useState(0.3333);
  const [gpN, setGpN] = useState(8);

  const data = useMemo(() => {
    const count = kind === 'AP' ? apN : gpN;
    const terms: { k: number; t: number; s: number }[] = [];
    let running = 0;

    for (let k = 1; k <= count; k++) {
      const t =
        kind === 'AP' ? apA + (k - 1) * apD : gpA * Math.pow(gpR, k - 1);
      running += t;
      terms.push({ k, t, s: running });
    }

    const last = terms[terms.length - 1] ?? { t: 0, s: 0 };
    const converges = kind === 'GP' && Math.abs(gpR) < 1;
    const sInf = converges ? gpA / (1 - gpR) : null;

    const allVals = [
      0,
      ...terms.map((x) => x.t),
      ...terms.map((x) => x.s),
      ...(sInf !== null ? [sInf] : []),
    ];
    const minVal = Math.min(...allVals);
    const maxVal = Math.max(...allVals);
    const span = maxVal - minVal || 1;

    return { terms, lastT: last.t, lastS: last.s, converges, sInf, minVal, maxVal, span };
  }, [kind, apA, apD, apN, gpA, gpR, gpN]);

  const toY = (val: number) => {
    const padTop = 26;
    const height = 210;
    return padTop + ((data.maxVal - val) / data.span) * height;
  };

  const zeroY = toY(0);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setKind('AP')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              kind === 'AP'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Arithmetic Progression (AP)
          </button>
          <button
            type="button"
            onClick={() => setKind('GP')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              kind === 'GP'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Geometric Progression (GP)
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              if (kind === 'AP') {
                setApA(5);
                setApD(3);
                setApN(10);
              } else {
                setGpA(12);
                setGpR(1 / 3);
                setGpN(8);
              }
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            {kind === 'AP' ? 'Preset: Example 4.1' : 'Preset: Example 4.2'}
          </button>
          {kind === 'GP' && (
            <button
              type="button"
              onClick={() => {
                setGpA(3);
                setGpR(2);
                setGpN(6);
              }}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Preset: Tutorial #4
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* SVG Plot Stage (Left 7 cols) */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-sky-700 dark:text-sky-400">
                <span className="inline-block h-2.5 w-2.5 rounded-xs bg-sky-600" />
                Term Tₙ
              </span>
              <span className="flex items-center gap-1.5 font-medium text-emerald-700 dark:text-emerald-400">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-600" />
                Partial Sum Sₙ
              </span>
            </div>
            {kind === 'GP' && (
              <span
                className={`font-mono text-xs font-semibold ${
                  data.converges
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-amber-700 dark:text-amber-400'
                }`}
              >
                {data.converges ? '● CONVERGENT (|r| < 1)' : '▲ DIVERGENT (|r| ≥ 1)'}
              </span>
            )}
          </div>

          <svg
            viewBox="0 0 520 275"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            role="img"
            aria-label="Sequence terms and partial sums chart"
          >
            {/* Zero Axis */}
            <line
              x1="44"
              y1={zeroY}
              x2="496"
              y2={zeroY}
              className="stroke-slate-400 dark:stroke-slate-600"
              strokeWidth="1.2"
            />
            <text
              x="38"
              y={zeroY + 4}
              textAnchor="end"
              className="fill-slate-500 font-mono text-[10px]"
            >
              0
            </text>

            {/* Asymptote S_infinity when GP converges */}
            {data.sInf !== null && (
              <g>
                <line
                  x1="44"
                  y1={toY(data.sInf)}
                  x2="496"
                  y2={toY(data.sInf)}
                  stroke="#d97706"
                  strokeDasharray="5 4"
                  strokeWidth="1.5"
                />
                <text
                  x="492"
                  y={toY(data.sInf) - 6}
                  textAnchor="end"
                  fill="#d97706"
                  className="font-mono text-[11px] font-semibold"
                >
                  S∞ = {data.sInf.toFixed(2)}
                </text>
              </g>
            )}

            {/* Polyline for Partial Sums S_n */}
            {data.terms.length > 1 && (
              <polyline
                fill="none"
                stroke="#059669"
                strokeWidth="2"
                points={data.terms
                  .map((pt, idx) => {
                    const x = 66 + (idx / Math.max(1, data.terms.length - 1)) * 410;
                    return `${x},${toY(pt.s)}`;
                  })
                  .join(' ')}
              />
            )}

            {/* Bars for Terms T_n and Dots for S_n */}
            {data.terms.map((pt, idx) => {
              const x =
                data.terms.length === 1
                  ? 260
                  : 66 + (idx / (data.terms.length - 1)) * 410;
              const yT = toY(pt.t);
              const yS = toY(pt.s);
              const barY = Math.min(yT, zeroY);
              const barH = Math.max(2, Math.abs(yT - zeroY));

              return (
                <g key={pt.k}>
                  <rect
                    x={x - 7}
                    y={barY}
                    width="14"
                    height={barH}
                    rx="2"
                    fill="#0284c7"
                    opacity="0.78"
                  />
                  <circle cx={x} cy={yS} r="4" fill="#059669" stroke="white" strokeWidth="1.2" />
                  <text
                    x={x}
                    y="262"
                    textAnchor="middle"
                    className="fill-slate-600 dark:fill-slate-400 font-mono text-[10px]"
                  >
                    n={pt.k}
                  </text>
                </g>
              );
            })}
          </svg>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">
                <MathFormula math={`T_{${kind === 'AP' ? apN : gpN}}`} />
              </div>
              <div className="font-mono text-sm font-bold text-sky-700 dark:text-sky-400">
                {data.lastT.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">
                <MathFormula math={`S_{${kind === 'AP' ? apN : gpN}}`} />
              </div>
              <div className="font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
                {data.lastS.toFixed(2)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">
                <MathFormula math={kind === 'AP' ? 'd' : 'S_\\infty'} />
              </div>
              <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                {kind === 'AP'
                  ? apD.toFixed(1)
                  : data.sInf !== null
                    ? data.sInf.toFixed(2)
                    : 'Diverges'}
              </div>
            </div>
          </div>
        </div>

        {/* Parameter Controls (Right 5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {kind === 'AP' ? 'AP Parameters (Tₙ = a + (n−1)d)' : 'GP Parameters (Tₙ = arⁿ⁻¹)'}
            </h4>

            {kind === 'AP' ? (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">First Term (a)</span>
                    <span className="font-mono font-semibold">{apA}</span>
                  </div>
                  <input
                    type="range"
                    min={-10}
                    max={20}
                    step={1}
                    value={apA}
                    onChange={(e) => setApA(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Common Difference (d)</span>
                    <span className="font-mono font-semibold">{apD}</span>
                  </div>
                  <input
                    type="range"
                    min={-5}
                    max={8}
                    step={1}
                    value={apD}
                    onChange={(e) => setApD(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Number of Terms (n)</span>
                    <span className="font-mono font-semibold">{apN}</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={14}
                    step={1}
                    value={apN}
                    onChange={(e) => setApN(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">First Term (a)</span>
                    <span className="font-mono font-semibold">{gpA}</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={24}
                    step={1}
                    value={gpA}
                    onChange={(e) => setGpA(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Common Ratio (r)</span>
                    <span className="font-mono font-semibold">{gpR.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min={-0.9}
                    max={2.2}
                    step={0.05}
                    value={gpR}
                    onChange={(e) => setGpR(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Number of Terms (n)</span>
                    <span className="font-mono font-semibold">{gpN}</span>
                  </div>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={1}
                    value={gpN}
                    onChange={(e) => setGpN(Number(e.target.value))}
                    className="w-full accent-sky-600"
                  />
                </div>
              </>
            )}

            <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
              <div className="mb-1 font-semibold text-slate-500 dark:text-slate-400">
                First 5 Terms
              </div>
              <div className="font-mono text-xs leading-relaxed">
                {data.terms
                  .slice(0, 5)
                  .map((t) => t.t.toFixed(2).replace(/\.00$/, ''))
                  .join(', ')}
                {data.terms.length > 5 ? ', …' : ''}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

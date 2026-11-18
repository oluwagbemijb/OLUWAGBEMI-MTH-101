import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

export const QuadraticLab: React.FC = () => {
  // Defaults to Worked Example 5.1: 2x^2 - 5x + 4 = 0
  const [a, setA] = useState(2);
  const [b, setB] = useState(-5);
  const [c, setC] = useState(4);

  const analysis = useMemo(() => {
    const safeA = a === 0 ? 0.5 : a;
    const disc = b * b - 4 * safeA * c;
    const sumRoots = -b / safeA;
    const prodRoots = c / safeA;
    const sumSquares = sumRoots * sumRoots - 2 * prodRoots;
    const sumCubes = Math.pow(sumRoots, 3) - 3 * prodRoots * sumRoots;
    const vertexX = -b / (2 * safeA);
    const vertexY = safeA * vertexX * vertexX + b * vertexX + c;

    let nature: 'distinct' | 'equal' | 'complex' = 'distinct';
    let r1Label = '';
    let r2Label = '';
    let realRoots: number[] = [];

    if (disc > 0.0001) {
      nature = 'distinct';
      const sqrtD = Math.sqrt(disc);
      const r1 = (-b - sqrtD) / (2 * safeA);
      const r2 = (-b + sqrtD) / (2 * safeA);
      realRoots = [r1, r2];
      r1Label = r1.toFixed(2);
      r2Label = r2.toFixed(2);
    } else if (Math.abs(disc) <= 0.0001) {
      nature = 'equal';
      const r = -b / (2 * safeA);
      realRoots = [r];
      r1Label = r.toFixed(2);
      r2Label = r.toFixed(2);
    } else {
      nature = 'complex';
      const re = -b / (2 * safeA);
      const im = Math.sqrt(-disc) / (2 * Math.abs(safeA));
      r1Label = `${re.toFixed(2)} + ${im.toFixed(2)}i`;
      r2Label = `${re.toFixed(2)} − ${im.toFixed(2)}i`;
    }

    return {
      safeA,
      disc,
      sumRoots,
      prodRoots,
      sumSquares,
      sumCubes,
      vertexX,
      vertexY,
      nature,
      r1Label,
      r2Label,
      realRoots,
    };
  }, [a, b, c]);

  // Coordinate system: x in [-6, 6], y in [-8, 12]
  const mapX = (x: number) => 40 + ((x + 6) / 12) * 440;
  const mapY = (y: number) => 20 + ((12 - y) / 20) * 240;

  const curvePoints = useMemo(() => {
    const pts: string[] = [];
    for (let px = -6; px <= 6.01; px += 0.15) {
      const py = analysis.safeA * px * px + b * px + c;
      if (py >= -12 && py <= 16) {
        pts.push(`${mapX(px).toFixed(1)},${mapY(py).toFixed(1)}`);
      }
    }
    return pts.join(' ');
  }, [analysis.safeA, b, c]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="text-sm font-semibold text-slate-900 dark:text-white">
          <MathFormula
            math={`f(x) = ${analysis.safeA}x^2 ${b >= 0 ? '+' : '-'} ${Math.abs(b)}x ${c >= 0 ? '+' : '-'} ${Math.abs(c)} = 0`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              setA(1);
              setB(-5);
              setC(6);
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Δ &gt; 0 (Real)
          </button>
          <button
            type="button"
            onClick={() => {
              setA(1);
              setB(-4);
              setC(4);
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Δ = 0 (Equal)
          </button>
          <button
            type="button"
            onClick={() => {
              setA(2);
              setB(-5);
              setC(4);
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Example 5.1 (Δ &lt; 0)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Parabola Graph Stage */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono text-xs text-slate-600 dark:text-slate-400">
              Δ = b² − 4ac = {analysis.disc.toFixed(2)}
            </span>
            <span
              className={`font-mono text-xs font-semibold ${
                analysis.nature === 'distinct'
                  ? 'text-emerald-700 dark:text-emerald-400'
                  : analysis.nature === 'equal'
                    ? 'text-amber-700 dark:text-amber-400'
                    : 'text-red-600 dark:text-red-400'
              }`}
            >
              {analysis.nature === 'distinct' && '● TWO DISTINCT REAL ROOTS'}
              {analysis.nature === 'equal' && '◆ TWO EQUAL REAL ROOTS'}
              {analysis.nature === 'complex' && '▲ COMPLEX CONJUGATE ROOTS'}
            </span>
          </div>

          <svg
            viewBox="0 0 520 280"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            role="img"
            aria-label="Quadratic parabola plot"
          >
            {/* Grid Lines */}
            {[-4, -2, 0, 2, 4].map((gx) => (
              <line
                key={`gx-${gx}`}
                x1={mapX(gx)}
                y1="20"
                x2={mapX(gx)}
                y2="260"
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
            ))}
            {[-4, 0, 4, 8].map((gy) => (
              <line
                key={`gy-${gy}`}
                x1="40"
                y1={mapY(gy)}
                x2="480"
                y2={mapY(gy)}
                className="stroke-slate-200 dark:stroke-slate-800"
                strokeWidth="1"
              />
            ))}

            {/* Axes */}
            <line x1="40" y1={mapY(0)} x2="480" y2={mapY(0)} className="stroke-slate-500" strokeWidth="1.5" />
            <line x1={mapX(0)} y1="20" x2={mapX(0)} y2="260" className="stroke-slate-500" strokeWidth="1.5" />

            {/* Axis of symmetry */}
            {analysis.vertexX >= -6 && analysis.vertexX <= 6 && (
              <line
                x1={mapX(analysis.vertexX)}
                y1="20"
                x2={mapX(analysis.vertexX)}
                y2="260"
                stroke="#94a3b8"
                strokeDasharray="4 4"
                strokeWidth="1.2"
              />
            )}

            {/* Parabola Curve */}
            {curvePoints && (
              <polyline
                fill="none"
                stroke="#0284c7"
                strokeWidth="2.5"
                points={curvePoints}
              />
            )}

            {/* Vertex Marker */}
            {analysis.vertexY >= -8 && analysis.vertexY <= 12 && (
              <circle
                cx={mapX(analysis.vertexX)}
                cy={mapY(analysis.vertexY)}
                r="4.5"
                fill="#d97706"
                stroke="white"
                strokeWidth="1.5"
              />
            )}

            {/* Real Root Intercepts */}
            {analysis.realRoots.map((root, i) => (
              <g key={i}>
                <circle
                  cx={mapX(root)}
                  cy={mapY(0)}
                  r="5.5"
                  fill="#059669"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <text
                  x={mapX(root)}
                  y={mapY(0) + 18}
                  textAnchor="middle"
                  fill="#059669"
                  className="font-mono text-[11px] font-bold"
                >
                  {root.toFixed(2)}
                </text>
              </g>
            ))}
          </svg>

          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">Roots α, β</div>
              <div className="mt-0.5 font-mono font-semibold text-slate-900 dark:text-white">
                {analysis.r1Label} , {analysis.r2Label}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">Vertex (−b/2a, f(−b/2a))</div>
              <div className="mt-0.5 font-mono font-semibold text-amber-700 dark:text-amber-400">
                ({analysis.vertexX.toFixed(2)}, {analysis.vertexY.toFixed(2)})
              </div>
            </div>
          </div>
        </div>

        {/* Sliders & Vieta Symmetric Identities */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Coefficients (a ≠ 0)
            </h4>
            {[
              { label: 'Coefficient a', val: a, set: (v: number) => setA(v === 0 ? 1 : v), min: -4, max: 4, step: 0.5 },
              { label: 'Coefficient b', val: b, set: setB, min: -8, max: 8, step: 0.5 },
              { label: 'Constant c', val: c, set: setC, min: -8, max: 8, step: 0.5 },
            ].map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                  <span className="font-mono font-semibold">{s.val}</span>
                </div>
                <input
                  type="range"
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  value={s.val}
                  onChange={(e) => s.set(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2.5 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Vieta &amp; Symmetric Functions of Roots
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">
                  <MathFormula math="\alpha + \beta = -b/a" />
                </div>
                <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {analysis.sumRoots.toFixed(2)}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">
                  <MathFormula math="\alpha\beta = c/a" />
                </div>
                <div className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {analysis.prodRoots.toFixed(2)}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">
                  <MathFormula math="\alpha^2 + \beta^2" />
                </div>
                <div className="font-mono text-sm font-bold text-sky-700 dark:text-sky-400">
                  {analysis.sumSquares.toFixed(2)}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">
                  <MathFormula math="\alpha^3 + \beta^3" />
                </div>
                <div className="font-mono text-sm font-bold text-sky-700 dark:text-sky-400">
                  {analysis.sumCubes.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

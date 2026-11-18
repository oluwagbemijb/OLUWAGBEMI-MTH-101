import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

export const DeMoivreLab: React.FC = () => {
  const [mode, setMode] = useState<'roots' | 'power'>('roots');

  // Roots mode: z^n = r * cis(thetaDeg)
  const [nRoots, setNRoots] = useState(3);
  const [wRadius, setWRadius] = useState(1);
  const [wAngleDeg, setWAngleDeg] = useState(0);

  // Power mode: (r * cis(thetaDeg))^n
  const [pRadius, setPRadius] = useState(2);
  const [pAngleDeg, setPAngleDeg] = useState(120);
  const [pExp, setPExp] = useState(6);

  const roots = useMemo(() => {
    const rRoot = Math.pow(wRadius, 1 / nRoots);
    const theta0 = (wAngleDeg * Math.PI) / 180;
    const list: { k: number; x: number; y: number; angleDeg: number }[] = [];
    let sumX = 0;
    let sumY = 0;

    for (let k = 0; k < nRoots; k++) {
      const ang = (theta0 + 2 * k * Math.PI) / nRoots;
      const x = rRoot * Math.cos(ang);
      const y = rRoot * Math.sin(ang);
      sumX += x;
      sumY += y;
      list.push({
        k,
        x,
        y,
        angleDeg: ((ang * 180) / Math.PI) % 360,
      });
    }
    return { rRoot, list, sumX, sumY };
  }, [nRoots, wRadius, wAngleDeg]);

  const powerCalc = useMemo(() => {
    const resR = Math.pow(pRadius, pExp);
    const resDeg = pAngleDeg * pExp;
    const resRad = (resDeg * Math.PI) / 180;
    const resX = resR * Math.cos(resRad);
    const resY = resR * Math.sin(resRad);
    return { resR, resDeg, resX, resY };
  }, [pRadius, pAngleDeg, pExp]);

  // SVG center (260, 150), scale radius 1 -> 95px (or normalized to max radius)
  const cx = 260;
  const cy = 150;
  const pxScale = mode === 'roots' ? 90 / Math.max(1, roots.rRoot) : 90;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setMode('roots')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'roots'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            nth Roots Polygon (zⁿ = w)
          </button>
          <button
            type="button"
            onClick={() => setMode('power')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'power'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            De Moivre Power (zⁿ)
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {mode === 'roots' ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setNRoots(3);
                  setWRadius(1);
                  setWAngleDeg(0);
                }}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Cube Roots of Unity (Ex 8.3)
              </button>
              <button
                type="button"
                onClick={() => {
                  setNRoots(4);
                  setWRadius(16);
                  setWAngleDeg(180);
                }}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                4th Roots of −16 (Tutorial #7)
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setPRadius(2);
                setPAngleDeg(120);
                setPExp(6);
              }}
              className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Preset: (−1 + √3i)⁶ (Ex 8.1)
            </button>
          )}
        </div>
      </div>

      {mode === 'roots' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                Regular {nRoots}-gon on Circle |z| = {roots.rRoot.toFixed(2)}
              </span>
              <span className="font-mono font-semibold text-emerald-700 dark:text-emerald-400">
                Σ zₖ = {roots.sumX.toFixed(2)} + {roots.sumY.toFixed(2)}i
              </span>
            </div>

            <svg
              viewBox="0 0 520 300"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
              role="img"
              aria-label="nth roots polygon on Argand circle"
            >
              {/* Axes */}
              <line x1="40" y1={cy} x2="480" y2={cy} className="stroke-slate-400 dark:stroke-slate-700" strokeWidth="1.2" />
              <line x1={cx} y1="20" x2={cx} y2="280" className="stroke-slate-400 dark:stroke-slate-700" strokeWidth="1.2" />

              {/* Circle of radius r^(1/n) */}
              <circle
                cx={cx}
                cy={cy}
                r={roots.rRoot * pxScale}
                fill="none"
                className="stroke-slate-300 dark:stroke-slate-700"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />

              {/* Regular n-gon */}
              <polygon
                fill="rgba(2, 132, 199, 0.12)"
                stroke="#0284c7"
                strokeWidth="2"
                points={roots.list
                  .map((pt) => `${cx + pt.x * pxScale},${cy - pt.y * pxScale}`)
                  .join(' ')}
              />

              {/* Rays and Root Vertices */}
              {roots.list.map((pt) => {
                const vx = cx + pt.x * pxScale;
                const vy = cy - pt.y * pxScale;
                return (
                  <g key={pt.k}>
                    <line
                      x1={cx}
                      y1={cy}
                      x2={vx}
                      y2={vy}
                      stroke="#0284c7"
                      strokeWidth="1.2"
                      opacity="0.45"
                    />
                    <circle cx={vx} cy={vy} r="5.5" fill="#0284c7" stroke="white" strokeWidth="1.5" />
                    <text
                      x={cx + pt.x * pxScale * 1.22}
                      y={cy - pt.y * pxScale * 1.22 + 4}
                      textAnchor="middle"
                      className="fill-slate-800 dark:fill-slate-200 font-mono text-[11px] font-bold"
                    >
                      z_{pt.k}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Root Degree (n)</span>
                  <span className="font-mono font-semibold">{nRoots}</span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={8}
                  value={nRoots}
                  onChange={(e) => setNRoots(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Target Modulus |w|</span>
                  <span className="font-mono font-semibold">{wRadius}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={16}
                  value={wRadius}
                  onChange={(e) => setWRadius(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Target Angle arg(w)</span>
                  <span className="font-mono font-semibold">{wAngleDeg}°</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={360}
                  step={15}
                  value={wAngleDeg}
                  onChange={(e) => setWAngleDeg(Number(e.target.value))}
                  className="w-full accent-sky-600"
                />
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2 dark:border-slate-800 dark:bg-slate-900">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Computed Roots (zₖ)
              </h4>
              <div className="max-h-40 overflow-y-auto space-y-1.5 font-mono text-xs">
                {roots.list.map((pt) => (
                  <div
                    key={pt.k}
                    className="flex items-center justify-between rounded bg-slate-50 px-2.5 py-1.5 dark:bg-slate-800/60"
                  >
                    <span className="font-semibold text-sky-700 dark:text-sky-400">
                      z_{pt.k} ({pt.angleDeg.toFixed(1)}°)
                    </span>
                    <span className="text-slate-800 dark:text-slate-200">
                      {pt.x.toFixed(2)} {pt.y >= 0 ? '+' : '−'} {Math.abs(pt.y).toFixed(2)}i
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              De Moivre’s Power Formula Evaluation
            </div>

            <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-800/60">
              <MathFormula
                block
                math={`z = ${pRadius}\\big(\\cos ${pAngleDeg}^\\circ + i\\sin ${pAngleDeg}^\\circ\\big)`}
              />
              <MathFormula
                block
                math={`z^{${pExp}} = ${pRadius}^{${pExp}}\\big(\\cos(${pExp}\\cdot ${pAngleDeg}^\\circ) + i\\sin(${pExp}\\cdot ${pAngleDeg}^\\circ)\\big) = ${powerCalc.resR}\\big(\\cos ${powerCalc.resDeg}^\\circ + i\\sin ${powerCalc.resDeg}^\\circ\\big)`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-xs">
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">Result Modulus rⁿ</div>
                <div className="mt-1 font-mono text-base font-bold text-sky-700 dark:text-sky-400">
                  {powerCalc.resR.toLocaleString()}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">Cartesian Form x + iy</div>
                <div className="mt-1 font-mono text-base font-bold text-emerald-700 dark:text-emerald-400">
                  {Math.abs(powerCalc.resX) < 1e-6 ? '0' : powerCalc.resX.toFixed(2)}{' '}
                  {powerCalc.resY >= 0 ? '+' : '−'}{' '}
                  {Math.abs(powerCalc.resY) < 1e-6 ? '0' : Math.abs(powerCalc.resY).toFixed(2)}i
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Adjust Base Complex Number &amp; Exponent
            </h4>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Modulus r</span>
                <span className="font-mono font-semibold">{pRadius}</span>
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.5}
                value={pRadius}
                onChange={(e) => setPRadius(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Angle θ (degrees)</span>
                <span className="font-mono font-semibold">{pAngleDeg}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={15}
                value={pAngleDeg}
                onChange={(e) => setPAngleDeg(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Exponent n</span>
                <span className="font-mono font-semibold">{pExp}</span>
              </div>
              <input
                type="range"
                min={1}
                max={8}
                step={1}
                value={pExp}
                onChange={(e) => setPExp(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

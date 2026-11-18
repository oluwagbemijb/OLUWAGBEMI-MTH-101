import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

function nCr(n: number, r: number): number {
  if (r < 0 || r > n) return 0;
  let res = 1;
  for (let i = 1; i <= r; i++) {
    res = (res * (n - i + 1)) / i;
  }
  return Math.round(res);
}

export const BinomialLab: React.FC = () => {
  const [mode, setMode] = useState<'pascal' | 'rational'>('pascal');
  // Positive integral index: (a*x^p + b*x^q)^n
  const [nVal, setNVal] = useState(9);
  const [rVal, setRVal] = useState(2);
  const [coeffA, setCoeffA] = useState(2);
  const [powP, setPowP] = useState(1);
  const [coeffB, setCoeffB] = useState(-1);
  const [powQ, setPowQ] = useState(-2);

  // Rational/Negative index: (1 + x)^alpha
  const [alpha, setAlpha] = useState(0.5);
  const [xInput, setXInput] = useState(0.04);

  const pascalRows = useMemo(() => {
    const rows: number[][] = [];
    const maxRow = Math.min(nVal, 9);
    for (let row = 0; row <= maxRow; row++) {
      const vals: number[] = [];
      for (let col = 0; col <= row; col++) {
        vals.push(nCr(row, col));
      }
      rows.push(vals);
    }
    return rows;
  }, [nVal]);

  const termDetails = useMemo(() => {
    const safeR = Math.min(rVal, nVal);
    const comb = nCr(nVal, safeR);
    const aPart = Math.pow(coeffA, nVal - safeR);
    const bPart = Math.pow(coeffB, safeR);
    const netCoeff = comb * aPart * bPart;
    const netPower = powP * (nVal - safeR) + powQ * safeR;
    return { safeR, comb, aPart, bPart, netCoeff, netPower };
  }, [nVal, rVal, coeffA, powP, coeffB, powQ]);

  const rationalSeries = useMemo(() => {
    const c0 = 1;
    const c1 = alpha;
    const c2 = (alpha * (alpha - 1)) / 2;
    const c3 = (alpha * (alpha - 1) * (alpha - 2)) / 6;

    const approx3 = c0 + c1 * xInput + c2 * Math.pow(xInput, 2);
    const approx4 = approx3 + c3 * Math.pow(xInput, 3);
    const valid = Math.abs(xInput) < 1;
    const exact = 1 + xInput > 0 ? Math.pow(1 + xInput, alpha) : NaN;
    const error = !Number.isNaN(exact) ? Math.abs(exact - approx4) : NaN;

    return { c0, c1, c2, c3, approx3, approx4, valid, exact, error };
  }, [alpha, xInput]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          <button
            type="button"
            onClick={() => setMode('pascal')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'pascal'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Pascal Triangle &amp; Term Finder
          </button>
          <button
            type="button"
            onClick={() => setMode('rational')}
            className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
              mode === 'rational'
                ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            Rational / Negative Index (|x| &lt; 1)
          </button>
        </div>

        <div className="flex items-center gap-2">
          {mode === 'pascal' ? (
            <>
              <button
                type="button"
                onClick={() => {
                  setNVal(9);
                  setRVal(2);
                  setCoeffA(2);
                  setPowP(1);
                  setCoeffB(-1);
                  setPowQ(-2);
                }}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Preset: Example 6.1
              </button>
              <button
                type="button"
                onClick={() => {
                  setNVal(9);
                  setRVal(6);
                  setCoeffA(1);
                  setPowP(2);
                  setCoeffB(-2);
                  setPowQ(-1);
                }}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Preset: Tutorial #6
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setAlpha(0.5);
                  setXInput(0.04);
                }}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Preset: √1.04 (Ex 6.3)
              </button>
              <button
                type="button"
                onClick={() => {
                  setAlpha(-2);
                  setXInput(0.1);
                }}
                className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                Preset: (1+x)⁻² (Ex 6.2)
              </button>
            </>
          )}
        </div>
      </div>

      {mode === 'pascal' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Pascal Triangle & Selected Term Stage */}
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Pascal&apos;s Triangle (click any cell to select n and r)
              </span>
              <span className="font-mono text-xs font-semibold text-sky-700 dark:text-sky-400">
                C({nVal}, {termDetails.safeR}) = {termDetails.comb}
              </span>
            </div>

            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
              <div className="flex flex-col items-center gap-1.5 min-w-[420px]">
                {pascalRows.map((row, rowIdx) => (
                  <div key={rowIdx} className="flex items-center gap-1.5">
                    <span className="w-8 font-mono text-[10px] text-slate-400">n={rowIdx}</span>
                    {row.map((val, colIdx) => {
                      const active = rowIdx === nVal && colIdx === termDetails.safeR;
                      const sameRow = rowIdx === nVal;
                      return (
                        <button
                          key={colIdx}
                          type="button"
                          onClick={() => {
                            setNVal(rowIdx);
                            setRVal(colIdx);
                          }}
                          className={`min-w-[34px] rounded-md px-1.5 py-1 font-mono text-xs font-semibold transition-colors ${
                            active
                              ? 'bg-sky-600 text-white'
                              : sameRow
                                ? 'bg-sky-100 text-sky-900 dark:bg-sky-950/60 dark:text-sky-300'
                                : 'bg-white text-slate-700 hover:bg-slate-200 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                          }`}
                        >
                          {val}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 text-center dark:bg-slate-800/60">
              <MathFormula
                block
                math={`T_{${termDetails.safeR + 1}} = \\binom{${nVal}}{${termDetails.safeR}}(${coeffA}x^{${powP}})^{${nVal - termDetails.safeR}}(${coeffB}x^{${powQ}})^{${termDetails.safeR}} = ${termDetails.netCoeff}\\,x^{${termDetails.netPower}}`}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Configure Binomial Expansion (axᵖ + bx^q)ⁿ
            </h4>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Exponent (n)</span>
                <span className="font-mono font-semibold">{nVal}</span>
              </div>
              <input
                type="range"
                min={1}
                max={9}
                value={nVal}
                onChange={(e) => {
                  const nextN = Number(e.target.value);
                  setNVal(nextN);
                  if (rVal > nextN) setRVal(nextN);
                }}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Term Index (r)</span>
                <span className="font-mono font-semibold">
                  r = {termDetails.safeR} (T_{termDetails.safeR + 1})
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={nVal}
                value={termDetails.safeR}
                onChange={(e) => setRVal(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">a coeff</label>
                <input
                  type="number"
                  value={coeffA}
                  onChange={(e) => setCoeffA(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">p power</label>
                <input
                  type="number"
                  value={powP}
                  onChange={(e) => setPowP(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">b coeff</label>
                <input
                  type="number"
                  value={coeffB}
                  onChange={(e) => setCoeffB(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-600 dark:text-slate-400 mb-1">q power</label>
                <input
                  type="number"
                  value={powQ}
                  onChange={(e) => setPowQ(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-5 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                <MathFormula math={`(1 + x)^{${alpha}}`} /> Infinite Series Approximation
              </span>
              <span
                className={`font-mono text-xs font-semibold ${
                  rationalSeries.valid
                    ? 'text-emerald-700 dark:text-emerald-400'
                    : 'text-red-600 dark:text-red-400'
                }`}
              >
                {rationalSeries.valid ? '● CONVERGENT (|x| < 1)' : '▲ DIVERGES (|x| ≥ 1)'}
              </span>
            </div>

            <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
              <MathFormula
                block
                math={`(1 + x)^{${alpha}} \\approx 1 ${rationalSeries.c1 >= 0 ? '+' : ''} ${rationalSeries.c1.toFixed(3)}x ${rationalSeries.c2 >= 0 ? '+' : ''} ${rationalSeries.c2.toFixed(3)}x^2 ${rationalSeries.c3 >= 0 ? '+' : ''} ${rationalSeries.c3.toFixed(3)}x^3`}
              />
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">3-Term Approx</div>
                <div className="mt-1 font-mono text-sm font-bold text-sky-700 dark:text-sky-400">
                  {rationalSeries.approx3.toFixed(6)}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">4-Term Approx</div>
                <div className="mt-1 font-mono text-sm font-bold text-emerald-700 dark:text-emerald-400">
                  {rationalSeries.approx4.toFixed(6)}
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-3 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">Exact Value</div>
                <div className="mt-1 font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {Number.isNaN(rationalSeries.exact) ? 'Undefined' : rationalSeries.exact.toFixed(6)}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-4 space-y-4 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Parameters for (1 + x)ⁿ
            </h4>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Rational/Negative Index (n)</span>
                <span className="font-mono font-semibold">{alpha}</span>
              </div>
              <input
                type="range"
                min={-3}
                max={2}
                step={0.5}
                value={alpha}
                onChange={(e) => setAlpha(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Evaluation Point (x)</span>
                <span className="font-mono font-semibold">{xInput.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={-1.2}
                max={1.2}
                step={0.02}
                value={xInput}
                onChange={(e) => setXInput(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

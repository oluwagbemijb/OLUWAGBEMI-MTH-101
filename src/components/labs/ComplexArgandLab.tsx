import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

type ComplexOp = 'z1' | 'conj' | 'add' | 'mul' | 'div';

function formatComplex(re: number, im: number): string {
  const r = Math.abs(re) < 1e-6 ? 0 : re;
  const i = Math.abs(im) < 1e-6 ? 0 : im;
  const sign = i >= 0 ? '+' : '−';
  return `${r.toFixed(2)} ${sign} ${Math.abs(i).toFixed(2)}i`;
}

export const ComplexArgandLab: React.FC = () => {
  // Default z1 = 3 + 2i, z2 = 1 - i (Worked Example 7.1)
  const [x1, setX1] = useState(3);
  const [y1, setY1] = useState(2);
  const [x2, setX2] = useState(1);
  const [y2, setY2] = useState(-1);
  const [op, setOp] = useState<ComplexOp>('div');

  const computed = useMemo(() => {
    const r1 = Math.hypot(x1, y1);
    const arg1 = Math.atan2(y1, x1);

    let rx = x1;
    let ry = y1;
    let opLabel = 'z₁';

    if (op === 'conj') {
      rx = x1;
      ry = -y1;
      opLabel = 'z̄₁';
    } else if (op === 'add') {
      rx = x1 + x2;
      ry = y1 + y2;
      opLabel = 'z₁ + z₂';
    } else if (op === 'mul') {
      rx = x1 * x2 - y1 * y2;
      ry = x1 * y2 + y1 * x2;
      opLabel = 'z₁ · z₂';
    } else if (op === 'div') {
      const denom = x2 * x2 + y2 * y2 || 1;
      rx = (x1 * x2 + y1 * y2) / denom;
      ry = (y1 * x2 - x1 * y2) / denom;
      opLabel = 'z₁ / z₂';
    }

    const rRes = Math.hypot(rx, ry);
    const argRes = Math.atan2(ry, rx);

    return { r1, arg1, rx, ry, rRes, argRes, opLabel };
  }, [x1, y1, x2, y2, op]);

  const maxRange = 8;
  const mapX = (x: number) => 260 + (x / maxRange) * 200;
  const mapY = (y: number) => 150 - (y / maxRange) * 125;

  const arcPath = useMemo(() => {
    const rArc = 32;
    const endX = 260 + rArc * Math.cos(computed.argRes);
    const endY = 150 - rArc * Math.sin(computed.argRes);
    const sweepFlag = computed.argRes >= 0 ? 0 : 1;
    return `M ${260 + rArc} 150 A ${rArc} ${rArc} 0 0 ${sweepFlag} ${endX} ${endY}`;
  }, [computed.argRes]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        <div className="flex flex-wrap items-center gap-1 rounded-lg bg-slate-100 p-1 dark:bg-slate-800/80">
          {[
            { id: 'z1' as const, label: 'z₁ Polar' },
            { id: 'conj' as const, label: 'Conjugate z̄₁' },
            { id: 'add' as const, label: 'z₁ + z₂' },
            { id: 'mul' as const, label: 'z₁ · z₂' },
            { id: 'div' as const, label: 'z₁ / z₂' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setOp(item.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium whitespace-nowrap shrink-0 transition-colors ${
                op === item.id
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-slate-900 dark:text-white'
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setX1(3);
              setY1(2);
              setX2(1);
              setY2(-1);
              setOp('div');
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Preset: Example 7.1
          </button>
          <button
            type="button"
            onClick={() => {
              setX1(-1);
              setY1(1.732);
              setOp('z1');
            }}
            className="rounded-lg border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 whitespace-nowrap shrink-0 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Preset: Example 7.2
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Argand Plane SVG */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Argand Diagram (Re vs Im)
            </span>
            <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
              {computed.opLabel} = {formatComplex(computed.rx, computed.ry)}
            </span>
          </div>

          <svg
            viewBox="0 0 520 300"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            role="img"
            aria-label="Interactive Argand plane"
          >
            <defs>
              <marker id="arrowSky" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#0284c7" />
              </marker>
              <marker id="arrowEmerald" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#059669" />
              </marker>
              <marker id="arrowAmber" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                <path d="M0,0 L0,6 L7,3 z" fill="#d97706" />
              </marker>
            </defs>

            {/* Grid */}
            {[-6, -4, -2, 2, 4, 6].map((g) => (
              <g key={g}>
                <line
                  x1={mapX(g)}
                  y1="15"
                  x2={mapX(g)}
                  y2="285"
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="1"
                />
                <line
                  x1="35"
                  y1={mapY(g)}
                  x2="485"
                  y2={mapY(g)}
                  className="stroke-slate-200 dark:stroke-slate-800"
                  strokeWidth="1"
                />
              </g>
            ))}

            {/* Axes */}
            <line x1="35" y1="150" x2="485" y2="150" className="stroke-slate-500" strokeWidth="1.5" />
            <line x1="260" y1="15" x2="260" y2="285" className="stroke-slate-500" strokeWidth="1.5" />
            <text x="488" y="154" className="fill-slate-600 dark:fill-slate-400 font-mono text-xs">
              Re
            </text>
            <text x="266" y="24" className="fill-slate-600 dark:fill-slate-400 font-mono text-xs">
              Im
            </text>

            {/* Principal Argument Arc for Result */}
            {computed.rRes > 0.2 && (
              <path d={arcPath} fill="none" stroke="#d97706" strokeWidth="2" />
            )}

            {/* Vector z1 */}
            <line
              x1="260"
              y1="150"
              x2={mapX(x1)}
              y2={mapY(y1)}
              stroke="#0284c7"
              strokeWidth="2"
              markerEnd="url(#arrowSky)"
            />
            <text
              x={mapX(x1) + 6}
              y={mapY(y1) - 6}
              fill="#0284c7"
              className="font-mono text-xs font-bold"
            >
              z₁
            </text>

            {/* Vector z2 when needed */}
            {(op === 'add' || op === 'mul' || op === 'div') && (
              <>
                <line
                  x1="260"
                  y1="150"
                  x2={mapX(x2)}
                  y2={mapY(y2)}
                  stroke="#059669"
                  strokeWidth="2"
                  markerEnd="url(#arrowEmerald)"
                />
                <text
                  x={mapX(x2) + 6}
                  y={mapY(y2) - 6}
                  fill="#059669"
                  className="font-mono text-xs font-bold"
                >
                  z₂
                </text>
              </>
            )}

            {/* Resulting vector */}
            {op !== 'z1' && (
              <>
                <line
                  x1="260"
                  y1="150"
                  x2={mapX(computed.rx)}
                  y2={mapY(computed.ry)}
                  stroke="#d97706"
                  strokeWidth="2.5"
                  markerEnd="url(#arrowAmber)"
                />
                <text
                  x={mapX(computed.rx) + 6}
                  y={mapY(computed.ry) + 14}
                  fill="#d97706"
                  className="font-mono text-xs font-bold"
                >
                  {computed.opLabel}
                </text>
              </>
            )}
          </svg>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">Modulus |{computed.opLabel}|</div>
              <div className="font-mono font-bold text-slate-900 dark:text-white">
                {computed.rRes.toFixed(3)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">Arg (radians)</div>
              <div className="font-mono font-bold text-amber-700 dark:text-amber-400">
                {computed.argRes.toFixed(3)} rad
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">Arg (degrees)</div>
              <div className="font-mono font-bold text-amber-700 dark:text-amber-400">
                {((computed.argRes * 180) / Math.PI).toFixed(1)}°
              </div>
            </div>
          </div>
        </div>

        {/* Sliders */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-sky-700 dark:text-sky-400">
                Vector z₁ = x₁ + iy₁
              </h4>
              <span className="font-mono text-xs font-semibold">{formatComplex(x1, y1)}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Real x₁</span>
                <span className="font-mono">{x1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={x1}
                onChange={(e) => setX1(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Imaginary y₁</span>
                <span className="font-mono">{y1.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={y1}
                onChange={(e) => setY1(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                Vector z₂ = x₂ + iy₂
              </h4>
              <span className="font-mono text-xs font-semibold">{formatComplex(x2, y2)}</span>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Real x₂</span>
                <span className="font-mono">{x2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={x2}
                onChange={(e) => setX2(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span>Imaginary y₂</span>
                <span className="font-mono">{y2.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={-5}
                max={5}
                step={0.5}
                value={y2}
                onChange={(e) => setY2(Number(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs dark:border-slate-800 dark:bg-slate-800/50">
            <MathFormula
              block
              math={`${computed.opLabel} = ${computed.rRes.toFixed(2)}\\big(\\cos(${((computed.argRes * 180) / Math.PI).toFixed(1)}^\\circ) + i\\sin(${((computed.argRes * 180) / Math.PI).toFixed(1)}^\\circ)\\big)`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

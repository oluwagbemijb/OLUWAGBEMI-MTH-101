import React, { useMemo, useState } from 'react';
import { MathFormula } from '../MathText';

export const TrigonometryLab: React.FC = () => {
  const [angleDeg, setAngleDeg] = useState(135);
  const [radius, setRadius] = useState(4);
  const [angleA, setAngleA] = useState(45);
  const [angleB, setAngleB] = useState(30);

  const metrics = useMemo(() => {
    const rad = (angleDeg * Math.PI) / 180;
    const sinV = Math.sin(rad);
    const cosV = Math.cos(rad);
    const tanV = Math.abs(cosV) < 1e-4 ? Infinity : sinV / cosV;

    const arcLen = radius * rad;
    const sectorArea = 0.5 * radius * radius * rad;

    let quadrant = 'Quadrant I (ALL +)';
    let castLetter = 'A';
    if (angleDeg > 90 && angleDeg <= 180) {
      quadrant = 'Quadrant II (SIN +)';
      castLetter = 'S';
    } else if (angleDeg > 180 && angleDeg <= 270) {
      quadrant = 'Quadrant III (TAN +)';
      castLetter = 'T';
    } else if (angleDeg > 270) {
      quadrant = 'Quadrant IV (COS +)';
      castLetter = 'C';
    }

    return { rad, sinV, cosV, tanV, arcLen, sectorArea, quadrant, castLetter };
  }, [angleDeg, radius]);

  const additionCheck = useMemo(() => {
    const radA = (angleA * Math.PI) / 180;
    const radB = (angleB * Math.PI) / 180;
    const cosSum = Math.cos(radA + radB);
    const cosFormula =
      Math.cos(radA) * Math.cos(radB) - Math.sin(radA) * Math.sin(radB);
    const sinSum = Math.sin(radA + radB);
    const sinFormula =
      Math.sin(radA) * Math.cos(radB) + Math.cos(radA) * Math.sin(radB);
    return { cosSum, cosFormula, sinSum, sinFormula };
  }, [angleA, angleB]);

  const cx = 240;
  const cy = 150;
  const rPx = 95;
  const px = cx + rPx * metrics.cosV;
  const py = cy - rPx * metrics.sinV;

  // Sector SVG path
  const sectorPath = useMemo(() => {
    if (angleDeg <= 0) return '';
    if (angleDeg >= 360) {
      return `M ${cx + rPx} ${cy} A ${rPx} ${rPx} 0 1 0 ${cx - rPx} ${cy} A ${rPx} ${rPx} 0 1 0 ${cx + rPx} ${cy} Z`;
    }
    const largeArc = angleDeg > 180 ? 1 : 0;
    return `M ${cx} ${cy} L ${cx + rPx} ${cy} A ${rPx} ${rPx} 0 ${largeArc} 0 ${px} ${py} Z`;
  }, [angleDeg, px, py]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Unit Circle & CAST Quadrant SVG */}
        <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="font-semibold text-slate-800 dark:text-slate-200">
              Unit Circle, Radian Sector &amp; CAST Quadrant
            </span>
            <span className="font-mono font-semibold text-sky-700 dark:text-sky-400">
              {metrics.quadrant}
            </span>
          </div>

          <svg
            viewBox="0 0 480 300"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950"
            role="img"
            aria-label="Interactive trigonometry unit circle and CAST diagram"
          >
            {/* Axes */}
            <line x1="40" y1={cy} x2="440" y2={cy} className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.2" />
            <line x1={cx} y1="20" x2={cx} y2="280" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.2" />

            {/* CAST Labels */}
            <text x="345" y="55" className={`font-display text-sm font-bold ${metrics.castLetter === 'A' ? 'fill-sky-600' : 'fill-slate-400'}`}>
              A (All +)
            </text>
            <text x="85" y="55" className={`font-display text-sm font-bold ${metrics.castLetter === 'S' ? 'fill-sky-600' : 'fill-slate-400'}`}>
              S (Sin +)
            </text>
            <text x="85" y="255" className={`font-display text-sm font-bold ${metrics.castLetter === 'T' ? 'fill-sky-600' : 'fill-slate-400'}`}>
              T (Tan +)
            </text>
            <text x="345" y="255" className={`font-display text-sm font-bold ${metrics.castLetter === 'C' ? 'fill-sky-600' : 'fill-slate-400'}`}>
              C (Cos +)
            </text>

            {/* Shaded Sector */}
            {sectorPath && <path d={sectorPath} fill="rgba(2, 132, 199, 0.14)" />}

            {/* Main Circle */}
            <circle cx={cx} cy={cy} r={rPx} fill="none" className="stroke-slate-400 dark:stroke-slate-600" strokeWidth="1.5" />

            {/* cos(theta) horizontal projection */}
            <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#059669" strokeWidth="2.5" />
            {/* sin(theta) vertical projection */}
            <line x1={px} y1={cy} x2={px} y2={py} stroke="#d97706" strokeWidth="2.5" />

            {/* Terminal Ray */}
            <line x1={cx} y1={cy} x2={px} y2={py} stroke="#0284c7" strokeWidth="2.5" />
            <circle cx={px} cy={py} r="5.5" fill="#0284c7" stroke="white" strokeWidth="1.5" />

            <text x={(cx + px) / 2} y={cy + 16} textAnchor="middle" fill="#059669" className="font-mono text-[11px] font-bold">
              cos θ
            </text>
            <text x={px + (metrics.cosV >= 0 ? 22 : -22)} y={(cy + py) / 2} textAnchor="middle" fill="#d97706" className="font-mono text-[11px] font-bold">
              sin θ
            </text>
          </svg>

          <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">sin θ</div>
              <div className="font-mono font-bold text-amber-700 dark:text-amber-400">
                {metrics.sinV.toFixed(4)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">cos θ</div>
              <div className="font-mono font-bold text-emerald-700 dark:text-emerald-400">
                {metrics.cosV.toFixed(4)}
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 dark:bg-slate-800/60">
              <div className="text-slate-500 dark:text-slate-400">tan θ</div>
              <div className="font-mono font-bold text-sky-700 dark:text-sky-400">
                {Number.isFinite(metrics.tanV) ? metrics.tanV.toFixed(4) : 'Undefined'}
              </div>
            </div>
          </div>
        </div>

        {/* Sliders & Addition Formula Verifier */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Circular Measure Controls
            </h4>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Angle θ</span>
                <span className="font-mono font-semibold">
                  {angleDeg}° ({metrics.rad.toFixed(3)} rad)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={360}
                step={5}
                value={angleDeg}
                onChange={(e) => setAngleDeg(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="font-medium text-slate-700 dark:text-slate-300">Circle Radius (r)</span>
                <span className="font-mono font-semibold">{radius} cm</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={radius}
                onChange={(e) => setRadius(Number(e.target.value))}
                className="w-full accent-sky-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
              <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">Arc Length s = rθ</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white">
                  {metrics.arcLen.toFixed(2)} cm
                </div>
              </div>
              <div className="rounded-lg bg-slate-50 p-2.5 dark:bg-slate-800/60">
                <div className="text-slate-500 dark:text-slate-400">Sector Area ½r²θ</div>
                <div className="font-mono font-bold text-slate-900 dark:text-white">
                  {metrics.sectorArea.toFixed(2)} cm²
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                Addition Formula Verifier (A + B)
              </h4>
              <button
                type="button"
                onClick={() => {
                  setAngleA(45);
                  setAngleB(30);
                }}
                className="text-xs font-medium text-sky-600 hover:underline dark:text-sky-400"
              >
                Ex 9.1 (75°)
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Angle A (°)</label>
                <input
                  type="number"
                  value={angleA}
                  onChange={(e) => setAngleA(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Angle B (°)</label>
                <input
                  type="number"
                  value={angleB}
                  onChange={(e) => setAngleB(Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs dark:border-slate-700 dark:bg-slate-800"
                />
              </div>
            </div>
            <div className="rounded-lg bg-slate-50 p-2.5 text-xs dark:bg-slate-800/60">
              <MathFormula
                math={`\\cos(${angleA}^\\circ + ${angleB}^\\circ) = ${additionCheck.cosSum.toFixed(4)}`}
              />
              <div className="mt-1 font-mono text-[11px] text-emerald-700 dark:text-emerald-400">
                cosA·cosB − sinA·sinB = {additionCheck.cosFormula.toFixed(4)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

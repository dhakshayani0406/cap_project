import React from 'react';

const C = { low: '#2f74b5', med: '#f1c40f', high: '#c0392b', navy: '#12355B', teal: '#159A9C', grid: '#e2e8f0', text: '#64748b' };
export const riskColor = (p) => (p === 'Low Risk' ? C.low : p === 'Medium Risk' ? C.med : C.high);

const Empty = () => (
  <div style={{ padding: '40px 0', textAlign: 'center', color: C.text, fontSize: '0.85rem' }}>
    No data yet. Run a risk assessment to populate this chart.
  </div>
);

const niceMax = (v) => {
  if (v <= 0) return 1;
  const p = Math.pow(10, Math.floor(Math.log10(v)));
  const n = v / p;
  return (n <= 1 ? 1 : n <= 2 ? 2 : n <= 5 ? 5 : 10) * p;
};

/* Generic bar chart. data: [{label, value, color}] */
export const BarChart = ({ data, yMin = 0, yMax, yLabel, height = 240, threshold, thresholdLabel, format = (v) => v }) => {
  if (!data || data.length === 0) return <Empty />;
  const W = 480, H = height, m = { t: 20, r: 12, b: 38, l: 46 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const max = yMax ?? niceMax(Math.max(...data.map((d) => d.value)));
  const y = (v) => m.t + ih - ((v - yMin) / (max - yMin)) * ih;
  const bw = (iw / data.length) * 0.6;
  const ticks = [0, 1, 2, 3, 4].map((i) => yMin + ((max - yMin) * i) / 4);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} role="img">
      {ticks.map((t, i) => (
        <g key={i}>
          <line x1={m.l} x2={W - m.r} y1={y(t)} y2={y(t)} stroke={C.grid} />
          <text x={m.l - 6} y={y(t) + 4} fontSize="10" textAnchor="end" fill={C.text}>{Number.isInteger(t) ? t : t.toFixed(2)}</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = m.l + (iw / data.length) * i + (iw / data.length - bw) / 2;
        const top = y(Math.min(Math.max(d.value, yMin), max));
        return (
          <g key={i}>
            <rect x={x} y={top} width={bw} height={Math.max(0, y(yMin) - top)} fill={d.color || C.low} rx="3" />
            <text x={x + bw / 2} y={top - 5} fontSize="11" fontWeight="600" textAnchor="middle" fill={C.navy}>{format(d.value)}</text>
            <text x={x + bw / 2} y={H - m.b + 16} fontSize="10.5" textAnchor="middle" fill={C.text}>{d.label}</text>
          </g>
        );
      })}
      {threshold != null && (
        <g>
          <line x1={m.l} x2={W - m.r} y1={y(threshold)} y2={y(threshold)} stroke="#64748b" strokeDasharray="5 4" />
          <text x={W - m.r} y={y(threshold) - 4} fontSize="10" textAnchor="end" fill={C.text}>{thresholdLabel}</text>
        </g>
      )}
      {yLabel && <text x="12" y={H / 2} fontSize="10.5" fill={C.text} transform={`rotate(-90 12 ${H / 2})`} textAnchor="middle">{yLabel}</text>}
      <line x1={m.l} x2={m.l} y1={m.t} y2={m.t + ih} stroke="#94a3b8" />
      <line x1={m.l} x2={W - m.r} y1={m.t + ih} y2={m.t + ih} stroke="#94a3b8" />
    </svg>
  );
};

/* Pie chart. data: [{label, value, color}] */
export const PieChart = ({ data }) => {
  const items = (data || []).filter((d) => d.value > 0);
  const total = items.reduce((a, d) => a + d.value, 0);
  if (!total) return <Empty />;
  const R = 80, cx = 110, cy = 100;
  let a0 = -Math.PI / 2;
  return (
    <svg viewBox="0 0 440 200" style={{ width: '100%', height: 'auto' }} role="img">
      {items.map((d, i) => {
        const frac = d.value / total, a1 = a0 + frac * 2 * Math.PI;
        const p = (a) => [cx + R * Math.cos(a), cy + R * Math.sin(a)];
        const [x0, y0] = p(a0), [x1, y1] = p(a1);
        const path = items.length === 1
          ? `M ${cx - R} ${cy} A ${R} ${R} 0 1 1 ${cx + R} ${cy} A ${R} ${R} 0 1 1 ${cx - R} ${cy}`
          : `M ${cx} ${cy} L ${x0} ${y0} A ${R} ${R} 0 ${frac > 0.5 ? 1 : 0} 1 ${x1} ${y1} Z`;
        a0 = a1;
        return <path key={i} d={path} fill={d.color} stroke="#fff" strokeWidth="2" />;
      })}
      {items.map((d, i) => (
        <g key={i} transform={`translate(240 ${60 + i * 30})`}>
          <rect width="14" height="14" rx="3" fill={d.color} />
          <text x="22" y="12" fontSize="13" fill={C.navy}>{d.label}: {d.value} ({((d.value / total) * 100).toFixed(1)}%)</text>
        </g>
      ))}
    </svg>
  );
};

/* Scatter: score vs default probability with a fitted logistic-style trend. points: [{x, y, label, color}] */
export const ScatterChart = ({ points }) => {
  if (!points || points.length === 0) return <Empty />;
  const W = 480, H = 280, m = { t: 20, r: 16, b: 40, l: 52 };
  const iw = W - m.l - m.r, ih = H - m.t - m.b;
  const xmin = 300, xmax = 850;
  const ymax = Math.max(0.1, Math.ceil(Math.max(...points.map((p) => p.y)) * 10) / 10 + 0.05);
  const X = (v) => m.l + ((v - xmin) / (xmax - xmin)) * iw;
  const Y = (v) => m.t + ih - (v / ymax) * ih;
  // Least-squares fit of logit(p) = a + b*score for the trend line
  let trend = null;
  if (points.length >= 2) {
    const pts = points.map((p) => ({ x: p.x, z: Math.log(Math.min(0.99, Math.max(0.001, p.y)) / (1 - Math.min(0.99, Math.max(0.001, p.y)))) }));
    const n = pts.length, sx = pts.reduce((a, p) => a + p.x, 0), sz = pts.reduce((a, p) => a + p.z, 0);
    const sxx = pts.reduce((a, p) => a + p.x * p.x, 0), sxz = pts.reduce((a, p) => a + p.x * p.z, 0);
    const den = n * sxx - sx * sx;
    if (den !== 0) {
      const b = (n * sxz - sx * sz) / den, a = (sz - b * sx) / n;
      const line = [];
      for (let s = xmin; s <= xmax; s += 10) line.push(`${X(s)},${Y(Math.min(ymax, 1 / (1 + Math.exp(-(a + b * s)))))}`);
      trend = line.join(' ');
    }
  }
  const yt = [0, 1, 2, 3, 4].map((i) => (ymax * i) / 4);
  const xt = [300, 400, 500, 600, 700, 800];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} role="img">
      {yt.map((t, i) => (
        <g key={i}><line x1={m.l} x2={W - m.r} y1={Y(t)} y2={Y(t)} stroke={C.grid} /><text x={m.l - 6} y={Y(t) + 4} fontSize="10" textAnchor="end" fill={C.text}>{t.toFixed(2)}</text></g>
      ))}
      {xt.map((t) => (
        <g key={t}><line x1={X(t)} x2={X(t)} y1={m.t} y2={m.t + ih} stroke={C.grid} /><text x={X(t)} y={H - m.b + 15} fontSize="10" textAnchor="middle" fill={C.text}>{t}</text></g>
      ))}
      {trend && <polyline points={trend} fill="none" stroke="#888" strokeDasharray="5 4" />}
      {points.map((p, i) => (
        <g key={i}>
          <circle cx={X(p.x)} cy={Y(p.y)} r="6" fill={p.color} stroke={C.navy} strokeWidth="1" />
          <text x={X(p.x) + 8} y={Y(p.y) - 8} fontSize="9.5" fill={C.text}>{p.label}</text>
        </g>
      ))}
      <text x={m.l + iw / 2} y={H - 4} fontSize="11" textAnchor="middle" fill={C.text}>Credit score</text>
      <text x="12" y={m.t + ih / 2} fontSize="11" fill={C.text} transform={`rotate(-90 12 ${m.t + ih / 2})`} textAnchor="middle">Default probability</text>
      <line x1={m.l} x2={m.l} y1={m.t} y2={m.t + ih} stroke="#94a3b8" />
      <line x1={m.l} x2={W - m.r} y1={m.t + ih} y2={m.t + ih} stroke="#94a3b8" />
    </svg>
  );
};

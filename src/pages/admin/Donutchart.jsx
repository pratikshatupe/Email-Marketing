
export default function DonutChart({ opened, sent }) {
  const pct   = sent > 0 ? Math.round((opened / sent) * 100) : 0;
  const r     = 34;
  const circ  = 2 * Math.PI * r;
  const stroke = (pct / 100) * circ;

  return (
    <div className="relative flex items-center justify-center w-20 h-20">
      <svg viewBox="0 0 80 80" className="absolute inset-0 w-full h-full -rotate-90">
        <circle cx="40" cy="40" r={r} fill="none" stroke="#e0e7ff" strokeWidth="10" />
        <circle
          cx="40" cy="40" r={r}
          fill="none" stroke="#6366f1" strokeWidth="10"
          strokeDasharray={`${stroke} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <span className="text-lg font-black text-slate-800">{pct}%</span>
    </div>
  );
}
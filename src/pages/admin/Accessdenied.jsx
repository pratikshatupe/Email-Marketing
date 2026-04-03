
import { useNavigate } from "react-router-dom";

export function AccessDenied() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">🔒</div>
      <h2 className="text-2xl font-black text-slate-700 mb-2">Access Denied</h2>
      <p className="text-slate-400 text-sm mb-6 max-w-xs">
        role page access permission .
      </p>
      <button
        onClick={() => navigate("/admin")}
        className="px-6 py-2.5 rounded-xl text-white text-sm font-bold hover:opacity-90 transition-opacity"
        style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}
      >
         go to Dashboard  →
      </button>
    </div>
  );
}

export function PlaceholderPage({ title, icon }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <div className="text-6xl mb-4">{icon}</div>
      <h2 className="text-2xl font-black text-slate-700 mb-2">{title}</h2>
      <p className="text-slate-400 text-sm">हे page येईल. Coming soon...</p>
    </div>
  );
}
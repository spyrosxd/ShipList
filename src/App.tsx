import { useEffect, useMemo, useState } from "react";
import { STORAGE_KEY, TASKS } from "./lib/constants";
import type { Task } from "./types/task";
import { Analytics } from "@vercel/analytics/react";

function useLocalStorageSet(key: string) {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return new Set();
      return new Set<string>(JSON.parse(raw));
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(Array.from(completed)));
  }, [completed, key]);

  return [completed, setCompleted] as const;
}

function App() {
  const [completed, setCompleted] = useLocalStorageSet(STORAGE_KEY);

  const byCategory = useMemo(() => {
    const map = new Map<string, Task[]>();
    for (const t of TASKS) {
      if (!map.has(t.category)) map.set(t.category, []);
      map.get(t.category)!.push(t);
    }
    return map;
  }, []);

  const toggle = (id: string) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => setCompleted(new Set());

  // Fire confetti when all tasks complete
  useEffect(() => {
    const total = TASKS.length;
    if (total === 0) return;
    if (completed.size !== total) return;

    const container = document.createElement('div');
    container.className = 'confetti-container';
    document.body.appendChild(container);

    const colors = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#a78bfa', '#06b6d4'];
    const pieceCount = 100;
    for (let i = 0; i < pieceCount; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';
      const size = 6 + Math.random() * 8; // 6-14px
      const left = Math.random() * 100; // vw
      const duration = 2.8 + Math.random() * 1.2; // 2.8-4s
      const delay = Math.random() * 0.6; // 0-0.6s
      const bg = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = `${size}px`;
      piece.style.height = `${size * (0.4 + Math.random() * 1.2)}px`;
      piece.style.left = `${left}vw`;
      piece.style.background = bg;
      piece.style.animationDuration = `${duration}s`;
      piece.style.animationDelay = `${delay}s`;
      container.appendChild(piece);
    }

    const timeout = window.setTimeout(() => {
      container.remove();
    }, 5000);

    return () => {
      window.clearTimeout(timeout);
      container.remove();
    };
  }, [completed]);

  return (
    <main className="relative min-h-screen bg-white text-slate-800">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-sky-100 blur-3xl opacity-70 animate-[float_8s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-12 h-72 w-72 rounded-full bg-violet-100 blur-3xl opacity-70 animate-[float_10s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-80 w-80 rounded-full bg-rose-100 blur-3xl opacity-60 animate-[float_12s_ease-in-out_infinite]" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 py-14">
        <header className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight bg-gradient-to-r from-slate-900 to-slate-600 bg-clip-text text-transparent">
            ShipList
          </h1>
          <p className="mt-2 text-slate-500">
            SaaS launch checklist — Made for the ones who build.
          </p>
          <button
            onClick={reset}
            className="mt-4 text-xs text-slate-500 hover:text-slate-700"
          >
            Reset progress
          </button>
          {
            (() => {
              const totalCount = TASKS.length;
              const completedCount = completed.size;
              const overallPercent = Math.round((completedCount / Math.max(totalCount, 1)) * 100);
              return (
                <div className="mx-auto mt-6 w-full max-w-md">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                    <span>{completedCount} / {totalCount} completed</span>
                    <span>{overallPercent}%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full bg-slate-900 transition-[width] duration-300" style={{ width: `${overallPercent}%` }} />
                  </div>
                </div>
              );
            })()
          }
        </header>

        <div className="space-y-6 flex flex-col items-center">
          {Array.from(byCategory.keys()).map((cat) => {
            const tasks = byCategory.get(cat) ?? []
            if (tasks.length === 0) return null;
            return (
              <section
                key={cat}
                className="w-full max-w-xl mx-auto rounded-2xl border border-slate-200 bg-white/70 backdrop-blur p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <h2 className="mb-4 text-center text-xl font-semibold uppercase tracking-wide text-slate-700">{cat}</h2>
                <ul className="mt-2 space-y-3">
                  {tasks.map((t) => {
                    const isDone = completed.has(t.id);
                    return (
                      <li key={t.id} className="group rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
                        <label className="flex items-center gap-4 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggle(t.id)}
                            className="size-5 accent-sky-500"
                          />
                          <span
                            className={`strike text-base ${isDone ? "completed text-slate-400" : "text-slate-800"}`}
                          >
                            {t.title}
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            );
          })}
        </div>
      </div>

      <footer className="py-5 text-center text-xs text-zinc-500 dark:text-zinc-400">
        Created with 💖 by{" "}
        <a
          className="text-blue-600 dark:text-blue-400"
          href="https://x.com/spyrosxd_"
          target="_blank"
        >
          SpyrosXD
        </a>
      </footer>

      <Analytics/>
    </main>
  );
}

export default App;

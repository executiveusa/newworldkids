import { ReactNode, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from "@/lib/utils";
import { Home, Bot, ClipboardList, Users, FileText, Settings } from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: Home },
  { to: '/dashboard?view=agents', label: 'AI Agents', icon: Bot },
  { to: '/dashboard?view=tasks', label: 'Tasks', icon: ClipboardList },
  { to: '/dashboard?view=donors', label: 'Donors', icon: Users },
  { to: '/dashboard?view=documents', label: 'Documents', icon: FileText },
  { to: '/dashboard?view=settings', label: 'Settings', icon: Settings },
];

export function AdminShell({ children }: { children: ReactNode }) {
  const nav = useMemo(() => navItems, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8">
        <aside className="bg-slate-900/80 backdrop-blur border border-slate-800 rounded-2xl p-4 sticky top-4 h-fit">
          <div className="mb-6">
            <p className="text-xs uppercase tracking-wide text-slate-400">Admin & Ops</p>
            <h1 className="text-2xl font-semibold mt-1">New World Kids</h1>
          </div>
          <nav className="space-y-1">
            {nav.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-slate-800/80',
                      isActive ? 'bg-slate-800 text-white shadow-inner' : 'text-slate-300'
                    )
                  }
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>
          <div className="mt-8 text-xs text-slate-400 leading-relaxed">
            <p className="font-semibold text-slate-300 mb-1">Design guardrails</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Keep actions obvious.</li>
              <li>One primary CTA per screen.</li>
              <li>Use cards + modals for details.</li>
            </ul>
          </div>
        </aside>
        <section className="space-y-6">{children}</section>
      </div>
    </div>
  );
}

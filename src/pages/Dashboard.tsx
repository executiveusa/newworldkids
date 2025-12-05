import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { AdminShell } from '@/components/admin/AdminShell';
import { eigentClient, type EigentAgent } from '@/services/eigentClient';
import { cn } from '@/lib/utils';
import { ArrowUpRight, Plus, Upload } from 'lucide-react';

const statusColors: Record<string, string> = {
  online: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50',
  degraded: 'bg-amber-500/20 text-amber-200 border border-amber-500/50',
  offline: 'bg-rose-500/20 text-rose-200 border border-rose-500/50',
};

type Task = {
  id: string;
  name: string;
  agent: string;
  status: 'pending' | 'running' | 'done';
  priority: 'low' | 'medium' | 'high';
  created: string;
  updated: string;
  documents?: string[];
};

type Document = {
  id: string;
  name: string;
  uploadedAt: string;
  tags: string[];
  usedIn: number;
};

type Donor = {
  id: string;
  name: string;
  email: string;
  total: number;
  lastDonation: string;
  tags: string[];
};

function Pill({ label, tone }: { label: string; tone?: keyof typeof statusColors }) {
  return (
    <span className={cn('px-2 py-1 rounded-full text-xs font-semibold', tone ? statusColors[tone] : 'bg-slate-800 text-slate-200')}>
      {label}
    </span>
  );
}

function Modal({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" role="dialog" aria-modal>
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl max-w-2xl w-full p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white" aria-label="Close modal">✕</button>
        </div>
        {children}
      </div>
    </div>
  );
}

const mockTasks: Task[] = [
  { id: 't1', name: 'Summarize weekly donor notes', agent: 'EchoAgent', status: 'running', priority: 'high', created: '2024-09-01', updated: '2024-09-01', documents: ['GivingTuesday.pdf'] },
  { id: 't2', name: 'Prep donor outreach pack', agent: 'NovaSign', status: 'pending', priority: 'medium', created: '2024-08-29', updated: '2024-08-29', documents: ['SponsorDeck.pdf'] },
  { id: 't3', name: 'Safety checklist QA', agent: 'FlowAgent', status: 'done', priority: 'low', created: '2024-08-22', updated: '2024-08-23' },
];

const mockDocs: Document[] = [
  { id: 'd1', name: 'SponsorDeck.pdf', uploadedAt: '2024-08-28', tags: ['fundraising'], usedIn: 2 },
  { id: 'd2', name: 'VolunteerGuide.pdf', uploadedAt: '2024-08-25', tags: ['ops'], usedIn: 1 },
  { id: 'd3', name: 'GivingTuesday.pdf', uploadedAt: '2024-08-20', tags: ['donations'], usedIn: 3 },
];

const mockDonors: Donor[] = [
  { id: 'u1', name: 'Jordan Kim', email: 'jordan@example.com', total: 5200, lastDonation: '2024-08-30', tags: ['recurring'] },
  { id: 'u2', name: 'Priya Patel', email: 'priya@example.com', total: 780, lastDonation: '2024-08-15', tags: ['new'] },
  { id: 'u3', name: 'Casey Lee', email: 'casey@example.com', total: 12000, lastDonation: '2024-07-10', tags: ['major'] },
];

export default function Dashboard() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [agents, setAgents] = useState<EigentAgent[]>([]);
  const [healthy, setHealthy] = useState<boolean>(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [docModalOpen, setDocModalOpen] = useState(false);
  const [localDocs, setLocalDocs] = useState<Document[]>(mockDocs);

  const view = searchParams.get('view') ?? 'overview';

  useEffect(() => {
    eigentClient.health().then((h) => setHealthy(Boolean(h?.ok || h?.providers?.length))).catch(() => setHealthy(false));
    eigentClient.listAgents().then(setAgents).catch(() => setAgents([]));
  }, []);

  const setView = (next: string) => {
    const params = new URLSearchParams(searchParams);
    if (next === 'overview') {
      params.delete('view');
    } else {
      params.set('view', next);
    }
    setSearchParams(params, { replace: true });
  };

  const recentDocs = useMemo(() => localDocs.slice(0, 3), [localDocs]);

  const addLocalDocs = (files: FileList | null) => {
    if (!files) return;
    const additions: Document[] = Array.from(files).map((file) => ({
      id: `${file.name}-${Date.now()}`,
      name: file.name,
      uploadedAt: new Date().toISOString().slice(0, 10),
      tags: ['uploaded'],
      usedIn: 0,
    }));
    setLocalDocs((prev) => [...additions, ...prev]);
  };

  const pageTitle = {
    overview: 'Dashboard',
    agents: 'AI Agents',
    tasks: 'Tasks',
    donors: 'Donors',
    documents: 'Documents',
    settings: 'Settings',
  }[view];

  return (
    <AdminShell>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">Control center</p>
            <h2 className="text-3xl font-semibold text-white">{pageTitle}</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setTaskModalOpen(true)}
              className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition"
            >
              <Plus size={16} /> Create Task
            </button>
            {view === 'documents' && (
              <button
                onClick={() => setDocModalOpen(true)}
                className="inline-flex items-center gap-2 bg-slate-800 text-white px-4 py-2 rounded-xl border border-slate-700 hover:border-slate-500"
              >
                <Upload size={16} /> Upload PDFs
              </button>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <StatusCard label="Eigent" value={healthy ? 'Online' : 'Offline'} tone={healthy ? 'online' : 'offline'} description="Multi-agent backend" />
          <StatusCard label="Active agents" value={`${agents.length || 4}`} tone="online" description="Configured for operations" />
        </div>
        {view === 'overview' && <Overview recentDocs={recentDocs} onNavigate={setView} />}
        {view === 'agents' && <AgentsView agents={agents} healthy={healthy} />}
        {view === 'tasks' && <TasksView />}
        {view === 'donors' && <DonorsView />}
        {view === 'documents' && <DocumentsView docs={localDocs} onUpload={addLocalDocs} />}
        {view === 'settings' && <SettingsView healthy={healthy} />}
      </div>

      <Modal open={taskModalOpen} onClose={() => setTaskModalOpen(false)} title="Create agent task">
        <TaskForm agents={agents} onSubmit={() => setTaskModalOpen(false)} />
      </Modal>

      <Modal open={docModalOpen} onClose={() => setDocModalOpen(false)} title="Upload PDFs">
        <p className="text-sm text-slate-300">Drop multiple PDFs to make them available to agents.</p>
        <label className="mt-3 flex items-center justify-center gap-2 w-full border-2 border-dashed border-slate-700 rounded-xl px-4 py-10 text-slate-200 hover:border-emerald-500 hover:text-emerald-300 transition cursor-pointer">
          <input type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => addLocalDocs(e.target.files)} />
          <Upload size={18} /> Drop or select PDFs
        </label>
      </Modal>
    </AdminShell>
  );
}

function StatusCard({ label, value, description, tone }: { label: string; value: string; description: string; tone?: keyof typeof statusColors }) {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
          <p className="text-2xl font-semibold text-white mt-1">{value}</p>
        </div>
        <Pill label={tone ? tone.charAt(0).toUpperCase() + tone.slice(1) : ''} tone={tone} />
      </div>
      <p className="text-sm text-slate-400 mt-3">{description}</p>
    </div>
  );
}

function Overview({ recentDocs, onNavigate }: { recentDocs: Document[]; onNavigate: (tab: string) => void }) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <div className="xl:col-span-2 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard title="Open tasks" value="3" hint="Keep queues short" onClick={() => onNavigate('tasks')} />
          <MetricCard title="Documents" value="{recentDocs.length}+" hint="Ready for agents" onClick={() => onNavigate('documents')} />
          <MetricCard title="Donations this month" value="$8.4k" hint="+12% vs last" onClick={() => onNavigate('donors')} />
        </div>
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-white">Recent documents</h3>
            <button onClick={() => onNavigate('documents')} className="text-sm text-emerald-300 inline-flex items-center gap-1">View all <ArrowUpRight size={14} /></button>
          </div>
          <div className="space-y-3">
            {recentDocs.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between bg-slate-800/60 rounded-xl px-3 py-2">
                <div>
                  <p className="text-sm font-semibold text-white">{doc.name}</p>
                  <p className="text-xs text-slate-400">Uploaded {doc.uploadedAt}</p>
                </div>
                <div className="flex items-center gap-2">
                  {doc.tags.map((tag) => (
                    <Pill key={tag} label={tag} />
                  ))}
                  <Pill label={`${doc.usedIn} tasks`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-lg font-semibold text-white">Quick actions</h3>
        <div className="space-y-2 text-sm text-slate-200">
          <button className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">Summarize latest PDFs</button>
          <button className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">Generate donor report</button>
          <button className="w-full text-left px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition">Prep outreach task</button>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, hint, onClick }: { title: string; value: string; hint: string; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="text-left bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-emerald-500/40 transition">
      <p className="text-xs uppercase tracking-wide text-slate-400">{title}</p>
      <p className="text-3xl font-semibold text-white mt-1">{value}</p>
      <p className="text-sm text-slate-400 mt-2">{hint}</p>
    </button>
  );
}

function AgentsView({ agents, healthy }: { agents: EigentAgent[]; healthy: boolean }) {
  const enriched = agents.length ? agents : [
    { id: 'novasign', name: 'NovaSign', description: 'Document signing & verification', status: healthy ? 'online' : 'offline' },
    { id: 'echo', name: 'EchoAgent', description: 'Summaries & updates', status: healthy ? 'online' : 'offline' },
    { id: 'flow', name: 'FlowAgent', description: 'Workflow routing', status: healthy ? 'degraded' : 'offline' },
    { id: 'pulse', name: 'PulseAgent', description: 'Monitoring & alerts', status: healthy ? 'online' : 'offline' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {enriched.map((agent) => (
        <div key={agent.id} className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-wide text-slate-400">{agent.id}</p>
              <p className="text-xl font-semibold text-white">{agent.name}</p>
              <p className="text-sm text-slate-400">{agent.description}</p>
            </div>
            <Pill label={agent.status ?? 'unknown'} tone={(agent.status as keyof typeof statusColors) ?? 'offline'} />
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-left">Summarize latest docs</button>
            <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-left">Generate donor report</button>
            <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-left">Prep outreach task</button>
            <button className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition text-left">View recent logs</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TasksView() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Task queue</h3>
        <div className="flex items-center gap-2 text-sm text-slate-300">
          <Pill label="High" />
          <Pill label="Medium" />
          <Pill label="Low" />
        </div>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr>
              <th className="py-2 pr-4">Task</th>
              <th className="py-2 pr-4">Agent</th>
              <th className="py-2 pr-4">Status</th>
              <th className="py-2 pr-4">Priority</th>
              <th className="py-2 pr-4">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {mockTasks.map((task) => (
              <tr key={task.id} className="hover:bg-slate-800/50">
                <td className="py-3 pr-4 font-semibold text-white">{task.name}</td>
                <td className="py-3 pr-4 text-slate-200">{task.agent}</td>
                <td className="py-3 pr-4"><Pill label={task.status} tone={task.status === 'done' ? 'online' : task.status === 'running' ? 'degraded' : 'offline'} /></td>
                <td className="py-3 pr-4 text-slate-200 capitalize">{task.priority}</td>
                <td className="py-3 pr-4 text-slate-400">{task.updated}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DonorsView() {
  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-white">Donor CRM</h3>
        <p className="text-sm text-slate-400">High-trust relationships at a glance.</p>
      </div>
      <div className="overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="text-left text-slate-400">
            <tr>
              <th className="py-2 pr-4">Name</th>
              <th className="py-2 pr-4">Email</th>
              <th className="py-2 pr-4">Tags</th>
              <th className="py-2 pr-4">Total</th>
              <th className="py-2 pr-4">Last</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {mockDonors.map((donor) => (
              <tr key={donor.id} className="hover:bg-slate-800/50">
                <td className="py-3 pr-4 font-semibold text-white">{donor.name}</td>
                <td className="py-3 pr-4 text-slate-200">{donor.email}</td>
                <td className="py-3 pr-4">
                  <div className="flex flex-wrap gap-1">
                    {donor.tags.map((tag) => (
                      <Pill key={tag} label={tag} />
                    ))}
                  </div>
                </td>
                <td className="py-3 pr-4 text-slate-200">${donor.total.toLocaleString()}</td>
                <td className="py-3 pr-4 text-slate-400">{donor.lastDonation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DocumentsView({ docs, onUpload }: { docs: Document[]; onUpload: (files: FileList | null) => void }) {
  return (
    <div className="space-y-4">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-white">PDF Library</h3>
            <p className="text-sm text-slate-400">Upload, tag, and route documents to agents.</p>
          </div>
          <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800 border border-slate-700 hover:border-emerald-500 cursor-pointer text-sm text-white">
            <Upload size={16} />
            Add PDFs
            <input type="file" accept="application/pdf" multiple className="hidden" onChange={(e) => onUpload(e.target.files)} />
          </label>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead className="text-left text-slate-400">
              <tr>
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Tags</th>
                <th className="py-2 pr-4">Uploaded</th>
                <th className="py-2 pr-4">Used in tasks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {docs.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-800/50">
                  <td className="py-3 pr-4 font-semibold text-white">{doc.name}</td>
                  <td className="py-3 pr-4">
                    <div className="flex flex-wrap gap-1">
                      {doc.tags.map((tag) => (
                        <Pill key={tag} label={tag} />
                      ))}
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-slate-400">{doc.uploadedAt}</td>
                  <td className="py-3 pr-4 text-slate-200">{doc.usedIn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView({ healthy }: { healthy: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-lg font-semibold text-white">Eigent connection</h3>
        <p className="text-sm text-slate-400">Update the base URL if your multi-agent stack runs elsewhere.</p>
        <div className="space-y-2 text-sm text-slate-200">
          <div className="flex items-center justify-between">
            <span>Endpoint</span>
            <code className="px-2 py-1 rounded bg-slate-800 text-xs">{eigentClient.baseUrl}</code>
          </div>
          <div className="flex items-center justify-between">
            <span>Status</span>
            <Pill label={healthy ? 'Online' : 'Offline'} tone={healthy ? 'online' : 'offline'} />
          </div>
        </div>
      </div>
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
        <h3 className="text-lg font-semibold text-white">Feature toggles</h3>
        <ul className="space-y-2 text-sm text-slate-200">
          <li className="flex items-center justify-between"><span>Tasks module</span><Pill label="On" tone="online" /></li>
          <li className="flex items-center justify-between"><span>Donor CRM</span><Pill label="On" tone="online" /></li>
          <li className="flex items-center justify-between"><span>Document routing</span><Pill label="On" tone="online" /></li>
        </ul>
      </div>
    </div>
  );
}

function TaskForm({ agents, onSubmit }: { agents: EigentAgent[]; onSubmit: () => void }) {
  return (
    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="space-y-1 text-sm text-slate-200">
          Task name
          <input required className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2" placeholder="Describe the outcome" />
        </label>
        <label className="space-y-1 text-sm text-slate-200">
          Agent
          <select className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2">
            {(agents.length ? agents : mockTasks.map((t) => ({ agent: t.agent }))).map((agent, idx) => (
              <option key={idx}>{'name' in agent ? agent.name : agent.agent}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="space-y-1 text-sm text-slate-200">
        Brief
        <textarea className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2" rows={3} placeholder="Include the goal, audience, and any constraints." />
      </label>
      <label className="space-y-1 text-sm text-slate-200">
        Attach documents
        <input type="file" accept="application/pdf" multiple className="w-full text-sm" />
      </label>
      <div className="flex justify-end">
        <button type="submit" className="inline-flex items-center gap-2 bg-emerald-500 text-slate-950 px-4 py-2 rounded-xl font-semibold shadow-lg hover:shadow-emerald-500/30 transition">
          <Plus size={16} /> Create task
        </button>
      </div>
    </form>
  );
}

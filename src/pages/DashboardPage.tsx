import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MorphingSquare } from '../components/ui/morphing-square';
import {
  LayoutDashboard,
  FileText,
  Sparkles,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronRight,
  TrendingUp,
  Eye,
  Heart,
  MessageSquare,
  Plus,
  ArrowUpRight,
  Calendar,
  Clock,
  CheckCircle2,
  Circle,
  Zap,
  LogOut,
  User,
} from 'lucide-react';
import { cn } from '../utils/cn';

/* ─────────────── tiny helpers ─────────────── */

const stats = [
  { label: 'Published', value: '124', delta: '+12%', icon: FileText, color: 'from-violet-500/20 to-purple-600/10', iconColor: 'text-violet-400' },
  { label: 'Total Views', value: '48.2K', delta: '+23%', icon: Eye, color: 'from-blue-500/20 to-cyan-600/10', iconColor: 'text-blue-400' },
  { label: 'Engagement', value: '8.4K', delta: '+7%', icon: Heart, color: 'from-pink-500/20 to-rose-600/10', iconColor: 'text-pink-400' },
  { label: 'Comments', value: '1.2K', delta: '+18%', icon: MessageSquare, color: 'from-amber-500/20 to-orange-600/10', iconColor: 'text-amber-400' },
];

const recentContent = [
  { title: 'How to Build a Content Strategy in 2025', status: 'published', platform: 'Blog', time: '2h ago', views: '1.4K' },
  { title: 'Top AI Tools for Creative Writers', status: 'scheduled', platform: 'Instagram', time: 'Tomorrow 9AM', views: '—' },
  { title: 'Behind the Scenes: Our Team Workflow', status: 'draft', platform: 'YouTube', time: 'Draft', views: '—' },
  { title: '5 Ways to Repurpose Long-Form Content', status: 'published', platform: 'Blog', time: '1d ago', views: '980' },
  { title: 'Content Calendar Template for Q3', status: 'review', platform: 'Facebook', time: 'In review', views: '—' },
];

const pipeline = [
  { label: 'Ideas', count: 14, color: 'bg-white/10', dot: 'bg-white/40' },
  { label: 'Drafts', count: 7, color: 'bg-blue-500/10', dot: 'bg-blue-400' },
  { label: 'In Review', count: 3, color: 'bg-amber-500/10', dot: 'bg-amber-400' },
  { label: 'Scheduled', count: 5, color: 'bg-violet-500/10', dot: 'bg-violet-400' },
  { label: 'Published', count: 124, color: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
];

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: FileText, label: 'Content', active: false },
  { icon: Sparkles, label: 'AI Tools', active: false },
  { icon: BarChart3, label: 'Analytics', active: false },
  { icon: Calendar, label: 'Calendar', active: false },
  { icon: Settings, label: 'Settings', active: false },
];

const statusConfig: Record<string, { label: string; cls: string; icon: React.ElementType }> = {
  published: { label: 'Published', cls: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20', icon: CheckCircle2 },
  scheduled: { label: 'Scheduled', cls: 'bg-blue-500/15 text-blue-400 border border-blue-500/20', icon: Clock },
  draft: { label: 'Draft', cls: 'bg-white/10 text-white/50 border border-white/10', icon: Circle },
  review: { label: 'In Review', cls: 'bg-amber-500/15 text-amber-400 border border-amber-500/20', icon: Zap },
};

/* ─────────────── component ─────────────── */

export default function DashboardPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // Show loading for 2.2 s, then reveal the dashboard
    const t1 = setTimeout(() => setLoading(false), 2200);
    const t2 = setTimeout(() => setFadeIn(true), 2300);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* ── Loading screen ── */
  if (loading) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
        {/* background glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] rounded-full bg-purple-500/8 blur-[80px]" />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6">
          {/* Logo mark */}
          <div className="mb-2 w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-600/20 border border-violet-500/20 flex items-center justify-center">
            <span className="text-lg font-black text-white tracking-tight">U</span>
          </div>

          {/*
            ✅  NEW canonical MorphingSquare from /components/ui/morphing-square.tsx
               bg-foreground resolves to white on dark backgrounds (Tailwind CSS variable)
          */}
          <MorphingSquare
            message="Loading..."
            messagePlacement="bottom"
            className="bg-violet-400 shadow-[0_0_30px_rgba(139,92,246,0.6)]"
          />

          <p className="text-white/30 text-xs tracking-widest uppercase mt-2 animate-pulse">
            Preparing your workspace
          </p>
        </div>
      </div>
    );
  }

  /* ── Dashboard ── */
  return (
    <div
      className={cn(
        'min-h-screen bg-[#0a0a0a] text-white flex transition-all duration-700',
        fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3',
      )}
    >
      {/* ── Sidebar ── */}
      <aside className="hidden lg:flex flex-col w-60 min-h-screen bg-white/[0.02] border-r border-white/[0.06] fixed top-0 left-0 z-40">
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-5 py-5 border-b border-white/[0.06]">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-[0_0_16px_rgba(139,92,246,0.5)]">
            <span className="text-sm font-black text-white">U</span>
          </div>
          <span className="font-bold text-white tracking-tight text-lg">Unibase</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ icon: Icon, label, active }) => (
            <button
              key={label}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group',
                active
                  ? 'bg-violet-500/15 text-violet-300 border border-violet-500/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5',
              )}
            >
              <Icon className={cn('w-4 h-4 flex-shrink-0', active ? 'text-violet-400' : 'group-hover:text-white/80')} />
              {label}
              {active && <ChevronRight className="w-3 h-3 ml-auto text-violet-500/60" />}
            </button>
          ))}
        </nav>

        {/* User */}
        <div className="px-3 py-4 border-t border-white/[0.06] space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200 group">
            <User className="w-4 h-4 group-hover:text-white/80" />
            Profile
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/50 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200 group"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 lg:ml-60 flex flex-col min-h-screen">

        {/* Top bar */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/[0.06]">
          <div>
            <h1 className="font-bold text-white text-lg leading-tight">Dashboard</h1>
            <p className="text-white/40 text-xs mt-0.5">Welcome back — here's what's happening</p>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white/40 text-sm hover:border-white/20 transition-colors cursor-pointer group">
              <Search className="w-3.5 h-3.5 group-hover:text-white/60 transition-colors" />
              <span className="text-xs">Search…</span>
              <kbd className="ml-4 text-[10px] bg-white/5 border border-white/10 rounded px-1 py-0.5">⌘K</kbd>
            </div>

            {/* Notifications */}
            <button className="relative w-9 h-9 flex items-center justify-center bg-white/5 border border-white/10 rounded-lg hover:border-white/20 transition-colors">
              <Bell className="w-4 h-4 text-white/60" />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-violet-400" />
            </button>

            {/* New content CTA */}
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 hover:bg-violet-400 rounded-lg text-sm font-semibold text-white transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Content</span>
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 space-y-6">

          {/* ── Stats ── */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {stats.map(({ label, value, delta, icon: Icon, color, iconColor }) => (
              <div
                key={label}
                className={cn(
                  'relative rounded-2xl p-5 border border-white/[0.06] bg-gradient-to-br overflow-hidden group hover:border-white/10 transition-all duration-300',
                  color,
                )}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn('w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center', iconColor)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-medium text-emerald-400">
                    <TrendingUp className="w-3 h-3" />{delta}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
                <p className="text-white/40 text-xs mt-0.5">{label}</p>
                {/* subtle corner glow */}
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/3 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>

          {/* ── Pipeline + Recent content ── */}
          <div className="grid lg:grid-cols-3 gap-5">

            {/* Pipeline */}
            <div className="rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white text-sm">Task Pipeline</h2>
                <button className="text-violet-400 hover:text-violet-300 text-xs transition-colors flex items-center gap-1">
                  View all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-2.5">
                {pipeline.map(({ label, count, color, dot }) => (
                  <div
                    key={label}
                    className={cn(
                      'flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-white/5 cursor-pointer group',
                      color,
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={cn('w-2 h-2 rounded-full flex-shrink-0', dot)} />
                      <span className="text-white/70 group-hover:text-white text-sm transition-colors">{label}</span>
                    </div>
                    <span className="text-white/50 group-hover:text-white/80 text-sm font-semibold transition-colors">{count}</span>
                  </div>
                ))}
              </div>

              {/* Quick add */}
              <button className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-white/10 hover:border-violet-500/40 hover:bg-violet-500/5 text-white/30 hover:text-violet-400 text-xs font-medium transition-all duration-200">
                <Plus className="w-3.5 h-3.5" /> Add idea
              </button>
            </div>

            {/* Recent content */}
            <div className="lg:col-span-2 rounded-2xl bg-white/[0.02] border border-white/[0.06] p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-white text-sm">Recent Content</h2>
                <button className="text-violet-400 hover:text-violet-300 text-xs transition-colors flex items-center gap-1">
                  See all <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>

              <div className="space-y-1.5">
                {recentContent.map((item) => {
                  const s = statusConfig[item.status];
                  const SIcon = s.icon;
                  return (
                    <div
                      key={item.title}
                      className="group flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-all duration-200 cursor-pointer"
                    >
                      {/* Status icon */}
                      <SIcon className={cn('w-4 h-4 flex-shrink-0', item.status === 'published' ? 'text-emerald-400' : item.status === 'scheduled' ? 'text-blue-400' : item.status === 'review' ? 'text-amber-400' : 'text-white/30')} />

                      {/* Title */}
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 group-hover:text-white text-sm font-medium truncate transition-colors">
                          {item.title}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5 flex items-center gap-1.5">
                          <span>{item.platform}</span>
                          <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                          <span>{item.time}</span>
                        </p>
                      </div>

                      {/* Badge + views */}
                      <div className="flex items-center gap-3 flex-shrink-0">
                        {item.views !== '—' && (
                          <span className="hidden sm:flex items-center gap-1 text-white/30 text-xs">
                            <Eye className="w-3 h-3" />{item.views}
                          </span>
                        )}
                        <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', s.cls)}>
                          {s.label}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── AI Tools Banner ── */}
          <div className="relative rounded-2xl border border-violet-500/20 bg-gradient-to-r from-violet-500/10 via-purple-600/5 to-transparent p-6 overflow-hidden">
            {/* glow orb */}
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-violet-500/15 blur-3xl pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/30 to-purple-600/20 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-violet-300" />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">AI Content Tools</h3>
                  <p className="text-white/50 text-xs mt-0.5">
                    Generate captions, repurpose posts, and analyze tone — powered by AI.
                  </p>
                </div>
              </div>
              <button className="flex-shrink-0 flex items-center gap-2 px-5 py-2.5 bg-violet-500 hover:bg-violet-400 rounded-xl text-sm font-semibold text-white transition-all duration-200 shadow-[0_0_20px_rgba(139,92,246,0.35)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]">
                Try AI Tools <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

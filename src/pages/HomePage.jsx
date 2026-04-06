import { Link } from 'react-router-dom'
import { Brain, ClipboardList, FileText, BookOpen, Trophy, Target, Zap, Shield, TrendingUp, Clock } from 'lucide-react'
const FEATURES = [
  { to: '/roleplay', icon: Brain, color: 'blue', title: 'AI Roleplay Simulator', desc: '4 scripted scenarios simulating the real C_FIORD_2601 AI roleplay format. ARIA evaluates your expertise step by step.', badge: 'Most like real exam', count: '4 scenarios' },
  { to: '/practice', icon: ClipboardList, color: 'violet', title: 'Practice Tests', desc: '6 themed test sets with 70+ scenario-based questions. Instant explanations after every question.', badge: '', count: '70+ questions' },
  { to: '/mock-exam', icon: FileText, color: 'emerald', title: 'Full Mock Exams', desc: '3 timed mock exams (15 questions each) with complete scoring, detailed feedback, and pass/fail analysis.', badge: 'Timed', count: '45 questions' },
  { to: '/guides', icon: BookOpen, color: 'amber', title: 'Study Guides', desc: '5 comprehensive reference cards — annotation cheat sheets, extension patterns, BTP architecture, and testing guides.', badge: '', count: '5 guides' },
]

const STATS = [
  { icon: Target, label: 'Practice Questions', value: '115+' },
  { icon: Brain, label: 'Roleplay Scenarios', value: '4' },
  { icon: Trophy, label: 'Mock Exams', value: '3' },
  { icon: BookOpen, label: 'Study Guides', value: '5' },
]

const EXAM_FACTS = [
  { icon: Brain, label: 'Format', value: 'Scenario Based Assessment' },
  { icon: Clock, label: 'Duration', value: '2 hours' },
  { icon: Shield, label: 'Open-book', value: 'Yes — use any resource' },
  { icon: Zap, label: 'Attempts', value: '4 per 12 months' },
  { icon: TrendingUp, label: 'Pass Mark', value: '~70% (estimated)' },
  { icon: Target, label: 'Format', value: 'AI Roleplay or Video' },
]

const COLOR_MAP = {
  blue: { card: 'border-blue-500/20 hover:border-blue-400/40', icon: 'bg-blue-500/15 text-blue-400', btn: 'btn-primary' },
  violet: { card: 'border-violet-500/20 hover:border-violet-400/40', icon: 'bg-violet-500/15 text-violet-400', btn: 'btn-violet' },
  emerald: { card: 'border-emerald-500/20 hover:border-emerald-400/40', icon: 'bg-emerald-500/15 text-emerald-400', btn: 'btn-success' },
  amber: { card: 'border-amber-500/20 hover:border-amber-400/40', icon: 'bg-amber-500/15 text-amber-400', btn: 'bg-amber-600 hover:bg-amber-500 text-white font-semibold rounded-xl px-5 py-2.5 transition-all' },
}

export default function HomePage() {
  return (
    <div className="px-4 py-8 max-w-6xl mx-auto">
      {/* Hero */}
      <div className="text-center mb-12 animate-fade-in">
        <div className="inline-flex items-center gap-2 badge-blue mb-4 text-sm px-4 py-1.5">
          <Zap size={14} /> NEW FORMAT · C_FIORD_2601 · Scenario Based Assessment
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 leading-tight">
          Crack the New
          <span className="gradient-text block">SAP Fiori Exam</span>
        </h1>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-8">
          The only prep platform built specifically for the new C_FIORD_2601 Scenario Based Assessment format. AI roleplay simulations, 115+ scenario questions, full mock exams.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/roleplay" className="btn-primary flex items-center gap-2 text-base px-6 py-3">
            <Brain size={20} /> Start AI Roleplay
          </Link>
          <Link to="/practice" className="btn-secondary flex items-center gap-2 text-base px-6 py-3">
            <ClipboardList size={20} /> Practice Tests
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12 animate-slide-up">
        {STATS.map(({ icon: Icon, label, value }) => (
          <div key={label} className="glass-card p-4 text-center">
            <div className="text-3xl font-black gradient-text-blue mb-1">{value}</div>
            <div className="text-slate-500 text-xs">{label}</div>
          </div>
        ))}
      </div>

      {/* Feature cards */}
      <div className="grid md:grid-cols-2 gap-4 mb-12">
        {FEATURES.map(({ to, icon: Icon, color, title, desc, badge, count }, i) => {
          const c = COLOR_MAP[color]
          return (
            <div key={to} className={`glass-card-hover border p-6 group ${c.card} animate-slide-up`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${c.icon}`}>
                  <Icon size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-white font-bold">{title}</h3>
                    {badge && <span className="badge-blue text-[10px]">{badge}</span>}
                  </div>
                  <div className="text-slate-500 text-xs">{count}</div>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">{desc}</p>
              <Link to={to} className={`inline-flex items-center gap-2 text-sm ${c.btn}`}>
                Start now →
              </Link>
            </div>
          )
        })}
      </div>

      {/* Exam format box */}
      <div className="glass-card border border-amber-500/20 p-6 mb-8 animate-slide-up">
        <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
          <Shield size={20} className="text-amber-400" /> Real Exam Format: C_FIORD_2601
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {EXAM_FACTS.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-2.5">
              <Icon size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-slate-500 text-xs">{label}</div>
                <div className="text-white text-sm font-medium">{value}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center glass-card border border-blue-500/20 p-8 animate-slide-up">
        <h2 className="text-2xl font-bold text-white mb-2">Ready to start?</h2>
        <p className="text-slate-400 mb-6">Begin with the AI Roleplay to experience the exam format, or dive into practice tests to identify your weak areas.</p>
        <Link to="/roleplay" className="btn-primary inline-flex items-center gap-2 text-base px-8 py-3.5">
          <Brain size={20} /> Launch AI Roleplay Simulator
        </Link>
      </div>
    </div>
  )
}

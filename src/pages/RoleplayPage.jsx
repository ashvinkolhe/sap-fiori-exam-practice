import { Link } from 'react-router-dom'
import { Brain, Clock, ChevronRight, Zap } from 'lucide-react'
import { ROLEPLAY_SCENARIOS } from '../data/scenarios'
import { useProgress } from '../hooks/useProgress'

const DIFF_STYLE = {
  Beginner: 'badge-emerald',
  Intermediate: 'badge-amber',
  Advanced: 'badge-red',
}

export default function RoleplayPage() {
  const { progress } = useProgress()

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 badge-blue mb-3">
          <Brain size={14} /> AI Roleplay Simulator
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Scenario-Based Assessment</h1>
        <p className="text-slate-400">Choose a scenario. ARIA — your AI evaluator — will question you step by step and score your responses exactly like the real C_FIORD_2601 exam.</p>
      </div>

      {/* Format reminder */}
      <div className="glass-card border border-blue-500/15 p-4 mb-6 flex items-start gap-3 animate-slide-up">
        <Zap size={18} className="text-blue-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-300">
          <span className="text-white font-semibold">How it works: </span>
          ARIA presents your brief, then asks 4–6 focused questions about your design decisions. Each answer is scored for keywords and reasoning. Aim for ≥68% to pass.
        </div>
      </div>

      {/* Scenarios */}
      <div className="space-y-3">
        {ROLEPLAY_SCENARIOS.map((s, i) => {
          const prev = progress.roleplay?.[s.id]
          return (
            <div key={s.id} className="glass-card-hover border border-white/8 p-5 group animate-slide-up" style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="flex items-start gap-4">
                <span className="text-4xl flex-shrink-0 group-hover:scale-110 transition-transform">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white font-bold group-hover:text-blue-300 transition-colors">{s.title}</h3>
                    <span className={DIFF_STYLE[s.difficulty]}>{s.difficulty}</span>
                    {prev && (
                      <span className={`badge text-[10px] ${prev.bestScore >= 68 ? 'badge-emerald' : 'badge-amber'}`}>
                        Best: {prev.bestScore}%
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-2">
                    <Clock size={12} /> {s.estimatedTime}
                  </div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {s.tags.map(t => (
                      <span key={t} className="text-xs bg-surface-700 text-slate-400 px-2 py-0.5 rounded">{t}</span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-slate-500">{s.steps.length} questions · {s.scoringAreas.length} scored areas</div>
                    <Link to={`/roleplay/${s.id}`} className="btn-primary flex items-center gap-1.5 text-sm py-2 px-4">
                      Start <ChevronRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

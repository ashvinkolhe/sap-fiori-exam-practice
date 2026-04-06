// PracticeTestsPage.jsx
import { Link } from 'react-router-dom'
import { ClipboardList, Clock, ChevronRight, CheckCircle } from 'lucide-react'
import { TEST_SETS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'

const COLOR = {
  blue: { card: 'border-blue-500/20 hover:border-blue-400/40', icon: 'text-blue-400', badge: 'badge-blue' },
  violet: { card: 'border-violet-500/20 hover:border-violet-400/40', icon: 'text-violet-400', badge: 'badge-violet' },
  emerald: { card: 'border-emerald-500/20 hover:border-emerald-400/40', icon: 'text-emerald-400', badge: 'badge-emerald' },
  amber: { card: 'border-amber-500/20 hover:border-amber-400/40', icon: 'text-amber-400', badge: 'badge-amber' },
  red: { card: 'border-red-500/20 hover:border-red-400/40', icon: 'text-red-400', badge: 'badge-red' },
  rose: { card: 'border-rose-500/20 hover:border-rose-400/40', icon: 'text-rose-400', badge: 'badge-red' },
}

export default function PracticeTestsPage() {
  const { progress } = useProgress()
  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 badge-violet mb-3"><ClipboardList size={14} /> Practice Tests</div>
        <h1 className="text-3xl font-black text-white mb-2">Themed Practice Tests</h1>
        <p className="text-slate-400">6 test sets covering every exam topic. Each question is a realistic scenario with a detailed explanation. Aim for ≥70% before attempting the mock exams.</p>
      </div>
      <div className="space-y-3">
        {TEST_SETS.map((t, i) => {
          const c = COLOR[t.color] || COLOR.blue
          const prev = progress.tests?.[t.id]
          return (
            <div key={t.id} className={`glass-card-hover border p-5 group animate-slide-up ${c.card}`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white font-bold group-hover:text-blue-300 transition-colors">{t.title}</h3>
                    {prev?.bestScore >= 70 && <CheckCircle size={16} className="text-emerald-400" />}
                  </div>
                  <p className="text-slate-500 text-xs mb-2">{t.description}</p>
                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1"><Clock size={11} /> ~{t.estimatedTime} min</span>
                    <span>{t.questions.length} questions</span>
                    {prev && <span className={c.badge}>Best: {prev.bestScore}%</span>}
                  </div>
                  {prev && (
                    <div className="progress-bar mb-3">
                      <div className={`progress-fill ${prev.bestScore >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${prev.bestScore}%` }} />
                    </div>
                  )}
                  <Link to={`/practice/${t.id}`} className="btn-violet text-sm py-2 px-4 inline-flex items-center gap-1.5">
                    Start Test <ChevronRight size={15} />
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

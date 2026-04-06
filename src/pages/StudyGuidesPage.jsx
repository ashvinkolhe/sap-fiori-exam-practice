import { useState } from 'react'
import { BookOpen, ChevronLeft, ChevronRight } from 'lucide-react'
import { STUDY_GUIDES } from '../data/guides'

const COLOR = {
  blue: 'border-blue-500/20 hover:border-blue-400/40',
  violet: 'border-violet-500/20 hover:border-violet-400/40',
  emerald: 'border-emerald-500/20 hover:border-emerald-400/40',
  amber: 'border-amber-500/20 hover:border-amber-400/40',
  rose: 'border-rose-500/20 hover:border-rose-400/40',
}
const HEADING_COLOR = {
  blue: 'text-blue-400', violet: 'text-violet-400', emerald: 'text-emerald-400', amber: 'text-amber-400', rose: 'text-rose-400',
}

export default function StudyGuidesPage() {
  const [selected, setSelected] = useState(null)

  if (selected) {
    const guide = STUDY_GUIDES.find(g => g.id === selected)
    return (
      <div className="px-4 py-8 max-w-2xl mx-auto animate-fade-in">
        <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
          <ChevronLeft size={16} /> All Guides
        </button>
        <div className="text-center mb-6">
          <div className="text-5xl mb-3">{guide.icon}</div>
          <h1 className="text-2xl font-black text-white">{guide.title}</h1>
        </div>
        <div className="space-y-4">
          {guide.sections.map((s, i) => (
            <div key={i} className={`glass-card border ${COLOR[guide.color]} p-5 animate-slide-up`} style={{ animationDelay: `${i * 0.07}s` }}>
              <div className={`text-xs font-bold uppercase tracking-wider mb-3 ${HEADING_COLOR[guide.color]}`}>{s.heading}</div>
              <pre className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap font-sans">{s.content}</pre>
            </div>
          ))}
        </div>
        <button onClick={() => setSelected(null)} className="w-full mt-6 btn-secondary">← All Guides</button>
      </div>
    )
  }

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 badge-amber mb-3"><BookOpen size={14} /> Study Guides</div>
        <h1 className="text-3xl font-black text-white mb-2">Quick Reference Guides</h1>
        <p className="text-slate-400">Condensed knowledge cards covering the most critical topics for the C_FIORD_2601 exam. Perfect for last-minute revision.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {STUDY_GUIDES.map((g, i) => (
          <button key={g.id} onClick={() => setSelected(g.id)}
            className={`glass-card-hover border text-left p-5 group animate-slide-up ${COLOR[g.color]}`} style={{ animationDelay: `${i * 0.07}s` }}>
            <div className="flex items-start gap-3 mb-3">
              <span className="text-3xl group-hover:scale-110 transition-transform">{g.icon}</span>
              <div>
                <div className={`text-white font-bold group-hover:${HEADING_COLOR[g.color]} transition-colors`}>{g.title}</div>
                <div className="text-slate-500 text-xs mt-0.5">{g.sections.length} sections</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm">{g.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex flex-wrap gap-1">
                {g.sections.slice(0, 2).map((s, j) => (
                  <span key={j} className="text-xs bg-surface-700 text-slate-500 px-2 py-0.5 rounded">{s.heading.slice(0, 20)}</span>
                ))}
              </div>
              <ChevronRight size={18} className={`${HEADING_COLOR[g.color]} opacity-0 group-hover:opacity-100 transition-all`} />
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

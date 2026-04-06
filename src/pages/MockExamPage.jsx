// MockExamPage.jsx
import { Link } from 'react-router-dom'
import { FileText, Clock, Target, ChevronRight, Trophy, AlertTriangle } from 'lucide-react'
import { MOCK_EXAMS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'

export default function MockExamPage() {
  const { progress } = useProgress()
  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <div className="inline-flex items-center gap-2 badge-emerald mb-3"><FileText size={14} /> Mock Exams</div>
        <h1 className="text-3xl font-black text-white mb-2">Full Mock Exams</h1>
        <p className="text-slate-400">Timed exams simulating real exam conditions. 15 scenario-based questions each. No pausing — just like the real C_FIORD_2601.</p>
      </div>
      <div className="bg-amber-900/20 border border-amber-500/20 rounded-xl p-4 mb-6 flex items-start gap-3">
        <AlertTriangle size={18} className="text-amber-400 flex-shrink-0 mt-0.5" />
        <div className="text-sm text-slate-300">
          <span className="text-amber-400 font-semibold">Exam Conditions: </span>
          The timer runs continuously. Complete all questions without stopping. Review is shown at the end. Aim for ≥70% to simulate a pass.
        </div>
      </div>
      <div className="space-y-4">
        {MOCK_EXAMS.map((exam, i) => {
          const prev = progress.exams?.[exam.id]
          return (
            <div key={exam.id} className={`glass-card-hover border p-6 group animate-slide-up ${prev?.passed ? 'border-emerald-500/20' : 'border-white/8'}`} style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-blue-600 flex items-center justify-center text-white font-black text-lg flex-shrink-0 shadow-glow-emerald">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-white font-bold group-hover:text-emerald-300 transition-colors">{exam.title}</h3>
                    {prev?.passed && <Trophy size={16} className="text-amber-400" />}
                  </div>
                  <p className="text-slate-400 text-sm">{exam.description}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                {[['Questions', exam.questions.length], ['Time Limit', `${exam.totalTime} min`], ['Pass Mark', `${exam.passMark}%`]].map(([k, v]) => (
                  <div key={k} className="bg-surface-700/50 rounded-lg p-2.5 text-center">
                    <div className="text-white font-bold text-sm">{v}</div>
                    <div className="text-slate-500 text-xs">{k}</div>
                  </div>
                ))}
              </div>
              {prev && (
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Best score: {prev.bestScore}%</span>
                    <span>{prev.attempts} attempt{prev.attempts > 1 ? 's' : ''}</span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${prev.passed ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${prev.bestScore}%` }} />
                  </div>
                </div>
              )}
              <Link to={`/mock-exam/${exam.id}`} className="btn-success inline-flex items-center gap-2 text-sm">
                {prev ? 'Retake Exam' : 'Start Exam'} <ChevronRight size={16} />
              </Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { LayoutDashboard, Trophy, Target, Brain, RefreshCw, BookOpen, TrendingUp } from 'lucide-react'
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts'
import { useProgress } from '../hooks/useProgress'
import { TEST_SETS, MOCK_EXAMS } from '../data/tests'
import { ROLEPLAY_SCENARIOS } from '../data/scenarios'

export default function DashboardPage() {
  const { progress, resetProgress } = useProgress()

  const testData = TEST_SETS.map(t => ({
    subject: t.title.split(' ')[0],
    score: progress.tests?.[t.id]?.bestScore || 0,
    fullMark: 100,
  }))

  const examData = MOCK_EXAMS.map(e => ({
    name: `Exam ${e.id.replace('mock', '')}`,
    score: progress.exams?.[e.id]?.bestScore || 0,
    passed: (progress.exams?.[e.id]?.bestScore || 0) >= e.passMark,
  }))

  const roleplayData = ROLEPLAY_SCENARIOS.map(s => ({
    name: s.title.split(' ').slice(0, 2).join(' '),
    score: progress.roleplay?.[s.id]?.bestScore || 0,
  }))

  const totalTests = TEST_SETS.length + MOCK_EXAMS.length + ROLEPLAY_SCENARIOS.length
  const completedTests = Object.keys(progress.tests || {}).length + Object.keys(progress.exams || {}).length + Object.keys(progress.roleplay || {}).length
  const completionPct = Math.round((completedTests / totalTests) * 100)

  const avgTestScore = Object.values(progress.tests || {}).length
    ? Math.round(Object.values(progress.tests).reduce((s, t) => s + t.bestScore, 0) / Object.values(progress.tests).length)
    : 0

  const passedExams = Object.values(progress.exams || {}).filter(e => e.passed).length

  return (
    <div className="px-4 py-8 max-w-4xl mx-auto">
      <div className="mb-8 animate-fade-in flex items-start justify-between">
        <div>
          <div className="inline-flex items-center gap-2 badge-blue mb-3"><LayoutDashboard size={14} /> Progress Dashboard</div>
          <h1 className="text-3xl font-black text-white mb-2">My Progress</h1>
          <p className="text-slate-400">Track your preparation across all activities.</p>
        </div>
        <button onClick={() => { if (confirm('Reset all progress? This cannot be undone.')) resetProgress() }}
          className="btn-secondary text-sm flex items-center gap-2 text-slate-500">
          <RefreshCw size={14} /> Reset
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { icon: Target, label: 'Completion', value: `${completionPct}%`, sub: `${completedTests}/${totalTests} activities`, color: 'text-blue-400' },
          { icon: TrendingUp, label: 'Avg Test Score', value: avgTestScore ? `${avgTestScore}%` : '—', sub: 'across practice tests', color: 'text-violet-400' },
          { icon: Trophy, label: 'Exams Passed', value: `${passedExams}/${MOCK_EXAMS.length}`, sub: 'mock exams ≥70%', color: 'text-emerald-400' },
          { icon: Brain, label: 'XP Points', value: progress.totalPoints || 0, sub: 'earned from activities', color: 'text-amber-400' },
        ].map(({ icon: Icon, label, value, sub, color }) => (
          <div key={label} className="glass-card p-4 text-center animate-slide-up">
            <Icon size={20} className={`${color} mx-auto mb-2`} />
            <div className={`text-2xl font-black ${color} mb-0.5`}>{value}</div>
            <div className="text-white text-xs font-medium">{label}</div>
            <div className="text-slate-600 text-xs">{sub}</div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Radar chart */}
        <div className="glass-card p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Target size={16} className="text-blue-400" /> Topic Coverage</h3>
          {avgTestScore > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <RadarChart data={testData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 11 }} />
                <Radar name="Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.25} dot={{ r: 3, fill: '#3b82f6' }} />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-slate-500 text-sm">
              Complete practice tests to see your topic coverage
            </div>
          )}
        </div>

        {/* Bar chart */}
        <div className="glass-card p-5">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Trophy size={16} className="text-emerald-400" /> Mock Exam Scores</h3>
          {passedExams > 0 || Object.keys(progress.exams || {}).length > 0 ? (
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={examData} barSize={40}>
                <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} />
                <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ background: '#0f1629', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff' }} />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {examData.map((entry, i) => (
                    <Cell key={i} fill={entry.passed ? '#10b981' : entry.score > 0 ? '#f59e0b' : '#374151'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-60 flex items-center justify-center text-slate-500 text-sm">
              Complete mock exams to see your scores
            </div>
          )}
        </div>
      </div>

      {/* Detailed test progress */}
      <div className="glass-card p-5 mb-6">
        <h3 className="text-white font-bold mb-4">Practice Tests</h3>
        <div className="space-y-3">
          {TEST_SETS.map(t => {
            const prev = progress.tests?.[t.id]
            return (
              <div key={t.id} className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{t.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 truncate">{t.title}</span>
                    <span className={`font-bold flex-shrink-0 ml-2 ${prev?.bestScore >= 70 ? 'text-emerald-400' : prev ? 'text-amber-400' : 'text-slate-600'}`}>
                      {prev ? `${prev.bestScore}%` : 'Not started'}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${prev?.bestScore >= 70 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                      style={{ width: `${prev?.bestScore || 0}%` }} />
                  </div>
                </div>
                <Link to={`/practice/${t.id}`} className="text-xs text-slate-500 hover:text-white flex-shrink-0 transition-colors">
                  {prev ? 'Retry' : 'Start'}
                </Link>
              </div>
            )
          })}
        </div>
      </div>

      {/* Roleplay progress */}
      <div className="glass-card p-5">
        <h3 className="text-white font-bold mb-4">Roleplay Scenarios</h3>
        <div className="space-y-3">
          {ROLEPLAY_SCENARIOS.map(s => {
            const prev = progress.roleplay?.[s.id]
            return (
              <div key={s.id} className="flex items-center gap-3">
                <span className="text-xl flex-shrink-0">{s.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-300 truncate">{s.title}</span>
                    <span className={`font-bold flex-shrink-0 ml-2 ${prev?.bestScore >= 68 ? 'text-emerald-400' : prev ? 'text-amber-400' : 'text-slate-600'}`}>
                      {prev ? `${prev.bestScore}%` : 'Not started'}
                    </span>
                  </div>
                  <div className="progress-bar">
                    <div className={`progress-fill ${prev?.bestScore >= 68 ? 'bg-emerald-500' : 'bg-blue-500'}`}
                      style={{ width: `${prev?.bestScore || 0}%` }} />
                  </div>
                </div>
                <Link to={`/roleplay/${s.id}`} className="text-xs text-slate-500 hover:text-white flex-shrink-0 transition-colors">
                  {prev ? 'Retry' : 'Start'}
                </Link>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

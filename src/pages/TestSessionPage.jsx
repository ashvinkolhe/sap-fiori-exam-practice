import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { TEST_SETS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'
import { Clock, ChevronLeft, RotateCcw, CheckCircle, XCircle, Lightbulb, BookOpen } from 'lucide-react'

const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

function DiffBadge({ level }) {
  const s = { Beginner: 'badge-emerald', Intermediate: 'badge-amber', Advanced: 'badge-red' }
  return level ? <span className={s[level] || 'badge-slate'}>{level}</span> : null
}

export default function TestSessionPage() {
  const { testId } = useParams()
  const { recordTestResult } = useProgress()
  const testSet = TEST_SETS.find(t => t.id === testId)

  const [phase, setPhase] = useState('intro') // intro | test | result
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [showExp, setShowExp] = useState(false)
  const [answers, setAnswers] = useState([])
  const [timeLeft, setTimeLeft] = useState(0)
  const [flagged, setFlagged] = useState(new Set())
  const timerRef = useRef(null)
  const topRef = useRef(null)

  useEffect(() => {
    if (phase === 'test') {
      setTimeLeft(testSet.estimatedTime * 60)
      timerRef.current = setInterval(() => setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); finishTest(answers); return 0 }
        return t - 1
      }), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [idx])

  if (!testSet) return <div className="p-8 text-slate-400">Test not found. <Link to="/practice" className="text-blue-400">Go back</Link></div>

  const q = testSet.questions[idx]

  const finishTest = (ans) => {
    clearInterval(timerRef.current)
    const correct = ans.filter(a => a.chosen === a.correct).length
    recordTestResult(testId, ans.length, ans.length, correct)
    setAnswers(ans)
    setPhase('result')
  }

  const pickAnswer = (i) => {
    if (chosen !== null) return
    setChosen(i)
    setShowExp(true)
  }

  const nextQuestion = () => {
    const newAnswers = [...answers, { qid: q.id, chosen, correct: q.correct }]
    if (idx + 1 >= testSet.questions.length) {
      finishTest(newAnswers)
    } else {
      setAnswers(newAnswers)
      setIdx(idx + 1)
      setChosen(null)
      setShowExp(false)
    }
  }

  const restart = () => {
    setPhase('intro'); setIdx(0); setChosen(null); setShowExp(false); setAnswers([]); setFlagged(new Set())
  }

  // Intro
  if (phase === 'intro') return (
    <div className="px-4 py-8 max-w-2xl mx-auto animate-fade-in">
      <Link to="/practice" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors">
        <ChevronLeft size={16} /> All Tests
      </Link>
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">{testSet.icon}</div>
        <h1 className="text-2xl font-black text-white mb-2">{testSet.title}</h1>
        <p className="text-slate-400 text-sm">{testSet.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-8">
        {[['Questions', testSet.questions.length], ['Time', `${testSet.estimatedTime} min`], ['Pass Mark', '70%']].map(([k, v]) => (
          <div key={k} className="glass-card p-4 text-center">
            <div className="text-xl font-black text-white mb-0.5">{v}</div>
            <div className="text-slate-500 text-xs">{k}</div>
          </div>
        ))}
      </div>
      <div className="glass-card border border-blue-500/15 p-4 mb-6 text-sm text-slate-300">
        <div className="text-blue-400 font-semibold mb-2">📋 Tips for this test:</div>
        <ul className="space-y-1 text-slate-400">
          <li>• Each question is a scenario — read the full situation before answering</li>
          <li>• Explanations appear after each answer — read them carefully</li>
          <li>• All topics align with the C_FIORD_2601 exam format</li>
          <li>• This is open-book practice — use your notes freely</li>
        </ul>
      </div>
      <button onClick={() => setPhase('test')} className="w-full btn-violet py-4 text-base">
        Start Test →
      </button>
    </div>
  )

  // Result
  if (phase === 'result') {
    const correct = answers.filter(a => a.chosen === a.correct).length
    const pct = Math.round((correct / answers.length) * 100)
    const passed = pct >= 70
    return (
      <div className="px-4 py-8 max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">{passed ? '🎉' : '📚'}</div>
          <h2 className="text-2xl font-black text-white mb-1">{testSet.title}</h2>
          <p className={`text-4xl font-black mt-3 ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>{correct}/{answers.length}</p>
          <p className={`text-lg font-bold ${passed ? 'text-emerald-400' : 'text-amber-400'}`}>{pct}%</p>
          <p className="text-slate-400 text-sm mt-1">{passed ? '✅ Above 70% pass threshold' : '❌ Below 70% — review explanations below'}</p>
        </div>
        {/* Per-question review */}
        <div className="space-y-3 mb-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">Question Review</h3>
          {testSet.questions.map((q, i) => {
            const a = answers[i]
            if (!a) return null
            const ok = a.chosen === a.correct
            return (
              <div key={q.id} className={`glass-card border p-4 ${ok ? 'border-emerald-500/20' : 'border-red-500/20'}`}>
                <div className="flex items-start gap-2 mb-2">
                  {ok ? <CheckCircle size={16} className="text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />}
                  <p className="text-white text-sm font-medium">{q.question}</p>
                </div>
                {!ok && (
                  <div className="ml-6 space-y-1 text-xs mb-2">
                    <p className="text-red-300">Your answer: {q.choices[a.chosen]}</p>
                    <p className="text-emerald-300">Correct: {q.choices[a.correct]}</p>
                  </div>
                )}
                <div className="ml-6 bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-xs text-slate-300 leading-relaxed">
                  <span className="text-blue-400 font-semibold">Explanation: </span>{q.explanation}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-2">
          <button onClick={restart} className="flex-1 btn-violet flex items-center justify-center gap-2"><RotateCcw size={16} /> Retry</button>
          <Link to="/practice" className="flex-1 btn-secondary flex items-center justify-center gap-2"><ChevronLeft size={16} /> All Tests</Link>
        </div>
      </div>
    )
  }

  // Test session
  const timerColor = timeLeft > 120 ? '#34d399' : timeLeft > 30 ? '#fbbf24' : '#f87171'
  const correct_so_far = answers.filter(a => a.chosen === a.correct).length

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto" ref={topRef}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4 sticky top-0 bg-surface-900/90 backdrop-blur-sm py-2 -mx-4 px-4 z-10">
        <Link to="/practice" className="text-slate-500 hover:text-white"><ChevronLeft size={18} /></Link>
        <div className="flex-1">
          <div className="h-2 bg-surface-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-violet-600 to-blue-500 rounded-full transition-all duration-500"
              style={{ width: `${((idx) / testSet.questions.length) * 100}%` }} />
          </div>
          <div className="flex justify-between mt-1 text-xs text-slate-600">
            <span>{idx + 1}/{testSet.questions.length}</span>
            <span className="flex items-center gap-1 text-emerald-400"><CheckCircle size={10} /> {correct_so_far} correct</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-sm font-mono font-bold" style={{ color: timerColor }}>
          <Clock size={14} style={{ color: timerColor }} /> {fmtTime(timeLeft)}
        </div>
      </div>

      {/* Question */}
      <div className="glass-card border border-white/8 p-5 mb-4 animate-fade-in" key={idx}>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-slate-500 text-xs font-mono">Q{idx + 1}</span>
          <DiffBadge level={q.difficulty} />
          <span className="badge-slate text-[10px]">{q.topic}</span>
        </div>
        {q.scenario && (
          <div className="bg-surface-700/60 border border-white/8 rounded-xl p-4 mb-4 text-sm text-slate-300 leading-relaxed italic">
            📋 {q.scenario}
          </div>
        )}
        <p className="text-white font-semibold leading-relaxed">{q.question}</p>
      </div>

      {/* Choices */}
      <div className="space-y-2.5 mb-5">
        {q.choices.map((c, i) => {
          const isCorrect = i === q.correct
          const isChosen = i === chosen
          let cls = 'border-white/8 text-slate-300 hover:border-slate-500 hover:bg-white/5 cursor-pointer'
          if (chosen !== null) {
            if (isCorrect) cls = 'border-emerald-500 bg-emerald-900/30 text-emerald-200 cursor-default'
            else if (isChosen) cls = 'border-red-500 bg-red-900/30 text-red-200 cursor-default'
            else cls = 'border-surface-600 bg-surface-800/30 text-slate-600 cursor-default'
          }
          return (
            <button key={i} onClick={() => pickAnswer(i)} disabled={chosen !== null}
              className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-200 ${cls}`}>
              <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 border-2 transition-all ${chosen === null ? 'border-slate-600 text-slate-500' : isCorrect ? 'border-emerald-500 bg-emerald-600 text-white' : isChosen ? 'border-red-500 bg-red-600 text-white' : 'border-surface-500 text-slate-600'}`}>
                {chosen !== null && isCorrect ? '✓' : chosen !== null && isChosen ? '✗' : String.fromCharCode(65 + i)}
              </span>
              <span className="text-sm leading-relaxed">{c}</span>
            </button>
          )
        })}
      </div>

      {/* Explanation */}
      {showExp && (
        <div className="glass border border-blue-500/20 rounded-xl p-4 mb-4 animate-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb size={16} className="text-blue-400" />
            <span className={`text-sm font-bold ${chosen === q.correct ? 'text-emerald-400' : 'text-red-400'}`}>
              {chosen === q.correct ? '✅ Correct!' : '❌ Incorrect'}
            </span>
          </div>
          <p className="text-slate-300 text-sm leading-relaxed">{q.explanation}</p>
          {q.keyFact && (
            <div className="mt-3 code-block">
              <span className="text-slate-500 text-xs">💡 Key fact: </span>{q.keyFact}
            </div>
          )}
        </div>
      )}

      {chosen !== null && (
        <button onClick={nextQuestion} className="w-full btn-violet py-3 text-base animate-slide-up">
          {idx + 1 >= testSet.questions.length ? '📊 See Results' : 'Next Question →'}
        </button>
      )}
    </div>
  )
}

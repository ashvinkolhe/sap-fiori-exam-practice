import { useState, useEffect, useRef } from 'react'
import { useParams, Link } from 'react-router-dom'
import { MOCK_EXAMS } from '../data/tests'
import { useProgress } from '../hooks/useProgress'
import { Clock, ChevronLeft, RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`

export default function MockExamSessionPage() {
  const { examId } = useParams()
  const { recordExamResult } = useProgress()
  const exam = MOCK_EXAMS.find(e => e.id === examId)

  const [phase, setPhase] = useState('intro')
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [chosen, setChosen] = useState(null)
  const [timeLeft, setTimeLeft] = useState(0)
  const [flagged, setFlagged] = useState(new Set())
  const timerRef = useRef(null)
  const topRef = useRef(null)

  useEffect(() => {
    if (phase === 'exam') {
      setTimeLeft(exam.totalTime * 60)
      timerRef.current = setInterval(() => setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); endExam(answers); return 0 }
        return t - 1
      }), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  useEffect(() => { topRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [idx])

  if (!exam) return <div className="p-8 text-slate-400">Exam not found. <Link to="/mock-exam" className="text-blue-400">Go back</Link></div>

  const endExam = (ans) => {
    clearInterval(timerRef.current)
    const correct = ans.filter(a => a.chosen === a.correct).length
    recordExamResult(examId, ans.length, ans.length, correct)
    setAnswers(ans)
    setPhase('result')
  }

  const pick = (i) => { if (chosen !== null) return; setChosen(i) }

  const next = () => {
    const newAns = [...answers, { qid: exam.questions[idx].id, chosen: chosen ?? -1, correct: exam.questions[idx].correct }]
    if (idx + 1 >= exam.questions.length) { endExam(newAns) }
    else { setAnswers(newAns); setIdx(idx + 1); setChosen(null) }
  }

  const restart = () => { setPhase('intro'); setIdx(0); setAnswers([]); setChosen(null); setFlagged(new Set()) }

  const toggleFlag = () => setFlagged(f => { const n = new Set(f); n.has(idx) ? n.delete(idx) : n.add(idx); return n })

  if (phase === 'intro') return (
    <div className="px-4 py-8 max-w-2xl mx-auto animate-fade-in">
      <Link to="/mock-exam" className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-6 transition-colors"><ChevronLeft size={16} /> All Exams</Link>
      <div className="text-center mb-8">
        <div className="text-5xl mb-4">📋</div>
        <h1 className="text-2xl font-black text-white mb-2">{exam.title}</h1>
        <p className="text-slate-400 text-sm">{exam.description}</p>
      </div>
      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-6">
        {[['Questions', exam.questions.length], ['Time', `${exam.totalTime} min`], ['Pass', `${exam.passMark}%`]].map(([k, v]) => (
          <div key={k} className="glass-card p-4 text-center"><div className="text-xl font-black text-white">{v}</div><div className="text-slate-500 text-xs">{k}</div></div>
        ))}
      </div>
      <div className="bg-red-900/20 border border-red-500/20 rounded-xl p-4 mb-6 text-sm text-slate-300">
        <div className="text-red-400 font-semibold mb-2">⏱️ Exam Rules:</div>
        <ul className="space-y-1 text-slate-400">
          <li>• Timer starts immediately when you click Start</li>
          <li>• You cannot pause the exam</li>
          <li>• Unanswered questions count as incorrect</li>
          <li>• Full question review shown at the end</li>
          <li>• C_FIORD_2601 is open-book — use notes freely</li>
        </ul>
      </div>
      <button onClick={() => setPhase('exam')} className="w-full btn-success py-4 text-base">
        🚀 Start Exam — Timer Begins
      </button>
    </div>
  )

  if (phase === 'result') {
    const correct = answers.filter(a => a.chosen === a.correct).length
    const pct = Math.round((correct / exam.questions.length) * 100)
    const passed = pct >= exam.passMark
    return (
      <div className="px-4 py-8 max-w-2xl mx-auto animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-6xl mb-3">{passed ? '🏆' : '📚'}</div>
          <h2 className="text-2xl font-black text-white mb-1">{exam.title}</h2>
          <p className={`text-5xl font-black mt-3 ${passed ? 'text-emerald-400' : 'text-red-400'}`}>{pct}%</p>
          <p className="text-slate-400">{correct}/{exam.questions.length} correct</p>
          <div className={`mt-3 inline-block px-4 py-1.5 rounded-full text-sm font-bold ${passed ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30' : 'bg-red-900/40 text-red-300 border border-red-500/30'}`}>
            {passed ? `✅ PASS — above ${exam.passMark}%` : `❌ FAIL — below ${exam.passMark}%`}
          </div>
        </div>
        {/* Answer grid */}
        <div className="glass-card p-4 mb-6">
          <div className="text-slate-400 text-xs font-bold uppercase mb-3">Question breakdown</div>
          <div className="flex flex-wrap gap-2">
            {answers.map((a, i) => (
              <div key={i} title={`Q${i + 1}: ${a.chosen === a.correct ? 'Correct' : 'Wrong'}`}
                className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border ${a.chosen === a.correct ? 'bg-emerald-900/40 text-emerald-400 border-emerald-700/40' : 'bg-red-900/40 text-red-400 border-red-700/40'}`}>
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        {/* Review */}
        <div className="space-y-3 mb-6">
          <h3 className="text-white font-bold text-sm uppercase tracking-wider">Question Review</h3>
          {exam.questions.map((q, i) => {
            const a = answers[i]
            if (!a) return null
            const ok = a.chosen === a.correct
            return (
              <div key={q.id} className={`glass-card border p-4 ${ok ? 'border-emerald-500/15' : 'border-red-500/15'}`}>
                <div className="flex items-start gap-2 mb-2">
                  {ok ? <CheckCircle size={15} className="text-emerald-400 flex-shrink-0 mt-0.5" /> : <XCircle size={15} className="text-red-400 flex-shrink-0 mt-0.5" />}
                  <p className="text-white text-sm font-medium leading-relaxed">{q.question}</p>
                </div>
                {!ok && (
                  <div className="ml-5 mb-2 space-y-0.5 text-xs">
                    <p className="text-red-300">Your answer: {a.chosen >= 0 ? q.choices[a.chosen] : '(not answered)'}</p>
                    <p className="text-emerald-300">Correct: {q.choices[a.correct]}</p>
                  </div>
                )}
                <div className="ml-5 bg-surface-700/60 border border-white/8 rounded-lg p-3 text-xs text-slate-300 leading-relaxed">
                  {q.explanation}
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-2">
          <button onClick={restart} className="flex-1 btn-success flex items-center justify-center gap-2"><RotateCcw size={16} /> Retake</button>
          <Link to="/mock-exam" className="flex-1 btn-secondary flex items-center justify-center gap-2"><ChevronLeft size={16} /> All Exams</Link>
        </div>
      </div>
    )
  }

  // Exam
  const q = exam.questions[idx]
  const timerPct = (timeLeft / (exam.totalTime * 60)) * 100
  const timerDanger = timeLeft < 120
  const timerWarn = timeLeft < 300

  return (
    <div className="px-4 py-4 max-w-2xl mx-auto" ref={topRef}>
      {/* Sticky header */}
      <div className="sticky top-0 bg-surface-900/95 backdrop-blur-md -mx-4 px-4 py-3 z-10 border-b border-white/8 mb-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-slate-400 text-sm font-mono">Q{idx + 1}/{exam.questions.length}</span>
          <div className="flex-1 h-1.5 bg-surface-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-emerald-600 to-blue-500 rounded-full transition-all"
              style={{ width: `${((idx) / exam.questions.length) * 100}%` }} />
          </div>
          <div className={`flex items-center gap-1.5 font-mono text-sm font-bold ${timerDanger ? 'text-red-400 animate-pulse' : timerWarn ? 'text-amber-400' : 'text-emerald-400'}`}>
            <Clock size={14} /> {fmtTime(timeLeft)}
          </div>
          <button onClick={toggleFlag} className={`p-1.5 rounded-lg text-xs transition-colors ${flagged.has(idx) ? 'text-amber-400 bg-amber-900/30' : 'text-slate-500 hover:text-amber-400'}`}>
            <AlertCircle size={16} />
          </button>
        </div>
        {timerDanger && <div className="text-red-400 text-xs text-center font-semibold animate-pulse">⚠️ Less than 2 minutes remaining!</div>}
      </div>

      <div className="glass-card border border-white/8 p-5 mb-4 animate-fade-in" key={idx}>
        {q.scenario && (
          <div className="bg-surface-700/60 border border-white/8 rounded-xl p-4 mb-4 text-sm text-slate-300 leading-relaxed italic">
            📋 {q.scenario}
          </div>
        )}
        <p className="text-white font-semibold leading-relaxed">{q.question}</p>
      </div>

      <div className="space-y-2.5 mb-6">
        {q.choices.map((c, i) => (
          <button key={i} onClick={() => pick(i)}
            className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left transition-all duration-150 ${chosen === i ? 'border-blue-500 bg-blue-900/20 text-white' : 'border-white/8 text-slate-300 hover:border-slate-500 hover:bg-white/5'}`}>
            <span className={`w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold mt-0.5 border-2 transition-all flex-shrink-0 ${chosen === i ? 'border-blue-400 bg-blue-600 text-white' : 'border-slate-600 text-slate-500'}`}>
              {String.fromCharCode(65 + i)}
            </span>
            <span className="text-sm leading-relaxed">{c}</span>
          </button>
        ))}
      </div>

      <button onClick={next} className={`w-full py-3.5 rounded-xl font-semibold text-base transition-all ${chosen !== null ? 'btn-success' : 'bg-surface-700 text-slate-500 cursor-pointer hover:bg-surface-600'}`}>
        {chosen === null ? 'Skip Question →' : idx + 1 >= exam.questions.length ? '📊 Finish Exam' : 'Next Question →'}
      </button>
    </div>
  )
}

import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { ROLEPLAY_SCENARIOS } from '../data/scenarios'
import { useProgress } from '../hooks/useProgress'
import { Send, Lightbulb, Clock, ChevronLeft, RotateCcw, Home, Trophy, X, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const fmtTime = s => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`

function scoreAnswer(userText, step) {
  const lower = userText.toLowerCase()
  const { excellent, good, partial } = step.scoringKeywords
  const hits = arr => arr.filter(k => lower.includes(k.toLowerCase())).length
  const eScore = hits(excellent)
  const gScore = hits(good)
  const pScore = hits(partial)
  if (eScore >= 2) return { level: 'excellent', score: 10 }
  if (eScore >= 1 || gScore >= 2) return { level: 'good', score: 7 }
  if (gScore >= 1 || pScore >= 2) return { level: 'partial', score: 4 }
  return { level: 'miss', score: 1 }
}

// Renders a single chat bubble — aria or user
function ChatBubble({ msg }) {
  const isAria = msg.from === 'aria'
  return (
    <div style={{ display:'flex', gap:10, flexDirection: isAria ? 'row' : 'row-reverse', animation:'slideUp .3s ease' }}>
      {/* Avatar */}
      <div style={{
        width:34, height:34, borderRadius:'50%', flexShrink:0,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontSize:13, fontWeight:700,
        background: isAria ? 'linear-gradient(135deg,#2563eb,#7c3aed)' : 'rgba(255,255,255,0.1)',
        color: '#fff', border: isAria ? 'none' : '1px solid rgba(255,255,255,0.15)',
      }}>
        {isAria ? 'A' : 'Y'}
      </div>

      <div style={{ maxWidth:'82%', display:'flex', flexDirection:'column', gap:6, alignItems: isAria ? 'flex-start' : 'flex-end' }}>
        {/* Main bubble */}
        <div style={{
          padding:'11px 14px', fontSize:13, lineHeight:1.65,
          borderRadius: isAria ? '14px 14px 14px 4px' : '14px 14px 4px 14px',
          background: isAria ? 'rgba(255,255,255,0.06)' : '#2563eb',
          border: isAria ? '1px solid rgba(255,255,255,0.1)' : 'none',
          color: isAria ? '#e2e8f0' : '#fff',
        }}>
          {msg.text.split('\n').map((line, i, arr) => {
            const boldLine = line.split('**').map((chunk, j) =>
              j % 2 === 1 ? <strong key={j} style={{ color:'#fff', fontWeight:600 }}>{chunk}</strong> : chunk
            )
            return <span key={i}>{boldLine}{i < arr.length - 1 && <br />}</span>
          })}
        </div>

        {/* ✅ Score badge — shown on ARIA bubbles that have a score */}
        {msg.score !== undefined && (
          <div style={{
            display:'inline-flex', alignItems:'center', gap:5, fontSize:11, fontWeight:700,
            padding:'3px 10px', borderRadius:20,
            background: msg.score >= 8 ? 'rgba(16,185,129,0.15)' : msg.score >= 5 ? 'rgba(245,158,11,0.15)' : 'rgba(239,68,68,0.15)',
            color: msg.score >= 8 ? '#34d399' : msg.score >= 5 ? '#fbbf24' : '#f87171',
            border: `1px solid ${msg.score >= 8 ? 'rgba(16,185,129,0.3)' : msg.score >= 5 ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)'}`,
          }}>
            {msg.score >= 8 ? '✅' : msg.score >= 5 ? '⚠️' : '❌'} Step score: {msg.score}/10
          </div>
        )}

        {/* ❌ WRONG ANSWER FEEDBACK BOX — shown when score is low */}
        {msg.wrongFeedback && (
          <div style={{
            width:'100%', borderRadius:12, overflow:'hidden',
            border:'1px solid rgba(239,68,68,0.35)',
            background:'rgba(239,68,68,0.08)',
          }}>
            <div style={{
              display:'flex', alignItems:'center', gap:7, padding:'8px 12px',
              background:'rgba(239,68,68,0.15)', borderBottom:'1px solid rgba(239,68,68,0.2)',
              fontSize:11, fontWeight:700, color:'#f87171',
            }}>
              <XCircle size={13} /> Your answer missed key concepts
            </div>
            {msg.wrongFeedback.userAnswer && (
              <div style={{ padding:'8px 12px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ fontSize:10, color:'#f87171', fontWeight:600, marginBottom:3 }}>❌ What you said:</div>
                <div style={{ fontSize:12, color:'#fca5a5', fontStyle:'italic' }}>"{msg.wrongFeedback.userAnswer}"</div>
              </div>
            )}
            <div style={{ padding:'8px 12px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:10, color:'#34d399', fontWeight:700, marginBottom:4 }}>
                <CheckCircle size={12} /> Model answer:
              </div>
              <div style={{ fontSize:12, color:'#6ee7b7', lineHeight:1.6 }}>
                {msg.wrongFeedback.correctAnswer}
              </div>
            </div>
            <div style={{ padding:'8px 12px' }}>
              <div style={{ fontSize:10, color:'#60a5fa', fontWeight:700, marginBottom:3 }}>💡 Explanation:</div>
              <div style={{ fontSize:11, color:'#93c5fd', lineHeight:1.6 }}>{msg.wrongFeedback.explanation}</div>
            </div>
          </div>
        )}

        {/* ⚠️ PARTIAL ANSWER FEEDBACK — shown when score is partial */}
        {msg.partialFeedback && (
          <div style={{
            width:'100%', borderRadius:12, overflow:'hidden',
            border:'1px solid rgba(245,158,11,0.35)',
            background:'rgba(245,158,11,0.06)',
          }}>
            <div style={{
              display:'flex', alignItems:'center', gap:7, padding:'7px 12px',
              background:'rgba(245,158,11,0.12)', borderBottom:'1px solid rgba(245,158,11,0.2)',
              fontSize:11, fontWeight:700, color:'#fbbf24',
            }}>
              <AlertCircle size={13} /> Partially correct — you missed some key points
            </div>
            <div style={{ padding:'8px 12px', borderBottom:'1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ fontSize:10, color:'#34d399', fontWeight:700, marginBottom:4 }}>
                <CheckCircle size={11} style={{ display:'inline', marginRight:4 }} />Complete model answer:
              </div>
              <div style={{ fontSize:12, color:'#6ee7b7', lineHeight:1.6 }}>{msg.partialFeedback.correctAnswer}</div>
            </div>
            <div style={{ padding:'8px 12px' }}>
              <div style={{ fontSize:10, color:'#60a5fa', fontWeight:700, marginBottom:3 }}>📌 Key concept:</div>
              <div style={{ fontSize:11, color:'#93c5fd', lineHeight:1.6 }}>{msg.partialFeedback.explanation}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default function RoleplaySessionPage() {
  const { scenarioId } = useParams()
  const { recordRoleplayResult } = useProgress()
  const scenario = ROLEPLAY_SCENARIOS.find(s => s.id === scenarioId)

  const [phase, setPhase] = useState('brief')
  const [stepIdx, setStepIdx] = useState(0)
  const [msgs, setMsgs] = useState([])
  const [input, setInput] = useState('')
  const [stepScores, setStepScores] = useState([])
  const [showHint, setShowHint] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30 * 60)
  const [isTyping, setIsTyping] = useState(false)
  const bottomRef = useRef(null)
  const timerRef = useRef(null)
  const textareaRef = useRef(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs, isTyping])

  useEffect(() => {
    if (phase === 'session') {
      timerRef.current = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [phase])

  const beginSession = useCallback(() => {
    setPhase('session')
    setMsgs([{ id: 0, from:'aria', text: scenario.steps[0].ariaMessage }])
    setStepIdx(0)
  }, [scenario])

  const submitAnswer = useCallback(() => {
    if (!input.trim() || isTyping) return
    const currentStep = scenario.steps[stepIdx]
    const userText = input.trim()
    setInput('')
    setShowHint(false)

    const { level, score } = scoreAnswer(userText, currentStep)
    const newScores = [...stepScores, { stepId: currentStep.stepId, score, level }]
    setStepScores(newScores)

    // Add user bubble
    setMsgs(prev => [...prev, { id: Date.now(), from:'user', text: userText }])
    setIsTyping(true)

    setTimeout(() => {
      const ariaText = currentStep.responses[level] || currentStep.responses.partial

      // Build the ARIA message with optional wrong/partial feedback
      const ariaMsg = {
        id: Date.now() + 1,
        from: 'aria',
        text: ariaText,
        score,
      }

      // ❌ MISS: show correct answer + explanation
      if (level === 'miss' && currentStep.correctAnswer) {
        ariaMsg.wrongFeedback = {
          userAnswer: userText.length > 120 ? userText.slice(0, 120) + '…' : userText,
          correctAnswer: currentStep.correctAnswer,
          explanation: currentStep.explanation,
        }
      }

      // ⚠️ PARTIAL: show complete model answer
      if (level === 'partial' && currentStep.correctAnswer) {
        ariaMsg.partialFeedback = {
          correctAnswer: currentStep.correctAnswer,
          explanation: currentStep.explanation,
        }
      }

      const updated = [...msgs, { id: Date.now(), from:'user', text: userText }, ariaMsg]
      setMsgs(updated)
      setIsTyping(false)

      if (currentStep.isFinal || stepIdx >= scenario.steps.length - 1) {
        clearInterval(timerRef.current)
        setTimeout(() => {
          const total = newScores.reduce((s, x) => s + x.score, 0)
          const max = scenario.steps.length * 10
          recordRoleplayResult(scenarioId, total, max)
          setPhase('result')
        }, 1500)
      } else {
        setStepIdx(si => si + 1)
      }
    }, 1000)
  }, [input, isTyping, scenario, stepIdx, stepScores, msgs, scenarioId, recordRoleplayResult])

  const handleKeyDown = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submitAnswer() }
  }

  if (!scenario) return (
    <div style={{ padding:32, color:'#64748b' }}>
      Scenario not found. <Link to="/roleplay" style={{ color:'#60a5fa' }}>Go back</Link>
    </div>
  )

  /* ── BRIEF SCREEN ── */
  if (phase === 'brief') return (
    <div style={{ padding:'24px 16px', maxWidth:680, margin:'0 auto' }}>
      <Link to="/roleplay" style={{
        display:'inline-flex', alignItems:'center', gap:6, color:'#64748b',
        fontSize:13, textDecoration:'none', marginBottom:20,
      }}>
        <ChevronLeft size={16} /> All Scenarios
      </Link>

      <div style={{ textAlign:'center', marginBottom:20 }}>
        <div style={{ fontSize:52, marginBottom:10 }}>{scenario.icon}</div>
        <h1 style={{ fontSize:22, fontWeight:800, color:'#fff', marginBottom:6 }}>{scenario.title}</h1>
        <div style={{ fontSize:12, color:'#64748b' }}>
          <Clock size={12} style={{ display:'inline', marginRight:4 }} />{scenario.estimatedTime} · {scenario.steps.length} questions
        </div>
      </div>

      <div style={{ background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.09)', borderRadius:14, padding:18, marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#60a5fa', textTransform:'uppercase', letterSpacing:'.06em', marginBottom:10 }}>📄 Your Brief</div>
        <pre style={{ color:'#cbd5e1', fontSize:13, lineHeight:1.7, whiteSpace:'pre-wrap', fontFamily:'inherit', margin:0 }}>{scenario.brief}</pre>
      </div>

      <div style={{ background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.08)', borderRadius:14, padding:14, marginBottom:14 }}>
        <div style={{ fontSize:11, fontWeight:700, color:'#94a3b8', textTransform:'uppercase', marginBottom:10 }}>🎯 Evaluated On</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {scenario.scoringAreas.map((a, i) => (
            <div key={i} style={{ display:'flex', alignItems:'center', gap:8, fontSize:12, color:'#cbd5e1' }}>
              <span style={{
                width:20, height:20, borderRadius:'50%', flexShrink:0,
                background:'rgba(59,130,246,0.2)', border:'1px solid rgba(59,130,246,0.3)',
                display:'flex', alignItems:'center', justifyContent:'center',
                fontSize:10, fontWeight:700, color:'#60a5fa',
              }}>{i + 1}</span>
              {a.area}
            </div>
          ))}
        </div>
      </div>

      <div style={{ background:'rgba(16,185,129,0.08)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:14, padding:14, marginBottom:20, fontSize:12, color:'#cbd5e1' }}>
        <span style={{ color:'#34d399', fontWeight:700 }}>💡 Open-book tip: </span>
        Use exact SAP terminology. Name specific tools and config paths. ARIA scores your reasoning, not just keywords. If you answer poorly, you'll see the model answer immediately.
      </div>

      <button onClick={beginSession} style={{
        width:'100%', padding:'14px', borderRadius:12,
        background:'linear-gradient(135deg,#2563eb,#3b82f6)',
        color:'#fff', fontWeight:700, fontSize:15, border:'none', cursor:'pointer',
      }}>
        🎬 Begin Assessment with ARIA
      </button>
    </div>
  )

  /* ── RESULT SCREEN ── */
  if (phase === 'result') {
    const total = stepScores.reduce((s, x) => s + x.score, 0)
    const max = scenario.steps.length * 10
    const pct = Math.round((total / max) * 100)
    const passed = pct >= 68
    return (
      <div style={{ padding:'32px 16px', maxWidth:480, margin:'0 auto' }}>
        <div style={{ textAlign:'center', marginBottom:24 }}>
          <div style={{ fontSize:56, marginBottom:10 }}>{passed ? '🏆' : '📚'}</div>
          <h2 style={{ fontSize:22, fontWeight:800, color:'#fff', marginBottom:4 }}>{passed ? 'Excellent Performance!' : 'Keep Practising'}</h2>
          <p style={{ color:'#64748b', fontSize:13 }}>{scenario.title}</p>
        </div>

        <div style={{
          border:`1px solid ${passed ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}`,
          background: passed ? 'rgba(16,185,129,0.06)' : 'rgba(245,158,11,0.06)',
          borderRadius:16, padding:18, marginBottom:18,
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <span style={{ color:'#fff', fontWeight:700 }}>Overall Score</span>
            <span style={{ fontSize:22, fontWeight:800, color: passed ? '#34d399' : '#fbbf24' }}>{total}/{max} ({pct}%)</span>
          </div>
          {stepScores.map((s, i) => {
            const area = scenario.scoringAreas[i]
            return (
              <div key={i} style={{ marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:4 }}>
                  <span style={{ color:'#cbd5e1' }}>{area?.area || `Step ${i + 1}`}</span>
                  <span style={{ fontWeight:700, fontSize:11, color: s.score >= 8 ? '#34d399' : s.score >= 5 ? '#fbbf24' : '#f87171' }}>
                    {s.score}/10
                  </span>
                </div>
                <div style={{ height:5, background:'rgba(255,255,255,0.08)', borderRadius:3, overflow:'hidden' }}>
                  <div style={{
                    height:'100%', borderRadius:3, transition:'width .8s',
                    width:`${s.score * 10}%`,
                    background: s.score >= 8 ? '#10b981' : s.score >= 5 ? '#f59e0b' : '#ef4444',
                  }} />
                </div>
              </div>
            )
          })}
          <div style={{
            marginTop:14, textAlign:'center', fontSize:13, fontWeight:700, padding:'8px',
            borderRadius:10,
            background: passed ? 'rgba(16,185,129,0.15)' : 'rgba(245,158,11,0.15)',
            color: passed ? '#34d399' : '#fbbf24',
          }}>
            {passed ? '✅ Pass threshold (68%) achieved' : `❌ Need ${Math.ceil(max * 0.68) - total} more points for 68%`}
          </div>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
          <button onClick={() => { setPhase('brief'); setStepIdx(0); setMsgs([]); setStepScores([]); setTimeLeft(30 * 60) }}
            style={{ padding:'12px', borderRadius:12, background:'linear-gradient(135deg,#2563eb,#3b82f6)', color:'#fff', fontWeight:700, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <RotateCcw size={16} /> Try Again
          </button>
          <Link to="/roleplay" style={{ padding:'12px', borderRadius:12, background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', color:'#fff', fontWeight:600, textDecoration:'none', textAlign:'center', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <ChevronLeft size={16} /> All Scenarios
          </Link>
        </div>
      </div>
    )
  }

  /* ── CHAT SESSION ── */
  const currentStep = scenario.steps[stepIdx]
  const timerColor = timeLeft > 600 ? '#34d399' : timeLeft > 180 ? '#fbbf24' : '#f87171'
  const isDone = !isTyping && stepScores.length >= scenario.steps.length

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', background:'#0a0e1a' }}>
      {/* Top bar */}
      <div style={{
        display:'flex', alignItems:'center', gap:10, padding:'10px 14px',
        background:'rgba(15,22,41,0.95)', borderBottom:'1px solid rgba(255,255,255,0.08)', flexShrink:0,
      }}>
        <div style={{
          width:34, height:34, borderRadius:'50%', flexShrink:0,
          background:'linear-gradient(135deg,#2563eb,#7c3aed)',
          display:'flex', alignItems:'center', justifyContent:'center',
          color:'#fff', fontSize:13, fontWeight:700,
        }}>A</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ color:'#fff', fontSize:13, fontWeight:600 }}>ARIA — SAP Fiori Expert Evaluator</div>
          <div style={{ color:'#475569', fontSize:10, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {scenario.title} · Step {Math.min(stepIdx + 1, scenario.steps.length)}/{scenario.steps.length}
          </div>
        </div>
        <div style={{
          display:'flex', alignItems:'center', gap:5, padding:'5px 10px',
          background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:9,
          fontFamily:'monospace', fontSize:13, fontWeight:700, color:timerColor,
        }}>
          <Clock size={13} color={timerColor} /> {fmtTime(timeLeft)}
        </div>
        <Link to="/roleplay" style={{ padding:6, color:'#475569', textDecoration:'none' }}><X size={17} /></Link>
      </div>

      {/* Step progress pips */}
      <div style={{ display:'flex', gap:4, padding:'7px 14px', background:'rgba(0,0,0,0.2)', flexShrink:0 }}>
        {scenario.steps.map((_, i) => (
          <div key={i} style={{
            height:3, flex:1, borderRadius:2, transition:'background .5s',
            background: i < stepScores.length ? '#10b981' : i === stepIdx ? '#3b82f6' : 'rgba(255,255,255,0.1)',
          }} />
        ))}
      </div>

      {/* Messages */}
      <div style={{ flex:1, overflowY:'auto', padding:'14px 14px', display:'flex', flexDirection:'column', gap:12 }}>
        {msgs.map(msg => <ChatBubble key={msg.id} msg={msg} />)}

        {isTyping && (
          <div style={{ display:'flex', gap:10 }}>
            <div style={{
              width:34, height:34, borderRadius:'50%', flexShrink:0,
              background:'linear-gradient(135deg,#2563eb,#7c3aed)',
              display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:13, fontWeight:700,
            }}>A</div>
            <div style={{ padding:'12px 14px', background:'rgba(255,255,255,0.06)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:'14px 14px 14px 4px', display:'flex', gap:5, alignItems:'center' }}>
              {[0,150,300].map(d => (
                <span key={d} style={{
                  width:7, height:7, borderRadius:'50%', background:'#3b82f6',
                  animation:'bounce 1s infinite', animationDelay:`${d}ms`,
                  display:'inline-block',
                }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Hint */}
      {showHint && currentStep && (
        <div style={{ margin:'0 14px 8px', padding:'9px 12px', background:'rgba(245,158,11,0.1)', border:'1px solid rgba(245,158,11,0.25)', borderRadius:11, fontSize:12, color:'#fbbf24', display:'flex', alignItems:'flex-start', gap:7 }}>
          <Lightbulb size={14} style={{ flexShrink:0, marginTop:1 }} /> {currentStep.hint}
        </div>
      )}

      {/* Input area */}
      <div style={{ padding:'10px 12px', borderTop:'1px solid rgba(255,255,255,0.08)', flexShrink:0, background:'rgba(15,22,41,0.8)' }}>
        {!isDone ? (
          <>
            <div style={{ display:'flex', gap:8, alignItems:'flex-end' }}>
              <textarea ref={textareaRef} value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKeyDown}
                placeholder="Explain your approach…"
                disabled={isTyping} rows={2}
                style={{
                  flex:1, background:'rgba(255,255,255,0.05)', border:'1px solid rgba(255,255,255,0.1)',
                  borderRadius:12, padding:'9px 13px', color:'#fff', fontSize:13, resize:'none',
                  fontFamily:'inherit', outline:'none', minHeight:52, maxHeight:120,
                }} />
              <button onClick={submitAnswer} disabled={isTyping || !input.trim()}
                style={{
                  width:44, height:44, borderRadius:12, border:'none', cursor:'pointer',
                  background: isTyping || !input.trim() ? 'rgba(255,255,255,0.08)' : '#2563eb',
                  color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0,
                }}>
                {isTyping
                  ? <span style={{ width:16, height:16, border:'2px solid rgba(255,255,255,0.3)', borderTopColor:'#fff', borderRadius:'50%', animation:'spin 1s linear infinite', display:'inline-block' }} />
                  : <Send size={17} />}
              </button>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', marginTop:6, fontSize:11, color:'#334155', flexWrap:'wrap', gap:4 }}>
              <button onClick={() => setShowHint(h => !h)}
                style={{ display:'flex', alignItems:'center', gap:4, background:'none', border:'none', cursor:'pointer', color:'#64748b', fontSize:11 }}>
                <Lightbulb size={12} /> {showHint ? 'Hide hint' : 'Show hint'}
              </button>
              <span>Open-book · use SAP docs freely</span>
            </div>
          </>
        ) : (
          <button onClick={() => setPhase('result')}
            style={{ width:'100%', padding:'13px', borderRadius:12, background:'linear-gradient(135deg,#059669,#10b981)', color:'#fff', fontWeight:700, fontSize:14, border:'none', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }}>
            <Trophy size={18} /> View Your Results
          </button>
        )}
      </div>

      <style>{`
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  )
}
import { useState, useMemo } from 'react'
import { Star, Search, ChevronDown, ChevronUp, BookOpen, Tag, Filter } from 'lucide-react'
import { SAMPLE_ANSWERS, SAMPLE_CATEGORIES } from '../data/sampleAnswers'

const CAT_COLOR = {
  'Floor Plans':'blue','Annotations':'violet','BTP & Connectivity':'emerald',
  'Extensibility':'amber','Testing':'rose','OData & RAP':'cyan',
  'Security':'red','Performance':'orange','Deployment':'teal',
  'Debugging':'yellow','UI5 Framework':'indigo','i18n & Localisation':'pink',
  'CI/CD':'slate','Advanced Scenarios':'purple','Launchpad':'green',
  'CDS Annotations':'violet',
}

const BADGE_STYLE = {
  blue:   { bg:'rgba(59,130,246,0.15)',  color:'#60a5fa',  border:'rgba(59,130,246,0.3)' },
  violet: { bg:'rgba(139,92,246,0.15)', color:'#a78bfa',  border:'rgba(139,92,246,0.3)' },
  emerald:{ bg:'rgba(16,185,129,0.15)', color:'#34d399',  border:'rgba(16,185,129,0.3)' },
  amber:  { bg:'rgba(245,158,11,0.15)', color:'#fbbf24',  border:'rgba(245,158,11,0.3)' },
  rose:   { bg:'rgba(244,63,94,0.15)',  color:'#fb7185',  border:'rgba(244,63,94,0.3)'  },
  red:    { bg:'rgba(239,68,68,0.15)',  color:'#f87171',  border:'rgba(239,68,68,0.3)'  },
  teal:   { bg:'rgba(20,184,166,0.15)', color:'#2dd4bf',  border:'rgba(20,184,166,0.3)' },
  green:  { bg:'rgba(34,197,94,0.15)',  color:'#4ade80',  border:'rgba(34,197,94,0.3)'  },
  purple: { bg:'rgba(168,85,247,0.15)', color:'#c084fc',  border:'rgba(168,85,247,0.3)' },
  slate:  { bg:'rgba(100,116,139,0.15)',color:'#94a3b8',  border:'rgba(100,116,139,0.3)'},
  default:{ bg:'rgba(255,255,255,0.08)',color:'#94a3b8',  border:'rgba(255,255,255,0.15)'},
}

function getBadge(category) {
  const key = CAT_COLOR[category] || 'default'
  return BADGE_STYLE[key] || BADGE_STYLE.default
}

function SampleCard({ sample, isOpen, onToggle }) {
  const badge = getBadge(sample.category)
  return (
    <div style={{
      background:'rgba(255,255,255,0.03)', border:'1px solid rgba(255,255,255,0.09)',
      borderRadius:14, overflow:'hidden', transition:'border-color .2s',
      borderColor: isOpen ? 'rgba(59,130,246,0.35)' : 'rgba(255,255,255,0.09)',
    }}>
      {/* Header — always visible */}
      <button onClick={onToggle} style={{
        width:'100%', padding:'16px 18px', display:'flex', alignItems:'flex-start',
        gap:14, background:'none', border:'none', cursor:'pointer', textAlign:'left',
      }}>
        <span style={{ fontSize:28, flexShrink:0 }}>{sample.icon}</span>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:6, flexWrap:'wrap' }}>
            <span style={{
              fontSize:10, fontWeight:700, padding:'2px 8px', borderRadius:20,
              background: badge.bg, color: badge.color, border:`1px solid ${badge.border}`,
            }}>{sample.category}</span>
            {sample.tags.slice(0,2).map(t => (
              <span key={t} style={{
                fontSize:10, padding:'1px 6px', borderRadius:5,
                background:'rgba(255,255,255,0.05)', color:'#64748b',
              }}>{t}</span>
            ))}
          </div>
          <p style={{ color:'#e2e8f0', fontSize:13, fontWeight:500, lineHeight:1.5, margin:0 }}>
            {sample.question}
          </p>
          <div style={{ display:'flex', gap:12, marginTop:6 }}>
            {sample.keyPoints.slice(0,3).map(k => (
              <span key={k} style={{ fontSize:10, color:'#475569', display:'flex', alignItems:'center', gap:3 }}>
                <span style={{ color:'#34d399', fontSize:10 }}>✓</span> {k}
              </span>
            ))}
          </div>
        </div>
        <div style={{ flexShrink:0, color:'#475569', marginTop:2 }}>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {/* Expanded model answer */}
      {isOpen && (
        <div style={{
          borderTop:'1px solid rgba(255,255,255,0.07)',
          padding:'18px 18px 20px',
          animation:'slideUp .25s ease',
        }}>
          <div style={{
            display:'flex', alignItems:'center', gap:7, marginBottom:12,
            fontSize:11, fontWeight:700, color:'#34d399',
          }}>
            <BookOpen size={14} /> Model Answer — C_FIORD_2601 Format
          </div>
          <div style={{
            background:'rgba(0,0,0,0.25)', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:10, padding:'14px 16px',
          }}>
            <pre style={{
              color:'#cbd5e1', fontSize:12.5, lineHeight:1.8,
              whiteSpace:'pre-wrap', fontFamily:'inherit', margin:0,
            }}>{sample.modelAnswer}</pre>
          </div>
          <div style={{
            marginTop:12, display:'flex', alignItems:'center', gap:8,
            padding:'10px 14px', background:'rgba(59,130,246,0.07)',
            border:'1px solid rgba(59,130,246,0.2)', borderRadius:10,
          }}>
            <span style={{ fontSize:12, color:'#60a5fa' }}>
              💡 <strong style={{ fontWeight:600 }}>Exam tip:</strong>{' '}
              <span style={{ color:'#93c5fd' }}>
                Use this exact structure in the C_FIORD_2601 roleplay — cover Architecture, Reasoning, Exact steps, and mention what you rejected.
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  )
}

export default function SampleAnswersPage() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [openId, setOpenId] = useState(null)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return SAMPLE_ANSWERS.filter(s => {
      const matchCat = category === 'All' || s.category === category
      const q = search.toLowerCase()
      const matchSearch = !q || s.question.toLowerCase().includes(q) ||
        s.modelAnswer.toLowerCase().includes(q) || s.tags.some(t => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
      return matchCat && matchSearch
    })
  }, [search, category])

  const toggle = id => setOpenId(prev => prev === id ? null : id)

  const activeCats = [...new Set(SAMPLE_ANSWERS.map(s => s.category))]

  return (
    <div style={{ padding:'24px 16px', maxWidth:860, margin:'0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom:24 }}>
        <div style={{
          display:'inline-flex', alignItems:'center', gap:6, marginBottom:10,
          fontSize:10, fontWeight:700, padding:'3px 10px', borderRadius:20,
          background:'rgba(239,68,68,0.15)', color:'#f87171',
          border:'1px solid rgba(239,68,68,0.3)',
        }}>
          <Star size={12} /> SAMPLE ANSWERS · HOT
        </div>
        <h1 style={{ fontSize:26, fontWeight:800, color:'#fff', marginBottom:6 }}>
          Complete Model Answers
        </h1>
        <p style={{ color:'#64748b', fontSize:13, lineHeight:1.6, maxWidth:620 }}>
          {SAMPLE_ANSWERS.length} expert model answers covering every topic SAP tests in the C_FIORD_2601 Scenario Based Assessment.
          Each answer follows the AREA framework (Architecture, Reasoning, Exact steps, Alternatives) — the structure ARIA scores highest.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20 }}>
        {[
          ['📝', SAMPLE_ANSWERS.length, 'Model answers'],
          ['🏷️', activeCats.length, 'Topic areas'],
          ['✅', '100%', 'ARIA-aligned'],
          ['🎯', 'A-Z', 'All exam topics'],
        ].map(([icon, val, label]) => (
          <div key={label} style={{
            background:'rgba(255,255,255,0.04)', border:'1px solid rgba(255,255,255,0.08)',
            borderRadius:12, padding:'10px 12px', textAlign:'center',
          }}>
            <div style={{ fontSize:16 }}>{icon}</div>
            <div style={{ fontSize:18, fontWeight:800, color:'#fff' }}>{val}</div>
            <div style={{ fontSize:10, color:'#64748b' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div style={{ marginBottom:16, display:'flex', gap:10, flexWrap:'wrap' }}>
        <div style={{ flex:1, minWidth:220, position:'relative' }}>
          <Search size={15} style={{ position:'absolute', left:13, top:'50%', transform:'translateY(-50%)', color:'#64748b', pointerEvents:'none' }} />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search questions, topics, annotations…"
            style={{
              width:'100%', background:'rgba(255,255,255,0.05)',
              border:'1px solid rgba(255,255,255,0.1)', borderRadius:11,
              padding:'10px 13px 10px 38px', color:'#fff', fontSize:13,
              outline:'none', fontFamily:'inherit',
            }} />
        </div>
        <button onClick={() => setShowFilters(f => !f)}
          style={{
            display:'flex', alignItems:'center', gap:7, padding:'10px 14px',
            background: showFilters ? 'rgba(59,130,246,0.2)' : 'rgba(255,255,255,0.05)',
            border: showFilters ? '1px solid rgba(59,130,246,0.4)' : '1px solid rgba(255,255,255,0.1)',
            borderRadius:11, color: showFilters ? '#60a5fa' : '#94a3b8',
            fontSize:13, cursor:'pointer', fontFamily:'inherit',
          }}>
          <Filter size={14} /> Filter by topic
        </button>
      </div>

      {/* Category filters */}
      {showFilters && (
        <div style={{
          display:'flex', flexWrap:'wrap', gap:7, marginBottom:16,
          padding:'14px', background:'rgba(255,255,255,0.03)',
          border:'1px solid rgba(255,255,255,0.08)', borderRadius:12,
        }}>
          {['All', ...activeCats].map(cat => {
            const active = category === cat
            const b = cat === 'All' ? BADGE_STYLE.default : getBadge(cat)
            return (
              <button key={cat} onClick={() => setCategory(cat)}
                style={{
                  padding:'4px 12px', borderRadius:20, fontSize:11, fontWeight:600,
                  cursor:'pointer', fontFamily:'inherit', transition:'all .15s',
                  background: active ? b.bg : 'rgba(255,255,255,0.04)',
                  color: active ? b.color : '#64748b',
                  border: active ? `1px solid ${b.border}` : '1px solid rgba(255,255,255,0.08)',
                }}>
                {cat} {cat === 'All' ? `(${SAMPLE_ANSWERS.length})` : `(${SAMPLE_ANSWERS.filter(s => s.category === cat).length})`}
              </button>
            )
          })}
        </div>
      )}

      {/* Results count */}
      <div style={{ fontSize:12, color:'#475569', marginBottom:14 }}>
        Showing {filtered.length} of {SAMPLE_ANSWERS.length} answers
        {search && ` matching "${search}"`}
        {category !== 'All' && ` in ${category}`}
      </div>

      {/* Cards */}
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {filtered.length === 0 ? (
          <div style={{
            textAlign:'center', padding:'48px 24px',
            background:'rgba(255,255,255,0.02)', border:'1px solid rgba(255,255,255,0.07)',
            borderRadius:14,
          }}>
            <div style={{ fontSize:36, marginBottom:10 }}>🔍</div>
            <div style={{ color:'#fff', fontSize:15, fontWeight:600, marginBottom:6 }}>No results found</div>
            <div style={{ color:'#64748b', fontSize:13 }}>Try a different search term or category</div>
            <button onClick={() => { setSearch(''); setCategory('All') }}
              style={{
                marginTop:14, padding:'8px 18px', borderRadius:10,
                background:'rgba(59,130,246,0.15)', border:'1px solid rgba(59,130,246,0.3)',
                color:'#60a5fa', fontSize:12, cursor:'pointer', fontFamily:'inherit',
              }}>
              Clear filters
            </button>
          </div>
        ) : (
          filtered.map((sample, i) => (
            <div key={sample.id} style={{ animation:`slideUp .3s ease ${i * 0.03}s both` }}>
              <SampleCard
                sample={sample}
                isOpen={openId === sample.id}
                onToggle={() => toggle(sample.id)}
              />
            </div>
          ))
        )}
      </div>

      {/* Bottom tip */}
      {filtered.length > 0 && (
        <div style={{
          marginTop:24, padding:'16px 18px',
          background:'rgba(16,185,129,0.06)', border:'1px solid rgba(16,185,129,0.2)', borderRadius:14,
        }}>
          <div style={{ fontSize:12, color:'#34d399', fontWeight:700, marginBottom:6 }}>
            📋 How to use these answers in the real exam
          </div>
          <div style={{ fontSize:12, color:'#6ee7b7', lineHeight:1.7 }}>
            The C_FIORD_2601 is open-book. During the AI roleplay, you can refer to these model answers freely.
            Focus on the <strong style={{ color:'#34d399' }}>AREA framework</strong>: state your Architecture choice,
            give your Reasoning, name the Exact tools and config, mention the Alternative you rejected.
            ARIA scores reasoning depth — not just the final answer.
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        input::placeholder { color: #475569; }
      `}</style>
    </div>
  )
}
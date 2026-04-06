import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { BookOpen, Brain, ClipboardList, FileText, LayoutDashboard, Menu, X, GraduationCap, ChevronRight, Star } from 'lucide-react'

const NAV = [
  { to: '/', icon: LayoutDashboard, label: 'Home', exact: true },
  { to: '/roleplay', icon: Brain, label: 'AI Roleplay', badge: 'NEW' },
  { to: '/samples', icon: Star, label: 'Sample Answers', badge: 'HOT' },
  { to: '/practice', icon: ClipboardList, label: 'Practice Tests' },
  { to: '/mock-exam', icon: FileText, label: 'Mock Exams' },
  { to: '/guides', icon: BookOpen, label: 'Study Guides' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'My Progress' },
]

export default function Layout() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  useEffect(() => setOpen(false), [location])

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden' }}>
      {open && (
        <div onClick={() => setOpen(false)}
          style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', zIndex:40 }}
          className="lg:hidden" />
      )}

      <aside style={{
        width:220, minWidth:220, height:'100vh',
        display:'flex', flexDirection:'column',
        background:'rgba(15,22,41,0.98)',
        borderRight:'1px solid rgba(255,255,255,0.08)',
        flexShrink:0, zIndex:50,
        position:'relative',
      }}>
        <div style={{
          display:'flex', alignItems:'center', gap:10,
          padding:'18px 16px', borderBottom:'1px solid rgba(255,255,255,0.08)',
          flexShrink:0,
        }}>
          <div style={{
            width:36, height:36, borderRadius:10, flexShrink:0,
            background:'linear-gradient(135deg,#2563eb,#7c3aed)',
            display:'flex', alignItems:'center', justifyContent:'center',
          }}>
            <GraduationCap size={19} color="#fff" />
          </div>
          <div style={{ minWidth:0 }}>
            <div style={{ color:'#fff', fontWeight:700, fontSize:13, lineHeight:1.3 }}>SAP Fiori Prep</div>
            <div style={{ color:'#64748b', fontSize:10 }}>C_FIORD_2601</div>
          </div>
        </div>

        <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto' }}>
          {NAV.map(({ to, icon: Icon, label, badge, exact }) => (
            <NavLink key={to} to={to} end={exact}
              style={({ isActive }) => ({
                display:'flex', alignItems:'center', gap:9,
                padding:'9px 11px', borderRadius:11, fontSize:12.5, fontWeight:500,
                marginBottom:3, textDecoration:'none', transition:'all .15s',
                border: isActive ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                background: isActive ? 'rgba(59,130,246,0.13)' : 'transparent',
                color: isActive ? '#60a5fa' : '#64748b',
              })}>
              {({ isActive }) => (
                <>
                  <Icon size={16} color={isActive ? '#60a5fa' : '#475569'} style={{ flexShrink:0 }} />
                  <span style={{ flex:1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      fontSize:9, fontWeight:700, padding:'1px 5px', borderRadius:8,
                      background: badge==='HOT' ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)',
                      color: badge==='HOT' ? '#f87171' : '#60a5fa',
                      border: badge==='HOT' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(59,130,246,0.3)',
                    }}>{badge}</span>
                  )}
                  {isActive && <ChevronRight size={13} color="#60a5fa" style={{ flexShrink:0 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding:'12px 16px', borderTop:'1px solid rgba(255,255,255,0.06)', flexShrink:0 }}>
          <div style={{ fontSize:10, color:'#334155', textAlign:'center' }}>C_FIORD_2601 Prep · v2.0</div>
        </div>
      </aside>

      <div style={{ flex:1, display:'flex', flexDirection:'column', minWidth:0, height:'100vh', overflow:'hidden' }}>
        <header className="lg:hidden" style={{
          display:'flex', alignItems:'center', gap:10,
          padding:'10px 14px', background:'rgba(15,22,41,0.9)',
          borderBottom:'1px solid rgba(255,255,255,0.08)', flexShrink:0,
        }}>
          <button onClick={() => setOpen(true)}
            style={{ color:'#64748b', background:'none', border:'none', cursor:'pointer', padding:4 }}>
            <Menu size={22} />
          </button>
          <div style={{ display:'flex', alignItems:'center', gap:8 }}>
            <div style={{ width:28, height:28, borderRadius:8, background:'linear-gradient(135deg,#2563eb,#7c3aed)', display:'flex', alignItems:'center', justifyContent:'center' }}>
              <GraduationCap size={15} color="#fff" />
            </div>
            <span style={{ color:'#fff', fontWeight:600, fontSize:14 }}>SAP Fiori Prep</span>
          </div>
        </header>
        <main style={{ flex:1, overflowY:'auto' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}
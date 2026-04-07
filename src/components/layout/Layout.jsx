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
    <div className="flex h-screen overflow-hidden">
      {/* Mobile backdrop overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar — fixed overlay on mobile, static on desktop */}
      <aside
        className={`fixed lg:relative inset-y-0 left-0 z-50 flex flex-col flex-shrink-0 transition-transform duration-300 ease-in-out lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{
          width: 220,
          minWidth: 220,
          height: '100vh',
          background: 'rgba(15,22,41,0.98)',
          borderRight: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        {/* Logo + close button (mobile) */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)',
          flexShrink: 0, position: 'relative',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, flexShrink: 0,
            background: 'linear-gradient(135deg,#2563eb,#7c3aed)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <GraduationCap size={19} color="#fff" />
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 13, lineHeight: 1.3 }}>SAP Fiori Prep</div>
            <div style={{ color: '#64748b', fontSize: 10 }}>C_FIORD_2601</div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="lg:hidden"
            style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <X size={18} />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '10px 8px', overflowY: 'auto' }}>
          {NAV.map(({ to, icon: Icon, label, badge, exact }) => (
            <NavLink key={to} to={to} end={exact}
              style={({ isActive }) => ({
                display: 'flex', alignItems: 'center', gap: 9,
                padding: '9px 11px', borderRadius: 11, fontSize: 12.5, fontWeight: 500,
                marginBottom: 3, textDecoration: 'none', transition: 'all .15s',
                border: isActive ? '1px solid rgba(59,130,246,0.3)' : '1px solid transparent',
                background: isActive ? 'rgba(59,130,246,0.13)' : 'transparent',
                color: isActive ? '#60a5fa' : '#64748b',
              })}>
              {({ isActive }) => (
                <>
                  <Icon size={16} color={isActive ? '#60a5fa' : '#475569'} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{label}</span>
                  {badge && (
                    <span style={{
                      fontSize: 9, fontWeight: 700, padding: '1px 5px', borderRadius: 8,
                      background: badge === 'HOT' ? 'rgba(239,68,68,0.2)' : 'rgba(59,130,246,0.2)',
                      color: badge === 'HOT' ? '#f87171' : '#60a5fa',
                      border: badge === 'HOT' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(59,130,246,0.3)',
                    }}>{badge}</span>
                  )}
                  {isActive && <ChevronRight size={13} color="#60a5fa" style={{ flexShrink: 0 }} />}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '12px 16px', borderTop: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
          <div style={{ fontSize: 10, color: '#334155', textAlign: 'center' }}>C_FIORD_2601 Prep · v2.0</div>
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 h-screen overflow-hidden">
        {/* Mobile top header */}
        <header
          className="lg:hidden flex items-center gap-2.5 flex-shrink-0"
          style={{
            padding: '10px 14px',
            background: 'rgba(15,22,41,0.9)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            onClick={() => setOpen(true)}
            style={{ color: '#64748b', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: 'linear-gradient(135deg,#2563eb,#7c3aed)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <GraduationCap size={15} color="#fff" />
            </div>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>SAP Fiori Prep</span>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>

        {/* Mobile bottom nav bar */}
        <nav
          className="lg:hidden flex-shrink-0 flex items-center justify-around"
          style={{
            background: 'rgba(10,14,26,0.97)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            padding: '6px 4px',
            paddingBottom: 'max(6px, env(safe-area-inset-bottom))',
          }}
        >
          {NAV.slice(0, 5).map(({ to, icon: Icon, label, exact }) => (
            <NavLink key={to} to={to} end={exact}
              style={({ isActive }) => ({
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                padding: '4px 8px', borderRadius: 10, textDecoration: 'none',
                color: isActive ? '#60a5fa' : '#475569',
                flex: 1,
              })}>
              {({ isActive }) => (
                <>
                  <Icon size={20} color={isActive ? '#60a5fa' : '#475569'} />
                  <span style={{ fontSize: 9, fontWeight: isActive ? 700 : 500 }}>{label.split(' ')[0]}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}

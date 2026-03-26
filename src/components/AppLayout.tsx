import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const SIDEBAR_W = 260;

const NAV_ITEMS = [
  { label: '情境訓練', path: '/', icon: '📋' },
  { label: '筆試測驗', path: '/exam', icon: '📝' },
];

function useActiveNav() {
  const { pathname } = useLocation();
  return function isActive(path: string) {
    if (path === '/') return pathname === '/' || pathname.startsWith('/scenario');
    return pathname.startsWith(path);
  };
}

function SidebarBody({ onClose }: { onClose?: () => void }) {
  const navigate = useNavigate();
  const isActive = useActiveNav();

  function go(path: string) {
    navigate(path);
    onClose?.();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo + title */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1e293b' }}>
        <svg viewBox="0 0 120 72" width="84" height="50" style={{ display: 'block' }}>
          {/* Body */}
          <rect x="8" y="34" width="104" height="28" fill="#1d4ed8" rx="6" />
          {/* Cabin */}
          <rect x="26" y="14" width="68" height="24" fill="#1e40af" rx="7" />
          {/* Windshield */}
          <rect x="30" y="17" width="28" height="16" fill="#93c5fd" rx="3" opacity="0.75" />
          {/* Rear window */}
          <rect x="62" y="17" width="24" height="16" fill="#93c5fd" rx="3" opacity="0.6" />
          {/* Headlight */}
          <rect
            x="106"
            y="40"
            width="8"
            height="6"
            fill="#fef08a"
            rx="2"
            className="anim-head-glow"
          />
          {/* Headlight beam */}
          <rect
            x="114"
            y="41"
            width="5"
            height="4"
            fill="#fef08a"
            rx="1"
            opacity="0.4"
            className="anim-head-glow"
          />
          {/* Tail light */}
          <rect
            x="6"
            y="40"
            width="6"
            height="6"
            fill="#ef4444"
            rx="2"
            className="anim-tail-light"
          />
          {/* Front wheel */}
          <ellipse cx="88" cy="62" rx="13" ry="10" fill="#111827" />
          <g className="anim-wheel-spin">
            <ellipse cx="88" cy="62" rx="7" ry="5.5" fill="#334155" />
            <line x1="88" y1="57" x2="88" y2="67" stroke="#475569" strokeWidth="1.5" />
            <line x1="83" y1="62" x2="93" y2="62" stroke="#475569" strokeWidth="1.5" />
          </g>
          {/* Rear wheel */}
          <ellipse cx="32" cy="62" rx="13" ry="10" fill="#111827" />
          <g className="anim-wheel-spin">
            <ellipse cx="32" cy="62" rx="7" ry="5.5" fill="#334155" />
            <line x1="32" y1="57" x2="32" y2="67" stroke="#475569" strokeWidth="1.5" />
            <line x1="27" y1="62" x2="37" y2="62" stroke="#475569" strokeWidth="1.5" />
          </g>
        </svg>
        <div
          style={{ fontSize: 14, fontWeight: 900, color: 'white', marginTop: 10, lineHeight: 1.35 }}
        >
          Awesome Learn Driving
        </div>
        <div style={{ fontSize: 11, color: '#475569', marginTop: 3 }}>
          Safe Driving Makes Happy Life
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '10px 8px' }}>
        {NAV_ITEMS.map(function (item) {
          const active = isActive(item.path);
          return (
            <button
              key={item.path}
              onClick={function () {
                go(item.path);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                padding: '10px 12px',
                borderRadius: 12,
                border: 'none',
                background: active ? '#1e3a5f' : 'transparent',
                color: active ? '#93c5fd' : '#64748b',
                fontSize: 14,
                fontWeight: active ? 700 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 4,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={function (e) {
                if (!active) e.currentTarget.style.background = '#1e293b';
              }}
              onMouseLeave={function (e) {
                if (!active) e.currentTarget.style.background = 'transparent';
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              <span style={{ flex: 1 }}>{item.label}</span>
              {active && (
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: '#60a5fa',
                    flexShrink: 0,
                  }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer links */}
      <div
        style={{
          padding: '10px 8px 20px',
          borderTop: '1px solid #1e293b',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <a
          href="https://github.com/YuriTsaiTW/awesome-learn-driving"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '8px 12px',
            borderRadius: 10,
            color: '#475569',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = '#94a3b8';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = '#475569';
          }}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
        <a
          href="https://buymeacoffee.com/yurijournaltw"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '8px 12px',
            borderRadius: 10,
            color: '#475569',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = '#94a3b8';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = '#475569';
          }}
        >
          ☕ 小額支持
        </a>
      </div>
    </div>
  );
}

function AppLayout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: 'linear-gradient(160deg,#0f172a,#1e293b)', minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      <aside className="app-sidebar">
        <SidebarBody />
      </aside>

      {/* Mobile top toolbar */}
      <header className="app-toolbar">
        <button
          onClick={function () {
            setOpen(true);
          }}
          aria-label="開啟選單"
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            fontSize: 20,
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 8,
            lineHeight: 1,
            flexShrink: 0,
          }}
        >
          ☰
        </button>
        <span
          style={{ color: 'white', fontWeight: 800, fontSize: 15, flex: 1, textAlign: 'center' }}
        >
          Awesome Learn Driving
        </span>
        {/* Spacer to keep title centered */}
        <span style={{ width: 36, flexShrink: 0 }} />
      </header>

      {/* Mobile overlay + slide-in sidebar */}
      {open && (
        <>
          <div
            onClick={function () {
              setOpen(false);
            }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.6)',
              zIndex: 40,
            }}
          />
          <aside
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              bottom: 0,
              width: SIDEBAR_W,
              background: '#0f172a',
              borderRight: '1px solid #1e293b',
              zIndex: 50,
              overflowY: 'auto',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '12px 12px 0' }}>
              <button
                onClick={function () {
                  setOpen(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  fontSize: 18,
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: 8,
                }}
              >
                ✕
              </button>
            </div>
            <SidebarBody
              onClose={function () {
                setOpen(false);
              }}
            />
          </aside>
        </>
      )}

      {/* Content area */}
      <main className="app-content">{children}</main>
    </div>
  );
}

export default AppLayout;

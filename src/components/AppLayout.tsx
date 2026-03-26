import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCENARIOS } from '../data/scenarios';

const SIDEBAR_W = 260;

const NAV_ITEMS = [
  { label: '情境訓練', path: '/', icon: '🛞' },
  { label: '筆試測驗', path: '/exam', icon: '📝' },
];

function useActiveNav() {
  const { pathname } = useLocation();
  return function isActive(path: string) {
    if (path === '/') return pathname === '/' || pathname.startsWith('/scenario');
    return pathname.startsWith(path);
  };
}

function SidebarBody({ onClose, completed }: { onClose?: () => void; completed: string[] }) {
  const navigate = useNavigate();
  const isActive = useActiveNav();

  function go(path: string) {
    navigate(path);
    onClose?.();
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Compact brand header */}
      <div style={{ padding: '20px 16px 16px', borderBottom: '1px solid #1e293b' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '8px 12px',
            borderRadius: 12,
            background: 'rgba(37,99,235,0.08)',
            border: '1px solid rgba(96,165,250,0.1)',
          }}
        >
          <span style={{ fontSize: 18, lineHeight: 1 }}>🚗</span>
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: '#60a5fa',
              letterSpacing: '-0.01em',
            }}
          >
            Awesome Learn Driving
          </span>
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
                color: active ? '#93c5fd' : '#94a3b8',
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

        {/* Scenario stats — visible only on 情境訓練 routes */}
        {isActive('/') && (
          <div
            style={{
              margin: '8px 4px 0',
              padding: '12px 14px',
              borderRadius: 14,
              background: '#0f172a',
              border: '1px solid #1e293b',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: '#475569',
                fontWeight: 600,
                marginBottom: 10,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
              }}
            >
              情境訓練進度
            </div>
            {(
              [
                { val: SCENARIOS.length, label: '情境數', color: '#fbbf24' },
                { val: completed.length, label: '已完成', color: '#4ade80' },
                {
                  val:
                    completed.length > 0
                      ? Math.round((completed.length / SCENARIOS.length) * 100) + '%'
                      : '0%',
                  label: '進度',
                  color: '#60a5fa',
                },
              ] as { val: string | number; label: string; color: string }[]
            ).map(function (s, i, arr) {
              return (
                <div
                  key={s.label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: i < arr.length - 1 ? 8 : 0,
                    marginBottom: i < arr.length - 1 ? 8 : 0,
                    borderBottom: i < arr.length - 1 ? '1px solid #1e293b' : 'none',
                  }}
                >
                  <span style={{ fontSize: 13, color: '#64748b' }}>{s.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.val}</span>
                </div>
              );
            })}
          </div>
        )}
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
            color: '#94a3b8',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = '#94a3b8';
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
            color: '#94a3b8',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = '#e2e8f0';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = '#94a3b8';
          }}
        >
          ☕ 小額支持
        </a>
      </div>
    </div>
  );
}

function AppLayout({ children, completed }: { children: React.ReactNode; completed: string[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ background: 'linear-gradient(160deg,#0f172a,#1e293b)', minHeight: '100vh' }}>
      {/* Desktop sidebar */}
      <aside className="app-sidebar">
        <SidebarBody completed={completed} />
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
              completed={completed}
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

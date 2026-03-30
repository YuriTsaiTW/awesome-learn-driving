import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SCENARIOS } from '../data/scenarios';
import { useTheme } from '../theme/ThemeContext';

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

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? '切換為淺色模式' : '切換為深色模式'}
      title={theme === 'dark' ? '切換為淺色模式' : '切換為深色模式'}
      style={{
        background: 'transparent',
        border: '1px solid var(--border-base)',
        borderRadius: 8,
        color: 'var(--text-muted)',
        fontSize: 16,
        cursor: 'pointer',
        padding: '4px 8px',
        lineHeight: 1,
        flexShrink: 0,
        transition: 'color 0.15s, border-color 0.15s',
      }}
      onMouseEnter={function (e) {
        e.currentTarget.style.color = 'var(--accent)';
        e.currentTarget.style.borderColor = 'var(--accent)';
      }}
      onMouseLeave={function (e) {
        e.currentTarget.style.color = 'var(--text-muted)';
        e.currentTarget.style.borderColor = 'var(--border-base)';
      }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
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
      {/* Logo */}
      <div
        style={{
          padding: '20px 20px 14px',
          borderBottom: '1px solid var(--border-subtle)',
          textAlign: 'center',
        }}
      >
        <svg
          viewBox="0 0 300 160"
          style={{ width: '100%', maxWidth: 160, display: 'inline-block' }}
        >
          {/* Road */}
          <rect x="0" y="128" width="300" height="22" fill="#111827" rx="4" />
          <line
            x1="0"
            y1="138"
            x2="300"
            y2="138"
            stroke="#1e293b"
            strokeWidth="2"
            strokeDasharray="22 16"
          />
          {/* Car body */}
          <rect x="10" y="72" width="280" height="56" fill="#2563eb" rx="10" />
          {/* Cabin */}
          <path d="M60 32 Q68 16 88 16 L212 16 Q232 16 240 32 L258 72 L42 72Z" fill="#1d4ed8" />
          {/* Windshield */}
          <path d="M70 36 Q76 22 90 22 L148 22 L160 36Z" fill="#bfdbfe" opacity="0.85" />
          {/* Rear window */}
          <path d="M166 36 L178 22 L210 22 Q224 22 230 36Z" fill="#bfdbfe" opacity="0.62" />
          {/* B-pillar */}
          <rect x="161" y="19" width="6" height="20" fill="#1e40af" />
          {/* Headlight */}
          <rect
            x="278"
            y="86"
            width="18"
            height="11"
            fill="#fef08a"
            rx="3"
            className="anim-head-glow"
          />
          <rect
            x="296"
            y="88"
            width="5"
            height="7"
            fill="#fef08a"
            rx="1.5"
            opacity="0.35"
            className="anim-head-glow"
          />
          {/* Tail light */}
          <rect
            x="4"
            y="86"
            width="14"
            height="11"
            fill="#ef4444"
            rx="3"
            className="anim-tail-light"
          />
          {/* Front wheel */}
          <ellipse cx="222" cy="128" rx="22" ry="18" fill="#111827" />
          <g className="anim-wheel-spin">
            <ellipse cx="222" cy="128" rx="12" ry="10" fill="#334155" />
            <line
              x1="222"
              y1="118"
              x2="222"
              y2="138"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
            <line
              x1="212"
              y1="128"
              x2="232"
              y2="128"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
          </g>
          {/* Rear wheel */}
          <ellipse cx="78" cy="128" rx="22" ry="18" fill="#111827" />
          <g className="anim-wheel-spin">
            <ellipse cx="78" cy="128" rx="12" ry="10" fill="#334155" />
            <line
              x1="78"
              y1="118"
              x2="78"
              y2="138"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
            <line
              x1="68"
              y1="128"
              x2="88"
              y2="128"
              stroke="#60a5fa"
              strokeWidth="2.5"
              opacity="0.7"
            />
          </g>
        </svg>
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
                background: active ? 'var(--bg-active)' : 'transparent',
                color: active ? 'var(--blue-light)' : 'var(--text-muted)',
                fontSize: 14,
                fontWeight: active ? 700 : 400,
                cursor: 'pointer',
                textAlign: 'left',
                marginBottom: 4,
                transition: 'background 0.15s, color 0.15s',
              }}
              onMouseEnter={function (e) {
                if (!active) e.currentTarget.style.background = 'var(--bg-hover)';
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
                    background: 'var(--blue)',
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
              margin: '20px 4px 0',
              padding: '12px 14px',
              borderRadius: 14,
              background: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <div
              style={{
                fontSize: 11,
                color: 'var(--text-disabled)',
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
                { val: SCENARIOS.length, label: '情境數', color: 'var(--accent-light)' },
                { val: completed.length, label: '已完成', color: 'var(--green-light)' },
                {
                  val:
                    completed.length > 0
                      ? Math.round((completed.length / SCENARIOS.length) * 100) + '%'
                      : '0%',
                  label: '進度',
                  color: 'var(--blue)',
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
                    borderBottom: i < arr.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>{s.label}</span>
                  <span style={{ fontSize: 15, fontWeight: 800, color: s.color }}>{s.val}</span>
                </div>
              );
            })}
          </div>
        )}
      </nav>

      {/* Theme toggle + footer links */}
      <div
        style={{
          padding: '10px 8px 20px',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        {/* Theme toggle row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '6px 12px',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--text-faint)' }}>主題</span>
          <ThemeToggle />
        </div>

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
            color: 'var(--text-muted)',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
          </svg>
          GitHub
        </a>
        <a
          href="mailto:frontend.yuri@gmail.com?subject=%5BAwesome%20Learning%20Driving%5D%20%E6%84%8F%E8%A6%8B%E5%9B%9E%E9%A5%8B%2F%E5%95%8F%E9%A1%8C%E5%9B%9E%E5%A0%B1"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            padding: '8px 12px',
            borderRadius: 10,
            color: 'var(--text-muted)',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = 'var(--text-muted)';
          }}
        >
          <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor">
            <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8zm9 3a1 1 0 11-2 0 1 1 0 012 0zm-.25-6.25a.75.75 0 00-1.5 0v3.5a.75.75 0 001.5 0v-3.5z" />
          </svg>
          意見回饋
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
            color: 'var(--text-muted)',
            fontSize: 13,
            textDecoration: 'none',
            transition: 'color 0.15s',
          }}
          onMouseEnter={function (e) {
            e.currentTarget.style.color = 'var(--text-secondary)';
          }}
          onMouseLeave={function (e) {
            e.currentTarget.style.color = 'var(--text-muted)';
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
    <div style={{ background: 'var(--gradient-bg)', minHeight: '100vh' }}>
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
            color: 'var(--text-muted)',
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
        <span style={{ flex: 1 }} />
        <ThemeToggle />
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
              background: 'var(--bg-base)',
              borderRight: '1px solid var(--border-subtle)',
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
                  color: 'var(--text-faint)',
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

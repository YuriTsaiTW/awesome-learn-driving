import { useState } from 'react';
import type { PhoneOption } from '../../types/simulation';

interface SimPhoneModalProps {
  options: PhoneOption[];
  onCorrect: () => void;
}

function SimPhoneModal({ options, onCorrect }: SimPhoneModalProps) {
  const [wrongIdx, setWrongIdx] = useState<number | null>(null);
  const [correctIdx, setCorrectIdx] = useState<number | null>(null);

  function handleSelect(opt: PhoneOption, idx: number) {
    if (correctIdx !== null || wrongIdx === idx) return;

    if (opt.correct) {
      setCorrectIdx(idx);
      setTimeout(onCorrect, 700);
    } else {
      setWrongIdx(idx);
      setTimeout(() => setWrongIdx(null), 700);
    }
  }

  const isEmergency = options.some((o) => o.correct && /^\d+$/.test(o.number));

  return (
    /* Backdrop */
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.75)',
        zIndex: 8000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Phone shell */}
      <div
        style={{
          width: 260,
          background: '#111827',
          borderRadius: 32,
          border: '2px solid #374151',
          boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
          overflow: 'hidden',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            background: '#0f172a',
            padding: '8px 18px 6px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span style={{ color: '#94a3b8', fontSize: 11, fontWeight: 600 }}>09:41</span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            <span style={{ color: '#94a3b8', fontSize: 11 }}>📶</span>
            <span style={{ color: '#94a3b8', fontSize: 11 }}>🔋</span>
          </div>
        </div>

        {/* Screen title */}
        <div
          style={{
            background: '#0f172a',
            padding: '10px 18px 12px',
            borderBottom: '1px solid #1e293b',
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#64748b', fontSize: 12, marginBottom: 2 }}>
            {isEmergency ? '緊急通報' : '聯絡人'}
          </div>
          <div style={{ color: '#e2e8f0', fontSize: 15, fontWeight: 700 }}>請選擇撥打對象</div>
        </div>

        {/* Contact list */}
        <div style={{ padding: '8px 0 4px' }}>
          {options.map((opt, idx) => {
            const isWrong = wrongIdx === idx;
            const isCorrectSelected = correctIdx === idx;
            let borderColor = '#1e293b';
            let bg = 'transparent';
            if (isCorrectSelected) {
              borderColor = '#22c55e';
              bg = 'rgba(34,197,94,0.12)';
            } else if (isWrong) {
              borderColor = '#ef4444';
              bg = 'rgba(239,68,68,0.10)';
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(opt, idx)}
                style={{
                  width: '100%',
                  background: bg,
                  border: 'none',
                  borderTop: `1px solid ${borderColor}`,
                  borderBottom: `1px solid ${borderColor}`,
                  padding: '12px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  animation: isWrong ? 'simWrongShake 0.35s ease' : 'none',
                  transition: 'background 0.2s',
                  marginBottom: 2,
                }}
              >
                {/* Avatar circle */}
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: isCorrectSelected ? '#15803d' : isWrong ? '#7f1d1d' : '#1e3a5f',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontSize: 18,
                    transition: 'background 0.2s',
                  }}
                >
                  {isCorrectSelected ? '✓' : isWrong ? '✗' : /^\d+$/.test(opt.number) ? '📞' : '👤'}
                </div>

                {/* Text */}
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div
                    style={{
                      color: isCorrectSelected ? '#4ade80' : isWrong ? '#f87171' : '#e2e8f0',
                      fontSize: 15,
                      fontWeight: 700,
                      transition: 'color 0.2s',
                    }}
                  >
                    {opt.label}
                  </div>
                  <div style={{ color: '#64748b', fontSize: 13, marginTop: 1 }}>{opt.number}</div>
                </div>

                {/* Call button */}
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: '50%',
                    background: isCorrectSelected ? '#15803d' : isWrong ? '#7f1d1d' : '#166534',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  📲
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom home indicator */}
        <div
          style={{
            padding: '12px 0 8px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 4,
              background: '#374151',
              borderRadius: 2,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default SimPhoneModal;

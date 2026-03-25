import { useState } from 'react';

interface SimPhoneModalProps {
  correctNumber: string;
  onCorrect: () => void;
}

const KEYS = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['⌫', '0', '📞'],
];

function SimPhoneModal({ correctNumber, onCorrect }: SimPhoneModalProps) {
  const [dialed, setDialed] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleKey(k: string) {
    if (success) return;

    if (k === '⌫') {
      setDialed((prev) => prev.slice(0, -1));
      return;
    }
    if (k === '📞') {
      checkSubmit(dialed);
      return;
    }

    const next = dialed + k;
    setDialed(next);

    // Wrong prefix — shake and reset
    if (!correctNumber.startsWith(next)) {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setDialed('');
      }, 500);
      return;
    }

    // Completed correct number
    if (next === correctNumber) {
      setSuccess(true);
      setTimeout(onCorrect, 800);
    }
  }

  function checkSubmit(input: string) {
    if (input === correctNumber) {
      setSuccess(true);
      setTimeout(onCorrect, 800);
    } else {
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setDialed('');
      }, 500);
    }
  }

  // Display: show dialed digits as large chars, pad remaining with underscores
  const displayDigits = correctNumber.split('').map((_, i) => dialed[i] ?? '_');

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.80)',
        zIndex: 8000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Phone shell */}
      <div
        style={{
          width: 240,
          background: '#0f172a',
          borderRadius: 32,
          border: '2px solid #334155',
          boxShadow: '0 32px 80px rgba(0,0,0,0.9)',
          overflow: 'hidden',
        }}
      >
        {/* Status bar */}
        <div
          style={{
            background: '#020617',
            padding: '7px 18px 5px',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ color: '#475569', fontSize: 11 }}>09:41</span>
          <span style={{ color: '#475569', fontSize: 11 }}>📶🔋</span>
        </div>

        {/* Screen */}
        <div
          style={{
            background: '#020617',
            padding: '18px 20px 14px',
            textAlign: 'center',
          }}
        >
          <div style={{ color: '#475569', fontSize: 13, marginBottom: 10 }}>撥打緊急電話</div>

          {/* Digit display */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              animation: shake ? 'simWrongShake 0.4s ease' : success ? 'none' : 'none',
            }}
          >
            {displayDigits.map((ch, i) => (
              <div
                key={i}
                style={{
                  width: 36,
                  height: 48,
                  borderRadius: 8,
                  background: success
                    ? 'rgba(34,197,94,0.15)'
                    : shake
                      ? 'rgba(239,68,68,0.15)'
                      : '#0f172a',
                  border: `2px solid ${
                    success ? '#22c55e' : shake ? '#ef4444' : ch === '_' ? '#1e293b' : '#3b82f6'
                  }`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  fontWeight: 900,
                  color: success
                    ? '#4ade80'
                    : shake
                      ? '#f87171'
                      : ch === '_'
                        ? '#1e293b'
                        : '#e2e8f0',
                  fontFamily: 'monospace',
                  transition: 'border-color 0.15s, color 0.15s, background 0.15s',
                }}
              >
                {ch}
              </div>
            ))}
          </div>

          {/* Status message */}
          <div
            style={{
              marginTop: 10,
              fontSize: 13,
              fontWeight: 600,
              color: success ? '#4ade80' : shake ? '#f87171' : '#475569',
              minHeight: 18,
            }}
          >
            {success ? '撥出中…' : shake ? '號碼錯誤，重新輸入' : ''}
          </div>
        </div>

        {/* Keypad */}
        <div style={{ padding: '4px 16px 16px', background: '#0f172a' }}>
          {KEYS.map((row, ri) => (
            <div
              key={ri}
              style={{ display: 'flex', gap: 10, justifyContent: 'center', marginBottom: 10 }}
            >
              {row.map((k) => {
                const isCall = k === '📞';
                const isDel = k === '⌫';
                return (
                  <button
                    key={k}
                    onClick={() => handleKey(k)}
                    style={{
                      width: 58,
                      height: 52,
                      borderRadius: 14,
                      border: 'none',
                      background: isCall
                        ? success
                          ? '#166534'
                          : '#15803d'
                        : isDel
                          ? '#1e293b'
                          : '#1e293b',
                      color: isCall ? 'white' : isDel ? '#94a3b8' : '#e2e8f0',
                      fontSize: isCall ? 20 : isDel ? 18 : 22,
                      fontWeight: 700,
                      cursor: success ? 'default' : 'pointer',
                      opacity: success ? 0.5 : 1,
                      boxShadow: isCall ? '0 4px 14px rgba(21,128,61,0.4)' : 'none',
                      transition: 'background 0.1s',
                    }}
                  >
                    {k}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SimPhoneModal;

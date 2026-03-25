import { useState, useEffect } from 'react';
import type { Scenario } from '../types/scenario';
import { SCENE_COMPONENTS } from '../data/scene-components';
import TypewriterText from './TypewriterText';

interface IntroPhaseProps {
  scenario: Scenario;
  onNext: () => void;
}

const IntroPhase = ({ scenario, onNext }: IntroPhaseProps) => {
  const SceneComp = SCENE_COMPONENTS[scenario.id];
  const { story } = scenario;
  const [skip, setSkip] = useState(false);
  const [textDone, setTextDone] = useState(false);

  useEffect(
    function () {
      setSkip(false);
      setTextDone(false);
    },
    [scenario.id],
  );

  return (
    <div className="anim-fade">
      {/* Desktop: side-by-side; Mobile: stacked */}
      <div className="intro-layout">
        {/* Scene animation */}
        <div
          className="intro-scene-wrap"
          style={{
            borderRadius: 20,
            overflow: 'hidden',
            border: '1px solid #334155',
            position: 'relative',
            background: '#0f172a',
          }}
        >
          {SceneComp && <SceneComp />}
          {/* Time / Location pills overlaid */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
            }}
          >
            <div
              style={{
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                background: 'rgba(0,0,0,0.72)',
                color: '#93c5fd',
                border: '1px solid rgba(96,165,250,0.3)',
                backdropFilter: 'blur(4px)',
              }}
            >
              🕙 {story.time}
            </div>
            <div
              style={{
                padding: '4px 10px',
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 600,
                background: 'rgba(0,0,0,0.72)',
                color: '#94a3b8',
                border: '1px solid rgba(148,163,184,0.2)',
                backdropFilter: 'blur(4px)',
              }}
            >
              📍 {story.location}
            </div>
          </div>
        </div>

        {/* Character + narrative */}
        <div
          style={{
            background: '#1e293b',
            borderRadius: 20,
            padding: 18,
            border: '1px solid #334155',
          }}
        >
          {/* Character header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 14,
              paddingBottom: 12,
              borderBottom: '1px solid #2d3748',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                border: '2px solid #334155',
                flexShrink: 0,
              }}
            >
              {story.character.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ color: 'white', fontWeight: 800, fontSize: 16, marginBottom: 2 }}>
                {story.character.name}
              </div>
              <div style={{ color: '#64748b', fontSize: 14 }}>
                {story.character.age} 歲・{story.character.role}
              </div>
            </div>
            <div
              style={{
                padding: '6px 12px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                background: 'rgba(245,158,11,0.1)',
                color: '#fbbf24',
                border: '1px solid rgba(245,158,11,0.25)',
              }}
            >
              {scenario.difficulty}
            </div>
          </div>

          {/* Typewriter narrative */}
          <div
            className="intro-text"
            style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.9, minHeight: 72 }}
          >
            <TypewriterText
              text={story.narrative}
              speed={24}
              skip={skip}
              onDone={function () {
                setTextDone(true);
              }}
            />
          </div>

          {/* Skip button */}
          {!textDone && !skip && (
            <button
              onClick={function () {
                setSkip(true);
                setTextDone(true);
              }}
              style={{
                marginTop: 12,
                padding: '4px 12px',
                fontSize: 14,
                color: '#475569',
                background: 'transparent',
                border: '1px solid #334155',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.color = '#94a3b8';
                e.currentTarget.style.borderColor = '#475569';
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.color = '#475569';
                e.currentTarget.style.borderColor = '#334155';
              }}
            >
              跳過 ›
            </button>
          )}
        </div>
      </div>

      <button
        onClick={onNext}
        style={{
          width: '100%',
          padding: '16px',
          borderRadius: 20,
          fontWeight: 800,
          fontSize: 16,
          color: '#000',
          border: 'none',
          cursor: 'pointer',
          background: 'linear-gradient(135deg,#f59e0b,#d97706)',
          transition: 'opacity 0.15s',
        }}
      >
        進入情境 →
      </button>
    </div>
  );
};

export default IntroPhase;

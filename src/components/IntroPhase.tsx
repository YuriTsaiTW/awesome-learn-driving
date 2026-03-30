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
            border: '1px solid var(--border-base)',
            position: 'relative',
            background: 'var(--bg-elevated)',
          }}
        >
          {SceneComp && <SceneComp />}
          {/* Time / Location pills overlaid — always dark since on top of SVG scene */}
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
                background: 'var(--bg-card)',
                color: 'var(--blue-light)',
                border: '1px solid var(--border-base)',
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
                background: 'var(--bg-card)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-base)',
              }}
            >
              📍 {story.location}
            </div>
          </div>
        </div>

        {/* Character + narrative */}
        <div
          style={{
            background: 'var(--bg-card)',
            borderRadius: 20,
            padding: 18,
            border: '1px solid var(--border-base)',
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
              borderBottom: '1px solid var(--border-base)',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'var(--bg-elevated)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 30,
                border: '2px solid var(--border-base)',
                flexShrink: 0,
              }}
            >
              {story.character.avatar}
            </div>
            <div style={{ flex: 1 }}>
              <div
                style={{
                  color: 'var(--text-primary)',
                  fontWeight: 800,
                  fontSize: 16,
                  marginBottom: 2,
                }}
              >
                {story.character.name}
              </div>
              <div style={{ color: 'var(--text-faint)', fontSize: 14 }}>
                {story.character.age} 歲・{story.character.role}
              </div>
            </div>
            <div
              style={{
                padding: '6px 12px',
                borderRadius: 12,
                fontSize: 14,
                fontWeight: 700,
                background: 'var(--accent-bg)',
                color: 'var(--accent-light)',
                border: '1px solid var(--accent-border)',
              }}
            >
              {scenario.difficulty}
            </div>
          </div>

          {/* Typewriter narrative */}
          <div
            className="intro-text"
            style={{ color: 'var(--text-body)', fontSize: 14, lineHeight: 1.9, minHeight: 72 }}
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
                color: 'var(--text-disabled)',
                background: 'transparent',
                border: '1px solid var(--border-base)',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'color 0.15s, border-color 0.15s',
              }}
              onMouseEnter={function (e) {
                e.currentTarget.style.color = 'var(--text-muted)';
                e.currentTarget.style.borderColor = 'var(--text-disabled)';
              }}
              onMouseLeave={function (e) {
                e.currentTarget.style.color = 'var(--text-disabled)';
                e.currentTarget.style.borderColor = 'var(--border-base)';
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
          color: 'var(--cta-fg)',
          border: 'none',
          cursor: 'pointer',
          background: 'var(--gradient-cta)',
          transition: 'opacity 0.15s',
        }}
      >
        進入情境 →
      </button>
    </div>
  );
};

export default IntroPhase;

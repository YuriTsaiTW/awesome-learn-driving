import { Fragment, useState, useEffect } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  skip?: boolean;
  onDone?: () => void;
}

const TypewriterText = ({ text, speed, skip, onDone }: TypewriterTextProps) => {
  const spd = speed || 26;
  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(0);
  }, [text]);

  useEffect(() => {
    if (skip) {
      setCount(text.length);
      return;
    }
    if (count >= text.length) {
      if (onDone) onDone();
      return;
    }
    const t = setTimeout(
      () =>
        setCount(function (c: number) {
          return c + 1;
        }),
      spd,
    );
    return function () {
      clearTimeout(t);
    };
  }, [count, skip, text]);

  const shown = text.slice(0, count);
  const complete = count >= text.length;
  const parts = shown.split('\n\n');

  return (
    <span>
      {parts.map(function (para, i) {
        return (
          <Fragment key={i}>
            {i > 0 && <div style={{ marginBottom: 10 }} />}
            <span>{para}</span>
          </Fragment>
        );
      })}
      {!complete && (
        <span
          style={{
            display: 'inline-block',
            marginLeft: 1,
            color: '#f59e0b',
            fontWeight: 400,
            animation: 'twBlink 0.8s ease-in-out infinite',
          }}
        >
          |
        </span>
      )}
    </span>
  );
};

export default TypewriterText;

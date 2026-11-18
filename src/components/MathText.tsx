import React, { useMemo } from 'react';
import katex from 'katex';

interface MathFormulaProps {
  math: string;
  block?: boolean;
  className?: string;
}

export const MathFormula: React.FC<MathFormulaProps> = ({
  math,
  block = false,
  className = '',
}) => {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: block,
        throwOnError: false,
        strict: false,
      });
    } catch {
      return math;
    }
  }, [math, block]);

  if (block) {
    return (
      <div
        className={`my-2 overflow-x-auto text-slate-900 dark:text-slate-100 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      className={`inline-block align-baseline text-slate-900 dark:text-slate-100 ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

interface MathProseProps {
  text: string;
  className?: string;
}

type Token =
  | { type: 'block-math'; value: string }
  | { type: 'inline-math'; value: string }
  | { type: 'bold'; value: string }
  | { type: 'italic'; value: string }
  | { type: 'text'; value: string };

function tokenizeMathProse(input: string): Token[] {
  const tokens: Token[] = [];
  // Match $$...$$, $...$, **...**, or *...*
  const regex = /(\$\$[\s\S]+?\$\$|\$(?!\$)[^\n$]+?\$|\*\*[^*]+?\*\*|\*[^*\n]+?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(input)) !== null) {
    if (match.index > lastIndex) {
      tokens.push({ type: 'text', value: input.slice(lastIndex, match.index) });
    }
    const raw = match[0];
    if (raw.startsWith('$$') && raw.endsWith('$$')) {
      tokens.push({ type: 'block-math', value: raw.slice(2, -2).trim() });
    } else if (raw.startsWith('$') && raw.endsWith('$')) {
      tokens.push({ type: 'inline-math', value: raw.slice(1, -1).trim() });
    } else if (raw.startsWith('**') && raw.endsWith('**')) {
      tokens.push({ type: 'bold', value: raw.slice(2, -2) });
    } else if (raw.startsWith('*') && raw.endsWith('*')) {
      tokens.push({ type: 'italic', value: raw.slice(1, -1) });
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < input.length) {
    tokens.push({ type: 'text', value: input.slice(lastIndex) });
  }

  return tokens;
}

export const MathProse: React.FC<MathProseProps> = ({ text, className = '' }) => {
  const lines = useMemo(() => text.split('\n'), [text]);

  return (
    <div className={`space-y-2 leading-relaxed ${className}`}>
      {lines.map((line, lineIdx) => {
        if (!line.trim()) return null;
        const tokens = tokenizeMathProse(line);
        return (
          <div key={lineIdx}>
            {tokens.map((tok, idx) => {
              if (tok.type === 'block-math') {
                return <MathFormula key={idx} math={tok.value} block />;
              }
              if (tok.type === 'inline-math') {
                return <MathFormula key={idx} math={tok.value} />;
              }
              if (tok.type === 'bold') {
                return (
                  <strong
                    key={idx}
                    className="font-semibold text-slate-900 dark:text-white"
                  >
                    <InlineTokens text={tok.value} />
                  </strong>
                );
              }
              if (tok.type === 'italic') {
                return (
                  <em key={idx} className="italic">
                    <InlineTokens text={tok.value} />
                  </em>
                );
              }
              return <React.Fragment key={idx}>{tok.value}</React.Fragment>;
            })}
          </div>
        );
      })}
    </div>
  );
};

const InlineTokens: React.FC<{ text: string }> = ({ text }) => {
  const tokens = tokenizeMathProse(text);
  return (
    <>
      {tokens.map((tok, idx) => {
        if (tok.type === 'inline-math') {
          return <MathFormula key={idx} math={tok.value} />;
        }
        return <React.Fragment key={idx}>{tok.value}</React.Fragment>;
      })}
    </>
  );
};

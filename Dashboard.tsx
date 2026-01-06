import { useState } from 'react';
import { useMode } from '../contexts/ModeContext';
import './Dashboard.css';

const simplifyTextSafely = (text: string): string => {
  if (!text) return '';

  const sentences = text
    .replace(/\n+/g, ' ')
    .split(/(?<=[.!?])\s+/);

  const importantSentences = sentences.filter(
    s => s.length > 20 && !s.toLowerCase().includes('for example')
  );

  const simplified = importantSentences.map(sentence =>
    sentence
      .replace(/\butilize\b/gi, 'use')
      .replace(/\bfacilitate\b/gi, 'help')
      .replace(/\bapproximately\b/gi, 'about')
      .replace(/\bcommence\b/gi, 'start')
      .replace(/\bimplement\b/gi, 'do')
      .replace(/\s+/g, ' ')
      .trim()
  );

  return simplified.slice(0, 4).join('. ') + '.';
};

export const Dashboard = ({ onReset }: { onReset?: () => void }) => {
  console.log("Dashboard is running");

  const modeContext = useMode();
  const modes = modeContext?.modes ?? [];

  const hasDyslexia = modes.includes('Dyslexia');
  const hasADHD = modes.includes('ADHD');
  const hasAutism = modes.includes('Autism');
  const hasAnxiety = modes.includes('Anxiety');

  const [content, setContent] = useState('');
  const [simplifiedContent, setSimplifiedContent] = useState('');
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [showAnxietyHelp, setShowAnxietyHelp] = useState(false);

  const simplifyContent = () => {
    if (!content.trim()) return;
    setSimplifiedContent(simplifyTextSafely(content));
    setCurrentBlockIndex(0);
  };

  const getContentBlocks = () => {
    return simplifiedContent
      .split('. ')
      .filter(Boolean)
      .map(s => s + '.');
  };

  const blocks = getContentBlocks();
  
  return (
    <div
      className={`dashboard ${
        hasDyslexia ? 'dyslexia-mode' : ''
      } ${hasAutism ? 'autism-mode' : ''}`}
    >
      <button onClick={onReset}>← Back</button>

      <h2>NEUROEASE Dashboard</h2>

      <textarea
        placeholder="Paste your learning content here..."
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <button onClick={simplifyContent}>Simplify Content</button>

      {hasAnxiety && (
        <button onClick={() => setShowAnxietyHelp(!showAnxietyHelp)}>
          I’m feeling anxious
        </button>
      )}

      {showAnxietyHelp && (
        <div className="anxiety-box">
          <p>You are safe. Let’s slow down.</p>
          <p>Breathe in for 4… hold for 4… breathe out for 6.</p>
          <p>
            This is gentle emotional support — not therapy or diagnosis.
          </p>
        </div>
      )}

      {simplifiedContent && (
        <div className="output">
          {hasADHD ? (
            <>
              <p>{blocks[currentBlockIndex]}</p>
              <p>
                {currentBlockIndex + 1} of {blocks.length}
              </p>
              {currentBlockIndex < blocks.length - 1 && (
                <button
                  onClick={() =>
                    setCurrentBlockIndex(i => i + 1)
                  }
                >
                  Next
                </button>
              )}
            </>
          ) : hasAutism ? (
            blocks.map((b, i) => (
              <p key={i}>
                <strong>Step {i + 1}:</strong> {b}
              </p>
            ))
          ) : (
            blocks.map((b, i) => <p key={i}>{b}</p>)
          )}
        </div>
      )}
    </div>
  );
};

import { useMode } from '../contexts/ModeContext';
import './ModeSelection.css';

export const ModeSelection = ({ onContinue }: { onContinue: () => void }) => {
  const { selectedModes, toggleMode, isModeSelected } = useMode();

  const modes: Array<{
    id: 'Dyslexia' | 'ADHD' | 'Autism' | 'Anxiety Support';
    label: string;
    description: string;
  }> = [
    { id: 'Dyslexia', label: 'Dyslexia', description: 'Enhanced readability with larger fonts and spacing' },
    { id: 'ADHD', label: 'ADHD', description: 'Focused content blocks with progress tracking' },
    { id: 'Autism', label: 'Autism', description: 'Minimal interface with clear structure' },
    { id: 'Anxiety Support', label: 'Anxiety Support', description: 'Calming features and breathing exercises' },
  ];

  const handleContinue = () => {
    if (selectedModes.length > 0) {
      onContinue();
    }
  };

  return (
    <div className="mode-selection">
      <h1>NEUROEASE</h1>
      <p className="subtitle">Select one or more modes to personalize your experience</p>

      <div className="modes-container">
        {modes.map((mode) => (
          <label key={mode.id} className="mode-option">
            <input
              type="checkbox"
              checked={isModeSelected(mode.id)}
              onChange={() => toggleMode(mode.id)}
            />
            <div className="mode-content">
              <span className="mode-label">{mode.label}</span>
              <span className="mode-description">{mode.description}</span>
            </div>
          </label>
        ))}
      </div>

      <button
        className="continue-button"
        onClick={handleContinue}
        disabled={selectedModes.length === 0}
      >
        Continue
      </button>
    </div>
  );
};

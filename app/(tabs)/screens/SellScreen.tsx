// CountdownTimer.tsx
import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState(0);

  // Handle start countdown
  const startCountdown = () => {
    const total = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
    if (total <= 0) {
      alert('Please set a valid time');
      return;
    }
    setTotalSeconds(total);
    setIsRunning(true);
  };

  // Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          if (prev <= 1) {
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  // Calculate time units from total seconds
  const displayDays = Math.floor(totalSeconds / 86400);
  const displayHours = Math.floor((totalSeconds % 86400) / 3600);
  const displayMinutes = Math.floor((totalSeconds % 3600) / 60);
  const displaySeconds = totalSeconds % 60;

  const resetCountdown = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setDays(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  return (
    <div className="countdown-container">
      <header className="header">
        <h1>Set Countdown Timer</h1>
      </header>

      {/* Image Upload Placeholder */}
      <div className="image-upload">
        <div className="image-placeholder">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
            <path d="M4 16L8 12L12 16L18 10L20 12V4H4V16Z" stroke="#666" strokeWidth="2"/>
            <rect x="4" y="4" width="16" height="16" rx="2" stroke="#666" strokeWidth="2"/>
          </svg>
          <span>Tap to add image</span>
        </div>
      </div>

      {/* Time Inputs */}
      <div className="time-inputs">
        <div className="input-group">
          <label>Days</label>
          <input
            type="number"
            min="0"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
        
        <div className="input-group">
          <label>Hours</label>
          <input
            type="number"
            min="0"
            max="23"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
        
        <div className="input-group">
          <label>Minutes</label>
          <input
            type="number"
            min="0"
            max="59"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
        
        <div className="input-group">
          <label>Seconds</label>
          <input
            type="number"
            min="0"
            max="59"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
            disabled={isRunning}
          />
        </div>
      </div>

      {/* Countdown Display */}
      {isRunning && (
        <div className="countdown-display">
          <div className="time-display">
            <div className="time-unit">
              <span className="number">{displayDays.toString().padStart(2, '0')}</span>
              <span className="label">Days</span>
            </div>
            <div className="time-unit">
              <span className="number">{displayHours.toString().padStart(2, '0')}</span>
              <span className="label">Hours</span>
            </div>
            <div className="time-unit">
              <span className="number">{displayMinutes.toString().padStart(2, '0')}</span>
              <span className="label">Minutes</span>
            </div>
            <div className="time-unit">
              <span className="number">{displaySeconds.toString().padStart(2, '0')}</span>
              <span className="label">Seconds</span>
            </div>
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="action-button">
        {!isRunning ? (
          <button onClick={startCountdown} className="start-btn">
            Start Countdown
          </button>
        ) : (
          <button onClick={resetCountdown} className="reset-btn">
            Reset Countdown
          </button>
        )}
      </div>

      <style>{`
        .countdown-container {
          max-width: 400px;
          margin: 0 auto;
          padding: 20px;
          background: white;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .header {
          text-align: center;
          margin-bottom: 30px;
        }

        .header h1 {
          font-size: 24px;
          font-weight: 600;
          margin: 0;
          color: #000;
        }

        .image-upload {
          margin-bottom: 30px;
        }

        .image-placeholder {
          width: 100%;
          height: 150px;
          border: 2px dashed #ddd;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #666;
          cursor: pointer;
        }

        .image-placeholder span {
          margin-top: 8px;
          font-size: 16px;
        }

        .time-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 30px;
        }

        .input-group {
          text-align: center;
        }

        .input-group label {
          display: block;
          font-weight: 600;
          margin-bottom: 8px;
          color: #000;
        }

        .input-group input {
          width: 100%;
          padding: 12px;
          border: 2px solid #e5e5e5;
          border-radius: 8px;
          font-size: 16px;
          text-align: center;
        }

        .input-group input:disabled {
          background: #f5f5f5;
          color: #999;
        }

        .countdown-display {
          background: #f8f9fa;
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 30px;
        }

        .time-display {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          gap: 10px;
          text-align: center;
        }

        .time-unit .number {
          font-size: 24px;
          font-weight: bold;
          font-family: 'Courier New', monospace;
          color: #000;
          display: block;
        }

        .time-unit .label {
          font-size: 12px;
          color: #666;
          display: block;
          margin-top: 4px;
        }

        .action-button {
          text-align: center;
        }

        .start-btn, .reset-btn {
          width: 100%;
          padding: 16px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 18px;
          font-weight: 600;
          cursor: pointer;
        }

        .start-btn:hover {
          background: #0056b3;
        }

        .reset-btn {
          background: #dc3545;
        }

        .reset-btn:hover {
          background: #c82333;
        }
      `}</style>
    </div>
  );
};

export default CountdownTimer;
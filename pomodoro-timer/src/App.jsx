import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, BrainCircuit } from 'lucide-react';

const FOCUS_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

function App() {
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState('focus'); // 'focus' | 'break'

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (isRunning && timeLeft === 0) {
      // Switch mode automatically
      const newMode = mode === 'focus' ? 'break' : 'focus';
      setMode(newMode);
      setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
      setIsRunning(false); // Pause when switching modes to let user take a breath
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  const switchMode = (newMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(newMode === 'focus' ? FOCUS_TIME : BREAK_TIME);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isFocus = mode === 'focus';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 selection:bg-cute-secondary selection:text-cute-bg transition-colors duration-500">
      <div className={`w-full max-w-md bg-cute-panel rounded-3xl shadow-2xl p-8 relative overflow-hidden transition-all duration-500 ${isFocus ? 'shadow-cute-primary/20' : 'shadow-cute-secondary/20'}`}>
        
        {/* Decorative elements */}
        <div className={`absolute top-0 left-0 w-full h-2 ${isFocus ? 'bg-cute-primary' : 'bg-cute-secondary'} transition-colors duration-500`}></div>
        <div className="absolute -top-16 -right-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>

        {/* Header / Mode Switcher */}
        <div className="flex justify-center space-x-4 mb-8 relative z-10">
          <button
            onClick={() => switchMode('focus')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold transition-all duration-300 ${
              isFocus 
                ? 'bg-cute-primary text-cute-bg shadow-lg scale-105' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <BrainCircuit size={18} />
            <span>Focus</span>
          </button>
          <button
            onClick={() => switchMode('break')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full font-bold transition-all duration-300 ${
              !isFocus 
                ? 'bg-cute-secondary text-cute-bg shadow-lg scale-105' 
                : 'text-white/50 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Coffee size={18} />
            <span>Break</span>
          </button>
        </div>

        {/* Timer Display */}
        <div className="text-center mb-10 relative z-10">
          <div className="relative inline-block">
            <div className={`text-8xl font-extrabold tracking-tight tabular-nums transition-all duration-500 ${isFocus ? 'text-cute-primary' : 'text-cute-secondary'} ${isRunning ? 'animate-pulse-slow' : ''}`}>
              {formatTime(timeLeft)}
            </div>
          </div>
          <p className="mt-4 text-white/60 font-medium text-lg tracking-wide">
            {isFocus ? "Time to stay focused! 🍅" : "Take a deep breath! ☕"}
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center items-center space-x-6 relative z-10">
          <button
            onClick={toggleTimer}
            className={`w-20 h-20 rounded-2xl flex justify-center items-center shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 ${
              isFocus 
                ? 'bg-cute-primary text-cute-bg hover:bg-cute-accent' 
                : 'bg-cute-secondary text-cute-bg hover:opacity-90'
            }`}
          >
            {isRunning ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-2" />}
          </button>

          <button
            onClick={resetTimer}
            className="w-14 h-14 rounded-2xl bg-white/5 text-white/70 flex justify-center items-center hover:bg-white/10 hover:text-white transition-all duration-300 active:scale-95 shadow-lg"
          >
            <RotateCcw size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

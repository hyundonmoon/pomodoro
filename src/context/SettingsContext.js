import { useState, useEffect, createContext } from 'react';

export const SettingsContext = createContext({});

export const SettingsProvider = ({ children }) => {
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [targetSeconds, setTargetSeconds] = useState(1500);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const [selectedMode, setSelectedMode] = useState('pomodoro');
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    if (selectedMode === 'pomodoro') {
      setTargetSeconds(pomodoroMinutes * 60);
    } else if (selectedMode === 'short') {
      setTargetSeconds(shortBreakMinutes * 60);
    } else {
      setTargetSeconds(longBreakMinutes * 60);
    }
  }, [selectedMode, pomodoroMinutes, shortBreakMinutes, longBreakMinutes]);

  const RADIUS = 40;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const reset = () => {
    setPomodoroMinutes(25);
    setShortBreakMinutes(5);
    setLongBreakMinutes(15);
  };

  return (
    <SettingsContext.Provider
      value={{
        pomodoroMinutes,
        shortBreakMinutes,
        longBreakMinutes,
        setPomodoroMinutes,
        setShortBreakMinutes,
        setLongBreakMinutes,
        reset,
        RADIUS,
        CIRCUMFERENCE,
        paused,
        setPaused,
        selectedMode,
        setSelectedMode,
        targetSeconds,
        elapsedSeconds,
        setElapsedSeconds,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

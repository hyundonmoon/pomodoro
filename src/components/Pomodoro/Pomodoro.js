import { useEffect, useCallback } from 'react';
import useSettings from '../../hook/useSettings';
import ProgressBar from '../ProgressBar/ProgressBar';
import ModeControl from '../ModeControl/ModeControl';
import './Pomodoro.css';

const Pomodoro = ({ setSettingOpen, setAboutOpen }) => {
  const {
    paused,
    setPaused,
    targetSeconds,
    elapsedSeconds,
    setElapsedSeconds,
    setIntervalId,
  } = useSettings();

  const minutes = Math.floor((targetSeconds - elapsedSeconds) / 60);
  const seconds = ((targetSeconds - elapsedSeconds) % 60)
    .toString()
    .padStart(2, '0');

  const tick = useCallback(() => {
    setElapsedSeconds((prev) => ++prev);
  }, [setElapsedSeconds]);

  useEffect(() => {
    if (paused) return;

    const intervalId = setInterval(() => {
      tick();
    }, 1000);

    setIntervalId(intervalId);
  }, [targetSeconds, paused, tick, setIntervalId]);

  return (
    <div className='pomodoro'>
      <ModeControl />
      <div
        className='timer'
        onClick={() => {
          setPaused((prev) => !prev);
        }}
      >
        <ProgressBar />
        <div className='timer__contents'>
          <div className='timer__time'>
            {minutes} : {seconds}
          </div>
          <div className='timer__text'>
            press to {paused ? 'start' : 'pause'}
          </div>
        </div>
      </div>
      <div className='buttons'>
        <button
          className='button'
          onClick={() => setSettingOpen((prev) => !prev)}
        >
          settings
        </button>
        <button
          className='button'
          onClick={() => setAboutOpen((prev) => !prev)}
        >
          About
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;

import { useState, useEffect, useRef, useCallback } from 'react';
import useSettings from '../../hook/useSettings';
import {
  AiOutlinePlayCircle,
  AiOutlinePauseCircle,
  AiOutlineSetting,
} from 'react-icons/ai';
import ProgressBar from '../ProgressBar/ProgressBar';

import ModeControl from '../ModeControl/ModeControl';
import './Pomodoro.css';

const Pomodoro = ({ setSettingOpen }) => {
  const {
    CIRCUMFERENCE,
    paused,
    setPaused,
    targetSeconds,
    elapsedSeconds,
    setElapsedSeconds,
  } = useSettings();
  const [offsetAmount, setOffsetAmount] = useState(0);

  const pausedRef = useRef(paused);
  const intervalIdRef = useRef(null);
  const elapsedTimeRef = useRef(elapsedSeconds);

  const tick = useCallback(() => {
    elapsedTimeRef.current++;
    setElapsedSeconds((prev) => ++prev);
  }, [setElapsedSeconds]);

  const resetElapsedTime = useCallback(() => {
    elapsedTimeRef.current = 0;
    setElapsedSeconds(0);
  }, [setElapsedSeconds]);

  const pauseTimer = useCallback(() => {
    pausedRef.current = true;
    setPaused(true);
  }, [setPaused]);

  useEffect(() => {
    setOffsetAmount(CIRCUMFERENCE / targetSeconds);
  }, [CIRCUMFERENCE, targetSeconds]);

  useEffect(() => {
    if (paused) return;

    intervalIdRef.current = setInterval(() => {
      if (pausedRef.current) {
        return clearInterval(intervalIdRef.current);
      }

      if (elapsedTimeRef.current >= targetSeconds) {
        alert('You done now');
        return clearInterval(intervalIdRef.current);
      }

      tick();
    }, 1000);
  }, [targetSeconds, paused, tick]);

  const minutes = Math.floor((targetSeconds - elapsedSeconds) / 60);
  const seconds = ((targetSeconds - elapsedSeconds) % 60)
    .toString()
    .padStart(2, '0');

  return (
    <div className='pomodoro'>
      <ModeControl
        resetElapsedTime={resetElapsedTime}
        pauseTimer={pauseTimer}
      />
      <div className='timer__progress-bar'>
        <ProgressBar
          totalWidth={400}
          totalHeight={400}
          offset={offsetAmount * elapsedSeconds}
        />
        <div className='timer__elapsed-time'>
          {minutes} : {seconds}
        </div>
      </div>
      <div className='buttons'>
        <button
          onClick={() => {
            pausedRef.current = !pausedRef.current;
            setPaused((prev) => !prev);
          }}
          className='button'
        >
          {paused ? <AiOutlinePlayCircle /> : <AiOutlinePauseCircle />}
        </button>
        <button
          className='button'
          onClick={() => setSettingOpen((prev) => !prev)}
        >
          <AiOutlineSetting />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;

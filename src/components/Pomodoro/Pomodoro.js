import { useEffect, useCallback } from 'react';
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
    paused,
    setPaused,
    targetSeconds,
    elapsedSeconds,
    setElapsedSeconds,
    setIntervalId,
  } = useSettings();

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

  const minutes = Math.floor((targetSeconds - elapsedSeconds) / 60);
  const seconds = ((targetSeconds - elapsedSeconds) % 60)
    .toString()
    .padStart(2, '0');

  return (
    <div className='pomodoro'>
      <ModeControl />
      <div className='timer__progress-bar'>
        <ProgressBar />
        <div className='timer__elapsed-time'>
          {minutes} : {seconds}
        </div>
      </div>
      <div className='buttons'>
        <button
          onClick={() => {
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

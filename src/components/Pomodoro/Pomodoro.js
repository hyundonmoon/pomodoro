import { useEffect, useCallback } from 'react';
import useSettings from '../../hook/useSettings';
import ProgressBar from '../ProgressBar/ProgressBar';
import ModeControl from '../ModeControl/ModeControl';
import {
  AiOutlineSetting,
  AiOutlineQuestion,
  AiOutlineUndo,
} from 'react-icons/ai';

import './Pomodoro.css';
import { reducerConstants } from '../../utils/constants';

const { TOGGLE_TIMER, RESET_TIMER, SET_INTERVAL, TICK } = reducerConstants;

const Pomodoro = ({ setSettingOpen, setAboutOpen }) => {
  const { state, dispatch } = useSettings();

  const targetSeconds = state.selectedMode.length * 60;
  const elapsedSeconds = state.elapsedSeconds;

  const minutes = Math.floor((targetSeconds - elapsedSeconds) / 60);
  const seconds = ((targetSeconds - elapsedSeconds) % 60)
    .toString()
    .padStart(2, '0');

  const tick = useCallback(() => {
    dispatch({ type: TICK });
  }, [dispatch]);

  const resetTimer = () => {
    dispatch({ type: RESET_TIMER });
  };

  const toggleTimer = () => {
    dispatch({ type: TOGGLE_TIMER });
  };

  useEffect(() => {
    if (state.paused) return;
    const intervalId = setInterval(() => {
      tick();
    }, 1000);
    dispatch({ type: SET_INTERVAL, id: intervalId });
  }, [targetSeconds, state.paused, tick, dispatch]);

  return (
    <div className='pomodoro'>
      <ModeControl />
      <div className='timer' onClick={toggleTimer}>
        <ProgressBar />
        <div className='timer__contents'>
          <div className='timer__time'>
            {minutes} : {seconds}
          </div>
          <div className='timer__text'>
            press to {state.paused ? 'start' : 'pause'}
          </div>
        </div>
      </div>
      <div className='buttons'>
        <button className='button' onClick={resetTimer}>
          <AiOutlineUndo />
        </button>
        <button
          className='button'
          onClick={() => setSettingOpen((prev) => !prev)}
        >
          <AiOutlineSetting />
        </button>
        <button
          className='button'
          onClick={() => setAboutOpen((prev) => !prev)}
        >
          <AiOutlineQuestion />
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;

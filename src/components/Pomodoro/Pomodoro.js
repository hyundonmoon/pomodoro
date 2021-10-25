import { useEffect, useCallback } from 'react';
import useSettings from 'hook/useSettings';
import useToast from 'hook/useToast';
import useSound from 'use-sound';
import ProgressBar from 'components/ProgressBar/ProgressBar';
import ModeControl from 'components/ModeControl/ModeControl';
import {
  AiOutlineSetting,
  AiOutlineQuestion,
  AiOutlineUndo,
} from 'react-icons/ai';
import { BsVolumeMute, BsVolumeUp } from 'react-icons/bs';
import { reducerConstants } from 'utils/constants';
import './Pomodoro.css';
import clickSound from 'sounds/click.mp3';

const { TOGGLE_TIMER, RESET_TIMER, SET_INTERVAL, TICK, TOGGLE_VOLUME } =
  reducerConstants;

const ON = 'ON';
const OFF = 'OFF';

const Pomodoro = ({ setSettingOpen, setAboutOpen }) => {
  const { state, dispatch } = useSettings();
  const { addToast } = useToast();
  const [play] = useSound(clickSound);

  const targetSeconds = state.selectedMode.length * 60;
  const elapsedSeconds = state.elapsedSeconds;

  const MINUTES = Math.floor((targetSeconds - elapsedSeconds) / 60);
  const SECONDS = ((targetSeconds - elapsedSeconds) % 60)
    .toString()
    .padStart(2, '0');

  const tick = useCallback(() => {
    dispatch({ type: TICK });
  }, [dispatch]);

  const handleDispatch = useCallback(
    (type) => {
      return () => {
        if (type === TOGGLE_VOLUME) {
          addToast(`Sound: ${state.soundOn ? OFF : ON}`);
        }
        if (state.soundOn) {
          play();
        }
        dispatch({ type });
      };
    },
    [dispatch, addToast, state.soundOn, play]
  );

  const toggleModal = (fn) => {
    return () => {
      if (state.soundOn) {
        play();
      }
      fn((prev) => !prev);
    };
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
      <div className='timer' onClick={handleDispatch(TOGGLE_TIMER)}>
        <ProgressBar />
        <div className='timer__contents'>
          <div className='timer__time'>
            {MINUTES} : {SECONDS}
          </div>
          <div className='timer__text'>
            press to {state.paused ? 'start' : 'pause'}
          </div>
        </div>
      </div>
      <div className='buttons'>
        <button className='button' onClick={handleDispatch(RESET_TIMER)}>
          <AiOutlineUndo />
        </button>
        <button className='button' onClick={toggleModal(setSettingOpen)}>
          <AiOutlineSetting />
        </button>
        <button className='button' onClick={toggleModal(setAboutOpen)}>
          <AiOutlineQuestion />
        </button>
        <button className='button' onClick={handleDispatch(TOGGLE_VOLUME)}>
          {state.soundOn ? <BsVolumeUp /> : <BsVolumeMute />}
        </button>
      </div>
    </div>
  );
};

export default Pomodoro;

import { useState, useRef, useCallback, useEffect } from 'react';
import useSettings from 'hook/useSettings';
import useToast from 'hook/useToast';
import { constants, reducerConstants } from 'utils/constants';

import './Modal.css';

const { POMODORO, SHORT, LONG } = constants;
const { CHANGE_TIME, RESET_SETTINGS } = reducerConstants;

const Settings = ({ settingOpen, setSettingOpen }) => {
  const settingsRef = useRef(null);
  const { state, dispatch } = useSettings();
  const { addToast } = useToast();
  const [pomodoroLength, setPomodoroLength] = useState(state.modes.pomodoro);
  const [shortLength, setShortLength] = useState(state.modes.short);
  const [longLength, setLongLength] = useState(state.modes.long);

  const handleSettingUpdate = () => {
    dispatch({
      type: CHANGE_TIME,
      updatedTime: {
        [POMODORO]: pomodoroLength,
        [SHORT]: shortLength,
        [LONG]: longLength,
      },
    });
    addToast(`SAVED`);
    closeSetting();
  };

  const handleChange = (fn) => {
    return (e) => {
      fn(parseInt(e.target.value));
    };
  };

  const closeSetting = () => {
    setSettingOpen(false);
  };

  const resetSetting = () => {
    dispatch({ type: RESET_SETTINGS });
    addToast(`RESET`);
    closeSetting();
  };

  const handleClickOutsideSetting = useCallback(
    (e) => {
      if (
        settingsRef.current !== null &&
        !settingsRef.current.contains(e.target)
      ) {
        setSettingOpen(false);
      }
    },
    [setSettingOpen]
  );

  useEffect(() => {
    if (settingOpen) {
      window.addEventListener('click', handleClickOutsideSetting);
    }
    return () => {
      window.removeEventListener('click', handleClickOutsideSetting);
    };
  }, [settingOpen, handleClickOutsideSetting]);

  return (
    <div className='modal__background'>
      <div className='modal' ref={settingsRef}>
        <div className='modal__header'>
          <h2 className='modal__heading'>Settings</h2>
          <button className='modal__close' onClick={closeSetting}>
            x
          </button>
        </div>
        <div className='modal__body'>
          <div className='body__section'>
            <h2 className='section__title'>Time (minutes)</h2>
            <div className='section__option'>
              <p className='option__label'>pomodoro</p>
              <input
                type='number'
                className='option__input'
                value={pomodoroLength}
                onChange={handleChange(setPomodoroLength)}
              />
            </div>
            <div className='section__option'>
              <p className='option__label'>short break</p>
              <input
                type='number'
                className='option__input'
                value={shortLength}
                onChange={handleChange(setShortLength)}
              />
            </div>
            <div className='section__option'>
              <p className='option__label'>long break</p>
              <input
                type='number'
                className='option__input'
                value={longLength}
                onChange={handleChange(setLongLength)}
              />
            </div>
            <div className='flex'>
              <button
                className='option__button option__button-save'
                onClick={handleSettingUpdate}
              >
                save
              </button>
              <button
                className='option__button option__button-reset'
                onClick={resetSetting}
              >
                reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

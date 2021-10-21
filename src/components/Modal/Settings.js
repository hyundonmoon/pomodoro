import { useRef, useCallback, useEffect } from 'react';
import './Modal.css';
import useSettings from '../../hook/useSettings';

const Settings = ({ settingOpen, setSettingOpen }) => {
  const settingsRef = useRef(null);
  const {
    pomodoroMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    setPomodoroMinutes,
    setShortBreakMinutes,
    setLongBreakMinutes,
    setPaused,
    setElapsedSeconds,
    reset,
  } = useSettings();

  const handleInputChange = useCallback(
    (fn) => {
      return (e) => {
        setPaused(true);
        setElapsedSeconds(0);
        fn(e.target.value);
      };
    },
    [setPaused, setElapsedSeconds]
  );

  const closeSetting = () => {
    setSettingOpen(false);
  };

  const resetSetting = () => {
    reset();
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
                min='15'
                className='option__input'
                value={pomodoroMinutes}
                onChange={handleInputChange(setPomodoroMinutes)}
              />
            </div>
            <div className='section__option'>
              <p className='option__label'>short break</p>
              <input
                type='number'
                min='15'
                className='option__input'
                value={shortBreakMinutes}
                onChange={handleInputChange(setShortBreakMinutes)}
              />
            </div>
            <div className='section__option'>
              <p className='option__label'>long break</p>
              <input
                type='number'
                min='15'
                className='option__input'
                value={longBreakMinutes}
                onChange={handleInputChange(setLongBreakMinutes)}
              />
            </div>
            <button className='option__reset' onClick={resetSetting}>
              reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

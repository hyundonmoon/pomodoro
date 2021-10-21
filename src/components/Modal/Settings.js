import { useRef, useCallback, useEffect } from 'react';
import useSettings from '../../hook/useSettings';
import { constants } from '../../utils/constants';

import './Modal.css';

const Settings = ({ settingOpen, setSettingOpen }) => {
  const settingsRef = useRef(null);
  const { state, dispatch } = useSettings();

  const {
    modes: { pomodoro, short, long },
  } = state;
  const { POMODORO, SHORT, LONG } = constants;

  const handleInputChange = useCallback(
    (name) => {
      return (e) => {
        console.log(e.target.value);
        return dispatch({
          type: 'CHANGE_TIME',
          name,
          length: parseInt(e.target.value),
        });
      };
    },
    [dispatch]
  );

  const closeSetting = () => {
    setSettingOpen(false);
  };

  const resetSetting = () => {
    dispatch({ type: 'RESET_SETTINGS' });
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
                value={pomodoro}
                onChange={handleInputChange(POMODORO)}
              />
            </div>
            <div className='section__option'>
              <p className='option__label'>short break</p>
              <input
                type='number'
                className='option__input'
                value={short}
                onChange={handleInputChange(SHORT)}
              />
            </div>
            <div className='section__option'>
              <p className='option__label'>long break</p>
              <input
                type='number'
                className='option__input'
                value={long}
                onChange={handleInputChange(LONG)}
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

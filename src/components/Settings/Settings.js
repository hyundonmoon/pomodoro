import './Settings.css';
import useSettings from '../../hook/useSettings';

const Settings = ({ setSettingOpen }) => {
  const {
    pomodoroMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    setPomodoroMinutes,
    setShortBreakMinutes,
    setLongBreakMinutes,
  } = useSettings();
  return (
    <div className='modal'>
      <div className='settings'>
        <div className='settings__header'>
          <h2 className='settings__heading'>Settings</h2>
          <button
            className='settings__close'
            onClick={() => {
              setSettingOpen(false);
            }}
          >
            x
          </button>
        </div>
        <div className='settings__body'>
          <div className='settings__section section__minutes'>
            <h2 className='section__title'>time (minutes)</h2>
            <div className='settings__option'>
              <p className='settings__label'>pomodoro</p>
              <input
                type='number'
                min='15'
                className='settings__input'
                value={pomodoroMinutes}
                onChange={(e) => setPomodoroMinutes(e.target.value)}
              />
            </div>
            <div className='settings__option'>
              <p className='settings__label'>short break</p>
              <input
                type='number'
                min='15'
                className='settings__input'
                value={shortBreakMinutes}
                onChange={(e) => setShortBreakMinutes(e.target.value)}
              />
            </div>
            <div className='settings__option'>
              <p className='settings__label'>long break</p>
              <input
                type='number'
                min='15'
                className='settings__input'
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

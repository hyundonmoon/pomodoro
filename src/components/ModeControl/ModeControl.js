import useSettings from '../../hook/useSettings';

import './ModeControl.css';

const ModeControl = () => {
  const {
    pomodoroMinutes,
    shortBreakMinutes,
    longBreakMinutes,
    setSelectedMode,
    setPaused,
    setElapsedSeconds,
  } = useSettings();

  const handleModeChange = (e) => {
    setPaused(true);
    setElapsedSeconds(0);
    setSelectedMode(e.target.id);
  };

  return (
    <form onChange={handleModeChange} className='modes'>
      <div className='mode'>
        <input
          type='radio'
          id='pomodoro'
          value={pomodoroMinutes}
          name='mode'
          className='mode__input hidden'
          defaultChecked
        />
        <label htmlFor='pomodoro' className='mode__label'>
          pomodoro
        </label>
      </div>
      <div className='mode'>
        <input
          type='radio'
          id='short'
          value={shortBreakMinutes}
          name='mode'
          className='mode__input hidden'
        />
        <label htmlFor='short' className='mode__label'>
          short break
        </label>
      </div>
      <div className='mode'>
        <input
          type='radio'
          id='long'
          value={longBreakMinutes}
          name='mode'
          className='mode__input hidden'
        />
        <label htmlFor='long' className='mode__label'>
          long break
        </label>
      </div>
    </form>
  );
};

export default ModeControl;

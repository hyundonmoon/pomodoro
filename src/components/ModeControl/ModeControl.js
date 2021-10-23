import useSettings from 'hook/useSettings';
import { constants, reducerConstants } from 'utils/constants';

import './ModeControl.css';
const { POMODORO, SHORT, LONG } = constants;
const { CHANGE_MODE } = reducerConstants;

const ModeControl = () => {
  const { state, dispatch } = useSettings();

  const handleModeChange = (e) => {
    dispatch({ type: CHANGE_MODE, name: e.target.id });
  };

  return (
    <form className='modes'>
      <div className='mode'>
        <input
          type='radio'
          id='pomodoro'
          value={state.modes[POMODORO]}
          name='mode'
          className='mode__input hidden'
          checked={state.selectedMode.name === POMODORO}
          onChange={handleModeChange}
        />
        <label htmlFor='pomodoro' className='mode__label'>
          pomodoro
        </label>
      </div>
      <div className='mode'>
        <input
          type='radio'
          id='short'
          value={state.modes[SHORT]}
          name='mode'
          className='mode__input hidden'
          checked={state.selectedMode.name === SHORT}
          onChange={handleModeChange}
        />
        <label htmlFor='short' className='mode__label'>
          short break
        </label>
      </div>
      <div className='mode'>
        <input
          type='radio'
          id='long'
          value={state.modes[LONG]}
          name='mode'
          className='mode__input hidden'
          checked={state.selectedMode.name === LONG}
          onChange={handleModeChange}
        />
        <label htmlFor='long' className='mode__label'>
          long break
        </label>
      </div>
    </form>
  );
};

export default ModeControl;

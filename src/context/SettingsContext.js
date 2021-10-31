import { useEffect, useReducer, createContext } from 'react';
import useSound from 'use-sound';
import useToast from 'hook/useToast';
import { constants, reducerConstants, toastConstants } from 'utils/constants';
import alarm from 'sounds/alarm.mp3';

export const SettingsContext = createContext({});

const { POMODORO, SHORT, LONG, TITLE } = constants;
const {
  CHANGE_MODE,
  CHANGE_TIME,
  RESET_SETTINGS,
  RESET_TIMER,
  TOGGLE_TIMER,
  TICK,
  SET_INTERVAL,
  CLEAR_INTERVAL,
  TOGGLE_VOLUME,
} = reducerConstants;
const { POMODORO_OVER_MSG, BREAK_OVER_MSG } = toastConstants;

const initialState = {
  selectedMode: { name: POMODORO, length: 25 },
  modes: {
    [POMODORO]: 25,
    [SHORT]: 5,
    [LONG]: 15,
  },
  elapsedSeconds: 0,
  paused: true,
  intervalId: null,
  soundOn: true,
};

const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_MODE:
      return {
        ...state,
        selectedMode: {
          name: action.name,
          length: state.modes[action.name],
        },
        paused: true,
        elapsedSeconds: 0,
      };
    case CHANGE_TIME:
      return {
        ...state,
        selectedMode: { name: POMODORO, length: action.updatedTime[POMODORO] },
        modes: action.updatedTime,
        paused: true,
        elapsedSeconds: 0,
      };
    case RESET_SETTINGS:
      return initialState;
    case RESET_TIMER:
      return {
        ...state,
        paused: true,
        elapsedSeconds: 0,
      };
    case TOGGLE_TIMER:
      return {
        ...state,
        paused: !state.paused,
      };
    case TICK:
      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1,
      };
    case SET_INTERVAL:
      return {
        ...state,
        intervalId: action.id,
      };
    case CLEAR_INTERVAL:
      clearInterval(state.intervalId);
      return {
        ...state,
        intervalId: null,
      };
    case TOGGLE_VOLUME:
      return {
        ...state,
        soundOn: !state.soundOn,
      };
    default:
      return state;
  }
};

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addToast } = useToast();
  const [play] = useSound(alarm);

  console.log(state);

  useEffect(() => {
    if (state.paused && state.intervalId) {
      dispatch({ type: CLEAR_INTERVAL });
      document.title = TITLE;
    } else if (state.elapsedSeconds > state.selectedMode.length * 60) {
      if (state.selectedMode.name === POMODORO) {
        addToast(POMODORO_OVER_MSG);
      } else {
        addToast(BREAK_OVER_MSG);
      }

      if (state.soundOn) {
        play();
      }

      dispatch({ type: RESET_TIMER });
      document.title = TITLE;
    }

    if (!state.paused && state.intervalId) {
      document.title = `${Math.floor(
        (state.selectedMode.length * 60 - state.elapsedSeconds) / 60
      )}: ${((state.selectedMode.length * 60 - state.elapsedSeconds) % 60)
        .toString()
        .padStart(2, '0')} left`;
    }
  }, [
    addToast,
    state.selectedMode,
    state.elapsedSeconds,
    state.paused,
    state.intervalId,
    state.soundOn,
    play,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

import { useEffect, useReducer, createContext } from 'react';
import useToast from '../hook/useToast';
import { constants } from '../utils/constants';

export const SettingsContext = createContext({});

const { POMODORO, SHORT, LONG, TITLE } = constants;

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
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_MODE':
      return {
        ...state,
        selectedMode: {
          name: action.name,
          length: state.modes[action.name],
        },
        paused: true,
        elapsedSeconds: 0,
      };
    case 'CHANGE_TIME':
      return {
        ...state,
        selectedMode: { name: action.name, length: action.length },
        modes: {
          ...state.modes,
          [action.name]: action.length,
        },
        paused: true,
        elapsedSeconds: 0,
      };
    case 'RESET_SETTINGS':
      return initialState;
    case 'RESET_TIMER':
      return {
        ...state,
        paused: true,
        elapsedSeconds: 0,
      };
    case 'START':
      return {
        ...state,
        paused: false,
      };
    case 'PAUSE':
      return {
        ...state,
        paused: true,
      };
    case 'TOGGLE':
      return {
        ...state,
        paused: !state.paused,
      };
    case 'TICK':
      return {
        ...state,
        elapsedSeconds: state.elapsedSeconds + 1,
      };
    case 'REWIND':
      return {
        ...state,
        paused: true,
        elapsedSeconds: 0,
      };
    case 'SET_INTERVAL':
      return {
        ...state,
        intervalId: action.id,
      };
    case 'CLEAR_INTERVAL':
      clearInterval(state.intervalId);
      return {
        ...state,
        intervalId: null,
      };
    default:
      return state;
  }
};

export const SettingsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { addToast } = useToast();

  useEffect(() => {
    if (state.paused && state.intervalId) {
      dispatch({ type: 'CLEAR_INTERVAL' });
      document.title = TITLE;
    } else if (state.elapsedSeconds > state.selectedMode.length * 60) {
      if (state.selectedMode.name === 'pomodoro') {
        addToast('Take a break!');
      } else {
        addToast('Get back to work!');
      }
      dispatch({ type: 'REWIND' });
      document.title = 'Pomodoro Timer';
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

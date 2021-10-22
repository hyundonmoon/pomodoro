const POMODORO = 'pomodoro';
const SHORT = 'short';
const LONG = 'long';
const RADIUS = 40;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const TITLE = 'Pomodoro Timer';

const CHANGE_MODE = 'CHANGE_MODE';
const CHANGE_TIME = 'CHANGE_TIME';
const RESET_SETTINGS = 'RESET_SETTINGS';
const RESET_TIMER = 'RESET_TIMER';
const TOGGLE_TIMER = 'TOGGLE_TIMER';
const TICK = 'TICK';
const SET_INTERVAL = 'SET_INTERVAL';
const CLEAR_INTERVAL = 'CLEAR_INTERVAL';

const POMODORO_OVER_MSG = 'Take a break!';
const BREAK_OVER_MSG = 'Get back to work!';

export const constants = {
  POMODORO,
  SHORT,
  LONG,
  RADIUS,
  CIRCUMFERENCE,
  TITLE,
};

export const reducerConstants = {
  CHANGE_MODE,
  CHANGE_TIME,
  RESET_SETTINGS,
  RESET_TIMER,
  TOGGLE_TIMER,
  TICK,
  SET_INTERVAL,
  CLEAR_INTERVAL,
};

export const toastConstants = { POMODORO_OVER_MSG, BREAK_OVER_MSG };

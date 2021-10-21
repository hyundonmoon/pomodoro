import { useState, useEffect } from 'react';
import useSettings from '../../hook/useSettings';
import { constants } from '../../utils/constants';

import './ProgressBar.css';

const ProgressBar = () => {
  const [offsetAmount, setOffsetAmount] = useState(0);
  const { state } = useSettings();

  const { RADIUS, CIRCUMFERENCE } = constants;
  const targetSeconds = state.selectedMode.length * 60;
  const elapsedSeconds = state.elapsedSeconds;

  useEffect(() => {
    setOffsetAmount(CIRCUMFERENCE / targetSeconds);
  }, [CIRCUMFERENCE, targetSeconds]);

  return (
    <svg viewBox='0 0 100 100' className='progress-bar'>
      <circle
        r={RADIUS}
        cx='50%'
        cy='50%'
        className='progress-bar__path'
      ></circle>
      <circle
        r={RADIUS}
        cx='50%'
        cy='50%'
        className='progress-bar__bar'
        strokeDasharray={CIRCUMFERENCE}
        strokeDashoffset={offsetAmount * elapsedSeconds}
      ></circle>
    </svg>
  );
};

export default ProgressBar;

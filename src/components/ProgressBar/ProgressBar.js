import { useState, useEffect } from 'react';
import useSettings from '../../hook/useSettings';

import './ProgressBar.css';

const ProgressBar = () => {
  const [offsetAmount, setOffsetAmount] = useState(0);
  const { RADIUS, CIRCUMFERENCE, targetSeconds, elapsedSeconds } =
    useSettings();

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

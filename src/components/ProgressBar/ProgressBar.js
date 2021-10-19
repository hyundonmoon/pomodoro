import useSettings from '../../hook/useSettings';

import './ProgressBar.css';

const ProgressBar = ({ offset }) => {
  const { RADIUS, CIRCUMFERENCE } = useSettings();

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
        strokeDashoffset={offset}
      ></circle>
    </svg>
  );
};

export default ProgressBar;

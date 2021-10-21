import { useRef, useCallback, useEffect } from 'react';
import './Modal.css';

const About = ({ aboutOpen, setAboutOpen }) => {
  const aboutRef = useRef(null);

  const closeAbout = () => {
    setAboutOpen(false);
  };

  const handleClickOutsideAbout = useCallback(
    (e) => {
      if (aboutRef.current !== null && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    },
    [setAboutOpen]
  );

  useEffect(() => {
    if (aboutOpen) {
      window.addEventListener('click', handleClickOutsideAbout);
    }
    return () => {
      window.removeEventListener('click', handleClickOutsideAbout);
    };
  }, [aboutOpen, handleClickOutsideAbout]);

  return (
    <div className='modal__background'>
      <div className='modal' ref={aboutRef}>
        <div className='modal__header'>
          <h2 className='modal__heading'>About</h2>
          <button className='modal__close' onClick={closeAbout}>
            x
          </button>
        </div>
        <div className='modal__body'>
          <div className='body__section'>
            <h3 className='section__title'>Pomodoro Technique</h3>
            <p className='section__paragraph'>
              The Pomodoro Technique is a time management method developed by
              <b> Francesco Cirillo</b> in the late 1980s. It uses a timer to
              break work into intervals, traditionally 25 minutes in length,
              separated by short breaks. Each interval is known as a{' '}
              <i>pomodoro</i>, from the Italian word for 'tomato', after the
              tomato-shaped kitchen timer Cirillo used as a university student.{' '}
              <a href='https://en.wikipedia.org/wiki/Pomodoro_Technique'>
                (Wikipedia)
              </a>
            </p>
          </div>
          <div className='body__section'>
            <p className='section__paragraph'>
              The source code for this project can be found{' '}
              <a href='https://github.com/hyundonny/pomodoro'>here</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

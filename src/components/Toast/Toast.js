import { useEffect } from 'react';
import useToast from 'hook/useToast';

import './Toast.css';

const Toast = ({ id, text }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timerId = setTimeout(() => {
      removeToast(id);
    }, 3000);
    return () => {
      clearTimeout(timerId);
    };
  }, [id, removeToast]);

  return (
    <div onClick={() => removeToast(id)} className='toast'>
      <p>{text}</p>
    </div>
  );
};

export default Toast;

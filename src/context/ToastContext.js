import { useState, useCallback, createContext } from 'react';
import Portal from 'components/Portal';
import Toast from 'components/Toast/Toast';

let id = 0;

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(
    (text) => {
      setToasts((toasts) => [...toasts, { id: id++, text }]);
    },
    [setToasts]
  );

  const removeToast = useCallback(
    (id) => {
      setToasts((toasts) => toasts.filter((toast) => toast.id !== id));
    },
    [setToasts]
  );

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <Portal>
        <div className='toast__container'>
          {toasts.map((toast) => (
            <Toast key={toast.id} id={toast.id} text={toast.text} />
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
};

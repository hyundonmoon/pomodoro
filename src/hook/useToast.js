import { useContext } from 'react';
import { ToastContext } from '../context/ToastContext';

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;

import { useContext } from 'react';
import { SettingsContext } from 'context/SettingsContext';

const useSettings = () => {
  return useContext(SettingsContext);
};

export default useSettings;

import { useState } from 'react';

import Pomodoro from './components/Pomodoro/Pomodoro';
import Portal from './components/Portal';
import Settings from './components/Settings/Settings';

import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  const [settingOpen, setSettingOpen] = useState(false);

  return (
    <ToastProvider>
      <SettingsProvider>
        <Pomodoro setSettingOpen={setSettingOpen} />
        {settingOpen && (
          <Portal>
            <Settings
              settingOpen={settingOpen}
              setSettingOpen={setSettingOpen}
            />
          </Portal>
        )}
      </SettingsProvider>
    </ToastProvider>
  );
};

export default App;

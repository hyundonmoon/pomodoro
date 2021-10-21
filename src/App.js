import { useState } from 'react';

import Pomodoro from './components/Pomodoro/Pomodoro';
import Portal from './components/Portal';
import Settings from './components/Modal/Settings';
import About from './components/Modal/About';

import { SettingsProvider } from './context/SettingsContext';
import { ToastProvider } from './context/ToastContext';

const App = () => {
  const [settingOpen, setSettingOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <ToastProvider>
      <SettingsProvider>
        <Pomodoro setSettingOpen={setSettingOpen} setAboutOpen={setAboutOpen} />
        {settingOpen && (
          <Portal>
            <Settings
              settingOpen={settingOpen}
              setSettingOpen={setSettingOpen}
            />
          </Portal>
        )}
        {aboutOpen && (
          <Portal>
            <About aboutOpen={aboutOpen} setAboutOpen={setAboutOpen} />
          </Portal>
        )}
      </SettingsProvider>
    </ToastProvider>
  );
};

export default App;

import { useState } from 'react';

import Pomodoro from './components/Pomodoro/Pomodoro';
import Portal from './components/Portal';
import Settings from './components/Settings/Settings';

import { SettingsProvider } from './context/SettingsContext';

const App = () => {
  const [settingOpen, setSettingOpen] = useState(false);

  return (
    <SettingsProvider>
      <Pomodoro setSettingOpen={setSettingOpen} />
      {settingOpen && (
        <Portal>
          <Settings setSettingOpen={setSettingOpen} />
        </Portal>
      )}
    </SettingsProvider>
  );
};

export default App;

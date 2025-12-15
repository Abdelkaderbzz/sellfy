import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './components/providers/AppProviders';
import { routes } from './config/routes';
import { initializeTakiPopups } from './config/takiConfig';

// Initialize TakiPopups
initializeTakiPopups();
import Intercom from '@intercom/messenger-js-sdk';

Intercom({
  app_id: 'sauac5nq',
  user_id: '285917238',
  name: 'Abdelkader',
});
const App = () => {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
};

export default App;

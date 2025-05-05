import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProviders } from './components/providers/AppProviders';
import { routes } from './config/routes';
import { initializeTakiPopups } from './config/takiConfig';

// Initialize TakiPopups
initializeTakiPopups();

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

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './styles/variables.css';
import './styles/reset.css';
import './styles/base.css';
import './styles/utilities.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* BASE_URL is /MOALAB/ on GitHub Pages and / locally. */}
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);

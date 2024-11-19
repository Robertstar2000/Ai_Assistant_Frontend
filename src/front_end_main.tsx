import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './front_end_App';
import './front_end_index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
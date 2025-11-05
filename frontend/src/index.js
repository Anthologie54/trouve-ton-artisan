import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Bootstrap CSS + JS
import 'bootstrap/dist/css/bootstrap.min.css';
import * as bootstrap from 'bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';

//  Styles globaux
import './index.scss';

//  Rend accessible Bootstrap globalement
window.bootstrap = bootstrap;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

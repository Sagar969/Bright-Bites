import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/main.css'
import { MainContext } from './context/MainContext';
import { ParallaxProvider } from 'react-scroll-parallax';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ParallaxProvider>
      <MainContext>
        <App />
      </MainContext>
    </ParallaxProvider>
  </React.StrictMode>
);

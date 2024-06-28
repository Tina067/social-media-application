import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

 /**React.StrictMode is a useful tool in React for detecting potential problems in your application. It wraps your components and enables additional checks and warnings that can help you identify issues early in development. While it doesn't render anything to the DOM itself and doesn't impact the production build, it's valuable for maintaining and improving the quality of your codebase. */
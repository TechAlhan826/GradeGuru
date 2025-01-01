import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import for React 18
import './style.css';
import App from './App';
//import Forms from './forms'; // Import the component using its correct name <Forms /> import './index.css';

// Create the root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App component
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

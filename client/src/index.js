import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import AuthContexProvider from './context/AuthContexProvider';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContexProvider>
       <App />
    </AuthContexProvider>
  </React.StrictMode>
);

export default App;
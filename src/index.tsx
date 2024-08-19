import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import App from './App';
import reportWebVitals from './reportWebVitals';

<<<<<<< HEAD
=======
//Mon Shan
import { Provider } from 'react-redux';
import store from './Kanbas/store'; // Import the Redux store

>>>>>>> 99ca15e (Initial commit)
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
<<<<<<< HEAD
    <App />
=======
    <Provider store={store}>  {/* Wrap the App component with the Provider */}
      <App />
    </Provider>
>>>>>>> 99ca15e (Initial commit)
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

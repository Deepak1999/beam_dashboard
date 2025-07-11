import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ErrorBoundary } from './Components/ErrorBoundary/ErrorBoundary';

ReactDOM.render(
  <Provider store={store}>

    < BrowserRouter >
      <HashRouter>
        <ErrorBoundary>
          <div className="red_overlay">
            <App />
          </div>
        </ErrorBoundary>
      </HashRouter>
    </BrowserRouter >
  </Provider >

  ,
  document.getElementById("root")
);
reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

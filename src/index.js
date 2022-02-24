import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux"
import store from './store'
import ContextProvider from './components/Context/ContextProvider'
import { BrowserRouter } from 'react-router-dom'
import reducer, { initialState } from './redux/reducer'
import { StateProvider } from './stateProvider'

ReactDOM.render(
  <ContextProvider>
    <StateProvider initialState={initialState} reducer={reducer}>
      <Provider store={store} >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StateProvider>
  </ContextProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

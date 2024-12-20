import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {disableReactDevTools} from '@fvilers/disable-react-devtools'


if(process.env.NODE_ENV === 'production') disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
        <Route path='/*' element={<App />}/>

        </Routes>
      </BrowserRouter>

    </Provider>
  </React.StrictMode>
);



import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import { Provider } from 'react-redux';
import { create } from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import { loginReducer } from './reducers/loginReducer';
import { BrowserRouter } from 'react-router-dom';
import { CommonState } from './context/CommonContext';

ReactDOM.render(
    <Provider store={create(loginReducer)}>
        <CommonState>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CommonState>
    </Provider>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();

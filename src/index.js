import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Provider} from 'react-redux'
import { createStore} from 'redux'
import { loadStore, saveState } from './services/loadStoreServices';
import rootReducer from './store/reducers'

const persistedState = loadStore();
const store = createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
    saveState(store.getState())
})

ReactDOM.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>,
    document.getElementById('root')
);

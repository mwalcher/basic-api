import {
    createStore,
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import { middleware as reduxPackMiddleware } from 'redux-pack';
import reducer from '../reducers';

export default createStore(
    reducer,
    compose(applyMiddleware(thunk, reduxPackMiddleware))
);

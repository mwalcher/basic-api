import axios from 'axios';

const userAPI = 'https://randomuser.me/api/';

// Actions
const API_LOADING = 'API_LOADING';
const API_UPDATE = 'API_UPDATE';
const API_ERROR = 'API_ERROR';

// Default State
const initialState = {
    isLoading: false,
    hasError: false
};

export const getUsers = dispatch => () => {
    dispatch({
        type: API_LOADING,
        isLoading: true
    });

    axios({
        url: userAPI,
        method: 'get',
        params: {
            results: 4
        }
    })
    .then(response => {
        dispatch({
            type: API_UPDATE,
            response: {
                users: response.data.results
            }
        });
    })
    .catch(error => {
        dispatch({
            type: API_ERROR,
            hasError: true
        });
    })
    .then(() => {
        dispatch({
            type: API_LOADING,
            isLoading: false
        });
    });
};

export default (state = initialState, action = {}) => {
    const {
        type,
        response,
        isLoading,
        hasError
    } = action;

    switch (type) {
        case API_LOADING:
            return {
                ...state,
                isLoading
            };
        case API_UPDATE:
            return {
                ...state,
                ...response
            };
        case API_ERROR:
            return {
                ...state,
                hasError
            };
        default:
            return state;
    }
}

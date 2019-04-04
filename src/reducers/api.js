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
    axios({
        url: userAPI,
        method: 'get'
    })
    .then(response => {
        console.log('data',response.data.results);
    })
    .catch(error => {
        console.log(error);
    })
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
                response
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

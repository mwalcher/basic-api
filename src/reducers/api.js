import axios from 'axios';

const userAPI = process.env.REACT_APP_API_URL;

// Actions
const API_LOADING = 'API_LOADING';
const API_UPDATE = 'API_UPDATE';
const API_ERROR = 'API_ERROR';

// Default State
const initialState = {
    isLoading: false,
    hasError: false
};

export const getImage = dispatch => queryValue => {
    dispatch({
        type: API_LOADING,
        isLoading: true
    });

    axios({
        url: userAPI,
        method: 'get',
        params: {
            query: queryValue
        }
    })
    .then(response => {
        dispatch({
            type: API_ERROR,
            hasError: false
        });

        dispatch({
            type: API_UPDATE,
            response: {
                image: response.data.image_url
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

// Actions
const API_LOADING = 'API_LOADING';
const API_UPDATE = 'API_UPDATE';
const API_ERROR = 'API_ERROR';

// Default State
const initialState = {
    isLoading: false,
    hasError: false
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

import {GET_ALL_FAILURE, GET_ALL_SUCCESS, PUT, PUT_FAILURE, PUT_SUCCESS} from "../actions/request";

export const REQUEST_STATUS = {
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

export const requestReducer = (state, action) => {
    switch (action.type) {
        case GET_ALL_SUCCESS:
            return {
                ...state,
                records: action.records,
                status: REQUEST_STATUS.SUCCESS,
            };
        case GET_ALL_FAILURE:
            return {
                ...state,
                error: action.error,
                status: REQUEST_STATUS.ERROR,
            };
        case PUT:
            const { records } = state;
            const { record } = action;
            const recordIndex = records.map((record1) => record1.id).indexOf(record.id);
            return {
                ...state,
                prevRecords: state.records,
                records: [
                    ...records.slice(0, recordIndex),
                    record,
                    ...records.slice(recordIndex + 1)
                ]
            };
        case PUT_FAILURE:
            return {
                ...state,
                records: state.prevRecords,
                status: REQUEST_STATUS.ERROR,
                error: action.error,
            };
        default:
            return state
    }
};
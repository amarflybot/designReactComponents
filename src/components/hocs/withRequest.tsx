import {useEffect, useReducer} from "react";
import {REQUEST_STATUS, requestReducer} from "../../reducers/request";
import axios from "axios";
import {GET_ALL_FAILURE, GET_ALL_SUCCESS, PUT_FAILURE, PUT_SUCCESS} from "../../actions/request";


const withRequest = (baseurl,routeName) => (Component) => (props) => {

    const [{records, status, error}, dispatch] = useReducer(requestReducer, {
        status: REQUEST_STATUS.LOADING,
        records: [],
        error: null
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseurl}/${routeName}`);
                dispatch({
                    records: response.data,
                    type: GET_ALL_SUCCESS
                });
            } catch (e) {
                dispatch({
                    type: GET_ALL_FAILURE,
                    status: REQUEST_STATUS.ERROR
                })
            }
        }
        fetchData();

    }, [baseurl, routeName])


    const propsLocal ={
        records,
        status,
        error,
        put: async (record) => {
            try {
                await axios.put(`${baseurl}/${routeName}/${record.id}`, record);
                dispatch({
                    type: PUT_SUCCESS,
                    record: record,
                })
            } catch (e) {
                dispatch({
                    type: PUT_FAILURE,
                    error: e,
                })
            }
        }
    }

    return <Component {...props} {...propsLocal}/>;
};

export default withRequest;
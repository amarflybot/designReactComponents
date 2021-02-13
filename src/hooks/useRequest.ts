import {useCallback, useEffect, useReducer, useRef} from "react";
import {REQUEST_STATUS, requestReducer} from "../reducers/request";
import axios from "axios";
import {GET_ALL_FAILURE, GET_ALL_SUCCESS, PUT, PUT_FAILURE, PUT_SUCCESS} from "../actions/request";
import { store } from "react-notifications-component";

const useRequest = (baseurl, routeName) => {

    const [{records, status, error}, dispatch] = useReducer(requestReducer, {
        status: REQUEST_STATUS.LOADING,
        records: [],
        error: null
    });

    const signal = useRef(axios.CancelToken.source())


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${baseurl}/${routeName}`, {
                    cancelToken: signal.current.token
                });
                dispatch({
                    records: response.data,
                    type: GET_ALL_SUCCESS
                });
            } catch (e) {
                console.log('Loading data error',JSON.stringify(e));
                if (axios.isCancel(e)) {
                    console.log('Get Request Cancelled');
                } else {
                    dispatch({
                        type: GET_ALL_FAILURE,
                        status: REQUEST_STATUS.ERROR
                    })
                }
            }
        }
        fetchData();
        return () => {
            console.log('Unmount and Cancel running axios request')
            signal.current.cancel();
        }

    }, [baseurl, routeName])

    const propsLocal ={
        records,
        status,
        error,
        put: useCallback(async (record) => {
            try {
                dispatch({
                    type: PUT,
                    record
                });
                await axios.put(`${baseurl}/${routeName}/${record.id}`, record);
                dispatch({
                    type: PUT_SUCCESS,
                    record,
                })
            } catch (e) {
                dispatch({
                    type: PUT_FAILURE,
                    error: e,
                })
                store.addNotification({
                    title: "Favourite Status Update Failure! Setting Back..",
                    message: `Speaker: ${record.firstName} ${record.lastName}`,
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                        duration: 5000,
                        onScreen: true
                    }
                })
            }
        },[])
    }

    return propsLocal;
}


export default useRequest;
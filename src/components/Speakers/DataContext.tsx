import {createContext} from "react";
import {GET_ALL_SUCCESS} from "../../actions/request";
import {Speaker} from "./Speakers";
import useRequest from "../../hooks/useRequest";

interface DataContextProps {
    records: Speaker[],
    status: string,
    error: Error,
    put({}): void
}

const DataContext = createContext<DataContextProps>({
    status: GET_ALL_SUCCESS,
    error: undefined,
    records: [],
    put({}): void {}
});

const DataProvider = ({ children, baseurl, routeName }) => {

    const state = useRequest(baseurl, routeName)

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}

export {DataProvider,DataContext}
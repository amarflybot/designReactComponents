import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import React, {memo, useCallback, useContext, useState} from "react";
import {REQUEST_STATUS} from "../../reducers/request";
import {DataContext, DataProvider} from "../../context/DataContext";
import IndividualSpeaker from "./Speaker";

const URL = 'http://localhost:3004/speakers';

export interface Speaker {
    imageSrc: string,
    id: number,
    firstName: string,
    lastName: string,
    sat: boolean,
    sun: boolean,
    isFavorite: boolean,
    bio: string
}

const SpeakersComponent = ({bgColor}) => {
    const [searchQuery, setSearchQuery] = useState("");

    const {records: speakers, status, error, put} = useContext(DataContext);

    const success = status === REQUEST_STATUS.SUCCESS;
    const isLoading = status === REQUEST_STATUS.LOADING;
    const hasErrored = status === REQUEST_STATUS.ERROR;

    return (
        <div className={bgColor}>
            <SpeakerSearchBar
                setSearchQuery={setSearchQuery}
                searchQuery={searchQuery}
            />
            {isLoading && <div>Loading...</div>}
            {success && <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-12">
                {speakers.filter(value => (value.firstName.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)
                    || (value.lastName.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1)).map((speaker: Speaker) => (
                    <IndividualSpeaker key={speaker.id} speaker={speaker}
                                       put={put}/>
                ))}
            </div>}
            {hasErrored && (
                <div>
                    Loading error... Is the json-server running? (try "npm run
                    json-server" at terminal prompt)
                    <br />
                    <b>ERROR: {error.message}</b>
                </div>
            )}
        </div>
    )
}

const Speakers = (props) => {
    return (
        <DataProvider baseurl='http://localhost:3004' routeName='speakers'>
            <SpeakersComponent {...props}/>
        </DataProvider>
    )
}

export default Speakers;

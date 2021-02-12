import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import {useContext, useEffect, useReducer, useState} from "react";
import SpeakerFavouriteButton from "./SpeakerFavouriteButton";
import axios from "axios";
import {GET_ALL_FAILURE, GET_ALL_SUCCESS, PUT_FAILURE, PUT_SUCCESS} from "../../actions/request";
import {REQUEST_STATUS, requestReducer} from "../../reducers/request";
import {DataContext, DataProvider} from "./DataContext";

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


    const toggleSpeakerFavourite = async (speaker: Speaker) => {
        put({
            ...speaker,
            isFavorite: !speaker.isFavorite,
        })
    };

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
                    <div className="rounded overflow-hidden shadow-lg p-6" key={speaker.id}>
                        <div className="grid grid-cols-4 mb-6">
                            <div
                                className="font-bold text-lg col-span-3">{`${(speaker.firstName)} ${(speaker.lastName)}`}</div>
                            <SpeakerFavouriteButton isFavorite={speaker.isFavorite}
                                                    toggleSpeakerFavouriteRef={() => toggleSpeakerFavourite(speaker)}/>
                        </div>
                        <div className="mb-6">
                            <img
                                src={`/speakers/speaker-${(speaker.id)}.jpg`}
                                alt={`${(speaker.firstName)} ${(speaker.lastName)}`}
                            />
                        </div>
                        <div className="text-gray-600">{speaker.bio.substr(0, 70) + '...'}</div>
                    </div>
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

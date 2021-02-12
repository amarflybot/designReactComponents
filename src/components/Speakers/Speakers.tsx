import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import {useEffect, useReducer, useState} from "react";
import SpeakerFavouriteButton from "./SpeakerFavouriteButton";
import axios from "axios";

interface Speaker {
    imageSrc: string,
    id: number,
    firstName: string,
    lastName: string,
    sat: boolean,
    sun: boolean,
    isFavorite: boolean,
    bio: string
}

const Speakers = () => {

    const REQUEST_STATUS = {
        LOADING: 'loading',
        SUCCESS: 'success',
        ERROR: 'error'
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'GET_ALL_SUCCESS':
                return {
                    ...state,
                    status: REQUEST_STATUS.SUCCESS,
                    speakers: action.speakers,
                };
            case 'UPDATE_STATUS':
                return {
                    ...state,
                    status: action.status,
                };
        }
    };

    const [searchQuery, setSearchQuery] = useState("");
    const [{speakers, status}, dispatch] = useReducer(reducer, {
        status: REQUEST_STATUS.LOADING,
        speakers: [],
    });
    //const [status, setStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState({});


    const toggleSpeakerFavourite = async (speaker: Speaker) => {
        const newSpeaker = {
            ...speaker,
            isFavorite: !speaker.isFavorite,
        }
        try {
            await axios.put(`http://localhost:3004/speakers/${speaker.id}`, newSpeaker);
        } catch (e) {
            dispatch({
                type: 'UPDATE_STATUS',
                status: REQUEST_STATUS.ERROR
            })
            setError(e)
        }
        const speakerIndex = speakers.map((speaker1) => speaker1.id).indexOf(speaker.id);
        dispatch([...speakers.slice(0, speakerIndex), newSpeaker, ...speakers.slice(speakerIndex + 1)])
    };

    const success = status === REQUEST_STATUS.SUCCESS;
    const isLoading = status === REQUEST_STATUS.LOADING;
    const hasErrored = status === REQUEST_STATUS.ERROR;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:3004/speakers");
                dispatch({
                    speakers: response.data,
                    type: 'GET_ALL_SUCCESS'
                });
            } catch (e) {
                dispatch({
                    type: 'UPDATE_STATUS',
                    status: REQUEST_STATUS.ERROR
                })
                setError(e)
            }
        }
        fetchData();

    }, [])

    return (
        <div>
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
            {hasErrored && <div>An Error Occurred, Please try again!!</div>}
        </div>
    )
}

export default Speakers;

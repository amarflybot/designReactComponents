import SpeakerSearchBar from "../SpeakerSearchBar/SpeakerSearchBar";
import {useState} from "react";
import SpeakerFavouriteButton from "./SpeakerFavouriteButton";
import {REQUEST_STATUS} from "../../reducers/request";
import withRequest from "../hocs/withRequest";

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

const Speakers = ({records: speakers, status, error, put, bgColor }) => {
    const [searchQuery, setSearchQuery] = useState("");

    const omFavouriteToggleHandler = async (speaker: Speaker) => {
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
                                                    onFavouriteToggle={() => omFavouriteToggleHandler(speaker)}/>
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

export default withRequest('http://localhost:3004','speakers')(Speakers);

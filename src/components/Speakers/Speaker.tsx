import SpeakerFavouriteButton from "./SpeakerFavouriteButton";
import React, {memo} from "react";
import {Speaker} from "./Speakers";
import {ErrorBoundary} from "../ErrorBoundary/ErrorBoundary";

interface IndividualComponentsProps { speaker: Speaker, put: ({}) => void }

const IndividualSpeakerComponent :React.FC<IndividualComponentsProps> = ({put, speaker}) =>
    (
        <div
            className="rounded overflow-hidden shadow-lg p-6 bg-white">
            <div className="grid grid-cols-4 mb-6">
                <div
                    className="font-bold text-lg col-span-3">{`${(speaker.firstName)} ${(speaker.lastName)}`}</div>
                <SpeakerFavouriteButton isFavorite={speaker.isFavorite}
                                        onFavouriteToggle={() => {
                                            put({
                                                ...speaker,
                                                isFavorite: !speaker.isFavorite
                                            })
                                        }}/>
            </div>
            <div className="mb-6">
                <img
                    src={`/speakerimages/Speaker-${(speaker.id)}.jpg`}
                    alt={`${(speaker.firstName)} ${(speaker.lastName)}`}
                />
            </div>
            <div className="text-gray-600">{speaker.bio.substr(0, 70) + "..."}</div>
        </div>
    );

const IndividualSpeaker :React.FC<IndividualComponentsProps> = memo(({put, speaker}) => (
    <ErrorBoundary>
        <IndividualSpeakerComponent put={put} speaker={speaker}/>
    </ErrorBoundary>
));

export default IndividualSpeaker
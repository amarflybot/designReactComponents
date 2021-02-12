import React from "react";

interface SpeakerFavouriteButtonProps {
    isFavorite: boolean,
    toggleSpeakerFavouriteRef()
}

const SpeakerFavouriteButton : React.FC<SpeakerFavouriteButtonProps> = (props: SpeakerFavouriteButtonProps) => {
    return (
        <div className="flex justify-end">
            <div onClick={props.toggleSpeakerFavouriteRef}
                className={props.isFavorite ? 'heartredbutton' : 'heartdarkbutton'}
            />
        </div>
    );
}


export default SpeakerFavouriteButton;
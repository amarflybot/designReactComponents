import React from "react";

interface SpeakerFavouriteButtonProps {
    isFavorite: boolean,
    onFavouriteToggle()
}

const SpeakerFavouriteButton : React.FC<SpeakerFavouriteButtonProps> = (props: SpeakerFavouriteButtonProps) => {
    return (
        <div className="flex justify-end">
            <div onClick={props.onFavouriteToggle}
                className={props.isFavorite ? 'heartredbutton' : 'heartdarkbutton'}
            />
        </div>
    );
}


export default SpeakerFavouriteButton;
import {useContext} from "react";
import {SpeakerContext} from "../context/SpeakerContext";

const Speakers = () => {
    const speakers = useContext(SpeakerContext);
    return (
        <div>
            {speakers.map(({imageSrc, name}) => {
                return <img src={`/images/${imageSrc}`} alt={name} key={imageSrc}></img>;
            })}
        </div>
    )
}

export default Speakers;

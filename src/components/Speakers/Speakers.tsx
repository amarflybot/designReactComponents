import SpeakerRenderProps from "./SpeakerRenderProps";

const Speakers = () => {
    return (
        <SpeakerRenderProps>
            {({speakers}) => {
                return (
                    <div>
                        {speakers.map(({imageSrc, name}) => {
                                return <img src={`/images/${imageSrc}`} alt={name} key={imageSrc}></img>;
                        })}
                    </div>
                )
            }

            }
        </SpeakerRenderProps>
    )
}

export default Speakers;

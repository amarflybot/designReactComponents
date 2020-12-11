const SpeakerRenderProps = (props) => {
    const speakers = [
        {
            imageSrc: 'speaker-component-1124.png',
            name: 'Douglas CrockFord'
        },
        {
            imageSrc: 'speaker-component-1530.png',
            name: 'Tamara Baker'
        },
        {
            imageSrc: 'speaker-component-10803.png',
            name: 'Eugene Chuvyron'
        }
    ]
    return props.children({
        speakers: speakers
    });
}

export default SpeakerRenderProps;

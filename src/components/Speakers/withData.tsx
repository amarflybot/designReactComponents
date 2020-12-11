import {Component} from "react";

const withData = (maxSpeakersToShow: number) => (Component) => {
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
    return () => {
        const limitSpeakers = speakers.slice(0,maxSpeakersToShow);
        return <Component speakers={limitSpeakers}></Component>;
    };
}

export default withData;

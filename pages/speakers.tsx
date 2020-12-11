import Header from "../src/components/Header/Header";
import Menu from "../src/components/Menu/Menu";
import SpeakerSearchBar from "../src/components/SpeakerSearchBar/SpeakerSearchBar";
import Speakers from "../src/components/Speakers/Speakers";
import Footer from "../src/components/Footer/Footer";
import React from "react";
import { SpeakerContext } from "../src/components/context/SpeakerContext";

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

const Page = () => {
    return (
        <div>
            <Header/>
            <Menu/>
            <SpeakerContext.Provider value={speakers}>
                <SpeakerSearchBar/>
                <Speakers/>
            </SpeakerContext.Provider>
            <Footer/>
        </div>
    )
}

export default Page;

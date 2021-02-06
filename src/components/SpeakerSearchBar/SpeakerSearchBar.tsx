import React, {useEffect, useState} from "react";

type SpeakerSearchBarProps = {
    setSearchQuery(arg: string): void,
    searchQuery: string
}

const SpeakerSearchBar:React.FC<SpeakerSearchBarProps> = ({searchQuery, setSearchQuery}) => {

    const handleChange = (event) => {
        setSearchQuery(event.target.value)
        event.preventDefault();
    };

    return (
        <div className="mb-6">
            <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="searchInput"
                onChange={handleChange}
                placeholder="Search by name"
            />
        </div>
    );
};

export default SpeakerSearchBar;

import React, {useEffect, useState} from "react";
import AsyncSelect from 'react-select/async';


const GuessEntry = ({onAddGuess, onSkip, token}) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        let v = inputValue.trim();
        if (inputValue.trim() !== '') {
            onAddGuess(inputValue);
            setInputValue(''); // Clear input after submission
        }
    };

    const handleSkip = () => {
        onSkip("Skipped");
    };

    const handleClear = () => {
        setInputValue('');
    };

    const spotifySearch = async (input) => {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${input}&type=track&limit=5`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        });

        const tracksJson = await response.json();
        const data = tracksJson.tracks.items.map((track) => {
            return {'name': track.name, 'artist': track.artists[0].name, 'id': track.id}
        });
        return data;
    };

    const formatOptionLabel = (data) => (
        <div style={{display: 'flex', flexDirection: 'column', marginTop: '4px', marginBottom: '4px', backgroundColor: 'transparent', color: '#8742b0'}}>
            <div>{data.name}</div>
            <div style={{fontSize: '12px'}}>
                {data.artist}
            </div>
        </div>
    );

    return (
        <div className={"h-[100%] w-[100%]"}>
            <div
                className="h-[20%] w-[70%] mt-[5%] ml-[15%] sm:border-[2px] md:border-[4px] lg:border-[6px] border-darkOrange flex items-center justify-center rounded-lg">
                <AsyncSelect
                    defaultValue={null}
                    onChange={value => {
                        setInputValue(value)
                    }}
                    formatOptionLabel={formatOptionLabel}
                    placeholder={'Got it yet?'}
                    isClearable={true}
                    loadOptions={spotifySearch}
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: 'transparent',
                            border: 'transparent',
                            width: 'max-content',
                            minWidth: '100%',
                            boxShadow: 'none',
                            fontFamily: 'Quicksand',
                        }),
                        container: (baseStyles, state) => ({
                            ...baseStyles,
                            width: 'max-content',
                            minWidth: '100%',
                            margin: 0,
                        }),
                        placeholder: (baseStyles, state) => ({
                            ...baseStyles,
                            color: '#8742b0',
                        }),
                        option: (baseStyles, state) => ({
                            ...baseStyles,
                            backgroundColor: 'transparent'
                        })
                    }}
                />
            </div>

            <div className={"inline flex"}>
                <button
                    className={"ml-[10%] mt-[2%] h-[3%] w-[9%] py-[1%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-lightOrange font-sand font-bold text-darkPurple text-xl rounded-lg"}
                    type="button" onClick={handleSkip}>Skip
                </button>
                <button
                    className={"ml-[62%] mt-[2%] h-[3%] w-[9%] py-[1%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-lightOrange font-sand font-bold text-darkPurple text-xl rounded-lg"}
                    type="button" onClick={handleSubmit}>Submit
                </button>
            </div>
        </div>


    );
};

export default GuessEntry;
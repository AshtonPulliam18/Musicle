import React, {useEffect, useState} from "react";
import AsyncSelect from 'react-select/async';


const GuessEntry = ({onAddGuess, onSkip, token}) => {
    const [inputValue, setInputValue] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddGuess(inputValue);
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
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '4px',
            marginBottom: '4px',
            backgroundColor: 'transparent',
            color: '#8742b0'
        }}>
            <div>{data.name}</div>
            <div style={{fontSize: '12px'}}>
                {data.artist}
            </div>
        </div>
    );

    return (
        <div className={"w-[100%] flex flex-col justify-center items-center gap-4 mt-4"}>
            <div
                className="h-[50px] w-[70%] border-[2px] md:border-[4px] border-darkOrange flex items-center justify-center rounded-lg">
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

            <div className={"flex flex-row justify-between w-[70%]"}>
                <button
                    className={"p-2 sm:border-[2px] md:border-[2px] lg:border-[3px] border-lightYellow bg-lightOrange font-sand font-bold text-darkPurple text-xl rounded-lg"}
                    type="button" onClick={handleSkip}>Skip
                </button>
                <button
                    className={" p-2 sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-lightOrange font-sand font-bold text-darkPurple text-xl rounded-lg"}
                    type="button" onClick={handleSubmit}>Submit
                </button>
            </div>
        </div>


    );
};

export default GuessEntry;
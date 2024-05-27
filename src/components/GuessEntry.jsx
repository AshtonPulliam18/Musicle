import React, { useEffect, useState } from "react";

const GuessEntry = ({ onAddGuess, onSkip }) => {
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
    
    return (
        <div className={"h-[100%] w-[100%]"}>
            <div
                className="h-[20%] w-[70%] mt-[5%] ml-[15%] sm:border-[2px] md:border-[4px] lg:border-[6px] border-darkOrange flex items-center rounded-lg">

                <input
                    className={"h-[100%] w-[90%] bg-transparent border-0 shadow-none outline-none font-sand text-2xl text-darkPurple ml-[3%] placeholder-darkPurple placeholder-opacity-65"}
                    placeholder={"Got it yet?"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <span className="m-[1%] text-darkPurple text-3xl cursor-pointer opacity-75 hover:opacity-100" onClick={handleClear}>X</span>
            </div>
            
            <div className={"inline flex"}>
                
            
                <button className={"ml-[10%] mt-[2%] h-[3%] w-[9%] py-[1%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-lightOrange font-sand font-bold text-darkPurple text-xl rounded-lg"} type="button" onClick={handleSkip}>Skip</button>
                <button className={"ml-[62%] mt-[2%] h-[3%] w-[9%] py-[1%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-lightOrange font-sand font-bold text-darkPurple text-xl rounded-lg" } type="button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>


    );
};

export default GuessEntry;
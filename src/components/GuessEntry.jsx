import React, { useEffect, useState } from "react";

const GuessEntry = ({ onAddGuess }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (e) => {
        console.log("SUBMIT - Preventing Default");
        e.preventDefault();
        console.log("SUBMIT - Default Prevented");
        let v = inputValue.trim();
        if (inputValue.trim() !== '') {
            console.log("SUBMIT - Input Value: " + inputValue);
            onAddGuess(inputValue);
            setInputValue(''); // Clear input after submission
        }
    };

    const handleSkip = () => {
        onAddGuess('Skipped');
    };
    
    const handleClear = () => {
        setInputValue('');
    };
    
    return (
        <div>
            <div
                className="h-[5%] w-[75%] sm:border-[2px] md:border-[4px] lg:border-[6px] border-darkOrange flex items-center">

                <input
                    className={"h-[100%] w-[90%] bg-transparent border-0 shadow-none outline-none font-sand text-2xl text-darkPurple ml-[3%] placeholder-darkPurple placeholder-opacity-65"}
                    placeholder={"Got it yet?"}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <span className="m-[1%] text-darkPurple text-3xl cursor-pointer opacity-75 hover:opacity-100" onClick={handleClear}>X</span>
            </div>
            
            <div className={"inline flex"}>
                
            
                <button className={"ml-[15%] mt-[5%] h-[3%] w-[9%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-darkYellow p-[1%] font-sand text-darkPurple text-xl"} type="button" onClick={handleSkip}>Skip</button>
                <button className={"ml-[63%] mt-[5%] h-[3%] w-[9%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-darkYellow p-[1%] font-sand text-darkPurple text-xl" } type="button" onClick={handleSubmit}>Submit</button>
            </div>
        </div>


    );
};

export default GuessEntry;
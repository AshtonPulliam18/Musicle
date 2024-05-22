import React from 'react';

const GuessEntry = () => {
    
    
    
    return (
        <div className="h-[100%] w-[100%]">
            <div
                className="h-[5%] w-[75%] mx-[18%] mt-[60%] sm:border-[2px] md:border-[4px] lg:border-[6px] border-darkOrange flex items-center">

                <input
                    className={"h-[100%] w-[90%] bg-transparent border-0 shadow-none outline-none font-sand text-2xl text-darkPurple ml-[3%] placeholder-darkPurple placeholder-opacity-65"}
                    placeholder={"Got it yet?"}/>
                <span className="m-[1%] text-darkPurple text-3xl">X</span>
            </div>
            
            <div className={"inline flex"}>
                
            
                <button className={"ml-[15%] mt-[5%] h-[3%] w-[9%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-darkYellow p-[1%] font-sand text-darkPurple text-xl"} type="submit">Skip</button>
                <button className={"ml-[63%] mt-[5%] h-[3%] w-[9%] sm:border-[1px] md:border-[2px] lg:border-[3px] border-lightYellow bg-darkYellow p-[1%] font-sand text-darkPurple text-xl" } type="submit">Submit</button>
            </div>
        </div>


    );
};

export default GuessEntry;
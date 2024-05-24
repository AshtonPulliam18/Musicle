import React, { useEffect, useState } from "react";


const Musicbar = ({progress}) => {
    

    let progressBar = `h-[100%] bg-gradient-to-r from-darkPink to-lightYellow absolute top-0 left-0 z-0`;
    
    
    return (
        <div className="h-[100%] w-[100%] relative"> {/* Step 1: Make the parent relative */}
            <div
                className="h-[40%] w-[85%] ml-[15%] sm:border-[2px] md:border-[4px] lg:border-[6px] border-darkYellow border-double flex items-center relative"> {/* Make this relative too */}

                <div
                    className="h-[70%] w-[2%] ml-[5%] bg-transparent border-0 sm:border-l-[2px] md:border-l-[4px] lg:border-l-[6px]  border-double border-darkYellow z-10 "/>
                <div
                    className="h-[70%] w-[2%] ml-[5%] bg-transparent border-0 sm:border-l-[2px] md:border-l-[4px] lg:border-l-[6px] border-double border-darkYellow z-10 "/>
                <div
                    className="h-[70%] w-[2%] ml-[10%] bg-transparent border-0 sm:border-l-[2px] md:border-l-[4px] lg:border-l-[6px] border-double border-darkYellow z-10 "/>
                <div
                    className="h-[70%] w-[2%] ml-[20%] bg-transparent border-0 sm:border-l-[2px] md:border-l-[4px] lg:border-l-[6px] border-double border-darkYellow z-10"/>
                <div
                    className="h-[70%] w-[2%] ml-[30%] bg-transparent border-0 sm:border-l-[2px] md:border-l-[4px] lg:border-l-[6px] border-double border-darkYellow z-10"/>

                <div
                    className={progressBar} style={{width: `${progress}%`}}/>

            </div>
            <span className={"font-sand font-bold text-darkPink ml-[14%]"}>0:00</span>
            <span className={"font-sand font-bold text-darkPink ml-[80%]"}>0:16</span>
        </div>
    );
};

export default Musicbar;
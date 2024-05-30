import React from 'react';

const Result = ({song, status}) => {
    if (status === "in-progress") return null;
    
    const message = status === "victory" ? "Right on! The song was..." : "You couldn't dig it. The song was...";
    
    
    
    const doSum = () => {
        return;
    }

    return (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-lightPink p-8 rounded-lg text-center text-darkYellow font-sand shadow-lg">
                <h2 className="mb-6 text-xl font-bold font-sand">{message}</h2>
                <h2 className="text-md font-sand">{song.name} - {song.artist}</h2>
                <div className="flex items-center justify-center m-[12px]">
                    <img src={song.img} className="h-[40%] w-[40%] rounded-lg"/>
                </div>
                <h2 className="mb-6 text-xl font-bold">Come back tommorrow for a new groove!</h2>
            </div>
        </div>
    );
};

export default Result;
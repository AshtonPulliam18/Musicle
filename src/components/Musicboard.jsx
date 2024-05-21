import React from 'react';
import Guess from './Guess';

const generateRandomGuess = () => {
    const statuses = ['incorrect', 'skipped'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

    // Example song names for random selection
    const songs = ['Song A', 'Song B', 'Song C', 'Song D', 'Song E'];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    

    return {
        status: randomStatus,
        title: randomStatus === 'skipped' ? 'Skipped' : randomSong,
    };
};

const generateGuesses = (num) => {
    return Array.from({ length: num }, generateRandomGuess);
};

const Musicboard = () => {
    const guesses = generateGuesses(5); // Generate 6 random guesses

    return (
        <div
            className="h-[95%] w-[85%] bg-dune border-solid border-[6px] border-jade">
            <div className="h-[100%] w-[100%] grid grid-rows-6">
                {guesses.map((guess, index) => (
                    <div key={index} className="flex items-center justify-center">
                        <Guess status={guess.status} title={guess.title}/>
                    </div>
                ))}

                <div className="flex items-center justify-center">
                    <Guess status={"correct"} title={"Happy Birthday - Your Husband"}/>
                </div>
                
            </div>
        </div>
    );
};

export default Musicboard;
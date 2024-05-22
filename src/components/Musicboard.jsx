import React from 'react';
import Guess from './Guess';

const generateRandomGuess = (i) => {
    const statuses = ['incorrect', 'skipped'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    const currentIndex = i;
    
    // Example song names for random selection
    const songs = ['Song A', 'Song B', 'Song C', 'Song D', 'Song E'];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    
    
    return {
        index: currentIndex,
        status: randomStatus,
        title: randomStatus === 'skipped' ? 'Skipped' : randomSong,
    };
};

const generateGuesses = (num) => {
    const guesses = [];
    for (let i = 0; i < num; i++) {
        guesses.push(generateRandomGuess(i));
    }
    return guesses;
};

const Musicboard = () => {
    const guesses = generateGuesses(5); // Generate 6 random guesses

    return (
        <div className={"h-[95%] w-[85%] bg-lightOrange border-solid sm:border-[3px] md:border-[6px] lg:border-[9px] border-darkOrange flex items-center justify-center"}>
            <div className={"h-[98%] w-[97%] bg-darkPink border-solid sm:border-[3px] md:border-[6px] lg:border-[9px] border-lightPink"}>


                <div className="h-[100%] w-[100%] grid grid-rows-6">


                    {guesses.map((guess, i) => (
                        <div key={i} className="flex items-center justify-center">
                            <Guess index={guess.index} status={guess.status} title={guess.title}/>
                        </div>))}
                    
                    <div className="flex items-center justify-center">
                        <Guess index={5} status={"correct"} title={"Happy Birthday - Your Husband"}/>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default Musicboard;
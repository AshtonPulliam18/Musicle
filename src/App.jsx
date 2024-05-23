import React, { useEffect, useState } from "react";
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
import Musicbar from './components/Musicbar.jsx';

const App = () => {
    const [guesses, setGuesses] = useState([]);

    const handleAddGuess = (title) => {
        if (guesses.length < 6) {
            const newGuess = {
                index: guesses.length, // The new guess index
                status: title === 'Skipped' ? 'skipped' : 'incorrect', // Adjust status based on title
                title: title,
            };
            setGuesses([...guesses, newGuess]);
        }
    };
    
    
    return (
        <div className={"h-screen bg-paleYellow grid grid-cols-2"}>
        {/* logo/title */}
        {/* guess/skip display */}
        {/* progress bar */}
        {/* guess entry */}
        {/* skip button */}
        {/* submit button */}
            
            <div className={"h-[100%] w-[100%]"}>
                <div className={"h-[50%] w-[100%] bg-darkOrange"}>
                    <Musicbar/>
                </div>
                
                <div className={"h-[50%] w-[100%] bg-darkPink"}>
                    <GuessEntry onAddGuess={handleAddGuess}/>
                </div>
            </div>
            
            <div className={"flex items-center pr-[10%] justify-end"}>
                    <Musicboard guesses={guesses}/>
            </div>
            
        </div>
    );
};

export default App;

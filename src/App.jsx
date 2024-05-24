import React, { useEffect, useState } from "react";
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
import Musicbar from './components/Musicbar.jsx';
import Logo from './components/Logo.jsx';

const App = () => {
    const [guesses, setGuesses] = useState([]);
    const [progress, setProgress] = useState(6); // Initialize the progress state
    let numSkips = 5;
    
    // Function to handle skip, which will increase the progress
    const handleSkip = () => {
        switch (progress) {
            case 6:
                setProgress(13);
                break;
            case 13:
                setProgress(25);
                break;
            case 25:
                setProgress(47);
                break;
            case 47:
                setProgress(79);
                break;
            default:
                setProgress(100);
                break;
        }
        
    };
    
    const handleAddGuess = (title) => {
        if (guesses.length < 5) {
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
            
            <div className={"h-[100%] w-[100%] relative"}>  

                <div className="w-full flex ml-[30%] mt-[5%]">
                    <Logo/>
                </div>
                <div className={"h-[60%] w-[100%] pt-[40%]"}>
                    <div className={"h-[80%] w-[100%]"}>
                        <Musicbar progress={progress}/>
                    </div>
                </div>
                
                <div className={"h-[50%] w-[100%]"}>
                    <GuessEntry onAddGuess={handleAddGuess} onSkip={handleSkip} />
                </div>
            </div>
            
            <div className={"flex items-center pr-[10%] justify-end"}>
                    <Musicboard guesses={guesses}/>
            </div>
            
        </div>
    );
};

export default App;

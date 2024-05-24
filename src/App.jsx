import React, { useEffect, useState, useRef } from "react";
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
import Musicbar from './components/Musicbar.jsx';
import Logo from './components/Logo.jsx';

const App = () => {
    const [guesses, setGuesses] = useState([]);
    const [progress, setProgress] = useState(6); 
    const [target, setTarget] = useState(6);
    const progressRef = useRef(progress); 
    progressRef.current = progress;
    
    let numSkips = 5;
    

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

    const handlePlay = (targetValue) => {
        setTarget(targetValue); 
        setProgress(0); 
    };

    useEffect(() => {
        if (progress === 0 && target > 0) {
            const animateProgress = async (targetValue) => {
                let duration;
                switch (targetValue) {
                    case 6:
                        duration = 2000;
                        break;
                    case 13:
                        duration = 4000;
                        break;
                    case 25:
                        duration = 7000;
                        break;
                    case 47:
                        duration = 13000;
                        break;
                    default:
                        duration = 16000;
                        break;
                }

                const stepDuration = 1000 / 60;
                const steps = duration / stepDuration;
                const increment = targetValue / steps;

                for (let i = 0; i < steps; i++) {
                    setProgress((prevProgress) => prevProgress + increment);
                    await new Promise(resolve => setTimeout(resolve, stepDuration));
                }

                setProgress(targetValue);
            };

            animateProgress(target);
        }
    }, [progress, target]);


    const handleAddGuess = (title) => {
        if (guesses.length < 5) {
            const newGuess = {
                index: guesses.length, 
                status: title === 'Skipped' ? 'skipped' : 'incorrect', 
                title: title,
            };
            setGuesses([...guesses, newGuess]);
            if (newGuess.status === 'incorrect') {
                handleSkip();
            }
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
                        <Musicbar progress={progress} playAnimation={handlePlay}/>
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

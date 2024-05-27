import React, { useEffect, useState, useRef } from "react";
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
import Musicbar from './components/Musicbar.jsx';
import Logo from './components/Logo.jsx';
import record from "./assets/record.png";

const App = () => {
    const [guesses, setGuesses] = useState([]);
    const [progress, setProgress] = useState(6);
    const [target, setTarget] = useState(6);
    const [playing, setPlaying] = useState(false);

    const progressRef = useRef(progress);

    progressRef.current = progress;

    let numSkips = 5;

    const handleSkip = (skipped) => {
        if (!playing) {
            if (skipped)
               handleAddGuess("Skipped");
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
        }
    };

    const handlePlay = () => {
        setTarget(progress);
        setProgress(0);
        setPlaying(true);
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
                setPlaying(false);
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
        <div className="h-screen w-screen bg-paleYellow grid grid-cols-12 grid-rows-10 overflow-hidden">

            {/* Logo/title */}
            <div className="row-span-3 col-span-5 grid grid-rows-12">
                <Logo/>
                <div className="bg-darkOrange row-start-7 w-[30%] h-[50%] ml-[3%] rounded-md"/>
                <div className="bg-lightOrange row-start-8 w-[50%] h-[50%] ml-[3%] rounded-md"/>
                <div className="bg-darkOrange row-start-9 w-[80%] h-[50%] ml-[3%] rounded-md"/>
            </div>

            {/* Musicbar */}
            <div className="row-start-5 row-span-2 col-span-7">
                <Musicbar progress={progress} />
            </div>

            {/* Play Button */}
            <div className="row-start-7 row-span-1 col-span-7 relative">
                <img onClick={handlePlay} src={record} className="w-[10%] h-[100%] ml-[45%] cursor-pointer" />
            </div>

            {/* Guess Entry */}
            <div className="row-start-8 row-span-3 col-span-7">
                <GuessEntry onAddGuess={handleAddGuess} onSkip={handleSkip}/>
            </div>

            {/* Musicboard */}
            <div className="row-start-1 row-span-10 col-start-8 col-span-5">
                <Musicboard guesses={guesses}/>
            </div>
        </div>
    );
};

export default App;

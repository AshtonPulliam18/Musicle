import React from 'react';
import webicon from '../assets/webicon.png';

const Guess = ({ status, title }) => {
    let symbol;

    switch (status) {
        case 'correct':
            symbol = <img src={webicon} alt="Correct" className="w-[8%] h-[8%]" />;
            break;
        case 'incorrect':
            symbol = <span className="text-mauve text-3xl">X</span>;
            break;
        default:
            symbol = <span className="border border-jade w-6 h-6 inline-block"></span>; // Empty box
    }
    
    
    return (
        <div className="h-[55%] w-[90%] flex items-center p-[2%] border border-[2px] border-taupe">
            <div className="mr-4 flex items-center"> {/* Container for symbol and title */}
                {symbol}
                <span className="text-taupe text-2xl ml-2">{title}</span> {/* Added ml-2 for spacing */}
            </div>
        </div>
    );
};

export default Guess;
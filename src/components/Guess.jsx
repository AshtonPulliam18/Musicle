import React from 'react';
import discoBall from '../assets/discoBall.png';

const Guess = ({ index, status, title }) => {
    let symbol;
    let color;
    let border = "";
    
    
    switch (status) {   
        case 'correct':
            symbol = <img src={discoBall} alt="Correct" className="ml-[12px] w-[20px] h-[20px]" />;
            border = "sm:border-[2px] md:border-[4px] lg:border-[6px] border-lightOrange"
            break;
        case 'incorrect':
            symbol = <span className="ml-[3%] text-darkPurple text-3xl">X</span>;
            break;
        default:
            symbol = <div className="ml-[3%] border-2 border-darkPurple w-[20px] h-[20px] rounded-md inline-block flex items-center"></div>; // Empty box
    }
    
        
    switch (index) {
        case 1:
            color = `bg-guess2 `;
            break;
        case 2:
            color = `bg-guess3 `;
            break;
        case 3:
            color = `bg-guess4 `;
            break;
        case 4:
            color = `bg-guess5 `;
            break;
        case 5:
            color = `bg-guess6 `;
            break;
        default:
            color = `bg-guess1 `;
    }
    
    
    
    const track = <div className={"ml-[16px] font-sand text-2xl font-bold text-darkPurple"}> {title}</div>;
    const background = "h-[55%] w-[90%] flex items-center rounded-full " + color + border;
    

    return <div className={background}>{symbol}{track}</div>
};

export default Guess;
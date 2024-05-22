import React from 'react';
import discoBall from '../assets/DiscoBall.png';

const Guess = ({ index, status, title }) => {
    let symbol;
    let color;
    let border = "";
    
    
    switch (status) {   
        case 'correct':
            symbol = <img src={discoBall} alt="Correct" className="ml-[3%] w-[6%] h-[55%]" />;
            border = "sm:border-[2px] md:border-[4px] lg:border-[6px] border-lightOrange"
            break;
        case 'incorrect':
            symbol = <span className="ml-[3%] text-darkPurple text-3xl">X</span>;
            break;
        default:
            symbol = <div className="ml-[3%] border-2 border-darkPurple w-[5%] h-[40%] rounded-md inline-block flex items-center"></div>; // Empty box
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
    
    
    
    const track = <div className={"ml-[5%] font-sand text-2xl"}> {title}</div>;
    const background = "h-[55%] w-[95%] flex items-center rounded-full " + color + border;
    

    return <div className={background}>{symbol}{track}</div>
};

export default Guess;
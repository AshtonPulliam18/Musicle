import React from 'react';

const Logo = () => {
    return (
        <div className="h-[100px] ml-[24px] mt-[12px]">
            <div className="relative">
                <span
                className="absolute text-7xl md:text-9xl font-klemer font-bold text-lightOrange top-0 left-0 transform translate-x-[-3%]">Musicle</span>
                <span
                className="absolute text-7xl md:text-9xl font-klemer font-bold text-darkOrange top-0 left-0 transform translate-x-[-2%]">Musicle</span>
                <span
                className="absolute text-7xl md:text-9xl font-klemer font-bold text-lightPink top-0 left-0 transform translate-x-[-1%]">Musicle</span>
                <span
                className="absolute text-7xl md:text-9xl font-klemer font-bold text-darkPink top-0 left-0">Musicle</span>
            </div>
        </div>
    );
};

export default Logo;
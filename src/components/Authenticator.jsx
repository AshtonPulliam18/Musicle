import React from 'react';

const Authenticator = ({onAuthenticate, isEnabled}) => {
    if (!isEnabled) return null;

    return (
        
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="bg-lightPink p-8 rounded-lg text-center text-darkYellow font-sand shadow-lg">
                <h2 className="mb-6 text-xl">Welcome to Musicle!</h2>
                <button
                    className="bg-darkYellow text-darkPink font-sand py-2 px-6 rounded"
                    onClick={onAuthenticate}
                    
                >
                    Play
                </button>
            </div>
        </div>
    );
};

export default Authenticator;
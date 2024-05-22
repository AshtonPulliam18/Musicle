import React from 'react';
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
const App = () => {
    return (
        <div className={"h-screen bg-paleYellow grid grid-cols-2"}>
        {/* logo/title */}
        {/* guess/skip display */}
        {/* progress bar */}
        {/* guess entry */}
        {/* skip button */}
        {/* submit button */}
            
            <div className={"flex items-center justify-end"}>
                <GuessEntry/>
            </div>
            
            <div className={"flex items-center pr-[10%] justify-end"}>
                    <Musicboard/>
            </div>
            
        </div>
    );
};

export default App;

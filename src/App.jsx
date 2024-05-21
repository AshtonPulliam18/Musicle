import React from 'react';
import Musicboard from './components/Musicboard';
const App = () => {
    return (
        <div className={"h-screen bg-sage grid grid-cols-2 gap-[10%]"}>
        {/* logo/title */}
        {/* guess/skip display */}
        {/* progress bar */}
        {/* guess entry */}
        {/* skip button */}
        {/* submit button */}
            <div/>
            <div className={"flex items-center justify-end mr-[5%]"}>
                
                    <Musicboard/>
                
            </div>
            
        </div>
    );
};

export default App;

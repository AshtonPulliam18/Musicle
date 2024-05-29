import React, { useEffect, useState, useRef } from "react";
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
import Musicbar from './components/Musicbar.jsx';
import Logo from './components/Logo.jsx';
import Authenticator from './components/Authenticator.jsx';
import record from "./assets/record.png";

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

const App = () => {
    const [guesses, setGuesses] = useState([]);
    const [progress, setProgress] = useState(6);
    const [target, setTarget] = useState(6);
    const [player, setPlayer] = useState(undefined);
    const [playing, setPlaying] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState("");
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);
    const [deviceId, setDeviceId] = useState("");

    const progressRef = useRef(progress);
    progressRef.current = progress;

    const client_id = "f13a11c782834762976c38298c0571e7";
    const client_secret = "22e12b8aebcd4479906de80c65c6e14b";
    const auth_endpoint = "https://accounts.spotify.com/authorize";
    const redirect = "http://localhost:5173/callback";
    const scopes ="streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state"
    
       
    const handleAuthenticated = () => {
        window.open(`${auth_endpoint}?client_id=${client_id}&redirect_uri=${redirect}&response_type=token&scope=${scopes}`);
    }

    useEffect(() => {
        const hash = window.location.hash;
        if (hash) {
            const params = new URLSearchParams(hash.substring(1));
            const accessToken = params.get('access_token');
            if (accessToken) {
                window.location.hash = "";
                setToken(accessToken);
                setIsAuthenticated(true);
            }
        }
    }, []);
    


    
    useEffect(() => {
        if (token) {
            
            
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.appendChild(script);
            
            window.onSpotifyWebPlaybackSDKReady = async () => {
                const player = new window.Spotify.Player({
                    name: 'Web Playback SDK',
                    getOAuthToken: cb => { cb(token); },
                    volume: 0.5
                });

                setPlayer(player);

                player.addListener('ready', ({ device_id }) => {
                    setDeviceId(device_id);
                    console.log('Ready with Device ID', device_id);
                });

                player.addListener('not_ready', ({ device_id }) => {
                    console.log('Device ID has gone offline', device_id);
                });

                player.addListener('player_state_changed', (state) => {
                    if (!state) {
                        return;
                    }
                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);
                    player.getCurrentState().then(state => {
                        setActive(!!state);
                    });
                });
                

                await player.connect();
            };
        }
    }, [token]);
    
    
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

    const getAvailableDevices = async () => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/devices', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            if (!response.ok) {
                console.log(response.statusText);
            }

            const devicesData = await response.json();
            setDeviceId(devicesData.devices[0].id);

        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    const transferPlayback = async (newDeviceId) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player', {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    device_ids: [newDeviceId],
                    play: true
                })
            });

            if (!response.ok) {
                throw new Error('Failed to transfer playback');
            }

            console.log('Playback transferred successfully');
        } catch (error) {
            console.error('Error transferring playback:', error);
        }
    };



    const getPlaybackState = async () => {

        const response = await fetch('https://api.spotify.com/v1/me/player', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        
        // Return false indicating playback wasn't active on device
        if (response.status === 204) return false;
        return true;
    };
    
    
    const getFeaturedPlaylists = async (locale, limit, offset) => {
        const response = await fetch('https://api.spotify.com/v1/browse/featured-playlists', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
    }

    
    
    
    const handlePlay = async () => {
        await searchTracks("how to l");
        if (!await getPlaybackState())
            await transferPlayback(deviceId);
        else
            console.log("Playback was ready!")
        
        player.togglePlay().then(() => {
            console.log('Toggled playback!');
        });
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
            
            <Authenticator onAuthenticate={handleAuthenticated} isEnabled={!isAuthenticated}/>
             {/* Musicbar */}
            <div className="row-start-5 row-span-2 col-span-7">
                <Musicbar progress={progress} />
            </div>

            {/* Play Button */}
            <div className="row-start-7 row-span-1 col-span-7 relative">
                <img onClick={handlePlay} src={record} className="w-[9%] h-[100%] ml-[45%] cursor-pointer" />
            </div>

            {/* Guess Entry */}
            <div className="row-start-8 row-span-3 col-span-7">
                <GuessEntry onAddGuess={handleAddGuess} onSkip={handleSkip} token={token} />
            </div>

            {/* Musicboard */}
            <div className="row-start-1 row-span-10 col-start-8 col-span-5">
                <Musicboard guesses={guesses}/>
            </div>
        </div>
    );
};

export default App;

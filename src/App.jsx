import React, { useEffect, useState, useRef } from "react";
import Musicboard from './components/Musicboard';
import GuessEntry from './components/GuessEntry.jsx';
import Musicbar from './components/Musicbar.jsx';
import Logo from './components/Logo.jsx';
import Authenticator from './components/Authenticator.jsx';
import Result from './components/Result.jsx';
import record from "./assets/record.png";
import {useMediaQuery} from "react-responsive";
import { useSpring, animated } from 'react-spring';


const track = {
    id: "",
    name: "",
    album: {
        images: [
            {url: ""}
        ]
    },
    artist: ""
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
    const [selectedTrack, setSelectedTrack] = useState(track);
    const [deviceId, setDeviceId] = useState("");
    const [gameStatus, setGameStatus] = useState("in-progress");
    
    
    const playButtonRotation = useSpring({
        from: {rotate: 0},
        to: {rotate: playing ? 360 : 0},
        loop: true,
        config: {
            duration: playing ? 3000 : 0,
            easing: t => t,
        }
    })

    const isBigScreen = useMediaQuery({query: '(min-width: 1000px)'});

    const progressRef = useRef(progress);
    progressRef.current = progress;

    const globalTopFiftyId = "37i9dQZEVXbMDoHDwVN2tF";
    
    const client_id = "f13a11c782834762976c38298c0571e7";
    const client_secret = "22e12b8aebcd4479906de80c65c6e14b";
    const auth_endpoint = "https://accounts.spotify.com/authorize";
    const redirect = "https://musicle-seven.vercel.app"; //"http://localhost:5173/callback"; //"https://musicle-seven.vercel.app";
    const scopes = "streaming user-read-email user-read-private user-read-playback-state user-modify-playback-state"


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
                    name: 'Musicle Playback',
                    getOAuthToken: cb => {
                        cb(token);
                    },
                    volume: 0.5
                });

                

                player.addListener('ready', ({device_id}) => {
                    console.log('Ready with Device ID', device_id);
                    setDeviceId(device_id);
                });

                player.addListener('player_state_changed', ( state => {

                    if (!state) {
                        return;
                    }

                    setTrack(state.track_window.current_track);
                    setPaused(state.paused);


                    player.getCurrentState().then( state => {
                        (!state)? setActive(false) : setActive(true)
                    });
                    
    
                }));
                
                setPlayer(player);
                await player.connect();
            };
        }
    }, [token]);

    let numSkips = 5;

    const handleSkip = (skipped) => {
        if (!playing) {
            if (skipped)
                handleAddGuess({"name": "Skipped"});

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
                    play: false
                })
            });

            if (!response.ok) {
                throw new Error('Failed to transfer playback');
            }
            
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
    
    
    
    const getRandomSongFromPlaylist = async (playlistId) => {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        
  
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * (data["tracks"]["items"].length - 1));
        const id = data["tracks"]["items"][randomIndex]["track"]["id"];
        const name = data["tracks"]["items"][randomIndex]["track"]["name"];
        const album = data["tracks"]["items"][randomIndex]["track"]["album"]["name"];
        const artist =  data["tracks"]["items"][randomIndex]["track"]["artists"][0]["name"];
        const selectedAlbumCover =  data["tracks"]["items"][randomIndex]["track"]["album"]["images"][0]["url"];
        
        const selected =  {
            id: id, 
            name: name,
            album: album,
            artist: artist,
            img: selectedAlbumCover
        };
        return selected;
    };


    const addTrackToQueue = async (trackId) => {
        try {
            const response = await fetch(`https://api.spotify.com/v1/me/player/queue?uri=spotify:track:${trackId}`, {
                method: 'POST',
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            
            
        } catch (error) {
            console.error('Error adding track to queue:', error);
        }
    };


    const playSong = async (trackId) => {
        try {
            const response = await fetch('https://api.spotify.com/v1/me/player/play?device_id=' + deviceId, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uris: [`spotify:track:${trackId}`]
                })
            });
            console.log(await response.json());
        } catch (error) {
            console.error('Fetch error:', error);
        }
    };
    
    const SkipTrack = async () => {
        await player.nextTrack();
    }


    const pauseTrack = async () => {
        await player.pause();
    };

    const seekToPosition = async (ms) => {
        // const response = await fetch(`https://api.spotify.com/v1/me/player/seek?position_ms=${ms}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Authorization': 'Bearer ' + token
        //     }
        // });
        await player.seek(ms);
    };
    
    const intializePlayback = async () => {
        await transferPlayback(deviceId);
        
        let savedTrack = JSON.parse(localStorage.getItem("savedTrack"));
        
        const now = new Date();
        let selected;
        if (savedTrack && now - new Date(savedTrack.timestamp) < 86400000) { // 86400000 ms = 24 hours
            selected = savedTrack.track;
            setSelectedTrack(selected);

            setTarget(progress);
            setProgress(0);
            
        }
        else {
            selected = await getRandomSongFromPlaylist(globalTopFiftyId);
            setSelectedTrack(selected);

            localStorage.setItem("savedTrack", JSON.stringify({ track: selected, timestamp: new Date() }));
            
            setTarget(progress);
            setProgress(0);
        }
        player.togglePlay();
        await playSong(selected.id);
    }
    
    const handlePlay = async () => {
        if (!playing) {
            setPlaying(true);
            
            if (selectedTrack.id === "")
                await intializePlayback();
            else {
                setTarget(progress);
                setProgress(0);
                
                await player.togglePlay();
            }
        }
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
                await pauseTrack();
                await seekToPosition(0);
                setPlaying(false);
            };

            animateProgress(target);
        }
    }, [progress, target]);

    const handleAddGuess = (guess) => {
        if (guesses.length < 5) {
            const newGuess = {
                index: guesses.length,
                status: guess.name === 'Skipped' ? 'skipped' : guess.name === selectedTrack.name ? 'correct' : 'incorrect',
                title: guess.name === 'Skipped' ? 'Skipped' : guess.name + " - " + guess.artist,
            };
            setGuesses([...guesses, newGuess]);
            
            if (newGuess.status === 'correct') 
                setGameStatus("victory");
            else {
                if (guesses.length === 4 )
                    setGameStatus("defeat");
                else if (newGuess.status === 'incorrect')
                    handleSkip();
            }
        }
    };

        const logo = () => (
            <div className="w-[50%] h-[120px] md:h-[250px] flex flex-col gap-3">
                <Logo/>
                <div className="bg-darkOrange w-[30%] h-[10px] ml-[12px] rounded-md"/>
                <div className="bg-lightOrange w-[50%] h-[10px] ml-[12px] rounded-md"/>
                <div className="bg-darkOrange w-[80%] h-[10px] ml-[12px] rounded-md"/>
            </div>
        );

        const playButton = () => (
            <animated.div
                style={{
                    ...playButtonRotation,
                }}
                className="w-[100%] h-[100px] flex justify-center">
                <img onClick={handlePlay} src={record} className="w-[100px] cursor-pointer"/>
            </animated.div>
        );

        const musicBoard = () => (
            <div className={"w-[100%] flex justify-center"}>
                <Musicboard guesses={guesses}/>
            </div>
        );

        const layout = () => {
            if (isBigScreen) {
                return (<div className={"flex flex-row w-screen h-screen"}>
                    <div className={"grow"}>
                        {logo()}
                        <Musicbar progress={progress}/>
                        {playButton()}
                        <GuessEntry onAddGuess={handleAddGuess} onSkip={handleSkip} token={token}/>
                    </div>
                    <div className={"grow"}>
                        {musicBoard()}
                    </div>
                </div>);
            } else {
                return (
                    <>
                        {logo()}
                        <Musicbar progress={progress}/>
                        {playButton()}
                        <GuessEntry onAddGuess={handleAddGuess} onSkip={handleSkip} token={token}/>
                        {musicBoard()}
                    </>
                );
            }
        };

        return (
            <div className={"min-h-screen h-screen w-screen bg-paleYellow flex"}>
                <div className="flex grow flex-col justify-start items-start gap-6 overflow-auto">
                    <Authenticator onAuthenticate={handleAuthenticated} isEnabled={!isAuthenticated}/>
                    <Result song={selectedTrack} status={gameStatus}/>
                    {layout()}
                </div>
            </div>
        );

}

export default App;

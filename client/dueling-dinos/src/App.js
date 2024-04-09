import './App.css';
import { atom, useAtom } from 'jotai';
import {useEffect, useRef } from 'react';

import videojs from 'video.js';
import 'video.js/dist/video-js.css';

import DuelVideo from './video/duel.mp4';
import DinnerVideo from './video/dinner.mp4';
import DisasterVideo from './video/disaster.mp4';

import DuelImage from './images/DUEL.png';
import SpDuelImage from './images/DuelSp.png';
import DinnerImage from './images/DINNER.png';
import SpDinnerImage from './images/DinnerSp.png';
import DisasterImage from './images/DISASTER.png';
import SpDisasterImage from './images/DisasterSp.png';
import BackImage from './images/BACK.png';
import SpBackImage from './images/BackSp.png';
import VoteImage from './images/VOTE.png';
import SpVoteImage from './images/VoteSp.png';
import StartOverImage from './images/START_OVER.png';
import SpStartOverImage from './images/StartOverSp.png';
import HomeImage from './images/HOME.png';
import EnglishImage from './images/ENGLISH.png';
import EspanolImage from './images/ESPANOL.png';

const req_url =  process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT;

const defaultState = atom(
    {"page": "home",
     "locale": "en",
     "vote": null,
     "seeHeader": true,
     "seeHome": false}
)

const locales = {
    "backImage":{"en": BackImage,
                 "es" : SpBackImage},
    "voteImage":{"en": VoteImage,
                 "es": SpVoteImage},
    "localeImage":{"en": EspanolImage,
                   "es": EnglishImage},
    "duelImage":{"en": DuelImage,
                 "es": SpDuelImage},
    "dinnerImage":{"en": DinnerImage,
                   "es": SpDinnerImage},
    "disasterImage":{"en": DisasterImage,
                     "es": SpDisasterImage},
    "startOverImage":{"en": StartOverImage,
                      "es": SpStartOverImage},
    "locale": {"en": "EspanolImage",
               "es": "EnglishImage"},
    "heroText": {"en": "HOW DID THEY DIE?",
                 "es": "¿HOW DID THEY DIE BUT IN SPANISH?"},
    "homePrompt0": {"en": "You've seen some evidence.",
                    "es": "You've seen some evidence, but in Spanish."},
    "homePrompt1": {"en": "How do you interpret it?",
                    "es": "¿How do you interpret it, but in Spanish?"},
    "duel": {"en": "Duel",
             "es": "Duelo"},
    "dinner": {"en": "Dinner",
               "es": "Comida"},
    "disaster": {"en": "Disaster",
                 "es": "Desastre"},
    "back": {"en": "Back",
             "es":"Atrás"},
    "vote":{"en":"Vote",
            "es": "Votar"},
    "video": {"en": "Video",
              "es": "Video"},
    "duelText":{"en": "The injuries to both dinosaurs may be evidence that they died in battle. But we need to establish exactly when and how the injuries occurred to be sure.",
                "es": "ESP<The injuries to both dinosaurs may be evidence that they died in battle. But we need to establish exactly when and how the injuries occurred to be sure.>"},
    "dinnerText":{"en": "The dinosaurs may not have died at the same time. The tyrannosaur could have been scavenging on a Triceratops that was already dead.",
                  "es": "ESP<This is placeholder Dinner Text.>"},
    "disasterText":{"en": "Natural disasters can tamper with evidence by sweeping it all into once place. These dinosaurs were not necessarily interacting at all.",
                    "es": "ESP<This is placeholder Disaster Text.>"},
    "voteConfirm":{"en": "If this is how you interpret the evidence, click VOTE below.",
                   "es": "ESP<If this is how you interpret the evidence, click VOTE below.>"},
    "duelSubText":{"en": "They were fighting and died in battle.",
                   "es": "This is duel subtext, but in spanish."},
    "dinnerSubText":{"en": "They died at different times from different causes.",
                     "es": "this is dinner subtext but in spanish"},
    "disasterSubText":{"en": "They were both killed in a flood event.",
                       "es": "this is disaster subtext but in spanish"},
}

function styler (icon) {
    return ({backgroundImage: `url(${icon})`,
             backgroundSize: 'contain',
             backgroundPosition: 'center',
             width: '20%',
             height: '10rem',
             backgroundRepeat: 'no-repeat',
            })
}

const VideoPlayer = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const {options, onReady} = props;
    useEffect(()=>{
        if(!playerRef.current){
            const videoElement = document.createElement("video-js")
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);
            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });
        }
    }, [options, videoRef])
    useEffect(()=>{
        const player = playerRef.current;
        return () => {
            if (player && !player.isDisposed()){
                player.dispose();
                playerRef.current = null;
            }};
    }, [playerRef])
    return (
            <div data-vjs-player>
              <div ref={videoRef}/>
            </div>
    )
};

function VideoPage({state, setState}){
    const playerRef = useRef(null);
    const video = () => {
        switch(state.vote){
        case "duel": return DuelVideo;
        case "dinner": return DinnerVideo
        case "disaster": return DisasterVideo}
    }
    const videoJsOptions = {
        autoplay: true,
        controls: false,
        responsive: true,
        muted: true,
        fluid: true,
        sources: [{
            src: video(),
            type: 'video/mp4'
        }]
    };
    const handlePlayerReady = (player) => {
        player.on('waiting', ()=> {
            setState({...state, 'seeHome': false})})

        player.on('ended', ()=>{
            setState({...state, 'seeHome': true})
            const timeout = setTimeout(()=>{
                setState({...state, 'page': 'home',
                          'vote':null,
                          'seeHeader':true})
            }, 90000)})
    }
    return (<>
            <VideoPlayer
            options={videoJsOptions} onReady={handlePlayerReady} />
            {state.seeHome &&
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
             onClick={(event)=>setState({...state, 'page': 'home',
                                         'vote':null,
                                         'seeHeader':true})}
            style={styler(locales.startOverImage[state.locale])}
            ></div>
            </div>
            }
            </>);
}

function ContentPage({state, setState}){
    async function logVote(vote){
        const request  = await fetch(req_url + "/vote",
                                     {method: "POST",
                                      mode: "cors",
                                      headers: {'Content-Type': 'application/json'},
                                      body: JSON.stringify({"vote": vote})});

    }
    const content = () => {
        switch (state.vote){
        case "duel":  return ({...styler(locales.duelImage[state.locale]), margin: '1rem', width: '30%'});
        case "dinner": return ({...styler(locales.dinnerImage[state.locale]), margin: '1rem', width: '30%'});
        case "disaster": return({...styler(locales.disasterImage[state.locale]), margin: '1rem', width: '30%'})
        }
    }
    const subtext = () => {
        switch (state.vote){
        case "duel":  return (locales.duelSubText);
        case "dinner": return (locales.dinnerSubText);
        case "disaster": return(locales.disasterSubText);
        }
    }
    return (<>
            <div className="Content-SubHead" style={{'display': 'flex'}}>
            <p>{subtext()[state.locale]}</p>
            </div>
            <div className="Content flex-container" style={{'display':'flex'}}>
            <div className='Prompt-Button'
            style={content()}
            ></div>
            <div className="Content-text">
            <p>{locales[state.vote + "Text"][state.locale]}</p>
            <br/>
            <p>{locales.voteConfirm[state.locale]}</p>
            </div>
            </div>
            <div className="VotePage-Buttons flex-container" style={{'display':'flex'}}>
            <div className="VotePage-Button"
            style={styler(locales.backImage[state.locale])}
            onClick={(event)=>setState({...state, 'page': 'home', 'vote':null})}
            ></div>
            <div className="VotePage-Button"
            onClick={()=> {logVote(state.vote);
                           setState({...state, 'page':'video', 'seeHeader': false});
                          }
                    }
            style={styler(locales.voteImage[state.locale])}
            >
            </div>
            </div>
            </>);
}

function HomePage({state, setState}){
    return (<>
            <div className='HomePage-Prompt'>
            <div>
            <p>{locales.homePrompt0[state.locale]}</p>
            <br/>
            <p>{locales.homePrompt1[state.locale]}</p>
            </div>
            </div>
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            style={styler(locales.duelImage[state.locale])}
            onClick={(event)=>setState({...state, 'page': 'content', 'vote':'duel'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(locales.dinnerImage[state.locale])}
            onClick={(event)=>setState({...state, 'page': 'content', 'vote':'dinner'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(locales.disasterImage[state.locale])}
            onClick={(event)=>setState({...state, 'page':'content','vote': 'disaster'})}
            ></div>
            </div>

            </>);
}

function Main ({state, setState}){
    switch (state.page) {
    case "home":
        return (<HomePage state={state} setState={setState}/>);
    case "video":
        return (<VideoPage state={state} setState={setState}/>);
    case "content":
        return (<ContentPage state={state} setState={setState}/>);
    };
}

function Header({state, setState}){
    const headerText = () => {
        switch(state.page){
        case 'home': return (locales.heroText[state.locale]);
        case 'content': return(locales[state.vote][state.locale].toUpperCase());
        case 'video': return("vote logged!")
        default: return("video text");
        }
    }
    return (<>
            <header>
            <div
            onClick={(event)=>setState({...state, 'page': 'home', 'vote': null})}
            style={{...styler(HomeImage),
                   width: '2rem',
                   height: '2rem',
                   }}
            ></div>
            <div className="Header-HeroText">
            {headerText(state.page)}
            </div>
            <div
            style={{...styler(locales.localeImage[state.locale]),
                    width: '4rem',
                    height: '2rem'}}
            onClick={() => {
                switch(state.locale){
                case "en": return(
                    setState({...state, 'locale': 'es'})
                );
                case "es": return(
                    setState({...state, 'locale': 'en'})
                );
                }
            }}
            ></div>
            </header>
            </>
           )
}

function App() {
    const [state, setState] = useAtom(defaultState);
    return (
            <>
            {state.seeHeader && <Header state={state} setState={setState}/>}
            <Main state={state} setState={setState}/>
            </>
    );
}

export default App;

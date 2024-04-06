import './App.css';
import { atom, useAtom } from 'jotai';
import DuelImage from './images/DUEL.png';
import SpDuelImage from './images/DUEL Sp.png';
import DinnerImage from './images/DINNER.png';
import SpDinnerImage from './images/DINNER Sp.png';
import DisasterImage from './images/DISASTER.png';
import SpDisasterImage from './images/DISASTER Sp.png';
import BackImage from './images/BACK.png';
import SpBackImage from './images/BACK Sp.png';
import VoteImage from './images/VOTE.png';
import SpVoteImage from './images/VOTE Sp.png';
import StartOverImage from './images/START_OVER.png';
import SpStartOverImage from './images/START OVER Sp.png';
import HomeImage from './images/HOME.png';
import EnglishImage from './images/ENGLISH.png';
import EspanolImage from './images/ESPANOL.png';


const defaultState = atom(
    {"page": "home",
     "locale": "en",
     "vote": null,}
)

const locales = {
    "locale": {"en": "EspanolImage",
               "es": "EnglishImage"},
    "heroText": {"en": "HOW DID THEY DIE?",
                 "es": "¿HOW DID THEY DIE BUT IN SPANISH?"},
    "homePrompt0": {"en": "You've seen some evidence.",
                    "es": "You've seen some evidence, but in Spanish."},
    "homePrompt1": {"en": "How do you interpret it?",
                    "es": "¿How do you interpret it, but in Spanish?"},
    "duel": {"en": "Duel",
             "es": "Duel, but in Spanish"},
    "dinner": {"en": "Dinner",
               "es": "Dinner, but in Spanish"},
    "disaster": {"en": "Disaster",
                 "es": "Disaster, but in Spanish"},
    "back": {"en": "Back",
             "es":"Atrás"},
    "vote":{"en":"Vote",
            "es": "Votar"},
    "video": {"en": "Video",
              "es": "Video, but in Spanish"},
    "duelText":{"en": "The injuries to both dinosaurs may be evidence that they died in battle. But we need to establish exactly when and how the injuries occurred to be sure.",
                "es": "ESP<The injuries to both dinosaurs may be evidence that they died in battle. But we need to establish exactly when and how the injuries occurred to be sure.>"},
    "dinnerText":{"en": "This is placeholder Dinner Text.",
                  "es": "ESP<This is placeholder Dinner Text.>"},
    "disasterText":{"en": "This is placeholder Disaster Text.",
                    "es": "ESP<This is placeholder Disaster Text.>"},
    "voteConfirm":{"en": "If this is how you interpret the evidence, click VOTE below.",
                   "es": "ESP<If this is how you interpret the evidence, click VOTE below.>"},
    "duelSubText":{"en": "This is duel subtext",
                   "es": "This is duel subtext, but in spanish."},
    "dinnerSubText":{"en": "this is dinner subtext",
                   "es": "this is dinner subtext but in spanish"},
    "disasterSubText":{"en": "this is disaster subtext",
                   "es": "this is disaster subtext but in spanish"},
}

const vote_url =  process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/vote";

function styler (icon) {
    return ({backgroundImage: `url(${icon})`,
             backgroundSize: 'contain',
             backgroundPosition: 'center',
             width: '20%',
             height: '10rem',
             backgroundRepeat: 'no-repeat',
            })
}

function VideoPage({state, setState}){
    return (<>
            This is an embedded video.
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            onClick={(event)=>setState({...state, 'page': 'home'})}
            style={styler(StartOverImage)}
            ></div>
            </div>
            <div className="VotePage-Button"
            onClick={(event)=>setState({...state, 'page': 'home', 'vote':null})}>
            {locales.back[state.locale]}
            </div>
           </>);
}

function ContentPage({state, setState}){
    async function logVote(vote){
        const request  = await fetch(vote_url,
                                     {method: "POST",
                                      mode: "cors",
                                      headers: {'Content-Type': 'application/json'},
                                      body: JSON.stringify({"vote": vote})});

    }
    const content = () => {
        switch (state.vote){
        case "duel":  return ({...styler(DuelImage), margin: '1rem', width: '30%'});
        case "dinner": return ({...styler(DinnerImage), margin: '1rem', width: '30%'});
        case "disaster": return({...styler(DisasterImage), margin: '1rem', width: '30%'})
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
            onClick={(event)=>setState({...state, 'page': 'home', 'vote':null})}>
            {locales.back[state.locale]}
            </div>
            <div className="VotePage-Button"
            onClick={()=> {logVote(state.vote);
                           setState({...state, 'page':'video'});
                          }
                    }
            >{locales.vote[state.locale]}
            </div>
            </div>
            </>);
}

function HomePage({state, setState}){
    return (<>
            <div className='HomePage-Prompt flex-container' style={{'display':'flex'}}>
            <p>{locales.homePrompt0[state.locale]}</p>
            <br/>
            <p>{locales.homePrompt1[state.locale]}</p>
            </div>
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            style={true && styler(DuelImage)}
            onClick={(event)=>setState({...state, 'page': 'content', 'vote':'duel'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(DinnerImage)}
            onClick={(event)=>setState({...state, 'page': 'content', 'vote':'dinner'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(DisasterImage)}
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
        case 'content': return(locales[state.vote][state.locale]);
        case 'video': return("vote logged!")
        default: return("video text");
        }
    }
    const headerLocale = () => {
        switch(state.locale){
        case "en": return (EspanolImage);
        case "es": return (EnglishImage);
        }
    }
    return (<>
            <header>
            <div
            onClick={(event)=>setState({...state, 'page': 'home', 'vote': null})}
            style={{backgroundImage: `url(${HomeImage})`,
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    width: '2rem',
                    height: '2rem',
                    backgroundRepeat: 'no-repeat',
                   }}
            ></div>
            <div>
            {headerText(state.page)}
            </div>
            <div
            style={{...styler(headerLocale()),
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
            <Header state={state} setState={setState}/>
            <Main state={state} setState={setState}/>
            </>
    );
}

export default App;

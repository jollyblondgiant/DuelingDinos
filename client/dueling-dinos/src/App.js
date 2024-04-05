import './App.css';
import { atom, useAtom } from 'jotai';
import DuelImage from './images/Duel.png';
import DinnerImage from './images/Dinner.png';
import DisasterImage from './images/Disaster.png';
import SomeThingElseImage from './images/Somethingelse.png';
import BackImage from './images/back.svg';
import GoImage from './images/go.svg';

const defaultState = atom(
    {"page": "home",
     "locale": "en",
     "vote": null,}
)

const locales = {
    "locale": {"en": "Espanol",
               "es": "English"},
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
             "es":"Back"},
    "vote":{"en":"Vote",
            "es": "Vote"},
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
            style={styler(BackImage)}
            ></div>
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
        case "duel":  return ({...styler(DuelImage), margin: 0});
        case "dinner": return ({...styler(DinnerImage), margin: 0});
        case "disaster": return({...styler(DisasterImage), margin: 0})
        }
    }
    return (<>
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
            style={styler(DuelImage)}
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
    return (<>
            <header>
            <div
            onClick={(event)=>setState({...state, 'page': 'home', 'vote': null})}
            > Home </div>
            <div>
            {headerText(state.page)}
            </div>
            <div
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
            >{locales.locale[state.locale]}</div>
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

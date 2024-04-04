import './App.css';
import { atom, useAtom } from 'jotai';
import DuelImage from './images/Duel.png';
import DinnerImage from './images/Dinner.png';
import DisasterImage from './images/Disaster.png';
import SomeThingElseImage from './images/Somethingelse.png';
import BackImage from './images/back.svg';
import GoImage from './images/go.svg';

const defaultState = atom(
    {"page": "home"}
)

const vote_url = process.env.REACT_APP_SERVER_URL + ":" + process.env.REACT_APP_SERVER_PORT + "/vote";

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
        const response = await request;
        console.log(response);
    }
    return (<>
            <h2> {state.page} </h2>
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            onClick={(event)=>setState({...state, 'page': 'home'})}
            style={styler(BackImage)}
            ></div>
            <div className='Prompt-Button'
            onClick={
                () => {console.log('voting ', state.page, ": ...")
                       logVote(state.page)
                       setState({...state, 'page': 'video'})}

            }
            style={styler(GoImage)}
            ></div>
            </div>
            </>);
}

function HomePage({state, setState}){
    return (<>
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            style={styler(DuelImage)}
            onClick={(event)=>setState({...state, 'page': 'duel'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(DinnerImage)}
            onClick={(event)=>setState({...state, 'page': 'dinner'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(DisasterImage)}
            onClick={(event)=>setState({...state, 'page': 'disaster'})}
            ></div>
            <div className='Prompt-Button'
            style={styler(SomeThingElseImage)}
            onClick={(event)=>setState({...state, 'page': 'somethingElse'})}
            ></div>
            </div>

            </>);
}

function Main (){
    const [state, setState] = useAtom(defaultState);
    switch (state.page) {
    case "home":
        return (<HomePage state={state} setState={setState}/>);
    case "video":
        return (<VideoPage state={state} setState={setState}/>);
    default:
        return (<ContentPage state={state} setState={setState}/>);
    };
}

function Header(){
    return (
            <header>
            Welcome to Dueling Dinosaurs
        </header>
    )
}

function App() {
    return (
            <>
            <Header/>
            <Main/>
            </>
    );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { atom, useAtom } from 'jotai';

const defaultState = atom(
    {"page": "home"}
)

function ContentPage({state, setState}){
    return (<>
            <h2> {state.page} </h2>
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            onClick={(event)=>setState({... state, 'page': 'home'})}
            >go back</div>
            <div className='Prompt-Button'
            onClick={(event)=>setState({... state, 'page': 'home'})}
            >confirm</div>
            </div>
            </>);
}

function HomePage({state, setState}){
    return (<>
            <h2> HomePage </h2>
            <div className='HomePage-Buttons flex-container row' style={{'display':'flex'}}>
            <div className='Prompt-Button'
            onClick={(event)=>setState({... state, 'page': 'button1'})}
            >button 1</div>
            <div className='Prompt-Button'
            onClick={(event)=>setState({... state, 'page': 'button2'})}
            >button 2</div>
            <div className='Prompt-Button'
            onClick={(event)=>setState({... state, 'page': 'button3'})}
            >button 3</div>
            </div>
            </>);
}

function Main (){
    const [state, setState] = useAtom(defaultState);
    switch (state.page) {
    case "home":
        return (<HomePage state={state} setState={setState}/>);
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

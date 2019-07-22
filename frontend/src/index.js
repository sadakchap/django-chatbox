import React from "react"
import ReactDOM from "react-dom"
import Chat from "./components/Chat"
import WebSocketInstance from './websockets';

class App extends React.Component {

    componentDidMount(){
        WebSocketInstance.connect();
    }

    render(){
        return(
            <div>
                <Chat />
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
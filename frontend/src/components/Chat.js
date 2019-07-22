import React from "react"
import Sidepanel from "./Sidepanel/Sidepanel"
import WebSocketInstance from "../websockets"

class Chat extends React.Component {

    constructor(props){
        super(props);
        this.state = {};

        this.waitForSocketConnection(() => {
            console.log("in constructor")
            WebSocketInstance.addCallbacks(
                this.setMessages.bind(this),
                this.addMessage.bind(this)
            );
            WebSocketInstance.fetchMessages(this.props.currentUser);
        });
    }

    waitForSocketConnection(callback) {
        const component = this;
        setTimeout(
            function () {
                if (WebSocketInstance.state() === 1) {
                    console.log("connection is secure!!!")
                    callback();
                    return;
                } else {
                    console.log("waiting for connection");
                    component.waitForSocketConnection(callback);
                }
            }, 100);
    }


    setMessages(messages){
        this.setState({
            messages: messages.reverse()
        });
    }

    addMessage(message){
        this.setState({
            messages: [ ...this.state.messages, message]
        });
    }

    renderMessages = (messages) => {
        console.log("message got!")
        const currentUser = 'admin';
        return messages.map(msg => (
            <li 
                key={msg.id} 
                className={msg.author === currentUser ? "sent" : "replies"}
            >
                <img src="http://emilcarlsson.se/assets/mikeross.png" ></img>
                <p>{msg.content}</p>
            </li>
        ));
    }


    messageChangeHandler = event => {
        this.setState({
            message: event.target.value
        });
    }


    sendMessageHandler = event => {
        event.preventDefault();
        const messageObject = {
            from: 'admin',
            content: this.state.message,
        }

        WebSocketInstance.newChatMessage(messageObject);

        this.setState({
            message: ''
        });
    }

    render(){
        const messages = this.state.messages;

        return(
            <div id="frame">
                <Sidepanel />
                <div className="content">
                    <div className="contact-profile">
                        <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                        <p>Harvey Specter</p>
                        <div className="social-media">
                            <i className="fa fa-facebook" aria-hidden="true"></i>
                            <i className="fa fa-twitter" aria-hidden="true"></i>
                            <i className="fa fa-instagram" aria-hidden="true"></i>
                        </div>
                    </div>
                    <div className="messages">
                        <ul id="chat-log">
                            <li className="sent">
                                <img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
                                <p>How the hell am I supposed to get a jury to believe you when I am not even sure that I do?!
                                </p>
                            </li>
                            <li className="replies">
                                <img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
                                <p>When you're backed against the wall, break the god damn thing down.</p>
                            </li>

                            {
                                messages &&
                                this.renderMessages(messages)
                            }

                        </ul>
                    </div>
                    <div className="message-input">
                        <form onSubmit={this.sendMessageHandler} >
                            <div className="wrap">
                                <input 
                                    name="message"
                                    onChange={this.messageChangeHandler}
                                    value={this.state.message}
                                    type="text" 
                                    placeholder="Write your message..."
                                    id="chat-message-input"
                                 />
                                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button className="submit" id="chat-message-submit"><i className="fa fa-paper-plane" aria-hidden="true"></i></button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Chat
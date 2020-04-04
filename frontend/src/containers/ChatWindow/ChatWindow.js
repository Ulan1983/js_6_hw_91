import React, {Component} from 'react';
import './ChatWindow.css';
import {connect} from "react-redux";

class ChatWindow extends Component {

    state = {
        messagesIn: [],
        messageOut: '',
        onlineUsers: []
    };

    componentDidMount() {
        this.websocket = new WebSocket('ws://localhost:8000/chat?token=' + this.props.user.token);

        this.websocket.onmessage = (message) => {

            try {
                const data = JSON.parse(message.data);
                console.log(data);

                switch (data.type) {
                    case 'NEW_MESSAGE':
                        const newMessage = {
                            author: data.username,
                            message: data.message
                        };

                        this.setState({messagesIn: [...this.state.messagesIn, newMessage]});
                        break;
                    case 'LAST_MESSAGES':
                        this.setState({messagesIn: data.messages});
                        break;
                    case 'ONLINE_USERS':
                        this.setState({onlineUsers: data.onlineUsers});
                        break;
                    default:
                        break;
                }
            } catch (e) {
                console.log('Something went wrong', e);
            }
        }
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        const message = {
            type: 'CREATE_MESSAGE',
            message: this.state.messageOut,
        };

        this.websocket.send(JSON.stringify(message));
        this.setState({messageOut: ''});
    };

    render() {
        return (
            <div className="chatWin">
                <div className="chatUsers">
                    {this.state.onlineUsers.map((u, i) => (
                        <div key={i}>
                            {u}
                        </div>
                    ))}
                </div>
                <div className="mainHolder">
                    <div className="chatMain">
                        { this.state.messagesIn && this.state.messagesIn.map((msg, i) => (
                                <div key={i}><b>{msg.author}</b>: {msg.message}</div>
                        ))}
                    </div>
                    <form onSubmit={this.submitFormHandler} className="message">
                        <input
                            required
                            type="text"
                            name="messageOut"
                            value={this.state.messageOut}
                            autoComplete="current-messageOut"
                            onChange={this.inputChangeHandler}
                            placeholder="Введите ваше сообщение"
                        />
                        <button>
                            Отправить
                        </button>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

export default connect(mapStateToProps)(ChatWindow);
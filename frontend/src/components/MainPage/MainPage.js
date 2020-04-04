import React, {Component} from 'react';
import {connect} from "react-redux";
import './MainPage.css';
import Login from "../../containers/Login/Login";
import ChatWindow from "../../containers/ChatWindow/ChatWindow";

class MainPage extends Component {

    render() {
        return (
            <div className="d-flex col-11 ml-auto mr-auto mt-1">
                {this.props.user ? <ChatWindow/> : <Login/>}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
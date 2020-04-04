import React, {Component} from 'react';
import {connect} from "react-redux";
import {apiURL} from "../../constants";
import {Button} from "reactstrap";
import {Link} from "react-router-dom";

class Profile extends Component {

    render() {
        return (
            <>
                {this.props.user &&
                <div className="col-11 mr-auto ml-auto mt-5">
                    <h4>Имя: {this.props.user.displayName}</h4>
                    <div className="col-2 mr-auto ml-auto">
                        <img className="col-12 mb-3" src={apiURL + '/uploads/' + this.props.user.image} alt=""/>
                    </div>
                    <Button color="info">
                        <Link
                            to={'/profile/edit'}
                            style={{textDecoration: 'none', color: "#fff"}}
                        >
                            Редактировать профиль
                        </Link>
                    </Button>
                </div>}
            </>
        );
    }
}

const mapStateToProps = state => ({
    user: state.users.user
});


export default connect(mapStateToProps)(Profile);
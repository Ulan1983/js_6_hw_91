import React, {Component} from 'react';
import FormElement from "../../components/UI/Form/FormElement";
import {Alert, Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";
import {loginUser} from "../../store/actions/usersActions";
import {Link, NavLink as RouterNavLink} from "react-router-dom";

class Login extends Component {

    state = {
        username: '',
        password: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = async event => {
        event.preventDefault();
        this.props.loginUser({...this.state});
    };

    render() {
        return (
            <>
                {this.props.error && (
                    <Alert color="danger">{this.props.error.error}</Alert>
                )}
                <Form onSubmit={this.submitFormHandler} className="border rounded-lg border-dark p-4 ml-auto mr-auto col-4">
                    <h2 className="mb-4">Вход</h2>
                    <FormElement
                        required
                        propertyName="username"
                        title="Имя"
                        value={this.state.username}
                        onChange={this.inputChangeHandler}
                        type="text"
                        autoComplete="current-username"
                        placeholder="Введите имя для входа"
                    />
                    <FormElement
                        required
                        propertyName="password"
                        title="Пароль"
                        value={this.state.password}
                        onChange={this.inputChangeHandler}
                        type="password"
                        autoComplete="current-password"
                        placeholder="Введите пароль"
                    />
                    <FormGroup row>
                        <Col>
                            <Button type="submit" color="info">
                                Вход
                            </Button>
                        </Col>
                    </FormGroup>
                    <span><Link tag={RouterNavLink} to="/register">Регистрация</Link></span>
                </Form>
            </>
        );
    }
}

const mapStateToProps = state => ({
    loading: state.users.loginLoading,
    error: state.users.loginError
});

const mapDispatchToProps = dispatch => ({
    loginUser: userData => dispatch(loginUser(userData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
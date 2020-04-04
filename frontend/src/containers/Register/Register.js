import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {registerUser} from "../../store/actions/usersActions";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {Link} from "react-router-dom";
class Register extends Component {
    state = {
        username: '',
        password: '',
        rePassword: '',
        displayName: ''
    };

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    submitFormHandler = event => {
        event.preventDefault();
        this.props.registerUser({...this.state});
    };

    getFieldError = fieldName => {
        try {
            return this.props.error.errors[fieldName].message;
        } catch (e) {
            return undefined;
        }
    };

    render() {
        return (
            <>
                <div className="d-flex col-11 ml-auto mr-auto mt-4">
                    <div className="col-8">
                        www
                    </div>
                    <div className="col-4">
                        <Form onSubmit={this.submitFormHandler}
                              className="border rounded-lg border-dark p-4 ml-auto mr-auto">
                            <h2 className="mb-4">Регистрация</h2>
                            <FormElement
                                required
                                propertyName="username"
                                title="Введите имя для входа"
                                value={this.state.username}
                                onChange={this.inputChangeHandler}
                                error={this.getFieldError('username')}
                                placeholder="Имя для входа"
                                autoComplete="new-username"
                            />
                            <FormElement
                                required
                                propertyName="password"
                                title="Пароль"
                                type="password"
                                value={this.state.password}
                                onChange={this.inputChangeHandler}
                                error={this.getFieldError('password')}
                                placeholder="Пароль"
                                autoComplete="new-password"
                            />
                            <FormElement
                                required
                                propertyName="rePassword"
                                title="Повторите пароль"
                                type="password"
                                value={this.state.rePassword}
                                onChange={this.inputChangeHandler}
                                error={this.getFieldError('rePassword')}
                                placeholder="Пароль"
                                autoComplete="new-rePassword"
                            />
                            <FormElement
                                required
                                propertyName="displayName"
                                title="Ваше полное имя"
                                value={this.state.displayName}
                                onChange={this.inputChangeHandler}
                                error={this.getFieldError('displayName')}
                                placeholder="Полное имя"
                                autoComplete="new-displayName"
                            />
                            <FormGroup row>
                                <Col>
                                    <Button type="submit" color="info">
                                        Зарегистрироваться
                                    </Button>
                                </Col>
                            </FormGroup>
                            <span><Link to={'/'}>Войти</Link></span>
                        </Form>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError
});

const mapDispatchToProps = dispatch => ({
    registerUser: userData => dispatch(registerUser(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
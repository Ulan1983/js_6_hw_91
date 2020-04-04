import React, {Component} from 'react';
import {Button, Col, Form, FormGroup} from "reactstrap";
import {connect} from "react-redux";
import FormElement from "../../components/UI/Form/FormElement";
import {updateUser} from "../../store/actions/usersActions";

class Register extends Component {
    state = {
        displayName: '',
        image: ''
    };

    componentDidMount() {
        this.setState({
            displayName: this.props.user.displayName
        })
    }

    inputChangeHandler = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    };

    fileChangeHandler = event => this.setState({[event.target.name]: event.target.files[0]});

    submitFormHandler = event => {
        event.preventDefault();

        const formData = new FormData();

        Object.keys(this.state).forEach(key => {
            formData.append(key, this.state[key]);
        });
        this.props.updateUser(formData);
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
                <div className="d-flex col-11 ml-auto mr-auto mt-5">
                    <Form onSubmit={this.submitFormHandler}
                          className="border rounded-lg border-dark p-4 ml-auto mr-auto">
                        <h2 className="mb-4">Редактировать</h2>
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
                        <FormElement
                            propertyName="image"
                            title="Фото профиля"
                            onChange={this.fileChangeHandler}
                            type="file"
                        />
                        <FormGroup row>
                            <Col>
                                <Button type="submit" color="info">
                                    Редактировать
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </div>
            </>
        );
    }
}

const mapStateToProps = state => ({
    error: state.users.registerError,
    user: state.users.user
});

const mapDispatchToProps = dispatch => ({
    updateUser: formData => dispatch(updateUser(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
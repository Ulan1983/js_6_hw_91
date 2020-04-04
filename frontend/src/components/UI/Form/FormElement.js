import React from 'react';
import PropTypes from 'prop-types';
import {Col, FormFeedback, FormGroup, Input, Label} from "reactstrap";

const FormElement = props => {
    return (
        <FormGroup className="text-left">
            <Label className="pl-3 pr-3" for={props.propertyName}><b>{props.title}</b></Label>
            <Col className="pl-3 pr-3">
                <Input
                    invalid={!!props.error}
                    type={props.type}
                    name={props.propertyName} id={props.propertyName}
                    value={props.value}
                    onChange={props.onChange}
                    required={props.required}
                    autoComplete={props.autoComplete}
                    placeholder={props.placeholder}
                    className="border-dark"
                />
                <FormFeedback>{props.error}</FormFeedback>
            </Col>
        </FormGroup>
    );
};

FormElement.propTypes = {
    propertyName: PropTypes.string.isRequired,
    required: PropTypes.bool,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    autoComplete: PropTypes.string
};

export default FormElement;
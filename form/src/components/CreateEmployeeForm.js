import React from 'react';
import useForm from '../services/useForm';
import { Form, Button, Row, Col } from 'react-bootstrap';


const CreateEmployeeForm = () => {
    
    //Callback
    function saveEmployeeData() {
        alert(JSON.stringify(values, null, 2));
    }

    //Validation
    function validate(values) {
        let errors = {};
        if (!values.email) {
            errors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = 'Email address is invalid';
        }
        if (!values.password) {
            errors.password = 'Password is required';
        } else if (values.password.length < 8) {
            errors.password = 'Password must be 8 or more characters';
        }
        return errors;
    };

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
    } = useForm(saveEmployeeData, validate);

    return (
        <div className="formContainer">
            <h1>Create Employee</h1>
            <Form noValidate>
                <Row>
                    <Col>
                    <Form.Label>Full Name</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                        type="text"
                        placeholder="firstname lastname"
                        name="fullname"
                        value={values.fullname || ''}
                        onChange={handleChange}
                        />
                        {errors && errors.fullName && <p> Full name format: fullname latname</p>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>Email</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                        type="email"
                        placeholder="firstname.lastname@gmail.com"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        />
                        {errors && errors.email && <p> Email format: firstname.latname@gmail.com </p>}
                    </Col>
                </Row>
                
                <Row>
                    <Col>
                        <Form.Label >Proficiency</Form.Label>
                    </Col>
                    <Col>
                        <div as={Col} key={`inline-radio`} className="mb-3">
                            <Form.Check
                                inline
                                label="Beginner"
                                name="proficiency"
                                type="radio"
                                value="Beginner"
                                id={`inline-radio-beginner`}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                label="Mediocore"
                                name="proficiency"
                                type="radio"
                                value="Mediocore"
                                id={`inline-radio-mediocore`}
                                onChange={handleChange}
                            />
                            <Form.Check
                                inline
                                label="Advanced"
                                name="proficiency"
                                type="radio"
                                value="Advanced"
                                id={`inline-radio-advanced`}
                                onChange={handleChange}
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Button type="button" onClick={()=>alert(JSON.stringify(values, null, 2))} className="employee_submit_button">Save</Button>
                </Row>
            </Form>
        </div>
    )
}

export default CreateEmployeeForm
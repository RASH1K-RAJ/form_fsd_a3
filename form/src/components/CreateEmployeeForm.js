import React from 'react';
import useForm from '../services/useForm';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import createEmployeeFormValidation from '../services/createEmployeeFormValidation';


const CreateEmployeeForm = () => {

    const {
        handleChange,
        handleSubmit,
        values,
        skillList,
        errors,
        addSkill,
        addSkillButtonDisabled,
        handleSkillChange,
        skillValues,
        skillErrors
    } = useForm(saveEmployeeData, createEmployeeFormValidation);

    //Callback
    function saveEmployeeData() {

        // Check if 'employee' exists in localStorage
        let employees = JSON.parse(localStorage.getItem('employees'));

        // If 'employ' doesn't exist or is null, create a new array and add the employee
        if (!employees) {
            employees = [{...values, skills: [...skillList]}];
        } else {
            // If 'employ' exists, add the employee to the existing array
            employees.push({...values, skills: [...skillList]});
        }

        // Save the updated employees array to localStorage
        localStorage.setItem('employees', JSON.stringify(employees));

        //clearing fields
        window.location.reload();
    }

    return (
        <div className="formContainer">
            <h1>Create Employee</h1>
            <Form noValidate onSubmit={handleSubmit}>
                <Row>
                    <Col>
                    <Form.Label as="Legend">Full Name</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                        type="text"
                        placeholder="firstname lastname"
                        name="fullname"
                        value={values.fullname || ''}
                        onChange={handleChange}
                        />
                        {errors?.fullname && <p>{errors.fullname}</p>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label as="Legend">Email</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                        type="email"
                        placeholder="firstname.lastname@gmail.com"
                        name="email"
                        value={values.email || ''}
                        onChange={handleChange}
                        />
                        {errors?.email && <p>{errors.email} </p>}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button type="button" onClick={addSkill} disabled={addSkillButtonDisabled}>Add Skill</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label as="Legend" >Skill</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control 
                        type="text"
                        placeholder="name"
                        name="skillName"
                        value={skillValues.skillName || ''}
                        onChange={handleSkillChange}
                        />
                        {skillErrors.skillName && <p>{skillErrors.skillName} </p>}
                    </Col>
                    <Col>
                        <Form.Control 
                        type="text"
                        placeholder="years"
                        name="skillYears"
                        value={skillValues.skillYears || ''}
                        onChange={handleSkillChange}
                        />
                        {skillErrors.skillYears && <p>{skillErrors.skillYears} </p>}
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label as="Legend">Proficiency</Form.Label>
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
                            {errors?.proficiency && <p>{errors.proficiency} </p>}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Button type="submit"  className="employee_submit_button">Save</Button>
                </Row>
            </Form>
            { skillList.length !== 0 &&
            <Table stripped bordered hover variant>
            <thead>
                <tr>
                <th>Skill Name</th>
                <th>Years</th>
                </tr>
            </thead>
            <tbody>
                {   
                    skillList.map((skill)=>{
                        return(
                            <tr>
                                <td>{skill.name}</td>
                                <td>{skill.years}</td>
                            </tr>
                        )
                    })
                }
            </tbody>
            </Table>
            }
        </div>
    )
}

export default CreateEmployeeForm
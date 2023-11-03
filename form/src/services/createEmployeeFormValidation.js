 //Validation
 function createEmployeeFormValidation(values) {
    let errors = {}
    //regex
    const nameRegex = /^[a-zA-Z]{2,30}\s[a-zA-Z]{2,30}$/; // Regular expression for "Firstname Lastname" format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const skillYearRegex = /^(0|[1-9]|1\d|20)$/;

    
    //full-name
    if(!values.fullname){
        errors.fullname = 'Full name is required';
    } else if (values.fullname.length > 60) {
        errors.fullname = 'Full name should not exceed 60 characters';
    } else if (!nameRegex.test(values.fullname)) {
        errors.fullname = 'Please enter a valid Full Name in the format "Firstname Lastname"';
    }

    //email
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!emailRegex.test(values.email)) {
        errors.email = 'Email address is invalid';
    }

    //proficiency
    if(!values.proficiency){
        errors.proficiency = 'Proficiency is required';
    }

    return errors;
}

export default createEmployeeFormValidation;
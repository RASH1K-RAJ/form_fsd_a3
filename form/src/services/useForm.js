import { useState, useEffect } from 'react';

const useForm = (callback, validate) => {

  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [skillList, setSkillList] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [addSkillButtonDisabled, setAddSkillButtonDisabled] = useState(true);
  const [skillValues, setSkillValues] = useState({});
  const [skillErrors, setSkillErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      callback();
    }
  }, [errors]);

  useEffect(() => {
    let tempSkillErrors = {};
    const skillYearRegex = /^(1\d|20|[1-9])$/;

    if (skillValues.skillName === ''){
        tempSkillErrors.skillName = "Skill Name is required";
    } else if (skillValues.skillName?.length > 20){
        tempSkillErrors.skillName = "Name should be less than 20 characters";
    } else {
        delete tempSkillErrors.skillName;
    }

    if (skillValues.skillYears === ''){
        tempSkillErrors.skillYears = "Years is required";
    } else if (skillValues.skillYears){
        if(!skillYearRegex.test(skillValues.skillYears)){
          tempSkillErrors.skillYears = "Years < 20 and whole numbers only";
        }
    } else {
        delete tempSkillErrors.skillYears;
    }

    setSkillErrors(tempSkillErrors);

    if (Object.keys(tempSkillErrors).length === 0){
        setAddSkillButtonDisabled(false);
    } else {
        setAddSkillButtonDisabled(true);
    }
  }, [skillValues]); // useEffect will trigger whenever skillValues change


  const handleSubmit = (event) => {
    if (event) event.preventDefault();
    console.log("I am in handle Submit");
    setErrors(validate(values));
    setIsSubmitting(true);
  };

  const handleChange = (event) => {
    event.persist();
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
  };

  const handleSkillChange = (event) => {
    event.persist();
    setSkillValues(prevSkillValues => ({ ...skillValues, [event.target.name]: event.target.value }));
  };

  const addSkill = ()=>{
    const skill = {
      name: skillValues.skillName,
      years: skillValues.skillYears
    }

    setSkillList([...skillList, skill])
    setAddSkillButtonDisabled(true);
  };

  return {
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
  }
};

export default useForm;
import React, { useCallback } from "react";
const validator = require('validator');


//хук управления формой и валидации формы
export function useFormWithValidation() {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: target.validationMessage });
    setIsValid(target.closest("form").checkValidity());

    if (name === 'name' && value.replace(/[a-zа-я\s-]/gi, '')) {
      setErrors({ ...errors, 'name': 'Введены недопустимые символы' });
      setIsValid(false);
    }

    if (name === 'email' && !validator.isEmail(value) && !target.validationMessage) {
      setErrors({ ...errors, 'email': 'Поле email должно быть валидным' })
      setIsValid(false);
    }
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, setValues, handleChange, errors, isValid, resetForm, setErrors, setIsValid };
}
import React, { useCallback, useState, useEffect } from 'react';

function useValidation () {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const {name, value} = evt.target;
    const error = evt.target.validationMessage;
    setValues({ ... values, [name]: value});
    setErrors({ ... errors, [name]: error});
  };

  useEffect(() => {
    // const isValid = evt.target.closest("form").checkValidity();
    const isValid = Object.values(errors).every(error => error === '');
    setIsValid(isValid);
  }, [errors]);

  const resetValidation = useCallback((values={}, errors={}, isValid = false) => {
    setValues(values);
    setErrors(errors);
    setIsValid(isValid);
  }, [setValues, setErrors, setIsValid]);

  return {
    values,
    errors,
    handleChange,
    resetValidation,
    isValid
  }
}

export default useValidation;

import { useCallback, useState } from 'react';

function useValidation () {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt) {
    const {name, value} = evt.target;
    const error = evt.target.validationMessage;
    const isValid = evt.target.closest("form").checkValidity();
    setValues({ ...values, [name]: value});
    setErrors({ ...errors, [name]: error});
    setIsValid(isValid);
  };

  const resetValidation = useCallback((newValues={}, newErrors={}, newIsValid = false) => {
    setValues(newValues);
    setErrors(newErrors);
    setIsValid(newIsValid);
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

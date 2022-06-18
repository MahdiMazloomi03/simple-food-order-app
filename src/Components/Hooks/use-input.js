import { useReducer } from 'react';

const initialInput = { value: '', isTouched: false };
const reducerFunction = (state, action) => {
  if (action.type === 'INPUT') {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === 'BLUR') {
    return { value: state.value, isTouched: true };
  }
  if (action.type === 'RESET') {
    return { value: '', isTouched: false };
  }
  return initialInput;
};
const useInput = (validate) => {
  const [inputState, dispatch] = useReducer(reducerFunction, initialInput);

  const isValid = validate(inputState.value);
  const hasError = !isValid && inputState.isTouched;

  const inputChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  };
  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  };
  const reset = () => {
    dispatch({ type: 'RESET' });
  };
  return {
    enteredValue: inputState.value,
    isValid,
    hasError,
    inputChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;

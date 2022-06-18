import React, { useRef, useState } from 'react';
import Input from '../UI/Input';
import styles from './MealItemForm.module.css';
const MaelItemForm = (props) => {
  const inputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();
    const enteredAmount = inputRef.current.value;
    const enteredAmountNumber = +enteredAmount;

    if (
      enteredAmount.trim().lenght === 0 ||
      enteredAmountNumber < 1 ||
      enteredAmountNumber > 6
    ) {
      setFormIsValid(false);
      return;
    }
    props.onAddToCart(enteredAmountNumber);
    setFormIsValid(true);
  };
  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        label="Amount"
        ref={inputRef}
        input={{
          id: 'amount_' + props.id,
          type: 'number',
          min: '1',
          max: '6',
          step: '1',
          defaultValue: '1',
        }}
      />
      {!formIsValid && <p>Please enter a valid amount (1-6).</p>}
      <button>+Add</button>
    </form>
  );
};

export default MaelItemForm;

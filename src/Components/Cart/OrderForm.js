import React, { useContext } from 'react';
import useInput from '../Hooks/use-input';
import useRequest from '../Hooks/use-request';
import CartContext from '../../Store/cart-context';

import classes from './OrderForm.module.css';
const OrderForm = (props) => {
  const cartctx = useContext(CartContext);
  const {
    enteredValue: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    inputChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== '');
  const {
    enteredValue: enteredAddress,
    isValid: addressIsValid,
    hasError: addressHasError,
    inputChangeHandler: addressChangeHandler,
    inputBlurHandler: addressBlurHandler,
    reset: addressReset,
  } = useInput((value) => value.trim() !== '');

  const { isLoading, error, sendRequest } = useRequest();
  let formIsValid = false;
  if (nameIsValid && addressIsValid) formIsValid = true;

  const submitHandler = (event) => {
    event.preventDefault();
    const orderedMeals = props.items;
    const orderData = { enteredName, enteredAddress, orderedMeals };
    sendRequest(
      {
        url: 'https://test-5c0af-default-rtdb.asia-southeast1.firebasedatabase.app/orders.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { order: orderData },
      },
      () => {}
    );
    nameReset();
    addressReset();
  };

  let nameClasses = nameHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : `${classes['form-control']}`;
  let addressClasses = addressHasError
    ? `${classes['form-control']} ${classes.invalid}`
    : `${classes['form-control']}`;

  return (
    <form className={classes.form}>
      <h3>Order Form</h3>
      <div className={nameClasses}>
        <label>Name:</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameHasError && (
          <p className={classes['error-text']}>Please enter a valid name</p>
        )}
      </div>
      <div className={addressClasses}>
        <label>Address:</label>
        <textarea
          id="name"
          onChange={addressChangeHandler}
          onBlur={addressBlurHandler}
          value={enteredAddress}
        />
        {addressHasError && (
          <p className={classes['error-text']}>Please enter a valid address</p>
        )}
      </div>
      {error && <p className={classes['error-text']}>{error}</p>}
      <div className={classes['form-actions']} onClick={submitHandler}>
        <button disabled={!formIsValid} type="submit">
          {isLoading ? 'Ordering..' : 'Order'}
        </button>
      </div>
    </form>
  );
};

export default OrderForm;

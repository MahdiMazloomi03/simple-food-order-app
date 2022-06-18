import React from 'react';
import styles from './CartItem.module.css';
const CartItem = (props) => {
  const price = `$${props.item.price.toFixed(2)}`;
  return (
    <li className={styles['cart-item']}>
      <div>
        <h2>{props.item.name}</h2>
        <div className={styles.summary}>
          <span className={styles.price}>{price}</span>
          <span className={styles.amount}>x {props.item.amount}</span>
        </div>
      </div>
      <div className={styles.actions}>
        <button onClick={props.onAdd}>+</button>
        <button onClick={props.onRemove}>-</button>
      </div>
    </li>
  );
};

export default CartItem;

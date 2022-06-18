import React, { useContext } from 'react';
import styles from './MealItem.module.css';
import MaelItemForm from './MealItemForm';
import CartContext from '../../Store/cart-context';
const MealItem = (props) => {
  const price = `$${props.item.price.toFixed(2)}`;
  const cartctx = useContext(CartContext);
  const addToCartHandler = (amount) => {
    cartctx.addItem({
      name: props.item.name,
      price: props.item.price,
      amount: amount,
      id: props.item.id,
    });
  };
  return (
    <div className={styles.meal}>
      <div>
        <h3>{props.item.name}</h3>
        <p className={styles.description}>{props.item.description}</p>
        <div className={styles.price}>{price}</div>
      </div>
      <div>
        <MaelItemForm id={props.item.id} onAddToCart={addToCartHandler} />
      </div>
    </div>
  );
};
export default MealItem;

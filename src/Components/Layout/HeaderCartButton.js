import React, { useState, Fragment, useContext, useEffect } from 'react';
import Cart from '../Cart/Cart';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../Store/cart-context';
const HeaderCartButton = (props) => {
  const [cart, setCart] = useState(false);
  const cartButtonClickHandler = () => {
    setCart(true);
  };
  const cancelModalHandler = () => {
    setCart(false);
  };
  const cartctx = useContext(CartContext);
  const numberOfItems = cartctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);
  const [btnBump, setBtnBump] = useState(false);
  const btnclasses = `${styles.button} ${btnBump ? styles.bump : ''}`;
  useEffect(() => {
    if (cartctx.items.length === 0) {
      return;
    }
    setBtnBump(true);
    const timer = setTimeout(() => {
      setBtnBump(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [cartctx.items]);
  return (
    <Fragment>
      {cart && <Cart cancelModal={cancelModalHandler} />}
      {!cart && (
        <button className={btnclasses} onClick={cartButtonClickHandler}>
          <span className={styles.icon}>
            <CartIcon />
          </span>
          <span>Your Cart</span>
          <span className={styles.badge}>{numberOfItems}</span>
        </button>
      )}
    </Fragment>
  );
};
export default HeaderCartButton;

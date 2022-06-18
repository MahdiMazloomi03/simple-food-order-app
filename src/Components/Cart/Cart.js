import React, { useContext, useState } from 'react';
import Modal from '../UI/Modal';
import styles from './Cart.module.css';
import CartContext from '../../Store/cart-context';
import CartItem from './CartItem';
import OrderForm from './OrderForm';
const Cart = (props) => {
  const [order, setOrder] = useState(false);
  const cartctx = useContext(CartContext);
  const totalPrice = `$${cartctx.totalAmount.toFixed(2)}`;
  const hasitem = cartctx.items.length > 0;
  const cartItemAddHandler = (item) => {
    cartctx.addItem({ ...item, amount: 1 });
  };
  const cartItemRemoveHandler = (id) => {
    cartctx.removeItem(id);
  };
  const orderHandler = () => {
    setOrder(true);
  };
  return (
    <Modal cancel={props.cancelModal}>
      {order && <OrderForm items={cartctx.items}/>}
      {!order && (
        <div>
          <ul className={styles['cart-items']}>
            {cartctx.items.map((item) => {
              return (
                <CartItem
                  key={item.id}
                  item={item}
                  onAdd={cartItemAddHandler.bind(null, item)}
                  onRemove={cartItemRemoveHandler.bind(null, item.id)}
                />
              );
            })}
          </ul>
          <div className={styles.total}>
            <h5>Total Amount</h5>
            <div>{totalPrice}</div>
          </div>
          <div className={styles.actions}>
            <button
              className={styles['button--alt']}
              onClick={props.cancelModal}
            >
              Close
            </button>
            {hasitem && (
              <button className={styles.button} onClick={orderHandler}>
                Order
              </button>
            )}
          </div>
        </div>
      )}
    </Modal>
  );
};
export default Cart;

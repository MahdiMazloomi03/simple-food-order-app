import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};
const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.amount * action.item.price;
    const exitingItemIndex = state.items.findIndex((item) => {
      return item.id === action.item.id;
    });
    const exitingItem = state.items[exitingItemIndex];
    let updatedItems;
    if (exitingItem) {
      let updatedItem = {
        ...exitingItem,
        amount: exitingItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[exitingItemIndex] = updatedItem;
    } else updatedItems = state.items.concat(action.item);

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === 'REMOVE') {
    const exitingItemIndex = state.items.findIndex((item) => {
      return item.id === action.id;
    });
    const exitingItem = state.items[exitingItemIndex];
    const updatedTotalAmount = state.totalAmount - exitingItem.price;
    let updatedItems;
    if (exitingItem.amount === 1) {
      updatedItems = state.items.filter((item) => {
        return action.id !== item.id;
      });
    } else {
      let updatedItem = {
        ...exitingItem,
        amount: exitingItem.amount - 1,
      };
      updatedItems = [...state.items];
      updatedItems[exitingItemIndex] = updatedItem;
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCartState;
};
const CartProvider = (props) => {
  const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);

  const addItemToCart = (item) => {
    dispatchCart({ type: 'ADD', item: item });
  };

  const removeItemFromCart = (id) => {
    dispatchCart({ type: 'REMOVE', id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCart,
    removeItem: removeItemFromCart,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};
export default CartProvider;

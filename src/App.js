import React from 'react';
import Header from './Components/Layout/Header';
import Meals from './Components/Meals/Meals';
import CartProvider from './Store/CartProvider';
const App = () => {
  return (
    <CartProvider>
      <Header />
      <Meals />
    </CartProvider>
  );
};

export default App;

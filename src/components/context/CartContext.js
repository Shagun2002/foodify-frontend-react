import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
  hideCartHandler: () => {},
  showCartHandler: () => {},
  cartIsShown: false,
});

export default CartContext;

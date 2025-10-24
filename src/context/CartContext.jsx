import React, { createContext, useReducer, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  items: JSON.parse(localStorage.getItem('cartItems')) || [],
};

function reducer(state, action) {
  let newItems;
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return { ...state, items: newItems };

    case 'REMOVE_ITEM':
      newItems = state.items.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cartItems', JSON.stringify(newItems));
      return { ...state, items: newItems };

    case 'CLEAR_CART':
      localStorage.removeItem('cartItems');
      return { ...state, items: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cartTotal = state.items.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);

  return (
    <CartContext.Provider value={{ state, dispatch, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
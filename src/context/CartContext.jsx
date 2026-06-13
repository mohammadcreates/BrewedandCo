import { createContext, useContext, useReducer } from 'react';


const CartContext = createContext();


function cartReducer(state, action) {
  switch (action.type) {

    case 'ADD_ITEM': {
      const existing = state.find((item) => item.name === action.payload.name);
      if (existing) {
        // Item already in cart — increase quantity
        return state.map((item) =>
          item.name === action.payload.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Item not in cart — add it with quantity 1
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => item.name !== action.payload.name);
    }

    case 'INCREMENT': {
      return state.map((item) =>
        item.name === action.payload.name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    }

    case 'DECREMENT': {
      return state.map((item) =>
        item.name === action.payload.name
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ).filter((item) => item.quantity > 0);
    }

    case 'CLEAR_CART': {
      return [];
    }

    default:
      return state;
  }
}


export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (item) => dispatch({ type: 'REMOVE_ITEM', payload: item });
  const increment = (item) => dispatch({ type: 'INCREMENT', payload: item });
  const decrement = (item) => dispatch({ type: 'DECREMENT', payload: item });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.quantity * parseFloat(item.price.replace('$', '')), 0);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, increment, decrement, clearCart, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}


export function useCart() {
  return useContext(CartContext);
}
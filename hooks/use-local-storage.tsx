'use client';

import { useState } from 'react';

export const useLocalStorage = <T,>(
  key: string,
  initialValue: T,
): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

// use in a component
// function CartComponent() {
//   const {
//     cart,
//     addItemToCart,
//     removeItemFromCart,
//     incrementItemQty,
//     decrementItemQty,
//   } = useCart();

//   return (
//     <div>
//       {cart.map((item) => (
//         <div key={item.id}>
//           {item.title}
//           <button onClick={() => incrementItemQty(item.id)}>+</button>
//           <button onClick={() => decrementItemQty(item.id)}>-</button>
//           <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
//         </div>
//       ))}
//     </div>
//   );
// }

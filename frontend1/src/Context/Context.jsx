import API from "../axios";
import { useState, useEffect, createContext } from "react";
import { toast } from 'react-toastify';

const AppContext = createContext({
  data: [],
  isError: "",
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData:() =>{},
  clearCart: () => {},
  updateCartQuantity: (productId, newQuantity) => {}
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const addToCart = (product) => {
    // Check stock availability before adding
    const existingItem = cart.find((item) => item.id === product.id);
    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity + 1 > product.stockQuantity) {
      toast.info('Cannot add more than available stock');
      return false;
    }

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return true;
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return true;
    }
  };

  const updateCartQuantity = (productId, newQuantity) => {
    const item = cart.find((i) => i.id === productId);
    if (!item) return false;
    const clamped = Math.max(1, Math.min(newQuantity, item.stockQuantity));
    if (clamped < newQuantity) {
      toast.info('Cannot set quantity higher than available stock');
    }

    const updatedCart = cart.map((i) =>
      i.id === productId ? { ...i, quantity: clamped } : i
    );
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    return true;
  };

  const removeFromCart = (productId) => {
    console.log("productID",productId)
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    console.log("CART",cart)
  };

  const refreshData = async () => {
    try {
      const response = await API.get(`/api/products`);
      setData(response.data);
    } catch (error) {
      setIsError(error.message);
    }
  };

  const clearCart =() =>{
    setCart([]);
    localStorage.removeItem('cart');
  }
  
  useEffect(() => {
    refreshData();
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  
  return (
    <AppContext.Provider value={{ data, isError, cart, addToCart, removeFromCart,refreshData, clearCart, updateCartQuantity  }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
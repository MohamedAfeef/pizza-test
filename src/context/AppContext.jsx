import { createContext, useState, useEffect } from 'react';
import initialInventory from '../data/inventory';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [inventory, setInventory] = useState(() => {
    const storedInventory = localStorage.getItem('inventory');
    return storedInventory ? JSON.parse(storedInventory) : initialInventory;
  });

  const [orders, setOrders] = useState(() => {
    const storedOrders = localStorage.getItem('orders');
    return storedOrders ? JSON.parse(storedOrders) : [];
  });

  useEffect(() => {
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  // Sync orders across tabs using 'storage' event
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'orders') {
        const updatedOrders = JSON.parse(event.newValue);
        setOrders(updatedOrders);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const updateInventory = (ingredient, amount) => {
    setInventory((prev) => ({
      ...prev,
      [ingredient]: (prev[ingredient] || 0) + amount,
    }));
  };

  const removeInventoryItem = (ingredient) => {
    setInventory((prev) => {
      const updated = { ...prev };
      delete updated[ingredient];
      return updated;
    });
  };

  const addOrder = (order) => {
    setOrders((prev) => [...prev, order]);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // New: Remove order by ID
  const removeOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  return (
    <AppContext.Provider
      value={{
        inventory,
        updateInventory,
        removeInventoryItem,
        orders,
        addOrder,
        updateOrderStatus,
        removeOrder,  // <-- Expose removeOrder here
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

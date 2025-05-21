import React from 'react';
import InventoryManager from '../components/InventoryManager';
import OrderManager from '../components/OrderManager';

const OwnerDashboard = () => {
  return (
    <div>
      <h1 className="display-4 text-center my-4">Owner Dashboard</h1>
      <InventoryManager />
      <OrderManager />
    </div>
  );
};

export default OwnerDashboard;

import React from 'react';
import OrderItemList from '../components/OrderItemList';
import OrderForm from '../components/OrderForm';
import OrderStatusChecker from '../components/OrderStatusChecker';

const CustomerDashboard = () => {
  return (
    <div>
      <h1>Customer Dashboard</h1>
      <OrderItemList />
      <OrderForm />
      <OrderStatusChecker />
    </div>
  );
};

export default CustomerDashboard;

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const statusOptions = ['Placed', 'Preparing', 'Dispatched', 'Delivered'];

const OrderManager = () => {
  const { orders, updateOrderStatus, removeOrder, addOrder } = useContext(AppContext);

  // State for new order form
  const [newOrderItems, setNewOrderItems] = useState('');
  const [newOrderStatus, setNewOrderStatus] = useState(statusOptions[0]);

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus(orderId, newStatus);
  };

  const handleRemoveOrder = (orderId) => {
    removeOrder(orderId);
  };

  const handleAddOrder = (e) => {
    e.preventDefault();

    if (!newOrderItems.trim()) {
      alert('Please enter at least one item.');
      return;
    }

    // Generate a unique ID for new order (could use UUID or similar in real app)
    const newOrderId = Date.now().toString();

    // Split items by comma and trim spaces
    const itemsArray = newOrderItems.split(',').map(item => item.trim()).filter(Boolean);

    const newOrder = {
      id: newOrderId,
      status: newOrderStatus,
      items: itemsArray,
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);

    // Reset form
    setNewOrderItems('');
    setNewOrderStatus(statusOptions[0]);
  };

  return (
    <div>
      <h2>Manage Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} style={{ marginBottom: '15px' }}>
              <strong>Order ID:</strong> {order.id} <br />
              <strong>Status:</strong>{' '}
              <select
                value={order.status}
                onChange={(e) => handleStatusChange(order.id, e.target.value)}
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <br />
              <strong>Items:</strong>{' '}
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <small>Placed At: {new Date(order.createdAt).toLocaleString()}</small>
              <br />
              <button
                onClick={() => handleRemoveOrder(order.id)}
                style={{ marginTop: '8px', color: 'red' }}
              >
                Remove Order
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Add new order form */}
      <h3>Add New Order</h3>
      <form onSubmit={handleAddOrder} style={{ marginTop: '20px' }}>
        <div>
          <label>
            Items (comma separated):{' '}
            <input
              type="text"
              value={newOrderItems}
              onChange={(e) => setNewOrderItems(e.target.value)}
              placeholder="e.g. Burger, Fries, Coke"
              style={{ width: '300px' }}
            />
          </label>
        </div>

        <div style={{ marginTop: '10px' }}>
          <label>
            Status:{' '}
            <select
              value={newOrderStatus}
              onChange={(e) => setNewOrderStatus(e.target.value)}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" style={{ marginTop: '10px' }}>
          Add Order
        </button>
      </form>
    </div>
  );
};

export default OrderManager;

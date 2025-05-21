import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const statusOptions = ['Placed', 'Preparing', 'Dispatched', 'Delivered'];

const OrderManager = () => {
  const { orders, updateOrderStatus, removeOrder, addOrder } = useContext(AppContext);

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

    const newOrderId = Date.now().toString();
    const itemsArray = newOrderItems.split(',').map(item => item.trim()).filter(Boolean);

    const newOrder = {
      id: newOrderId,
      status: newOrderStatus,
      items: itemsArray,
      createdAt: new Date().toISOString(),
    };

    addOrder(newOrder);
    setNewOrderItems('');
    setNewOrderStatus(statusOptions[0]);
  };

  return (
    <div className="container my-4">
      <h2 className="text-center mb-4">Manage Orders</h2>

      {orders.length === 0 ? (
        <p className="text-center">No orders found.</p>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order.id} className="col-12 col-md-6 mb-4">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title">Order ID: {order.id}</h5>
                  <div className="mb-2">
                    <label className="form-label fw-semibold">Status:</label>
                    <select
                      className="form-select"
                      value={order.status}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-2">
                    <label className="fw-semibold">Items:</label>
                    <ul className="list-group list-group-flush">
                      {order.items.map((item, index) => (
                        <li key={index} className="list-group-item">{item}</li>
                      ))}
                    </ul>
                  </div>

                  <p className="text-muted mt-2 mb-3">
                    <small>Placed At: {new Date(order.createdAt).toLocaleString()}</small>
                  </p>

                  <button
                    className="btn btn-outline-danger w-100"
                    onClick={() => handleRemoveOrder(order.id)}
                  >
                    Remove Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Order Form */}
      <h3 className="mt-5">Add New Order</h3>
      <form onSubmit={handleAddOrder} className="mt-3">
        <div className="mb-3">
          <label className="form-label">Items (comma separated):</label>
          <input
            type="text"
            className="form-control"
            placeholder="e.g. Burger, Fries, Coke"
            value={newOrderItems}
            onChange={(e) => setNewOrderItems(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status:</label>
          <select
            className="form-select"
            value={newOrderStatus}
            onChange={(e) => setNewOrderStatus(e.target.value)}
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary w-100">Add Order</button>
      </form>
    </div>
  );
};

export default OrderManager;

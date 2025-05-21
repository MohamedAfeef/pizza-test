import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const OrderStatusChecker = () => {
  const [referenceId, setReferenceId] = useState('');
  const [checked, setChecked] = useState(false);
  const { orders } = useContext(AppContext);

  const order = orders.find((order) => order.id === referenceId.trim());
  const statusResult = checked ? (order ? order.status : 'Not found') : null;

  const checkStatus = () => {
    setChecked(true); // trigger rendering
  };

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Check Order Status</h3>
      <input
        type="text"
        placeholder="Enter Reference ID"
        value={referenceId}
        onChange={(e) => {
          setReferenceId(e.target.value);
          setChecked(false); // reset check status when input changes
        }}
      />
      <button onClick={checkStatus}>Check Status</button>

      {statusResult && (
        <p>
          Status: <strong>{statusResult}</strong>
        </p>
      )}
    </div>
  );
};

export default OrderStatusChecker;

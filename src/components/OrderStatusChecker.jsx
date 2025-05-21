import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';

const OrderStatusChecker = () => {
  const [referenceId, setReferenceId] = useState('');
  const [checked, setChecked] = useState(false);
  const { orders } = useContext(AppContext);

  const order = orders.find((order) => order.id === referenceId.trim());
  const statusResult = checked ? (order ? order.status : 'Not found') : null;

  const checkStatus = () => {
    setChecked(true);
  };

  return (
    <div className="container my-4">
      <h3 className="mb-3 text-center">Check Order Status</h3>
      
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Reference ID"
              value={referenceId}
              onChange={(e) => {
                setReferenceId(e.target.value);
                setChecked(false);
              }}
            />
            <button className="btn btn-primary" onClick={checkStatus}>
              Check Status
            </button>
          </div>

          {statusResult && (
            <div className={`alert ${order ? 'alert-success' : 'alert-danger'}`} role="alert">
              Status: <strong>{statusResult}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderStatusChecker;

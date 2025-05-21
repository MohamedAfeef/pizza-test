import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const InventoryManager = () => {
  const { inventory, updateInventory, removeInventoryItem } = useContext(AppContext);
  const [changes, setChanges] = useState({});
  const [newIngredient, setNewIngredient] = useState('');
  const [newQty, setNewQty] = useState('');

  const handleChange = (ingredient, value) => {
    setChanges({ ...changes, [ingredient]: parseInt(value, 10) || 0 });
  };

  const handleUpdate = (ingredient) => {
    updateInventory(ingredient, changes[ingredient]);
    setChanges({ ...changes, [ingredient]: 0 });
  };

  const handleAddItem = () => {
    const name = newIngredient.trim();
    const qty = parseInt(newQty, 10);
    if (!name || isNaN(qty)) return;

    updateInventory(name, qty);

    setNewIngredient('');
    setNewQty('');
  };

  const handleRemoveItem = (ingredient) => {
    removeInventoryItem(ingredient);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Inventory Management</h2>

      {/* Add new item */}
      <div className="row g-2 align-items-center mb-4">
        <div className="col-12 col-md-5">
          <input
            type="text"
            className="form-control"
            placeholder="Ingredient Name"
            value={newIngredient}
            onChange={(e) => setNewIngredient(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-3">
          <input
            type="number"
            className="form-control"
            placeholder="Quantity"
            value={newQty}
            onChange={(e) => setNewQty(e.target.value)}
          />
        </div>
        <div className="col-6 col-md-4 d-grid">
          <button className="btn btn-primary" onClick={handleAddItem}>
            Add Item
          </button>
        </div>
      </div>

      {/* Inventory List */}
      {Object.keys(inventory).length === 0 ? (
        <p className="text-center">No inventory items found.</p>
      ) : (
        <ul className="list-group">
          {Object.entries(inventory).map(([ingredient, qty]) => (
            <li
              key={ingredient}
              className="list-group-item d-flex flex-column flex-md-row align-items-md-center justify-content-between"
            >
              <div className="mb-2 mb-md-0">
                <strong>{ingredient}:</strong> {qty}
              </div>

              <div className="d-flex flex-wrap align-items-center gap-2">
                <input
                  type="number"
                  className="form-control"
                  value={changes[ingredient] || ''}
                  onChange={(e) => handleChange(ingredient, e.target.value)}
                  placeholder="Add/Subtract"
                  style={{ minWidth: '100px' }}
                />
                <button
                  className="btn btn-outline-success"
                  onClick={() => handleUpdate(ingredient)}
                >
                  Update
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleRemoveItem(ingredient)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InventoryManager;

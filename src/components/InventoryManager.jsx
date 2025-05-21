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

    // Avoid overwriting existing ingredient
    if (inventory.hasOwnProperty(name)) {
      updateInventory(name, qty);
    } else {
      // Add new ingredient directly by updating inventory state
      updateInventory(name, qty);
    }

    setNewIngredient('');
    setNewQty('');
  };

  const handleRemoveItem = (ingredient) => {
    removeInventoryItem(ingredient);
  };

  return (
    <div>
      <h2>Inventory Management</h2>

      {/* Add new item */}
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Ingredient Name"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newQty}
          onChange={(e) => setNewQty(e.target.value)}
          style={{ margin: '0 8px' }}
        />
        <button onClick={handleAddItem}>Add Item</button>
      </div>

      {/* Inventory List */}
      <ul>
        {Object.entries(inventory).map(([ingredient, qty]) => (
          <li key={ingredient}>
            <strong>{ingredient}:</strong> {qty}
            <input
              type="number"
              value={changes[ingredient] || ''}
              onChange={(e) => handleChange(ingredient, e.target.value)}
              placeholder="Add/Subtract"
              style={{ margin: '0 8px' }}
            />
            <button onClick={() => handleUpdate(ingredient)}>Update</button>
            <button
              onClick={() => handleRemoveItem(ingredient)}
              style={{ marginLeft: '8px', color: 'red' }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InventoryManager;

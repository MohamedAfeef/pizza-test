import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { v4 as uuidv4 } from 'uuid';
import pizzaItems from '../data/pizzaItems';

const OrderForm = () => {
  const { inventory, updateInventory, addOrder } = useContext(AppContext);
  const [selectedPizzas, setSelectedPizzas] = useState([]);
  const [orderId, setOrderId] = useState('');

  const handleSelect = (pizzaId) => {
    setSelectedPizzas([...selectedPizzas, pizzaId]);
  };

  const canMakePizza = (pizza) => {
    // Ensure each ingredient count is > 0
    return pizza.ingredients.every((ing) => inventory[ing] > 0);
  };

  const handlePlaceOrder = () => {
    if (selectedPizzas.length === 0) {
      alert('Please select at least one pizza to order.');
      return;
    }

    let canPlace = true;
    const usedIngredients = {};

    // Check inventory and accumulate used ingredients
    for (const pizzaId of selectedPizzas) {
      const pizza = pizzaItems.find((p) => p.id === pizzaId);
      if (!pizza || !canMakePizza(pizza)) {
        canPlace = false;
        break;
      }
      pizza.ingredients.forEach((ing) => {
        usedIngredients[ing] = (usedIngredients[ing] || 0) + 1;
      });
    }

    if (!canPlace) {
      alert('One or more selected items are out of stock.');
      return;
    }

    // Deduct ingredients from inventory
    Object.entries(usedIngredients).forEach(([ing, qty]) => {
      updateInventory(ing, -qty);
    });

    // Create new order id
    const id = uuidv4().slice(0, 8);
    setOrderId(id);

    // Add the order to global state
    addOrder({
      id,
      items: selectedPizzas,
      status: 'Placed',
      createdAt: new Date().toISOString(),
    });

    alert(`✅ Order placed! Your reference ID is: ${id}`);

    // Clear selections
    setSelectedPizzas([]);
  };

  return (
    <div>
      <h2>Place an Order</h2>
      <ul>
        {pizzaItems.map((pizza) => (
          <li key={pizza.id}>
            <strong>{pizza.name}</strong> — {canMakePizza(pizza) ? '🟢 Available' : '🔴 Out of stock'}
            <button
              onClick={() => handleSelect(pizza.id)}
              disabled={!canMakePizza(pizza)}
              style={{ marginLeft: '10px' }}
            >
              Add to Order
            </button>
          </li>
        ))}
      </ul>

      {selectedPizzas.length > 0 && (
        <>
          <h4>Selected Pizzas:</h4>
          <ul>
            {selectedPizzas.map((id, index) => {
              const pizza = pizzaItems.find((p) => p.id === id);
              return <li key={index}>{pizza?.name}</li>;
            })}
          </ul>
          <button onClick={handlePlaceOrder}>✅ Place Order</button>
        </>
      )}

      {orderId && <p>Your order ID is: <strong>{orderId}</strong></p>}
    </div>
  );
};

export default OrderForm;

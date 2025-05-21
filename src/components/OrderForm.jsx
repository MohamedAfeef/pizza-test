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
    return pizza.ingredients.every((ing) => inventory[ing] > 0);
  };

  const handlePlaceOrder = () => {
    if (selectedPizzas.length === 0) {
      alert('Please select at least one pizza to order.');
      return;
    }

    let canPlace = true;
    const usedIngredients = {};

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

    Object.entries(usedIngredients).forEach(([ing, qty]) => {
      updateInventory(ing, -qty);
    });

    const id = uuidv4().slice(0, 8);
    setOrderId(id);

    addOrder({
      id,
      items: selectedPizzas,
      status: 'Placed',
      createdAt: new Date().toISOString(),
    });

    alert(`✅ Order placed! Your reference ID is: ${id}`);
    setSelectedPizzas([]);
  };

  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Place an Order</h2>
      
      <div className="row">
        {pizzaItems.map((pizza) => (
          <div key={pizza.id} className="col-12 col-md-6 col-lg-4 mb-3">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">
                  {canMakePizza(pizza)
                    ? '🟢 Available'
                    : '🔴 Out of stock'}
                </p>
                <button
                  onClick={() => handleSelect(pizza.id)}
                  disabled={!canMakePizza(pizza)}
                  className="btn btn-outline-primary w-100"
                >
                  Add to Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedPizzas.length > 0 && (
        <div className="mt-4">
          <h4>Selected Pizzas:</h4>
          <ul className="list-group mb-3">
            {selectedPizzas.map((id, index) => {
              const pizza = pizzaItems.find((p) => p.id === id);
              return (
                <li key={index} className="list-group-item">
                  {pizza?.name}
                </li>
              );
            })}
          </ul>
          <button
            onClick={handlePlaceOrder}
            className="btn btn-success w-100"
          >
            ✅ Place Order
          </button>
        </div>
      )}

      {orderId && (
        <div className="alert alert-info mt-3 text-center">
          Your order ID is: <strong>{orderId}</strong>
        </div>
      )}
    </div>
  );
};

export default OrderForm;

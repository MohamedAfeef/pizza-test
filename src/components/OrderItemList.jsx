import React from 'react';
import pizzaItems from '../data/pizzaItems';

const OrderItemList = () => {
  return (
    <div>
      <h2>Available Pizzas</h2>
      <ul>
        {pizzaItems.map((pizza) => (
          <li key={pizza.id}>
            <strong>{pizza.name}</strong>
            <p>Ingredients: {pizza.ingredients.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderItemList;

import React from 'react';
import pizzaItems from '../data/pizzaItems';

const OrderItemList = () => {
  return (
    <div className="container my-4">
      <h2 className="mb-4 text-center">Available Pizzas</h2>
      <div className="row">
        {pizzaItems.map((pizza) => (
          <div key={pizza.id} className="col-12 col-sm-6 col-lg-4 mb-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">{pizza.name}</h5>
                <p className="card-text">
                  <strong>Ingredients:</strong><br />
                  {pizza.ingredients.join(', ')}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemList;

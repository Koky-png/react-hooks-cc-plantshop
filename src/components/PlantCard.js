import React, { useState } from "react";

function PlantCard({ deletePlant, id, image, name, price, updatePlant }) {
  const [inStock, setInStock] = useState(true)
  const [priceInput, setPriceInput] = useState(price)

  const handleClick = () => setInStock(false)
  const handleDelete = () => deletePlant(id)

  const handleSubmit = (event) => {
    event.preventDefault()

    updatePlant(id, { price: parseFloat(priceInput) })
  }

  return (
    <li className="card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>
        Price:
        <form onSubmit={handleSubmit}>
          <input
              name="price"
              onChange={(event) => setPriceInput(event.target.value)}
              type="text"
              value={priceInput}
          />
          <button type="submit">Update Price</button>
        </form>
      </p>
      <div className={"row"}>
        {inStock ? (
          <button
              className="primary"
              onClick={handleClick}
          >
            In Stock
          </button>
        ) : (
          <button>Out of Stock</button>
        )}
        <button onClick={handleDelete}>x</button>
      </div>
    </li>
  );
}

export default PlantCard;
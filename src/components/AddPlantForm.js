// AddPlantForm.js
import React, { useState } from 'react';

function AddPlantForm({ onAddPlant }) {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3001/plants', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, image, price: parseFloat(price) }),
    })
      .then((res) => res.json())
      .then((newPlant) => onAddPlant(newPlant));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Image URL" onChange={(e) => setImage(e.target.value)} />
      <input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} />
      <button type="submit">Add Plant</button>
    </form>
  );
}

export default AddPlantForm;

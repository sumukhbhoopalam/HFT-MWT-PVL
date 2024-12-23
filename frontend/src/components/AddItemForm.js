import React, { useState } from 'react';

function AddItemForm({ refreshItems }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newItem = { name, amount: parseInt(amount) };

    try {
      const response = await fetch('https://bookish-memory-j744j77xqp42qxx5-8000.app.github.dev/api/shoppingitems', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        alert('Item added successfully!');
        setName('');
        setAmount('');
        refreshItems(); // Refresh the shopping list
      } else {
        alert('Failed to add item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddItemForm;
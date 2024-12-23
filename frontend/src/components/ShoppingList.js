import React, { useEffect, useState } from 'react';
import ShoppingItem from './ShoppingItem';

function ShoppingList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('https://bookish-memory-j744j77xqp42qxx5-8000.app.github.dev/api/shoppingitems');
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const deleteItem = async (name) => {
    try {
      const response = await fetch(`/api/shoppingItems/${name}`, { method: 'DELETE' });

      if (response.ok) {
        setItems(items.filter((item) => item.name !== name));
      } else {
        alert('Failed to delete item');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Your Shopping List</h2>
      <ul>
        {items.map((item) => (
          <ShoppingItem key={item.id} item={item} deleteItem={deleteItem} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;

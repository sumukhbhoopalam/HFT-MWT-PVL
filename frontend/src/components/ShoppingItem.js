import React from 'react';

function ShoppingItem({ item, deleteItem }) {
  return (
    <li>
      <span>
        {item.name} - {item.amount}
      </span>
      <button onClick={() => deleteItem(item.name)}>Delete</button>
    </li>
  );
}

export default ShoppingItem;
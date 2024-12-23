import React from 'react';
import AddItemForm from './components/AddItemForm';
import ShoppingList from './components/ShoppingList';

function App() {
  return (
    <div>
      <h1>Shopping List Manager</h1>
      <AddItemForm />
      <ShoppingList />
    </div>
  );
}

export default App;
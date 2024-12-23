import React, { useState, useEffect } from "react";
import { Container, Typography } from "@mui/material";
import AddItemForm from "./components/AddItemForm";
import ShoppingList from "./components/ShoppingList";
import EditItemModal from "./components/EditItemModal";

const App = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", amount: "" });
  const [editItem, setEditItem] = useState(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL;

  // Fetch shopping items from the backend
  const fetchItems = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Add a new item
  const addItem = async () => {
    if (!newItem.name || !newItem.amount) return;

    try {
      const response = await fetch(`${API_BASE_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        fetchItems();
        setNewItem({ name: "", amount: "" });
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update an existing item
  const updateItem = async () => {
    if (!editItem) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/${editItem.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editItem),
        }
      );

      if (response.ok) {
        fetchItems();
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item
  const deleteItem = async (itemName) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${itemName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchItems();
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Shopping List
      </Typography>
      <AddItemForm newItem={newItem} setNewItem={setNewItem} onAdd={addItem} />
      <ShoppingList
        items={items}
        onEdit={(item) => {
          setEditItem(item);
          setEditModalOpen(true);
        }}
        onDelete={deleteItem}
      />
      <EditItemModal
        editItem={editItem}
        setEditItem={setEditItem}
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onSave={updateItem}
      />
    </Container>
  );
};

export default App;
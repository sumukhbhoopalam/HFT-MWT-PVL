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
  const [config, setConfig] = useState(null);

  // Fetch shopping items from the backend
  const fetchItems = async (apiUrl) => {
    try {
      const response = await fetch(`${apiUrl}`);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  useEffect(() => {
    // Load config.json
    fetch("/config.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load config.json");
        }
        return response.json();
      })
      .then((data) => {
        setConfig(data);
        fetchItems(data.REACT_APP_BACKEND_URL);
      })
      .catch((error) => console.error("Error loading config:", error));
  }, []);

  // Add a new item
  const addItem = async () => {
    if (!newItem.name || !newItem.amount || !config) return;

    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        fetchItems(config.REACT_APP_BACKEND_URL);
        setNewItem({ name: "", amount: "" });
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // Update an existing item
  const updateItem = async () => {
    if (!editItem || !config) return;

    try {
      const response = await fetch(
        `${config.REACT_APP_BACKEND_URL}/${editItem.name}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editItem),
        }
      );

      if (response.ok) {
        fetchItems(config.REACT_APP_BACKEND_URL);
        setEditModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // Delete an item
  const deleteItem = async (itemName) => {
    if (!config) return;

    try {
      const response = await fetch(`${config.REACT_APP_BACKEND_URL}/${itemName}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchItems(config.REACT_APP_BACKEND_URL);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (!config) {
    // Render a loading indicator or placeholder until config is loaded
    return (
      <Container>
        <Typography variant="h6" gutterBottom>
          Loading configuration...
        </Typography>
      </Container>
    );
  }

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
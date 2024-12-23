import React from "react";
import { Box, TextField, Button } from "@mui/material";

const AddItemForm = ({ newItem, setNewItem, onAdd }) => (
  <Box display="flex" gap={2} mb={4}>
    <TextField
      label="Item Name"
      value={newItem.name}
      onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      fullWidth
    />
    <TextField
      label="Amount"
      type="number"
      value={newItem.amount}
      onChange={(e) => setNewItem({ ...newItem, amount: e.target.value })}
      fullWidth
    />
    <Button variant="contained" color="primary" onClick={onAdd}>
      Add Item
    </Button>
  </Box>
);

export default AddItemForm;
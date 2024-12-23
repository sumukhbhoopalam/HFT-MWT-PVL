import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

const EditItemModal = ({ editItem, setEditItem, isOpen, onClose, onSave }) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>Edit Item</DialogTitle>
    <DialogContent>
      <TextField
        label="Item Name"
        value={editItem?.name || ""}
        onChange={(e) => setEditItem({ ...editItem, name: e.target.value })}
        fullWidth
        margin="normal"
        disabled
      />
      <TextField
        label="Amount"
        type="number"
        value={editItem?.amount || ""}
        onChange={(e) => setEditItem({ ...editItem, amount: e.target.value })}
        fullWidth
        margin="normal"
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave} variant="contained" color="primary">
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export default EditItemModal;
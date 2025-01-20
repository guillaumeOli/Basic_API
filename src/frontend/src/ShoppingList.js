import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

import './App.css';

export function ShoppingList() {

  const [items, setItems] = useState([]);
  const [item, setItem] = useState({ type: '', quantity: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [availableProducts, setAvailableProducts] = useState([
  ]);


  const fetchItems = async (id) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/shopping_list/${id}/item`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchAvailableProducts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/product`);
      setAvailableProducts(response.data);
    } catch (error) {
      console.error('Error fetching available products:', error);
    }
  };

  const addItem = async (body, id) => {
    try {
      const {quantity, type} = body;
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/shopping_list/${id}/item`, {quantity: Number(quantity), type: type, shoppingListId: id});
      setItems([...items, response.data]);
      fetchItems(1);
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  const updateItem = async (body, index, id) => {
    try {
      const {quantity, type} = body;
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/shopping_list/${id}/item`, {quantity: Number(quantity), type: type, shoppingListId: id});
      const updatedItems = [...items];
      updatedItems[index] = response.data;
      fetchItems(1);
      setItems(updatedItems);
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const deleteItem = async (index, id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/shopping_list/${id}/item/${items[index].type}`);
      setItems(items.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  useEffect(() => {
    fetchItems(1);
    fetchAvailableProducts();
  }, []);

  const handleAddItem = () => {
    if (!item.type.trim() || !item.quantity.trim()) return;

    if (isNaN(item.quantity) || Number(item.quantity) <= 0) {
      alert('Please enter a valid number for quantity.');
      return;
    }

    const existingItemIndex = items.findIndex((existingItem) => existingItem.type.toLowerCase() === item.type.toLowerCase());
    if (existingItemIndex !== -1) {
      alert('This item is already in the list.');
      return;
    }

    addItem(item, 1);
    setItem({ type: '', quantity: '' });
  };

  const handleUpdateItem = () => {
    if (!item.type.trim() || !item.quantity.trim()) return;

    if (isNaN(item.quantity) || Number(item.quantity) <= 0) {
      alert('Please enter a valid number for quantity.');
      return;
    }
    const existingItemIndex = items.findIndex((existingItem) => existingItem.type.toLowerCase() === item.type.toLowerCase());
    if (existingItemIndex >= 0) {
      updateItem(item, editingIndex, 1);
      setItem({ type: '', quantity: '' });
      setEditingIndex(null);
    }

  };

  const handleDeleteItem = (index) => {
    deleteItem(index, 1)
    setItems(items.filter((_, i) => i !== index));
  };

  return (
    <div className="app-container">
      <h1>Shopping List</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter an item"
          value={item.type}
          onChange={(e) => setItem({ ...item, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter a quantity"
          value={item.quantity}
          onChange={(e) => setItem({ ...item, quantity: e.target.value })}
        />
        <button onClick={handleAddItem}>{'Add'}</button>
        <button onClick={handleUpdateItem}>{'Edit'}</button>

      </div>
      <ul className="item-list">
        {items.map((item, index) => (
          <li key={index} className="item">
            <span>{item.type} - {item.quantity}</span>
            <div className="actions">
              <button onClick={() => handleDeleteItem(index)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Available Products</h2>
      <ul className="available-products">
        {availableProducts.length ? availableProducts.map((product, index) => (
          <li key={index} className="product-item">
            <strong>Type:</strong> {product.name} <br />
            <strong>Description:</strong> {product.description} <br />
            <strong>Price:</strong> ${product.price}
          </li>
        )) : null}
      </ul>
    </div>
  );
}
import { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';

const API_URL = 'http://localhost:5000/items';

function App() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const addItem = async (name) => {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    loadItems();
  };

  const deleteItem = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    loadItems();
  };

  return (
    <div>
      <h1>Gestion des Items</h1>
      <ItemForm onAdd={addItem} />
      <ItemList items={items} onDelete={deleteItem} />
    </div>
  );
}

export default App;
import { useState, useEffect } from 'react';
import ItemForm from './components/ItemForm';
import ItemList from './components/ItemList';
import Chat from './components/Chat';
import Login from './components/Login';

const API_URL = 'http://localhost:5000/items';

function App() {
  const [items, setItems] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const loadItems = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setItems(data.items);
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
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    loadItems();
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Gestion des Items</h1>

      {isLoggedIn ? (
        <button onClick={handleLogout}>Se déconnecter</button>
      ) : (
        <Login onLogin={() => setIsLoggedIn(true)} />
      )}

      <ItemForm onAdd={addItem} />
      <ItemList items={items} onDelete={deleteItem} />
      <Chat />
    </div>
  );
}

export default App;
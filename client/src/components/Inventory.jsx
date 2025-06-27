import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    api.get('/game/me').then((res) => setInventory(res.data.inventory));
  }, []);

  const handleSell = async (itemId) => {
    const res = await api.post('/game/sell', { itemId });
    alert(res.data.msg);
    window.location.reload();
  };

  return (
    <div>
      <h2>Inventory</h2>
      {inventory.length === 0 && <p>No items.</p>}
      {inventory.map((inv) => (
        <div key={inv.itemId._id}>
          <p>
            <strong>{inv.itemId.name}</strong> x{inv.quantity}
            <button onClick={() => handleSell(inv.itemId._id)}>Sell</button>
          </p>
        </div>
      ))}
    </div>
  );
}

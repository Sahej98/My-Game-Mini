import React, { useEffect, useState } from 'react';
import api from '../api';

export default function Market() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get('/game/items').then((res) => setItems(res.data));
  }, []);

  const handleBuy = async (itemId) => {
    const res = await api.post('/game/buy', { itemId });
    alert(res.data.msg);
  };

  return (
    <div>
      <h2>Market</h2>
      {items.map((item) => (
        <div key={item._id}>
          <p>
            <strong>{item.name}</strong> - Buy: ₹{item.buyPrice} | Sell: ₹
            {item.sellPrice} | Unlock Level: {item.unlockLevel}
            <button onClick={() => handleBuy(item._id)}>Buy</button>
          </p>
        </div>
      ))}
    </div>
  );
}

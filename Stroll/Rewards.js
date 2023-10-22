import * as React from 'react';
import { View, Text} from 'react-native';
import './Rewards.css'

var coupons = [
    { store: "Walmart", code: "HELLO", amount: "10%", exp: "1/1/2024" },
    { store: "McDonalds", code: "FREE", amount: "15%", exp: "1/2/2024" },
    { store: "Target", code: "STROLL", amount: "25%", exp: "1/3/2025" },
]

function pressed(){
  alert('Scan this code');
}

const Rewards = () => {
    
    return (
        <div>
      {coupons.map(((item) => (
        <div key={item.id} className="post">
          <h3>{item.store} - {item.amount} Off</h3>
          <p>Code: {item.code}<button onClick={pressed}>REDEEM</button></p>
          <p>Expires: {item.exp}</p>
        </div>
      )))}
    </div>
    )
}

export default Rewards;
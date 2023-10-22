import * as React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';
// import './Rewards.css'

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
        coupons.map((item) => (
        <View style = { styles.view }>
          <Text>{item.store} - {item.amount} Off</Text>
          <Text>Code: {item.code}<Button 
            onClick={pressed}
            title = "REDEEM"
            /></Text>
          <Text>Expires: {item.exp}</Text>
        </View>
      ))
    
    )
}

export default Rewards;

const styles = StyleSheet.create({
    view: {
        color: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(0, 122, 33)',
        margin: 2,
        padding: 1,
        fontFamily: "Arial"
    },
    map: {
      width: '100%',
      height: '100%',
    },
  });
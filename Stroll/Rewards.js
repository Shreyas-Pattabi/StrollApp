import * as React from 'react';
import { View, Text} from 'react-native';
import { useTable, useGlobalFilter, useAsyncDebounce } from 'react-table' 
import './Rewards.css'

const coupons = [
    { store: "Walmart", code: "HELLO", amount: "10%", exp: "1/1/2024" },
    { store: "McDonalds", code: "TEEMO", amount: "15%", exp: "1/2/2024" },
    { store: "Target", code: "STROLL", amount: "25%", exp: "1/3/2025" },
]

const Rewards = () => {
    
    return (
        <View>
            <table>
                <tr>
                    <th>Store</th>
                    <th>Code</th>
                    <th>Amount</th>
                    <th>Expiration Date</th>
                </tr>
                {coupons.map((val, key) => {
                    return (
                        <tr key={key}>
                            <td>{val.store}</td>
                            <td>{val.code}</td>
                            <td>{val.amount}</td>
                            <td>{val.exp}</td>
                        </tr>
                    )
                })}
            </table>
        </View>
    )
}

export default Rewards;
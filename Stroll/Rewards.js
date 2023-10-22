import * as React from 'react';
import { View, Text, StyleSheet, Button} from 'react-native';

var coupons = [
    { store: "Walmart", code: "HELLO", amount: "10%", exp: "1/1/2024" },
    { store: "McDonalds", code: "FREE", amount: "15%", exp: "1/2/2024" },
    { store: "Target", code: "STROLL", amount: "25%", exp: "1/3/2025" },
];

const Rewards = () => {
    
    return (
        coupons.map((item, index) => (
            <View key={index} style={styles.view}>
                <Text style={styles.store}>{item.store} - {item.amount} Off</Text>
                <Text style={styles.code}>Code: {item.code}</Text>
                <Button
                    title="REDEEM"
                    onPress={pressed}
                    color="rgb(0, 122, 33)"
                />
                <Text style={styles.exp}>Expires: {item.exp}</Text>
            </View>
        ))
    );
}

function pressed() {
    alert('Scan this code');
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: 'rgb(230, 230, 230)',
        margin: 8,
        padding: 10,
        borderRadius: 8,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
    },
    store: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'rgb(56, 48, 76)',
    },
    code: {
        fontSize: 16,
        marginBottom: 8,
        color: 'rgb(56, 48, 76)',
    },
    exp: {
        fontSize: 16,
        color: 'rgb(56, 48, 76)',
    },
});

export default Rewards;

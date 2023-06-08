import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, {useState} from 'react';

export default function Button({ title, onPress, disabled, color, textColor }) {
    
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, { backgroundColor: color }]} disabled={disabled}>
            <Text style={[{ color: textColor }]}>{ title }</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 15,
        paddingHorizontal: 25,
        borderRadius: 5,
        marginTop: 20
    }
});
  
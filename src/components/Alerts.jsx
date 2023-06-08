import { useContext, useEffect } from 'react';
import {View, StyleSheet, Button, Alert} from 'react-native';
import { UserContext } from '../contexts/UserContexts';

export default function Alerts() {
    const { successMessage, errorMessage, setSuccessMessage, setErrorMessage } = useContext(UserContext);
    
    useEffect(() => {
        if (successMessage) {
            Alert.alert('Succès', successMessage, [
                {
                    text: 'Ok',
                    onPress: () => setSuccessMessage("")
                }
            ])
        }
    }, [successMessage]);

    useEffect(() => {
        if (errorMessage) {
            Alert.alert('Erreur', errorMessage, [
                {
                    text: 'Ok',
                    onPress: () => setErrorMessage("")
                }
            ])
        }
    }, [errorMessage]);

    return;
}
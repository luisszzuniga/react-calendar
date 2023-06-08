import { StyleSheet, Text } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Agenda from "../components/Agenda";
import { UserContext } from '../contexts/UserContexts';

export default function HomeScreen({ navigation }) {
    const { userData } = useContext(UserContext);

    return (
        <>
            <Text>Bonjour { userData.user.username }!</Text>

            <Agenda teamId="1"/>
        </>
    );
}

const styles = StyleSheet.create({
});
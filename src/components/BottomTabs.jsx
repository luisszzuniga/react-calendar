import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import { StyleSheet, Text } from "react-native";
import SettingsScreen from '../screens/SettingsScreen';
import TeamsScreen from '../screens/TeamsScreen';
import { useContext, useEffect } from 'react';
import { UserContext } from '../contexts/UserContexts';

export default function BottomTabs({ navigation }) {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator>
            <Tab.Screen name="Teams" component={TeamsScreen} />
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({

});
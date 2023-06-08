import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "./BottomTabs";
import RegisterScreen from "../screens/RegisterScreen";
import LoaderScreen from "../screens/LoaderScreen";

export default function Router() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>

        <Stack.Screen name="Loader" component={LoaderScreen} options={{ headerShown: false }} />
        <Stack.Screen name="App" component={BottomTabs} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

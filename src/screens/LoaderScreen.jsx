import { useContext, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { UserContext } from "../contexts/UserContexts";

export default function LoaderScreen({ navigation }) {
  const { userData, load } = useContext(UserContext);

  useEffect(() => {
    if (load) return;

    if (userData?.token && userData.user) {
      navigation.reset({ index: 0, routes: [{ name: "App" }] });
    } else {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    }
  }, [userData, load]);

  return <Text>Loading...</Text>;
}

import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useState, useContext } from "react";
import Button from "../components/Button";
import { UserContext } from "../contexts/UserContexts";
import APIService from "../services/APIService";

export default function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { userData, setUserData, setErrorMessage } = useContext(UserContext);

  const login = () => {
    const body = {
      username,
      password,
    };

    APIService.post("/api/auth/login", body)
      .then(async (response) => {
        setUserData({
          token: response.data.token,
          user: response.data.user,
        });

        navigation.reset({ index: 0, routes: [{ name: "App" }] });
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error);
      });
  };

  const register = () => {
    navigation.navigate("Register", { name: "Register" });
  };

  // Pour démarrer l'apli:
  // Démarrer le back: node app.js
  // Démarrer ngrok pour la redirection
  // Démarrer Compass MangoDB
  // Démarrer front avec npm start

  return (
    <>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={username}
        onChangeText={(e) => setUsername(e)}
        inputMode="email"
      ></TextInput>
      <TextInput
        secureTextEntry
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
      ></TextInput>

      <Button title="Connexion" onPress={login} color={"green"} textColor={"white"}/>

      <Button title="Inscription" onPress={register} color={"blue"} textColor={"white"}/>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
  },
  errorMessage: {
    color: "#bd0009",
  },
});

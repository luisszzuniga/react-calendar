import { StyleSheet, Text } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import React, { useEffect, useState, useContext } from "react";
import Button from "../components/Button";
import { UserContext } from "../contexts/UserContexts";
import APIService from "../services/APIService";

export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { userData, setUserData } = useContext(UserContext);

  const register = () => {
    const body = {
      username,
      email,
      password,
      confirm_password: passwordConfirm
    };

    APIService
      .post("/api/auth/register", body)
      .then((response) => {
        setUserData({
          token: response.data.token,
          user: response.data.user
        });

        navigation.reset({ index: 0, routes: [{ name: "Loader" }] });
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  // Pour démarrer l'apli:
  // Démarrer le back: node app.js
  // Démarrer ngrok pour la redirection
  // Démarrer Compass MangoDB
  // Démarrer front avec npm start

  return (
    <>
      <TextInput
        placeholder="Pseudo"
        style={styles.input}
        value={username}
        onChangeText={(e) => setUsername(e)}
        inputMode="text"
      ></TextInput>
      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={(e) => setEmail(e)}
        inputMode="email"
      ></TextInput>
      <TextInput
        secureTextEntry
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={(e) => setPassword(e)}
      ></TextInput>
      <TextInput
        secureTextEntry
        placeholder="Password confirm"
        style={styles.input}
        value={passwordConfirm}
        onChangeText={(e) => setPasswordConfirm(e)}
      ></TextInput>

      {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

      <Button title="M'inscrire" onPress={register} color={"green"} textColor={"white"}/>
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
});

import { StyleSheet, Text } from "react-native";
import { UserContext } from "../contexts/UserContexts";
import Button from "../components/Button";
import { TextInput } from "react-native-gesture-handler";
import React, { useContext, useState } from "react";
import APIService from "../services/APIService";
import { ScrollView } from "react-native";

export default function SettingsScreen({ navigation }) {
  const { userData, setUserData, setSuccessMessage, setErrorMessage } = useContext(UserContext);

  const [username, setUsername] = useState(userData?.user?.username);
  const [email, setEmail] = useState(userData?.user?.email);

  const [actualPassword, setActualPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const logOut = () => {
    setUserData(null);

    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  const saveUser = () => {
    const data = {
      username,
      email
    }

    APIService.put('/api/users/update/' + userData.user._id, data)
      .then((response) => {
        setUserData({
          user: response.data,
          token: userData.token
        })

        setSuccessMessage("Utilisateur mis à jour avec succès.");
      })
      .catch((error) => {
        setErrorMessage(error.message)
      });
  };

  const savePassword = () => {
    const data = {
      old_password: actualPassword,
      password: newPassword,
      confirm_password: confirmNewPassword
    }

    APIService.put('/api/users/update-password/' + userData.user._id, data)
      .then((response) => {
        setSuccessMessage("Mot de passe modifié avec succès !");

        setActualPassword(""),
        setNewPassword("");
        setConfirmNewPassword("");
      })
      .catch((error) => {
          setErrorMessage(error.message)
      })
  }

  return (
    <>
    <ScrollView>
        <Text style={[styles.title]}>Modifier le profil</Text>
        <TextInput
          placeholder="Nom d'utilisateur"
          style={styles.input}
          value={username}
          onChangeText={(e) => setUsername(e)}
        ></TextInput>
        <TextInput
          placeholder="Email"
          style={styles.input}
          value={email}
          onChangeText={(e) => setEmail(e)}
        ></TextInput>
        <Button title="Enregistrer" onPress={saveUser} color={"green"} textColor={"white"} />

        <Text style={[styles.title]}>Modifier le mot de passe</Text>
        <TextInput
          secureTextEntry
          placeholder="Mot de passe actuel"
          style={styles.input}
          value={actualPassword}
          onChangeText={(e) => setActualPassword(e)}
        ></TextInput>
        <TextInput
          secureTextEntry
          placeholder="Nouveau mot de passe"
          style={styles.input}
          value={newPassword}
          onChangeText={(e) => setNewPassword(e)}
        ></TextInput>
        <TextInput
          secureTextEntry
          placeholder="Confirmation nouveau mot de passe"
          style={styles.input}
          value={confirmNewPassword}
          onChangeText={(e) => setConfirmNewPassword(e)}
        ></TextInput>
        <Button title="Changer le mot de passe" onPress={savePassword} color={"green"} textColor={"white"} />

        <Text style={[styles.title]}>Au revoir</Text>
        <Button title="Déconnexion" onPress={logOut} color={"red"} textColor={"white"} />

        <Text style={[styles.title]}>Danger !</Text>
        <Button title="Supprimer mon compte" onPress={logOut} color={"red"} textColor={"white"} />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20
  },
  input: {
    backgroundColor: "#F3F3F3",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#000",
  }
});
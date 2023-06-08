import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProdiver = ({ children }) => {
  const [userData, setUserData] = useState(undefined);
  const [load, setLoad] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      let data = await AsyncStorage.getItem("userData");
      setUserData(JSON.parse(data));
      setLoad(false);
    } catch (error) {
      // Handle error if AsyncStorage operation fails
    }
  };

  useEffect(() => {
    storeUserData();
  }, [userData]);

  const storeUserData = async () => {
    if (userData && userData.token && userData.user) {
      try {
        await AsyncStorage.setItem("userData", JSON.stringify(userData));
      } catch (error) {
        // Handle error if AsyncStorage operation fails
      }
    } else {
      await AsyncStorage.removeItem("userData");
    }
  };

  return (
    <UserContext.Provider value={{ userData, setUserData, load, successMessage, errorMessage, setSuccessMessage, setErrorMessage }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProdiver;

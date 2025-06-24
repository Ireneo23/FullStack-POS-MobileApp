import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    businessName: "StarBlack", // Default value
    address: "",
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const storedUserInfo = await AsyncStorage.getItem("userInfo");
        if (storedUserInfo) {
          setUserInfo(JSON.parse(storedUserInfo));
        }
      } catch (error) {
        console.error("Failed to load user info from storage", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserInfo();
  }, []);

  const updateUserInfo = async (newInfo) => {
    try {
      const updatedInfo = { ...userInfo, ...newInfo };
      setUserInfo(updatedInfo);
      await AsyncStorage.setItem("userInfo", JSON.stringify(updatedInfo));
    } catch (error) {
      console.error("Failed to save user info to storage", error);
    }
  };

  return (
    <UserContext.Provider value={{ userInfo, updateUserInfo, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const IngredientContext = createContext();
const STORAGE_KEY = "@ingredients";

export function IngredientProvider({ children }) {
  const [ingredients, setIngredients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load ingredients from storage on mount
  useEffect(() => {
    loadIngredients();
  }, []);

  // Load ingredients from AsyncStorage
  const loadIngredients = async () => {
    try {
      const storedIngredients = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedIngredients) {
        setIngredients(JSON.parse(storedIngredients));
      }
    } catch (error) {
      console.error("Error loading ingredients:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save ingredients to AsyncStorage
  const saveIngredients = async (newIngredients) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newIngredients));
    } catch (error) {
      console.error("Error saving ingredients:", error);
    }
  };

  const addIngredient = async (newIngredient) => {
    setIngredients((prevIngredients) => {
      // Check for existing ingredient with same name and unit
      const existingIndex = prevIngredients.findIndex(
        (ingredient) =>
          ingredient.name.trim().toLowerCase() ===
            newIngredient.name.trim().toLowerCase() &&
          ingredient.unit === newIngredient.unit
      );

      let updatedIngredients;
      if (existingIndex !== -1) {
        // Update existing ingredient: add quantity, replace cost, update lastAdded
        updatedIngredients = [...prevIngredients];
        const existing = updatedIngredients[existingIndex];
        updatedIngredients[existingIndex] = {
          ...existing,
          quantity: existing.quantity + Number(newIngredient.quantity),
          initialQuantity:
            existing.initialQuantity + Number(newIngredient.quantity),
          cost: Number(newIngredient.cost),
          lastAdded: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
      } else {
        // Add as new ingredient
        const ingredient = {
          id: Date.now(),
          ...newIngredient,
          initialQuantity: newIngredient.quantity,
          lastAdded: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
        };
        updatedIngredients = [...prevIngredients, ingredient];
      }

      // Save to AsyncStorage
      saveIngredients(updatedIngredients);
      return updatedIngredients;
    });
  };

  const deleteIngredient = async (id) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.filter(
        (ingredient) => ingredient.id !== id
      );
      // Save to AsyncStorage
      saveIngredients(updatedIngredients);
      return updatedIngredients;
    });
  };

  const updateIngredientQuantity = async (id, newQuantity, lastAdded) => {
    setIngredients((prevIngredients) => {
      const updatedIngredients = prevIngredients.map((ingredient) =>
        ingredient.id === id
          ? { ...ingredient, quantity: newQuantity, lastAdded }
          : ingredient
      );
      // Save to AsyncStorage
      saveIngredients(updatedIngredients);
      return updatedIngredients;
    });
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        addIngredient,
        deleteIngredient,
        updateIngredientQuantity,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
}

export function useIngredients() {
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useIngredients must be used within an IngredientProvider");
  }
  return context;
}

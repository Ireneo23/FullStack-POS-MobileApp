import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProductContext = createContext();
const STORAGE_KEY = "@products";

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load products from storage on mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Load products from AsyncStorage
  const loadProducts = async () => {
    try {
      const storedProducts = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      }
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Save products to AsyncStorage
  const saveProducts = async (newProducts) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newProducts));
    } catch (error) {
      console.error("Error saving products:", error);
    }
  };

  const addProduct = async (newProduct) => {
    setProducts((prevProducts) => {
      const product = {
        id: Date.now(), // Using timestamp as a simple unique ID
        ...newProduct,
        createdAt: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      const updatedProducts = [...prevProducts, product];
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const deleteProduct = async (id) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.filter(
        (product) => product.id !== id
      );
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  const updateProduct = async (id, updatedData) => {
    setProducts((prevProducts) => {
      const updatedProducts = prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedData } : product
      );
      saveProducts(updatedProducts);
      return updatedProducts;
    });
  };

  if (isLoading) {
    return null; // or a loading spinner
  }

  return (
    <ProductContext.Provider
      value={{
        products,
        addProduct,
        deleteProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
}

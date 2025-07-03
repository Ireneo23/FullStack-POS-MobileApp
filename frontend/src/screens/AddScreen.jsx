import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../components/HeaderComponent";

const ActionCard = ({ title, onPress }) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.cardContent}>
      <View style={styles.iconContainer}>
        <Text style={styles.plusIcon}>+</Text>
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
    </View>
  </TouchableOpacity>
);

export default function AddScreen() {
  const navigation = useNavigation();

  const handleAddProduct = () => {
    navigation.navigate("AddProduct");
  };

  const handleAddIngredient = () => {
    navigation.navigate("AddIngredient");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        title="ADD INGREDIENT / PRODUCT"
        onBack={() => navigation.goBack()}
      />

      <View style={styles.contentContainer}>
        <ActionCard title="Add New Product" onPress={handleAddProduct} />
        <ActionCard title="Add New Ingredient" onPress={handleAddIngredient} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#0D3A2D",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FFBB03",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: "#0D3A2D",
    shadowColor: "#0D3A2D",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 5,
  },
  plusIcon: {
    color: "#0D3A2D",
    fontSize: 28,
    fontWeight: "condensed",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3A2D",
    textAlign: "center",
    marginLeft: 32,
  },
});

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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
      {/* Header */}
      <HeaderComponent
        title="ADD INGREDIENT / PRODUCT"
        onBack={() => navigation.goBack()}
      />

      {/* Main Content */}
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
    backgroundColor: "#0D3A2D",
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
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FFBB03",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  plusIcon: {
    color: "#0D3A2D",
    fontSize: 32,
    fontWeight: "bold",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
});

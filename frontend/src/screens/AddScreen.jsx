import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/AddScreen.styles";

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

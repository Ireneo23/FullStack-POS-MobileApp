import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  TextInput,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useIngredients } from "../context/IngredientContext";
import { useNotifications } from "../context/NotificationContext";
import Modal from "react-native-modal";
import arrowIcon from "../../assets/images/greenArrow.png";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/InventoryScreen.styles";

const StockUpdateModal = ({
  isVisible,
  onClose,
  selectedItem,
  onUpdateStock,
}) => {
  const [stockToAdd, setStockToAdd] = useState("");

  const handleAddStock = () => {
    const quantity = parseInt(stockToAdd);
    if (isNaN(quantity) || quantity <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid quantity");
      return;
    }
    onUpdateStock(quantity);
    setStockToAdd("");
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedItem?.name}</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>
            Current Stock: {selectedItem?.quantity} /{selectedItem?.unit}
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Enter number of stock to add</Text>
          <TextInput
            style={styles.input}
            value={stockToAdd}
            onChangeText={setStockToAdd}
            keyboardType="numeric"
            placeholder="Enter quantity"
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.addButton]}
            onPress={handleAddStock}
          >
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const InventoryRow = ({ item, onLongPress, onPress, showCost }) => {
  const isLowInventory = item.quantity <= item.initialQuantity * 0.2;
  const isHighQuantity = item.quantity >= 1000;

  return (
    <TouchableOpacity
      style={styles.row}
      onLongPress={() => onLongPress(item)}
      onPress={() => onPress(item)}
      delayLongPress={500}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.cell,
          styles.nameCell,
          isHighQuantity && styles.boldText,
        ]}
      >
        {item.name}
      </Text>
      <Text
        style={[
          styles.cell,
          styles.quantityCell,
          isLowInventory && styles.lowInventory,
          isHighQuantity && styles.boldText,
        ]}
      >
        {item.quantity} /{item.unit}
      </Text>
      {showCost && (
        <Text style={[styles.cell, styles.costCell]}>
          ₱{Number(item.cost).toFixed(2)}
        </Text>
      )}
      <Text
        style={[
          styles.cell,
          styles.dateCell,
          isHighQuantity && styles.boldText,
        ]}
      >
        {item.lastAdded}
      </Text>
    </TouchableOpacity>
  );
};

const BottomSheetModal = ({
  isVisible,
  onClose,
  selectedItem,
  onDelete,
  onRestock,
}) => {
  if (!selectedItem) return null;

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      swipeDirection={["down"]}
      onSwipeComplete={onClose}
      style={styles.modal}
      backdropOpacity={0.5}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{selectedItem.name}</Text>
          <View style={styles.separator} />
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.quantityText}>
            QTY: {selectedItem.quantity} /{selectedItem.unit}
          </Text>
        </View>

        <View style={styles.optionsContainer}>
          <Text style={styles.optionsTitle}>Select Option</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>DELETION</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.stockButton]}
              onPress={() => {
                onClose();
                onRestock(selectedItem);
              }}
            >
              <Text style={styles.buttonText}>STOCK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default function InventoryScreen() {
  const navigation = useNavigation();
  const { ingredients, deleteIngredient, updateIngredientQuantity } =
    useIngredients();
  const { addNotification } = useNotifications();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStockModalVisible, setIsStockModalVisible] = useState(false);

  const checkLowStock = (ingredient) => {
    const threshold = ingredient.initialQuantity * 0.2;
    if (ingredient.quantity <= threshold) {
      addNotification({
        title: "Low Stock Alert",
        message: `${ingredient.name} is running low (${ingredient.quantity} ${ingredient.unit} remaining)`,
        type: "low_stock",
      });
    }
  };

  useEffect(() => {
    // Check all ingredients for low stock when the screen loads
    ingredients.forEach(checkLowStock);
  }, [ingredients]);

  const handleLongPress = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
  };

  const handlePress = (item) => {
    setSelectedItem(item);
    setIsStockModalVisible(true);
  };

  const handleClose = () => {
    setIsModalVisible(false);
    setSelectedItem(null);
  };

  const handleStockModalClose = () => {
    setIsStockModalVisible(false);
    setSelectedItem(null);
  };

  const handleUpdateStock = (quantityToAdd) => {
    if (selectedItem) {
      const newQuantity = selectedItem.quantity + quantityToAdd;
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      updateIngredientQuantity(selectedItem.id, newQuantity, today);
      checkLowStock({ ...selectedItem, quantity: newQuantity });
      Alert.alert("Success", "Stock updated successfully!");
    }
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete Ingredient",
      `Are you sure you want to delete ${selectedItem.name}?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteIngredient(selectedItem.id);
            handleClose();
          },
        },
      ]
    );
  };

  const handleRestock = (item) => {
    setSelectedItem(item);
    setIsStockModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent title="INVENTORY" onBack={() => navigation.goBack()} />

      {/* Table Header */}
      <View style={styles.tableHeader}>
        <Text style={[styles.headerCell, styles.nameCell]}>Ingredient</Text>
        <Text style={[styles.headerCell, styles.quantityCell]}>Remaining</Text>
        <Text style={[styles.headerCell, styles.costCell]}>Cost</Text>
        <Text style={[styles.headerCell, styles.dateCell]}>Last Added</Text>
      </View>

      {/* Table Content */}
      <ScrollView style={styles.tableContent}>
        {ingredients.length > 0 ? (
          ingredients.map((item) => (
            <InventoryRow
              key={item.id}
              item={item}
              onLongPress={handleLongPress}
              onPress={handlePress}
              showCost
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No ingredients added yet</Text>
          </View>
        )}
      </ScrollView>

      {/* Bottom Sheet Modal */}
      <BottomSheetModal
        isVisible={isModalVisible}
        onClose={handleClose}
        selectedItem={selectedItem}
        onDelete={handleDelete}
        onRestock={handleRestock}
      />

      {/* Stock Update Modal */}
      <StockUpdateModal
        isVisible={isStockModalVisible}
        onClose={handleStockModalClose}
        selectedItem={selectedItem}
        onUpdateStock={handleUpdateStock}
      />
    </SafeAreaView>
  );
}

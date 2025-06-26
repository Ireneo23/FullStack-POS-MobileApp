import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Modal,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useIngredients } from "../context/IngredientContext";
import arrowIcon from "../../assets/images/greenArrow.png";
import ButtonComponent from "../components/ButtonComponent";

export default function AddIngredientScreen() {
  const navigation = useNavigation();
  const { addIngredient } = useIngredients();
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    unit: "ml",
    cost: "",
  });
  const [errors, setErrors] = useState({});
  const [showUnitPicker, setShowUnitPicker] = useState(false);

  const units = [
    { label: "Gram (g)", value: "g" },
    { label: "Kilogram (kg)", value: "kg" },
    { label: "Milliliter (ml)", value: "ml" },
    { label: "Liter (l)", value: "l" },
    { label: "Piece (pc)", value: "pc" },
  ];

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Ingredient name is required";
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Quantity is required";
    }
    if (!formData.cost.trim()) {
      newErrors.cost = "Cost is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const newIngredient = {
        name: formData.name.trim(),
        quantity: parseInt(formData.quantity),
        unit: formData.unit,
        cost: parseFloat(formData.cost),
      };

      addIngredient(newIngredient);
      Alert.alert("Success", "Ingredient added successfully!");
      navigation.goBack();
    }
  };

  const selectedUnit = units.find((unit) => unit.value === formData.unit);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={arrowIcon}
            style={{
              width: 32,
              height: 24,
              transform: [{ scaleX: -1 }],
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>ADD INGREDIENT</Text>
        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={70}
      >
        <ScrollView style={styles.content}>
          {/* Form Fields */}
          <View style={styles.formContainer}>
            {/* Ingredient Name */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Ingredient Name</Text>
              <TextInput
                style={styles.filledInput}
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text });
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
                placeholder="Enter ingredient name"
                placeholderTextColor="#817C7C"
              />
              {errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}
            </View>

            {/* Quantity */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Quantity</Text>
              <TextInput
                style={styles.filledInput}
                value={formData.quantity}
                onChangeText={(text) => {
                  setFormData({ ...formData, quantity: text });
                  if (errors.quantity) setErrors({ ...errors, quantity: null });
                }}
                keyboardType="numeric"
                placeholder="Enter quantity"
                placeholderTextColor="#817C7C"
              />
              {errors.quantity && (
                <Text style={styles.errorText}>{errors.quantity}</Text>
              )}
            </View>

            {/* Unit */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Unit Used</Text>
              <TouchableOpacity
                style={styles.unitSelectorFilled}
                onPress={() => setShowUnitPicker(true)}
              >
                <Text style={styles.unitTextFilled}>
                  {selectedUnit?.label || "Select unit"}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  size={24}
                  color="#0D3A2D"
                />
              </TouchableOpacity>
            </View>

            {/* Cost */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Cost</Text>
              <View style={styles.priceInputContainerFilled}>
                <Text style={styles.currencySymbolFilled}>₱</Text>
                <TextInput
                  style={styles.priceInputFilled}
                  value={formData.cost}
                  onChangeText={(text) => {
                    setFormData({ ...formData, cost: text });
                    if (errors.cost) setErrors({ ...errors, cost: null });
                  }}
                  keyboardType="numeric"
                  placeholder="0.00"
                  placeholderTextColor="#817C7C"
                />
              </View>
              {errors.cost && (
                <Text style={styles.errorText}>{errors.cost}</Text>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Unit Picker Modal */}
      <Modal
        visible={showUnitPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowUnitPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Unit</Text>
              <TouchableOpacity
                onPress={() => setShowUnitPicker(false)}
                style={styles.closeButton}
              >
                <MaterialCommunityIcons
                  name="close"
                  size={24}
                  color="#0D3A2D"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={units}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.unitOption}
                  onPress={() => {
                    setFormData({ ...formData, unit: item.value });
                    setShowUnitPicker(false);
                  }}
                >
                  <Text style={styles.unitOptionText}>{item.label}</Text>
                  {formData.unit === item.value && (
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color="#0D3A2D"
                    />
                  )}
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Submit Button */}
      <View style={styles.buttonContainer}>
        <ButtonComponent
          onPress={handleSubmit}
          title="Add Ingredient"
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5x",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
    marginTop: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    color: "#0D3A2D",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerRight: {
    width: 40,
  },
  content: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 16,
    marginTop: 16,
  },
  formContainer: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  filledInput: {
    fontSize: 16,
    color: "#181D27",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    fontWeight: "500",
  },
  errorText: {
    color: "#ff0000",
    fontSize: 12,
    marginTop: 4,
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  submitButton: {
    backgroundColor: "#6B9774",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 32,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3A2D",
  },
  closeButton: {
    padding: 8,
  },
  unitOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  unitOptionText: {
    fontSize: 16,
    color: "#333",
  },
  unitSelectorFilled: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
  },
  unitTextFilled: {
    fontSize: 16,
    color: "#181D27",
    fontWeight: "500",
  },
  priceInputContainerFilled: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  priceInputFilled: {
    fontSize: 16,
    color: "#000",
    flex: 1,
  },
  currencySymbolFilled: {
    fontSize: 16,
    color: "#B36718",
    marginRight: 8,
    fontWeight: "500",
  },
});

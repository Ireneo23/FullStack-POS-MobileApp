import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { Button } from "@rneui/themed";
import { times } from "lodash";
import { useIngredients } from "../context/IngredientContext";
import { useProducts } from "../context/ProductContext";
import arrowIcon from "../../assets/images/greenArrow.png";
import camIcon from "../../assets/images/cam.png";
import galleryIcon from "../../assets/images/gallery.png";
import ButtonComponent from "../components/ButtonComponent";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/AddProductScreen.styles";

const IngredientGroup = ({
  index,
  onRemove,
  ingredients,
  onIngredientChange,
}) => {
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  const handleQuantityChange = (text) => {
    setQuantity(text);
    setError("");

    if (text && selectedIngredient) {
      const selectedIngredientData = ingredients.find(
        (ing) => ing.id === selectedIngredient
      );

      if (selectedIngredientData) {
        const inputQuantity = parseFloat(text);
        if (inputQuantity > selectedIngredientData.quantity) {
          setError(
            `Maximum available: ${selectedIngredientData.quantity} ${selectedIngredientData.unit}`
          );
        } else {
          onIngredientChange(index, {
            id: selectedIngredient,
            quantity: inputQuantity,
            unit: selectedIngredientData.unit,
          });
        }
      }
    }
  };

  const handleIngredientChange = (value) => {
    setSelectedIngredient(value);
    setQuantity("");
    setError("");
    onIngredientChange(index, null);
  };

  return (
    <View style={styles.ingredientGroup}>
      <View style={styles.ingredientColumn}>
        <View style={styles.pickerContainer}>
          <Text style={styles.pickerLabel}>Select Ingredient</Text>
          <Picker
            selectedValue={selectedIngredient}
            onValueChange={handleIngredientChange}
            style={styles.picker}
            dropdownIconColor="#0D3A2D"
          >
            <Picker.Item label="Select Ingredient" value="" />
            {ingredients.map((ingredient) => (
              <Picker.Item
                key={ingredient.id}
                label={`${ingredient.name} (${ingredient.quantity} ${ingredient.unit})`}
                value={ingredient.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.quantityContainer}>
          <Text style={styles.pickerLabel}>Quantity</Text>
          <TextInput
            style={[styles.quantityInput, error && styles.quantityInputError]}
            placeholder="Enter quantity"
            placeholderTextColor={"#817C7C"}
            keyboardType="numeric"
            value={quantity}
            onChangeText={handleQuantityChange}
            editable={!!selectedIngredient}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
      {index > 0 && (
        <TouchableOpacity
          style={styles.removeButton}
          onPress={() => onRemove(index)}
        >
          <MaterialCommunityIcons
            name="close-circle"
            size={24}
            color="#B36718"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function AddProductScreen() {
  const navigation = useNavigation();
  const { ingredients, updateIngredientQuantity } = useIngredients();
  const { addProduct } = useProducts();
  const [image, setImage] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [costPerServing, setCostPerServing] = useState("");
  const [description, setDescription] = useState("");
  const [ingredientGroups, setIngredientGroups] = useState(
    times(1, (index) => index)
  );
  const [selectedIngredients, setSelectedIngredients] = useState({});

  const units = [
    { label: "Gram (g)", value: "g" },
    { label: "Kilogram (kg)", value: "kg" },
    { label: "Milliliter (ml)", value: "ml" },
    { label: "Liter (l)", value: "l" },
    { label: "Piece (pc)", value: "pc" },
  ];

  const pickImage = async (type) => {
    try {
      let result;
      if (type === "camera") {
        const { status } = await ImagePicker.getCameraPermissionsAsync();
        if (status !== "granted") {
          const { status: newStatus } =
            await ImagePicker.requestCameraPermissionsAsync();
          if (newStatus !== "granted") {
            Alert.alert(
              "Permission Required",
              "Sorry, we need camera permissions to make this work!"
            );
            return;
          }
        }
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      } else {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          const { status: newStatus } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (newStatus !== "granted") {
            Alert.alert(
              "Permission Required",
              "Sorry, we need media library permissions to make this work!"
            );
            return;
          }
        }
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
      }

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const selectedAsset = result.assets[0];
        if (selectedAsset.uri) {
          setImage(selectedAsset.uri);
        } else {
          throw new Error("No URI found in selected asset");
        }
      }
    } catch (error) {
      console.error("Error picking image:", error);
      Alert.alert(
        "Error",
        "Failed to pick image. Please make sure you have granted the necessary permissions and try again."
      );
    }
  };

  const addIngredientGroup = () => {
    setIngredientGroups([...ingredientGroups, ingredientGroups.length]);
  };

  const removeIngredientGroup = (index) => {
    setIngredientGroups(ingredientGroups.filter((_, i) => i !== index));
  };

  const handleIngredientChange = (index, ingredientData) => {
    setSelectedIngredients((prev) => ({
      ...prev,
      [index]: ingredientData,
    }));
  };

  const handleAddProduct = () => {
    if (!productName.trim()) {
      Alert.alert("Error", "Please enter a product name");
      return;
    }

    if (!price.trim()) {
      Alert.alert("Error", "Please enter a price");
      return;
    }

    if (!image) {
      Alert.alert("Error", "Please add a product image");
      return;
    }

    // Check if any ingredients are selected
    const hasIngredients = Object.values(selectedIngredients).some(
      (ing) => ing !== null
    );
    if (!hasIngredients) {
      Alert.alert("Error", "Please add at least one ingredient");
      return;
    }

    try {
      // Create new product
      const newProduct = {
        title: productName.trim(),
        price: parseFloat(price),
        costPerServing: parseFloat(costPerServing) || 0,
        image: { uri: image },
        description: description.trim(),
        ingredients: Object.values(selectedIngredients).filter(Boolean),
      };

      // Add product to context
      addProduct(newProduct);

      // Get current date for lastAdded
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      // Show success message and navigate back
      Alert.alert("Success", "New product has been successfully created", [
        {
          text: "OK",
          onPress: () => {
            navigation.goBack();
          },
        },
      ]);
    } catch (error) {
      console.error("Error creating product:", error);
      Alert.alert("Error", "Failed to create product. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent title="ADD PRODUCT" onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scrollView}>
        {/* Image Upload Area */}
        <View style={styles.imageUploadContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.productImage} />
          ) : (
            <View style={styles.placeholderImage}>
              <MaterialCommunityIcons
                name="image-plus"
                size={40}
                color="#6B9774"
              />
            </View>
          )}
          <View style={styles.imageButtons}>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => pickImage("gallery")}
            >
              <Image source={galleryIcon} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.imageButton}
              onPress={() => pickImage("camera")}
            >
              <Image source={camIcon} style={{ width: 32, height: 32 }} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.productInfoContainer}>
          <TextInput
            style={styles.productNameInput}
            placeholder="Product Name"
            value={productName}
            onChangeText={setProductName}
            placeholderTextColor="#817C7C"
          />

          <TextInput
            style={styles.descriptionInput}
            placeholder="Product Description(Optional)"
            value={description}
            onChangeText={setDescription}
            placeholderTextColor="#817C7C"
            multiline
            numberOfLines={3}
          />
        </View>

        <View style={styles.pricingSectionContainer}>
          <View style={styles.pricingContainer}>
            <View style={styles.pricingInputWrapper}>
              <Text style={styles.inputLabel}>Price</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.currencySymbol}>₱</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="0.00"
                  value={price}
                  onChangeText={setPrice}
                  keyboardType="numeric"
                  placeholderTextColor="#817C7C"
                />
              </View>
            </View>

            <View style={styles.pricingInputWrapper}>
              <Text style={styles.inputLabel}>Cost per Serving</Text>
              <View style={styles.priceInputContainer}>
                <Text style={styles.currencySymbol}>₱</Text>
                <TextInput
                  style={styles.priceInput}
                  placeholder="0.00"
                  value={costPerServing}
                  onChangeText={setCostPerServing}
                  keyboardType="numeric"
                  placeholderTextColor="#817C7C"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.ingredientsSectionContainer}>
          {/* Ingredients Section */}
          <Text style={styles.sectionTitle}>Ingredients</Text>
          {ingredientGroups.map((index) => (
            <IngredientGroup
              key={index}
              index={index}
              onRemove={removeIngredientGroup}
              ingredients={ingredients}
              onIngredientChange={handleIngredientChange}
            />
          ))}

          <TouchableOpacity
            style={styles.addMoreButton}
            onPress={addIngredientGroup}
          >
            <MaterialCommunityIcons name="plus" size={24} color="#0D3A2D" />
            <Text style={styles.addMoreText}>Add more ingredients</Text>
          </TouchableOpacity>
        </View>

        {/* Add Product Button */}
        <View style={styles.buttonContainer}>
          <ButtonComponent
            onPress={handleAddProduct}
            title="Add Product"
            style={styles.addProductButton}
            textStyle={styles.addProductButtonText}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

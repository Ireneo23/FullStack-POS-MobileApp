import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  SafeAreaView,
  Alert,
  Modal,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "../context/ProductContext";
import { useIngredients } from "../context/IngredientContext";
import Toast from "react-native-toast-message";
import arrowIcon from "../../assets/images/greenArrow.png";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/ProductView.styles";

const ProductCard = ({
  title,
  price,
  image,
  description,
  onDelete,
  onPress,
}) => (
  <TouchableOpacity style={styles.card} onPress={onPress}>
    <View style={styles.imageContainer}>
      <Image source={image} style={styles.productImage} />
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <Ionicons name="trash-outline" size={20} color="white" />
      </TouchableOpacity>
    </View>
    <View style={styles.cardFooter}>
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>₱{price.toFixed(2)}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {description ? description : "No description available"}
      </Text>
    </View>
  </TouchableOpacity>
);

const ProductDetailModal = ({ visible, product, onClose, ingredients }) => {
  if (!product) return null;

  const getIngredientName = (ingredientId) => {
    const ingredient = ingredients.find((ing) => ing.id === ingredientId);
    return ingredient ? ingredient.name : "Unknown Ingredient";
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Product Details</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#0D3A2D" />
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.modalContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Product Image */}
            <View style={styles.modalImageContainer}>
              <Image source={product.image} style={styles.modalProductImage} />
            </View>

            {/* Product Basic Info */}
            <View style={styles.modalInfoSection}>
              <Text style={styles.modalProductName}>{product.title}</Text>
              <Text style={styles.modalProductDescription}>
                {product.description || "No description available"}
              </Text>
            </View>

            {/* Pricing Information */}
            <View style={styles.modalPricingSection}>
              <View style={styles.modalPriceRow}>
                <Text style={styles.modalPriceLabel}>Price:</Text>
                <Text style={styles.modalPriceValue}>
                  ₱{product.price.toFixed(2)}
                </Text>
              </View>
              {product.costPerServing > 0 && (
                <View style={styles.modalPriceRow}>
                  <Text style={styles.modalPriceLabel}>Cost per Serving:</Text>
                  <Text style={styles.modalPriceValue}>
                    ₱{product.costPerServing.toFixed(2)}
                  </Text>
                </View>
              )}
            </View>

            {/* Ingredients Section */}
            {product.ingredients && product.ingredients.length > 0 && (
              <View style={styles.modalIngredientsSection}>
                <Text style={styles.modalSectionTitle}>Ingredients</Text>
                {product.ingredients.map((ingredient, index) => (
                  <View key={index} style={styles.modalIngredientItem}>
                    <View style={styles.modalIngredientInfo}>
                      <Text style={styles.modalIngredientName}>
                        {getIngredientName(ingredient.id)}
                      </Text>
                      <Text style={styles.modalIngredientQuantity}>
                        {ingredient.quantity} {ingredient.unit}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Created Date */}
            {product.createdAt && (
              <View style={styles.modalDateSection}>
                <Text style={styles.modalDateLabel}>Created:</Text>
                <Text style={styles.modalDateValue}>{product.createdAt}</Text>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default function ProductView() {
  const navigation = useNavigation();
  const { products, deleteProduct } = useProducts();
  const { ingredients } = useIngredients();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDelete = (productId, productTitle) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete \"${productTitle}\"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Continue",
          style: "destructive",
          onPress: () => {
            // Second confirmation
            Alert.alert(
              "Confirm Permanent Deletion",
              `This action is irreversible. Do you really want to permanently delete \"${productTitle}\"?`,
              [
                {
                  text: "No",
                  style: "cancel",
                },
                {
                  text: "Delete Forever",
                  style: "destructive",
                  onPress: () => {
                    deleteProduct(productId);
                    Toast.show({
                      type: "success",
                      text1: "Product Deleted",
                      text2: `${productTitle} has been removed`,
                      position: "bottom",
                      visibilityTime: 2000,
                    });
                  },
                },
              ]
            );
          },
        },
      ]
    );
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  const filteredProducts = useCallback(() => {
    let filtered = products;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    return filtered.sort((a, b) => a.title.localeCompare(b.title));
  }, [searchQuery, products]);

  const handleSearch = (text) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="PRODUCT VIEW"
        onBack={() => navigation.goBack()}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <MaterialCommunityIcons name="magnify" size={24} color="#0D3A2D" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor="#6B9774"
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <Ionicons name="close-circle" size={20} color="#0D3A2D" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Product Grid */}
      <View style={styles.contentContainer}>
        <FlatList
          data={filteredProducts()}
          numColumns={2}
          renderItem={({ item }) => (
            <ProductCard
              title={item.title}
              price={item.price}
              image={item.image}
              description={item.description}
              onDelete={() => handleDelete(item.id, item.title)}
              onPress={() => handleProductPress(item)}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          )}
        />
      </View>

      {/* Product Detail Modal */}
      <ProductDetailModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={handleCloseModal}
        ingredients={ingredients}
      />

      <Toast />
    </SafeAreaView>
  );
}

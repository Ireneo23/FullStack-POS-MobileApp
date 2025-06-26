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
        <Text style={styles.headerTitle}>PRODUCT VIEW</Text>
        <View style={styles.headerRight} />
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    marginBottom: 0,
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
  searchContainer: {
    padding: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    borderRadius: 32,
    paddingHorizontal: 16,
    height: 45,
    shadowColor: "#000",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.1,
    borderWidth: 1,
    borderColor: "#6B9774",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: -3,
      height: -3,
    },
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#0D3A2D",
    fontSize: 16,
    fontWeight: "500",
  },
  clearButton: {
    padding: 4,
    marginLeft: 8,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  productList: {
    padding: 8,
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    margin: "1%",
    borderRadius: 12,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageContainer: {
    height: 105,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardFooter: {
    backgroundColor: "#0D3A2D",
    padding: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    minHeight: 65,
  },
  productTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  productPrice: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  productDescription: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(255, 0, 0, 0.7)",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: "90%",
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0D3A2D",
  },
  closeButton: {
    padding: 4,
  },
  modalContent: {
    padding: 20,
  },
  modalImageContainer: {
    alignItems: "center",
    marginBottom: 16,
  },
  modalProductImage: {
    width: 125,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  modalInfoSection: {
    marginBottom: 20,
  },
  modalProductName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 8,
    textAlign: "center",
  },
  modalProductDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
  },
  modalPricingSection: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  modalPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  modalPriceLabel: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  modalPriceValue: {
    fontSize: 18,
    color: "#0D3A2D",
    fontWeight: "bold",
  },
  modalIngredientsSection: {
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    padding: 16,
    marginBottom: 4,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 12,
  },
  modalIngredientItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  modalIngredientInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalIngredientName: {
    fontSize: 16,
    color: "#0D3A2D",
    fontWeight: "500",
    flex: 1,
  },
  modalIngredientQuantity: {
    fontSize: 14,
    color: "#B36718",
    fontWeight: "bold",
  },
  modalDateSection: {
    padding: 16,
    marginBottom: 16,
  },
  modalDateLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginBottom: 4,
  },
  modalDateValue: {
    fontSize: 13,
    color: "#0D3A2D",
    fontWeight: "500",
  },
});

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
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { useProducts } from "../context/ProductContext";
import Toast from "react-native-toast-message";
import arrowIcon from "../../assets/images/greenArrow.png";

const ProductCard = ({ title, price, image, description, onDelete }) => (
  <View style={styles.card}>
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
  </View>
);

export default function ProductView() {
  const navigation = useNavigation();
  const { products, deleteProduct } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");

  const handleDelete = (productId, productTitle) => {
    Alert.alert(
      "Delete Product",
      `Are you sure you want to delete "${productTitle}"?`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
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
  };

  const filteredProducts = useCallback(() => {
    let filtered = products;

    // Apply search filter if there's a search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = products.filter((product) =>
        product.title.toLowerCase().includes(query)
      );
    }

    // Sort products alphabetically by title
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
        <Text style={styles.headerTitle}>Product View</Text>
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
      <Toast />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    marginBottom: 50,
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
    fontSize: 18,
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

    // Neumorphic effect
    borderWidth: 1,
    borderColor: "#6B9774",
    backgroundColor: "#F5F5F5",
    // Inner shadow
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
});

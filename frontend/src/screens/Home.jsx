import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useProducts } from "../context/ProductContext";
import { useNotifications } from "../context/NotificationContext";
import { useUser } from "../context/UserContext";
import bellIcon from "../../assets/images/bell.png";
import personIcon from "../../assets/images/person1.png";
import ButtonComponent from "../components/ButtonComponent";

const ProductCard = ({ title, price, image, qty, onIncrease, onDecrease }) => (
  <View style={styles.card}>
    <TouchableOpacity
      style={styles.imageContainer}
      onPress={onIncrease}
      activeOpacity={0.7}
    >
      <Image source={image} style={styles.productImage} />
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.cardFooter}
      onPress={onDecrease}
      activeOpacity={0.7}
    >
      <Text style={styles.productTitle}>{title}</Text>
      <Text style={styles.productPrice}>₱{price.toFixed(2)}</Text>
      <View style={styles.quantityContainer}>
        <Text style={styles.quantityLabel}>Qtys</Text>
        <View
          style={[
            styles.quantityValueContainer,
            qty > 0 && styles.quantityValueContainerActive,
          ]}
        >
          <Text
            style={[
              styles.quantityValue,
              qty > 0 && styles.quantityValueActive,
            ]}
          >
            {qty}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  </View>
);

export default function Home() {
  const navigation = useNavigation();
  const { products } = useProducts();
  const { getUnreadCount } = useNotifications();
  const { userInfo } = useUser();
  const unreadCount = getUnreadCount();
  const [productQuantities, setProductQuantities] = useState(
    products.reduce((acc, product) => ({ ...acc, [product.id]: 0 }), {})
  );

  const handleIncreaseQuantity = useCallback((productId) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
  }, []);

  const handleDecreaseQuantity = useCallback((productId) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(0, (prev[productId] || 0) - 1),
    }));
  }, []);

  const totalQuantity = Object.values(productQuantities).reduce(
    (sum, qty) => sum + qty,
    0
  );
  const totalAmount = products.reduce((sum, product) => {
    return sum + product.price * (productQuantities[product.id] || 0);
  }, 0);

  const hasSelectedProducts = totalQuantity > 0;

  const handleReviewPress = () => {
    const selectedProducts = products
      .filter((product) => (productQuantities[product.id] || 0) > 0)
      .map((product) => ({
        ...product,
        qty: productQuantities[product.id],
      }));

    navigation.navigate("OrderReview", { selectedProducts });
  };

  // Update productQuantities when products change
  React.useEffect(() => {
    setProductQuantities((prev) => {
      const newQuantities = { ...prev };
      products.forEach((product) => {
        if (!(product.id in newQuantities)) {
          newQuantities[product.id] = 0;
        }
      });
      return newQuantities;
    });
  }, [products]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity
            style={styles.notificationButton}
            onPress={() => navigation.navigate("Notifications")}
          >
            <Image source={bellIcon} style={{ width: 24, height: 24 }} />
            {unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
          <Text style={styles.businessName}>
            {userInfo.businessName || "StarBlack"}
          </Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.navigate("ProductView")}
          >
            <Text style={[styles.headerButtonText, { color: "#fff" }]}>
              Product View
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              paddingVertical: 2,
            }}
            onPress={() => navigation.navigate("InformationScreen")}
          >
            <Image source={personIcon} style={{ width: 38, height: 38 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Grid */}
      <FlatList
        data={[...products].sort((a, b) => a.title.localeCompare(b.title))}
        numColumns={3}
        renderItem={({ item }) => (
          <ProductCard
            title={item.title}
            price={item.price}
            image={item.image}
            qty={productQuantities[item.id] || 0}
            onIncrease={() => handleIncreaseQuantity(item.id)}
            onDecrease={() => handleDecreaseQuantity(item.id)}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={[
          styles.productList,
          hasSelectedProducts && styles.productListWithReview,
        ]}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No products available</Text>
          </View>
        )}
      />

      {/* Review Button and Total Panel */}
      {hasSelectedProducts && (
        <View style={styles.reviewContainer}>
          <TouchableOpacity
            style={styles.reviewButton}
            onPress={handleReviewPress}
          >
            <Text style={styles.reviewButtonText}>Review</Text>
          </TouchableOpacity>
          <View style={styles.totalPanel}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total Amount:</Text>
              <Text style={styles.totalValue}>₱{totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Product Qty:</Text>
              <Text style={styles.totalValue}>{totalQuantity}</Text>
            </View>
          </View>
        </View>
      )}
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
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationButton: {
    position: "relative",
    marginTop: 16,
  },
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerButtons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },
  headerButton: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#6B9774",
  },
  activeButton: {
    backgroundColor: "#8B4513",
  },
  headerButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  productList: {
    padding: 4,
    justifyContent: "space-between",
  },
  productListWithReview: {
    paddingBottom: 180,
  },
  card: {
    width: "31.5%",
    margin: "0.5%",
    borderRadius: 8,
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
    height: 85,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  cardFooter: {
    backgroundColor: "#0D3A2D",
    padding: 8,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    minHeight: 35,
  },
  productTitle: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
    height: 24,
  },
  productPrice: {
    color: "#FFBB03",
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 2,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#0D3A2D",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    marginTop: 2,
  },
  quantityLabel: {
    color: "white",
    fontSize: 9,
  },
  quantityValueContainer: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 4,
  },
  quantityValueContainerActive: {
    backgroundColor: "#FFBB03",
    borderRadius: 10,
  },
  quantityValue: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  quantityValueActive: {
    color: "black",
  },
  reviewContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  reviewButton: {
    backgroundColor: "#6B9774",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  reviewButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  totalPanel: {
    backgroundColor: "#0D3A2D",
    padding: 12,
    borderRadius: 12,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: "#fff",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#FFBB03",
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
  businessName: {
    marginLeft: 16,
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    color: "#222",
    letterSpacing: 1.2,
    fontFamily:
      Platform.OS === "ios" ? "AvenirNext-DemiBold" : "sans-serif-medium",
    textShadowColor: "rgba(107, 151, 116, 0.15)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
  },
});

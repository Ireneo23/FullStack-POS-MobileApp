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
import styles from "../style/Home.styles";

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
          <View style={styles.totalPanel}>
            <TouchableOpacity
              style={styles.reviewButtonInPanel}
              onPress={handleReviewPress}
            >
              <Text style={styles.reviewButtonTextInPanel}>Review</Text>
            </TouchableOpacity>
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

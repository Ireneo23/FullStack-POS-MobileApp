import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import arrowIcon from "../../assets/images/greenArrow.png";
import ButtonComponent from "../components/ButtonComponent";
import HeaderComponent from "../components/HeaderComponent";

const OrderItem = ({ item, onUpdateQuantity, onDelete }) => {
  const totalPrice = item.price * item.qty;

  return (
    <View style={styles.orderItem}>
      <Image source={item.image} style={styles.orderItemImage} />
      <View style={styles.orderItemDetails}>
        <Text style={styles.orderItemName}>{item.title}</Text>
        <Text style={styles.orderItemPrice}>₱{item.price.toFixed(2)}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, item.qty - 1)}
          >
            <Ionicons name="remove" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.qty}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, item.qty + 1)}
          >
            <Ionicons name="add" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.orderItemRight}>
        <Text style={styles.orderItemTotal}>₱{totalPrice.toFixed(2)}</Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Ionicons name="trash" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function OrderReviewScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [orderItems, setOrderItems] = useState([]);
  const [receiptNumber, setReceiptNumber] = useState("000001");

  useEffect(() => {
    if (route.params?.selectedProducts) {
      setOrderItems(route.params.selectedProducts);
    }
    loadLastReceiptNumber();
  }, [route.params]);

  const loadLastReceiptNumber = async () => {
    try {
      const lastReceiptNo = await AsyncStorage.getItem("lastReceiptNumber");
      if (lastReceiptNo) {
        const nextNumber = (parseInt(lastReceiptNo) + 1)
          .toString()
          .padStart(6, "0");
        setReceiptNumber(nextNumber);
      }
    } catch (error) {
      console.error("Error loading receipt number:", error);
    }
  };

  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 0) return;
    setOrderItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, qty: newQty } : item
      )
    );
  };

  const handleDelete = (productId) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const grandTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );
  const totalItems = orderItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="ORDER REVIEW"
        onBack={() => navigation.goBack()}
      />

      {/* Receipt Info */}
      <View style={styles.receiptInfo}>
        <Text style={styles.receiptNumber}>Receipt No. {receiptNumber}</Text>
        <Text style={styles.dateTime}>
          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </Text>
      </View>

      {/* Order Items */}
      <FlatList
        data={orderItems}
        renderItem={({ item }) => (
          <OrderItem
            item={item}
            onUpdateQuantity={handleUpdateQuantity}
            onDelete={handleDelete}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.orderList}
      />

      {/* Total and Confirm Button */}
      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Items:</Text>
            <Text style={styles.totalValue}>{totalItems}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Grand Total:</Text>
            <Text style={styles.totalValue}>₱{grandTotal.toFixed(2)}</Text>
          </View>
        </View>
        <ButtonComponent
          title="CONFIRM"
          onPress={() =>
            navigation.navigate("PaymentMethod", {
              amount: grandTotal.toFixed(2),
              orderItems: orderItems,
              receiptNumber: receiptNumber,
            })
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  receiptInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  receiptNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 4,
  },
  dateTime: {
    fontSize: 14,
    color: "#666",
  },
  orderList: {
    padding: 16,
  },
  orderItem: {
    flexDirection: "row",
    marginBottom: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  orderItemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  orderItemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  orderItemName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  orderItemPrice: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#6B9774",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
    color: "#0D3A2D",
  },
  orderItemRight: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginLeft: 12,
  },
  orderItemTotal: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#B36718",
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  totalContainer: {
    marginBottom: 16,
    backgroundColor: "#0D3A2D",
    padding: 16,
    borderRadius: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 16,
    color: "#fff",
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFBB03",
  },
  confirmButton: {
    backgroundColor: "#6B9774",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

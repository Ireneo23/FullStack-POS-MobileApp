import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import arrowIcon from "../../assets/images/greenArrow.png";
import ButtonComponent from "../components/ButtonComponent";
import { useProducts } from "../context/ProductContext";
import { useIngredients } from "../context/IngredientContext";
import HeaderComponent from "../components/HeaderComponent";

export default function PaymentCompleteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isViewingHistory = !!route.params?.transaction;

  const formatDateTime = () => {
    const now = new Date();
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return now.toLocaleDateString("en-US", options).replace(",", " |");
  };

  // Use data from transaction if viewing history, otherwise use direct params
  const dataSource = isViewingHistory ? route.params.transaction : route.params;

  const [customerName, setCustomerName] = useState(
    dataSource.customerName || ""
  );
  const {
    amount,
    amountReceived,
    orderItems = [],
    paymentMethod = "Cash",
  } = dataSource;

  const finalReceiptNo = isViewingHistory
    ? dataSource.receiptNo
    : dataSource.receiptNumber;
  const finalDate = isViewingHistory ? dataSource.date : formatDateTime();
  const finalChange = isViewingHistory
    ? dataSource.change
    : (parseFloat(amountReceived) - parseFloat(amount)).toFixed(2);

  const { products } = useProducts();
  const { updateIngredientQuantity, ingredients } = useIngredients();

  const saveTransaction = async () => {
    try {
      // Get existing transactions
      const existingTransactionsJson = await AsyncStorage.getItem(
        "transactions"
      );
      const existingTransactions = existingTransactionsJson
        ? JSON.parse(existingTransactionsJson)
        : [];

      // Get the receipt number from route params
      const { receiptNumber } = route.params || {};

      if (!receiptNumber) {
        throw new Error("Receipt number is missing");
      }

      // Create new transaction object
      const newTransaction = {
        id: Date.now().toString(), // Use timestamp as unique ID
        receiptNo: finalReceiptNo,
        date: finalDate,
        quantity: orderItems.reduce((sum, item) => sum + item.qty, 0),
        totalAmount: amount,
        orderItems: orderItems,
        paymentMethod: paymentMethod,
        customerName: customerName || "N/A",
        amountReceived: amountReceived,
        change: finalChange,
      };

      // Add new transaction to array
      const updatedTransactions = [newTransaction, ...existingTransactions];

      // Save updated transactions
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );

      // Save the last used receipt number
      await AsyncStorage.setItem("lastReceiptNumber", receiptNumber);
    } catch (error) {
      console.error("Error saving transaction:", error);
      throw error; // Re-throw to handle in the calling function
    }
  };

  const handleNewEntry = async () => {
    try {
      await saveTransaction();
      // Deduct ingredients from inventory for each product in the order
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      orderItems.forEach((orderItem) => {
        // Find the product by id (prefer id, fallback to title)
        const product = products.find(
          (p) => p.id === orderItem.id || p.title === orderItem.title
        );
        if (product && Array.isArray(product.ingredients)) {
          product.ingredients.forEach((ingredient) => {
            // Find the current ingredient in inventory
            const currentIngredient = ingredients.find(
              (ing) => ing.id === ingredient.id
            );
            if (currentIngredient) {
              // Deduct the total quantity used (ingredient.quantity * orderItem.qty)
              const totalUsed =
                (ingredient.quantity || 0) * (orderItem.qty || 1);
              const newQuantity = currentIngredient.quantity - totalUsed;
              updateIngredientQuantity(ingredient.id, newQuantity, today);
            }
          });
        }
      });
      Alert.alert(
        "Success",
        "Transaction has been saved successfully!",
        [
          {
            text: "OK",
            onPress: () => {
              // Navigate to MainTabs and reset the navigation stack
              navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
              });
            },
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to save transaction. Please try again.",
        [{ text: "OK" }],
        { cancelable: false }
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="PAYMENT COMPLETE"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView}>
        {/* Receipt Info */}
        <View style={styles.receiptInfo}>
          <Text style={styles.receiptTitle}>StarPOS</Text>
          <Text style={styles.receiptNumber}>
            Receipt No. {finalReceiptNo || "000001"}
          </Text>
        </View>

        {/* Item Details */}
        <View style={styles.itemDetails}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 2 }]}>ITEM</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>QTY</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>PRICE</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>TOTAL</Text>
          </View>
          <View style={styles.divider} />
          {orderItems.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>{item.title}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>{item.qty}</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                ₱{item.price.toFixed(2)}
              </Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>
                ₱{(item.price * item.qty).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* Date and Time */}
        <View style={styles.dateTimeContainer}>
          <Text style={styles.dateTimeText}>{finalDate}</Text>
        </View>

        {/* Totals Section */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>₱{amount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Amount Payable:</Text>
            <Text style={styles.totalValue}>₱{amount}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Payment Received:</Text>
            <Text style={styles.totalValue}>₱{amountReceived}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>{paymentMethod}:</Text>
            <Text style={styles.totalValue}>₱{amountReceived}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Change Amount:</Text>
            <Text style={styles.totalValue}>₱{finalChange}</Text>
          </View>
        </View>

        {/* Customer Info */}
        <View style={styles.customerInfo}>
          <Text style={styles.customerLabel}>Customer Name (Optional)</Text>
          <TextInput
            style={styles.customerInput}
            placeholder="Enter customer name"
            value={customerName}
            onChangeText={setCustomerName}
            editable={!isViewingHistory}
          />
        </View>

        {/* Print Receipt Button */}
        <TouchableOpacity style={styles.printButton}>
          <Text style={styles.printButtonText}>PRINT RECEIPT</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Done Button */}
      {!isViewingHistory && (
        <View style={styles.footer}>
          <ButtonComponent title="New Entry" onPress={handleNewEntry} />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  scrollView: {
    flex: 1,
  },
  receiptInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3A2D",
  },
  receiptNumber: {
    fontSize: 16,
    color: "#6B9774",
  },
  itemDetails: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 8,
  },
  tableHeader: {
    flexDirection: "row",
    marginBottom: 8,
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#0D3A2D",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: "row",
    marginVertical: 8,
  },
  tableCell: {
    fontSize: 14,
    color: "#333",
  },
  dateTimeContainer: {
    padding: 16,
    backgroundColor: "#fff",
    marginTop: 8,
  },
  dateTimeText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  totalsSection: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 8,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#B36718",
  },
  customerInfo: {
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 8,
  },
  customerLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  customerInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "#333",
  },
  printButton: {
    backgroundColor: "#6B9774",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 64,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  printButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
});

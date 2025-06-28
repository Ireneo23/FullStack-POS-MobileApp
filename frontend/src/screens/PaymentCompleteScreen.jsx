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
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonComponent from "../components/ButtonComponent";
import { useProducts } from "../context/ProductContext";
import { useIngredients } from "../context/IngredientContext";
import { useUser } from "../context/UserContext";
import HeaderComponent from "../components/HeaderComponent";

export default function PaymentCompleteScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const isViewingHistory = !!route.params?.transaction;
  const { userInfo } = useUser();

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

  const receiptNo = isViewingHistory
    ? dataSource.receiptNo
    : dataSource.receiptNumber;
  const date = isViewingHistory ? dataSource.date : formatDateTime();
  const change = isViewingHistory
    ? dataSource.change
    : (parseFloat(amountReceived) - parseFloat(amount)).toFixed(2);

  const { products } = useProducts();
  const { updateIngredientQuantity, ingredients } = useIngredients();

  const saveTransaction = async () => {
    try {
      const existingTransactionsJson = await AsyncStorage.getItem(
        "transactions"
      );
      const existingTransactions = existingTransactionsJson
        ? JSON.parse(existingTransactionsJson)
        : [];

      const { receiptNumber } = route.params || {};
      if (!receiptNumber) {
        throw new Error("Receipt number is missing");
      }

      const newTransaction = {
        id: Date.now().toString(),
        receiptNo,
        date,
        quantity: orderItems.reduce((sum, item) => sum + item.qty, 0),
        totalAmount: amount,
        orderItems,
        paymentMethod,
        customerName: customerName || "N/A",
        amountReceived,
        change,
      };

      const updatedTransactions = [newTransaction, ...existingTransactions];
      await AsyncStorage.setItem(
        "transactions",
        JSON.stringify(updatedTransactions)
      );
      await AsyncStorage.setItem("lastReceiptNumber", receiptNumber);
    } catch (error) {
      console.error("Error saving transaction:", error);
      throw error;
    }
  };

  const handleNewEntry = async () => {
    try {
      await saveTransaction();

      // Deduct ingredients from inventory
      const today = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      orderItems.forEach((orderItem) => {
        const product = products.find(
          (p) => p.id === orderItem.id || p.title === orderItem.title
        );
        if (product && Array.isArray(product.ingredients)) {
          product.ingredients.forEach((ingredient) => {
            const currentIngredient = ingredients.find(
              (ing) => ing.id === ingredient.id
            );
            if (currentIngredient) {
              const totalUsed =
                (ingredient.quantity || 0) * (orderItem.qty || 1);
              const newQuantity = currentIngredient.quantity - totalUsed;
              updateIngredientQuantity(ingredient.id, newQuantity, today);
            }
          });
        }
      });

      Alert.alert("Success", "Transaction has been saved successfully!", [
        {
          text: "OK",
          onPress: () => {
            navigation.reset({
              index: 0,
              routes: [{ name: "MainTabs" }],
            });
          },
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Failed to save transaction. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent
        title="PAYMENT COMPLETE"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.scrollView}>
        {/* Receipt Info */}
        <View style={styles.receiptInfo}>
          <View style={styles.businessInfo}>
            <Text style={styles.receiptTitle}>
              {userInfo?.businessName || "StarPOS"}
            </Text>
            <Text style={styles.businessAddress}>
              {userInfo?.address || ""}
            </Text>
          </View>
          <Text style={styles.receiptNumber}>
            Receipt No. {receiptNo || "000001"}
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
          <Text style={styles.dateTimeText}>{date}</Text>
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
            <Text style={styles.totalValue}>₱{change}</Text>
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
  businessInfo: {
    flexDirection: "column",
    flex: 1,
  },
  receiptTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 4,
  },
  businessAddress: {
    fontSize: 12,
    color: "#666",
    lineHeight: 16,
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

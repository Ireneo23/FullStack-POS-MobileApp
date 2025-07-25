import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import arrowIcon from "../../assets/images/greenArrow.png";
import { LinearGradient } from "expo-linear-gradient";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/PaymentHistoryScreen.styles";

const ReceiptCard = ({ item, onDelete, onPress }) => (
  <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
    <LinearGradient
      colors={["#0D3A2D", "#0B5B44"]}
      style={styles.card}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.cardHeader}>
        <View style={styles.receiptInfo}>
          <Text style={styles.receiptLabel}>Receipt No:</Text>
          <Text style={styles.receiptNumber}>{item.receiptNo}</Text>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(item.id)}
        >
          <Ionicons name="trash-outline" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.date}>{item.date}</Text>
      </View>
      <View style={styles.cardRow}>
        <Text style={styles.quantityLabel}>
          Quantity: <Text style={{ color: "#FFBB03" }}>{item.quantity}</Text>
        </Text>
        <Text style={styles.amount}>₱{item.totalAmount}</Text>
      </View>
    </LinearGradient>
  </TouchableOpacity>
);

export default function PaymentHistoryScreen() {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      const transactionsJson = await AsyncStorage.getItem("transactions");
      if (transactionsJson) {
        const loadedTransactions = JSON.parse(transactionsJson);
        setTransactions(loadedTransactions);
      }
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (transactionId) => {
    Alert.alert(
      "Delete Transaction",
      "Are you sure you want to delete this transaction?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const updatedTransactions = transactions.filter(
                (t) => t.id !== transactionId
              );
              await AsyncStorage.setItem(
                "transactions",
                JSON.stringify(updatedTransactions)
              );
              setTransactions(updatedTransactions);
            } catch (error) {
              console.error("Error deleting transaction:", error);
              Alert.alert("Error", "Failed to delete transaction");
            }
          },
        },
      ]
    );
  };

  // Load transactions when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="PAYMENT HISTORY"
        onBack={() => navigation.goBack()}
      />

      {/* Transaction List */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0D3A2D" />
        </View>
      ) : transactions.length > 0 ? (
        <FlatList
          data={transactions}
          renderItem={({ item }) => (
            <ReceiptCard
              item={item}
              onDelete={handleDelete}
              onPress={() =>
                navigation.navigate("PaymentComplete", { transaction: item })
              }
            />
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No transactions found</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

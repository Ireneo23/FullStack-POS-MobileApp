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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  card: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  receiptInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  receiptLabel: {
    fontSize: 12,
    color: "#fff",
  },
  receiptNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
  },
  date: {
    fontSize: 12,
    color: "#fff",
  },
  quantityLabel: {
    fontSize: 12,
    color: "#fff",
  },

  amount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFBB03",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 12,
    color: "#666",
  },
});

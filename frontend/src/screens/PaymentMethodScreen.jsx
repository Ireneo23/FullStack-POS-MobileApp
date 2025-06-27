import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import arrowIcon from "../../assets/images/greenArrow.png";
import HeaderComponent from "../components/HeaderComponent";

export default function PaymentMethodScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const amount = route.params?.amount || "0.00";

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="PAYMENT METHOD"
        onBack={() => navigation.goBack()}
      />

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.amountLabel}>Amount Payable</Text>
        <Text style={styles.amountValue}>₱{amount}</Text>

        {/* Payment Options */}
        <View style={styles.paymentOptions}>
          <TouchableOpacity
            style={styles.cashButton}
            onPress={() =>
              navigation.navigate("CashPayment", {
                amount: amount,
                orderItems: route.params?.orderItems || [],
                paymentMethod: "Cash",
                receiptNumber: route.params?.receiptNumber,
              })
            }
          >
            <Text style={styles.cashButtonText}>CASH</Text>
          </TouchableOpacity>

          <Text style={styles.orText}>OR</Text>

          <TouchableOpacity
            style={styles.paymentButton}
            onPress={() =>
              navigation.navigate("GcashConfirmation", {
                amount: amount,
                orderItems: route.params?.orderItems || [],
                receiptNumber: route.params?.receiptNumber,
              })
            }
          >
            <Text style={styles.paymentButtonText}>G-Cash</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Footer */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 8,
  },
  amountValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#B36718",
    marginBottom: 48,
  },
  paymentOptions: {
    width: "100%",
    alignItems: "center",
  },
  cashButton: {
    backgroundColor: "#6B9774",
    width: "100%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cashButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6B9774",
    marginBottom: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  confirmButton: {
    backgroundColor: "#8B4513",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  confirmButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  paymentButton: {
    backgroundColor: "#6B9774",
    width: "100%",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

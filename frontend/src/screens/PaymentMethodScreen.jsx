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
import styles from "../style/PaymentMethodScreen.styles";

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

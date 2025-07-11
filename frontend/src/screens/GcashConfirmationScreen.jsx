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
import styles from "../style/GcashConfirmationScreen.styles";
export default function GcashConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, orderItems } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="G-CASH PAMENT METHOD"
        onBack={() => navigation.goBack()}
      />

      {/* Main Content */}
      <View style={styles.content}>
        {/* GCash Logo */}
        <Image
          source={require("../../assets/images/gcash-logo.png")}
          style={styles.gcashLogo}
          resizeMode="contain"
        />

        {/* Payment Confirmation Text */}
        <Text style={styles.confirmationText}>Payment Confirmation</Text>
        <View style={styles.divider} />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() =>
            navigation.navigate("PaymentComplete", {
              amount,
              amountReceived: amount,
              orderItems,
              paymentMethod: "GCash",
              receiptNumber: route.params?.receiptNumber,
            })
          }
        >
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

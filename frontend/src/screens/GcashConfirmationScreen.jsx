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
export default function GcashConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { amount, orderItems } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={arrowIcon}
            style={{
              width: 32,
              height: 24,
              transform: [{ scaleX: -1 }],
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>G-CASH PAYMENT METHOD</Text>
        <View style={styles.headerRight} />
      </View>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0D3A2D",
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  gcashLogo: {
    width: 200,
    height: 100,
    marginTop: 32,
  },
  confirmationText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginTop: 40,
    fontFamily: "serif",
  },
  divider: {
    width: "80%",
    height: 1,
    backgroundColor: "#6B9774",
    marginTop: 16,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  confirmButton: {
    backgroundColor: "#6B9774",
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
});

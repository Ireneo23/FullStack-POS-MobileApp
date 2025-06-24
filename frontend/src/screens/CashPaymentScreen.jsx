import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import arrowIcon from "../../assets/images/greenArrow.png";

export default function CashPaymentScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const [amountReceived, setAmountReceived] = useState("");
  const amountPayable = route.params?.amount || "45.00";
  const orderItems = route.params?.orderItems || [];

  const billOptions = [10, 20, 50, 100, 200, 300, 400, 500, 1000];

  const handleBillSelect = (amount) => {
    setAmountReceived(amount.toString());
  };

  const handleExactAmount = () => {
    setAmountReceived(amountPayable);
  };

  const isAmountSufficient =
    parseFloat(amountReceived) >= parseFloat(amountPayable);
  const change = isAmountSufficient
    ? (parseFloat(amountReceived) - parseFloat(amountPayable)).toFixed(2)
    : "0.00";

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
        <Text style={styles.headerTitle}>CASH PAYMENT METHOD</Text>
        <View style={styles.headerRight} />
      </View>

      {/* Main Content */}
      <View style={styles.mainContent}>
        {/* Amount Payable Section */}
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount Payable</Text>
          <Text style={styles.amountValue}>₱{amountPayable}</Text>
        </View>

        {/* Amount Received Input */}
        <View style={styles.inputSection}>
          <Text style={styles.inputLabel}>Amount Received</Text>
          <TextInput
            style={[
              styles.input,
              !isAmountSufficient &&
                amountReceived !== "" &&
                styles.insufficientInput,
            ]}
            placeholder="₱50.00"
            value={amountReceived}
            onChangeText={setAmountReceived}
            keyboardType="numeric"
          />
          {!isAmountSufficient && amountReceived !== "" && (
            <Text style={styles.errorText}>
              Insufficient amount. Please enter ₱{amountPayable} or more.
            </Text>
          )}
        </View>

        {/* Change Amount */}
        <View style={styles.changeSection}>
          <Text style={styles.changeLabel}>Change Amount</Text>
          <Text style={styles.changeValue}>₱{change}</Text>
        </View>

        {/* Bill Options */}
        <View style={styles.billSection}>
          <View style={styles.divider} />
          <Text style={styles.billLabel}>Type or select bill tendered</Text>
          <View style={styles.divider} />

          <View style={styles.billGrid}>
            {billOptions.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={styles.billButton}
                onPress={() => handleBillSelect(amount)}
              >
                <Text style={styles.billButtonText}>₱{amount}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={styles.exactAmountButton}
            onPress={handleExactAmount}
          >
            <Text style={styles.exactAmountButtonText}>EXACT AMOUNT</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Proceed Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.proceedButton,
            (!isAmountSufficient || amountReceived === "") &&
              styles.disabledButton,
          ]}
          onPress={() =>
            navigation.navigate("PaymentComplete", {
              amount: amountPayable,
              amountReceived: amountReceived,
              orderItems: orderItems,
              paymentMethod: "Cash",
              receiptNumber: route.params?.receiptNumber,
            })
          }
          disabled={!isAmountSufficient || amountReceived === ""}
        >
          <Text style={styles.proceedButtonText}>PROCEED</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginTop: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0D3A2D",
  },
  headerRight: {
    width: 40,
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  amountSection: {
    paddingVertical: 4,
    alignItems: "center",
  },
  amountLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 2,
  },
  amountValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#B36718",
  },
  inputSection: {
    paddingVertical: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
  },
  billSection: {
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  billLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#6B9774",
    textAlign: "center",
    marginVertical: 8,
  },
  billGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  billButton: {
    width: "30%",
    backgroundColor: "#6B9774",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  billButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  exactAmountButton: {
    backgroundColor: "#6B9774",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  exactAmountButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    marginBottom: 32,
  },
  proceedButton: {
    backgroundColor: "#6B9774",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  insufficientInput: {
    borderColor: "#ff0000",
    borderWidth: 2,
  },
  errorText: {
    color: "#ff0000",
    fontSize: 14,
    marginTop: 4,
  },
  changeSection: {
    paddingVertical: 4,
    alignItems: "center",
  },
  changeLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 2,
  },
  changeValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#B36718",
  },
  disabledButton: {
    backgroundColor: "#cccccc",
    opacity: 0.7,
  },
});

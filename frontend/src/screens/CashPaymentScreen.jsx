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
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/CashPaymentScreen.styles";

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
      <HeaderComponent
        title="CASH PAYMENT METHOD"
        onBack={() => navigation.goBack()}
      />

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

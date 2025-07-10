import React, { useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderComponent from "../components/HeaderComponent";
import { useUser } from "../context/UserContext";
import styles from "../style/BusinessInformation.styles";

const { width, height } = Dimensions.get("window");

const BusinessInformation = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { updateUserInfo } = useUser();

  // Get sign-up data from route params
  const signUpData = route.params?.signUpData || {};

  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleProceed = async () => {
    const { businessName, address } = formData;

    if (!businessName.trim() || !address.trim()) {
      Alert.alert("Input Error", "Please fill all fields.");
      return;
    }

    try {
      // Save all user information including sign-up data and business info
      await updateUserInfo({
        ...signUpData, // firstName, lastName, email from sign-up
        businessName,
        address,
      });

      console.log("Business information:", { businessName, address });
      Alert.alert("Success", "Business information saved successfully!");
      navigation.reset({
        index: 0,
        routes: [{ name: "MainTabs" }],
      });
    } catch (error) {
      Alert.alert("Error", "Failed to save information. Please try again.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/login-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <HeaderComponent
          title="Business Information"
          onBack={() => navigation.goBack()}
        />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Business Information</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Business Name"
              placeholderTextColor="#817C7C"
              value={formData.businessName}
              onChangeText={(value) => handleInputChange("businessName", value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Address"
              placeholderTextColor="#817C7C"
              value={formData.address}
              onChangeText={(value) => handleInputChange("address", value)}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          <TouchableOpacity
            style={styles.proceedButton}
            onPress={handleProceed}
          >
            <Text style={styles.proceedButtonText}>Proceed</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};

export default BusinessInformation;

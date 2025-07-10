import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import arrowIcon from "../../assets/images/greenArrow.png";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/MyAccountScreen.styles";

const { width } = Dimensions.get("window");

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const { userInfo, updateUserInfo, isLoading } = useUser();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!isLoading && userInfo) {
      setFirstName(userInfo.firstName || "");
      setLastName(userInfo.lastName || "");
      setEmail(userInfo.email || "");
      setBusinessName(userInfo.businessName || "");
      setAddress(userInfo.address || "");
    }
  }, [userInfo, isLoading]);

  const handleSave = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !businessName.trim() ||
      !address.trim()
    ) {
      Alert.alert("Input Error", "Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Input Error", "Please enter a valid email address.");
      return;
    }

    await updateUserInfo({
      firstName,
      lastName,
      email,
      businessName,
      address,
    });

    Alert.alert("Success", "Information saved successfully!");
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent title="BIO-DATA" onBack={() => navigation.goBack()} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Profile Icon */}
          <View style={styles.avatarContainer}>
            <View style={styles.avatarCircle}>
              <MaterialCommunityIcons
                name="account"
                size={54}
                color="#A18AFF"
              />
            </View>
          </View>
          {/* User Name */}
          <Text style={styles.userName}>
            {userInfo.firstName || userInfo.lastName
              ? `${userInfo.firstName} ${userInfo.lastName}`
              : "User"}
          </Text>
          {/* Personal Info Card */}
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your first name"
                placeholderTextColor="#BDBDBD"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your last name"
                placeholderTextColor="#BDBDBD"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="your.email@example.com"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
          {/* Business Info Section */}
          <Text style={styles.sectionTitle}>Business Information</Text>
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Business Name</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your business name"
                placeholderTextColor="#BDBDBD"
                value={businessName}
                onChangeText={setBusinessName}
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your business address"
                placeholderTextColor="#BDBDBD"
                value={address}
                onChangeText={setAddress}
              />
            </View>
          </View>
          {/* Change Password Section */}

          <TouchableOpacity
            style={styles.changePasswordButton}
            onPress={() => navigation.navigate("ChangePasswordScreen")}
          >
            <Text style={styles.changePasswordButtonText}>Change Password</Text>
          </TouchableOpacity>
          {/* Save Button */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default MyAccountScreen;

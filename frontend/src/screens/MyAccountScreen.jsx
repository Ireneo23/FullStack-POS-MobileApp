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
      <View style={styles.topBar}>
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
        <Text style={styles.topBarTitle}>Bio-data</Text>
        <View style={{ width: 40 }} />
      </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 4,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A34",
    textAlign: "center",
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#A18AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  userName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A34",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1E3A34",
    backgroundColor: "#F9F9F9",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A34",
    marginBottom: 8,
    marginLeft: 2,
  },

  changePasswordButton: {
    backgroundColor: "#6B9774",
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  changePasswordButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#6B9774",
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    width: width - 40,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default MyAccountScreen;

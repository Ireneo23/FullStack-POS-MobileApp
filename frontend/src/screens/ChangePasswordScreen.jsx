import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TextInput,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import arrowIcon from "../../assets/images/greenArrow.png";

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "New password and confirm password do not match.");
      return;
    }
    if (newPassword.length < 6) {
      Alert.alert("Error", "Password should be at least 6 characters.");
      return;
    }
    // Simulate success
    Alert.alert("Success", "Password changed successfully!", [
      {
        text: "OK",
        onPress: () => navigation.goBack(),
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
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
        <Text style={styles.topBarTitle}>Change Password</Text>
        <View style={{ width: 40 }} />
      </View>
      {/* Main Section */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.mainSection}>
          <Text style={styles.title}>Set a new password</Text>
          <Text style={styles.subtitle}>
            Create a new password. Ensure it differs from previous ones for
            security
          </Text>
          {/* Current Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              placeholderTextColor="#888"
              secureTextEntry={!showCurrent}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowCurrent((prev) => !prev)}
            >
              <Ionicons
                name={showCurrent ? "eye" : "eye-off"}
                size={22}
                color="#6B9774"
              />
            </TouchableOpacity>
          </View>
          {/* New Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="New Password"
              placeholderTextColor="#888"
              secureTextEntry={!showNew}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowNew((prev) => !prev)}
            >
              <Ionicons
                name={showNew ? "eye" : "eye-off"}
                size={22}
                color="#6B9774"
              />
            </TouchableOpacity>
          </View>
          {/* Confirm Password */}
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#888"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowConfirm((prev) => !prev)}
            >
              <Ionicons
                name={showConfirm ? "eye" : "eye-off"}
                size={22}
                color="#6B9774"
              />
            </TouchableOpacity>
          </View>
          {/* Button */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleChangePassword}
          >
            <Text style={styles.buttonText}>Change Password</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
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
    marginLeft: 4,
  },
  topBarTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#083C2D",
    textAlign: "center",
    flex: 1,
  },
  mainSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A34",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 22,
    lineHeight: 18,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1E3A34",
  },
  eyeIcon: {
    padding: 6,
  },
  button: {
    backgroundColor: "#6B9774",
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default ChangePasswordScreen;

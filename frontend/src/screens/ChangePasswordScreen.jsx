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
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/ChangePasswordScreen.styles";

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
      <HeaderComponent
        title="CHANGE PASSWORD"
        onBack={() => navigation.goBack()}
      />
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

export default ChangePasswordScreen;

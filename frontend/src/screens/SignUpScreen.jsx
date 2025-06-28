import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSignUp = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      Alert.alert("Input Error", "Please fill all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Input Error", "Please enter a valid email address.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Input Error", "Passwords do not match.");
      return;
    }

    if (!isTermsAccepted) {
      Alert.alert(
        "Input Error",
        "Please accept the Terms and Conditions and Privacy Policy."
      );
      return;
    }

    console.log("User signed up:", { firstName, lastName, email });
    Alert.alert("Success", "Account created successfully!");

    // Pass sign-up data to BusinessInformation screen
    navigation.navigate("BusinessInformation", {
      signUpData: {
        firstName,
        lastName,
        email,
      },
    });
  };

  const navigateToTerms = (type) => {
    navigation.navigate("Terms", { type });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ImageBackground
        source={require("../../assets/images/login-bg.png")}
        style={styles.background}
        resizeMode="cover"
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Sign Up</Text>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="First Name"
                  placeholderTextColor="#817C7C"
                  value={formData.firstName}
                  onChangeText={(value) =>
                    handleInputChange("firstName", value)
                  }
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Last Name"
                  placeholderTextColor="#817C7C"
                  value={formData.lastName}
                  onChangeText={(value) => handleInputChange("lastName", value)}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#817C7C"
                  value={formData.email}
                  onChangeText={(value) => handleInputChange("email", value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#817C7C"
                  value={formData.password}
                  onChangeText={(value) => handleInputChange("password", value)}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#6B9774"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#817C7C"
                  value={formData.confirmPassword}
                  onChangeText={(value) =>
                    handleInputChange("confirmPassword", value)
                  }
                  secureTextEntry={!showConfirmPassword}
                />
                <TouchableOpacity
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={styles.eyeIcon}
                >
                  <Icon
                    name={showConfirmPassword ? "eye" : "eye-off"}
                    size={24}
                    color="#6B9774"
                  />
                </TouchableOpacity>
              </View>

              {/* Terms and Conditions Checkbox */}
              <View style={styles.termsContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setIsTermsAccepted(!isTermsAccepted)}
                >
                  <View
                    style={[
                      styles.checkbox,
                      isTermsAccepted && styles.checkboxChecked,
                    ]}
                  >
                    {isTermsAccepted && (
                      <Icon name="check" size={16} color="#fff" />
                    )}
                  </View>
                  <Text style={styles.termsText}>
                    I've read and agree with the{" "}
                    <Text
                      style={styles.linkText}
                      onPress={() => navigateToTerms("terms")}
                    >
                      Terms and Conditions
                    </Text>{" "}
                    and the{" "}
                    <Text
                      style={styles.linkText}
                      onPress={() => navigateToTerms("privacy")}
                    >
                      Privacy Policy
                    </Text>
                    .
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.signUpButton}
                onPress={handleSignUp}
              >
                <Text style={styles.signUpButtonText}>Sign Up</Text>
              </TouchableOpacity>

              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                  <Text style={styles.signInButton}>Sign In</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#171725",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
    borderColor: "#6B9774",
    borderWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#171725",
  },
  eyeIcon: {
    padding: 5,
  },
  signUpButton: {
    backgroundColor: "#6B9774",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    elevation: 3,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signInText: {
    color: "#171725",
    fontSize: 16,
    marginRight: 5,
  },
  signInButton: {
    color: "#0D3A2D",
    fontSize: 16,
    fontWeight: "600",
  },
  termsContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#6B9774",
    marginRight: 10,
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxChecked: {
    backgroundColor: "#6B9774",
  },
  termsText: {
    color: "#171725",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },
  linkText: {
    color: "#007AFF",
    fontSize: 14,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
});

export default SignUpScreen;

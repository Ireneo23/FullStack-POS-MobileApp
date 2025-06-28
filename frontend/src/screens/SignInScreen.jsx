import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

const SignInScreen = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground
      source={require("../../assets/images/login-bg.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Sign In</Text>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#817C7C"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#817C7C"
              value={password}
              onChangeText={setPassword}
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

          <TouchableOpacity
            style={styles.signInButton}
            onPress={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: "MainTabs" }],
              })
            }
          >
            <Text style={styles.signInButtonText}>Sign In</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>Or continue with</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <Image
              source={require("../../assets/images/apple-logo.png")}
              style={styles.socialIcon}
            />
            <Text style={styles.socialButtonText}>Continue with Apple</Text>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
              <Text style={styles.signUpButton}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
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
    borderColor: "#6B9774",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    height: 50,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#171725",
    paddingHorizontal: 5,
  },
  eyeIcon: {
    padding: 5,
  },
  signInButton: {
    backgroundColor: "#6B9774",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    elevation: 3,
  },
  signInButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
  },
  orText: {
    marginHorizontal: 10,
    color: "#171725",
    fontSize: 14,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginBottom: 15,
    borderWidth: 0.5,
    borderColor: "#6B9774",
  },
  socialIcon: {
    width: 24,
    height: 24,
    marginRight: 15,
  },
  socialButtonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "500",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  signUpText: {
    color: "#171725",
    fontSize: 16,
    marginRight: 5,
  },
  signUpButton: {
    color: "#0D3A2D",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignInScreen;

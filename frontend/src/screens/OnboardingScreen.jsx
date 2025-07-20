import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/images/3dLogo.png";
import styles from "../style/OnboardingScreen.styles";
import logo1 from "../../assets/images/logo1.png";

const { width, height } = Dimensions.get("window");

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Image source={logo1} style={styles.logo} />
          <Text style={styles.subtitle}>
            <View>
              <Image
                source={require("../../assets/images/logo4.png")}
                style={styles.titleLogo}
              />
            </View>
            For All The Coffee Shop Needs.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignup}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;

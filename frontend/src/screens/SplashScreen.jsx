import React, { useEffect, useRef, useState } from "react";
import { View, Animated, Image, StyleSheet, Dimensions } from "react-native";

const starposSplash = require("../../assets/images/3dStar.png");
const splashScreenPOS = require("../../assets/images/3dLogo.png");

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const [showSecondImage, setShowSecondImage] = useState(false);
  const position = useRef(
    new Animated.ValueXY({ x: -width * 0.5, y: -height * 0.5 })
  ).current;
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animate falling from top left to center
    Animated.timing(position, {
      toValue: { x: 0, y: 0 },
      duration: 1200,
      useNativeDriver: true,
    }).start(() => {
      // After animation, swap image
      setShowSecondImage(true);
      // Fade in the second image
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        // Wait, then navigate
        setTimeout(() => {
          navigation.replace("Onboarding");
        }, 1500);
      });
    });
  }, [navigation, opacity, position]);

  return (
    <View style={styles.container}>
      {!showSecondImage ? (
        <Animated.Image
          source={starposSplash}
          style={[
            styles.image,
            {
              transform: [
                { translateX: position.x },
                { translateY: position.y },
              ],
              opacity,
            },
          ]}
          resizeMode="contain"
        />
      ) : (
        <Animated.Image
          source={splashScreenPOS}
          style={[styles.image, { opacity }]}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: width * 0.7,
    height: height * 0.7,
  },
});

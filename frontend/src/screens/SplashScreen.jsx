import React, { useEffect, useRef, useState } from "react";
import { View, Animated, StyleSheet, Dimensions } from "react-native";

const logo1 = require("../../assets/images/logo1.png");
const logo2 = require("../../assets/images/logo2.png");
const logo3 = require("../../assets/images/logo3.png");
const logo4 = require("../../assets/images/logo4.png");

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const [stage, setStage] = useState(0); // 0: logos moving, 1: logo1, 2: logo4 bounce, 3: logo4 beside logo1

  // Animations for logo2 and logo3
  // Start from left and right off-screen, move to center (overlap perfectly)
  const logo2X = useRef(new Animated.Value(-width * 0.3)).current; // left off-screen
  const logo3X = useRef(new Animated.Value(width * 0.3)).current; // right off-screen
  const logosOpacity = useRef(new Animated.Value(1)).current;

  // Animation for logo1
  const logo1Opacity = useRef(new Animated.Value(0)).current;

  // Animation for logo4
  const logo4Bounce = useRef(new Animated.Value(0)).current;
  const logo4X = useRef(new Animated.Value(width)).current;

  useEffect(() => {
    // Step 1: Move logos to center (overlap perfectly)
    Animated.parallel([
      Animated.timing(logo2X, {
        toValue: width / 2 - width * 0.2 - (width / 2 - width * 0.24), // 0
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(logo3X, {
        toValue: width / 2 - width * 0.2 - (width / 2 - width * 0.24), // 0
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Step 2: Fade out both logos
      Animated.timing(logosOpacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        setStage(1);
        // Step 3: Fade in logo1
        Animated.timing(logo1Opacity, {
          toValue: 1,
          duration: 350,
          useNativeDriver: true,
        }).start(() => {
          setStage(2);
          // Step 4: Bounce in logo4
          Animated.sequence([
            Animated.spring(logo4Bounce, {
              toValue: 1,
              friction: 3,
              tension: 80,
              useNativeDriver: true,
            }),
          ]).start(() => {
            setStage(3);
            // Step 5: Slide logo4 beside logo1
            Animated.timing(logo4X, {
              toValue: width * 0.05, // position beside logo1
              duration: 300,
              useNativeDriver: true,
            }).start(() => {
              setTimeout(() => {
                navigation.replace("Onboarding");
              }, 1200);
            });
          });
        });
      });
    });
  }, [
    logo2X,
    logo3X,
    logosOpacity,
    logo1Opacity,
    logo4Bounce,
    logo4X,
    navigation,
  ]);

  return (
    <View style={styles.container}>
      {/* Stage 0: Both logos moving to center */}
      {stage === 0 && (
        <>
          <Animated.Image
            source={logo2}
            style={[
              styles.logo,
              {
                left: width / 2 - width * 0.2, // center horizontally
                transform: [{ translateX: logo2X }],
                opacity: logosOpacity,
              },
            ]}
            resizeMode="contain"
          />
          <Animated.Image
            source={logo3}
            style={[
              styles.logo,
              {
                left: width / 2 - width * 0.2, // center horizontally
                transform: [{ translateX: logo3X }],
                opacity: logosOpacity,
              },
            ]}
            resizeMode="contain"
          />
        </>
      )}
      {/* Stage 1: Show logo1 at center */}
      {stage === 1 && (
        <Animated.Image
          source={logo1}
          style={[
            styles.logo,
            { left: width / 2 - width * 0.25, opacity: logo1Opacity },
          ]}
          resizeMode="contain"
        />
      )}
      {/* Stage 2: Bounce in logo4 over logo1 */}
      {stage === 2 && (
        <>
          <Animated.Image
            source={logo1}
            style={styles.logo}
            resizeMode="contain"
          />
        </>
      )}
      {/* Stage 3: Slide logo4 beside logo1 */}
      {stage === 3 && (
        <>
          <Animated.Image
            source={logo1}
            style={styles.logo}
            resizeMode="contain"
          />
          <Animated.Image
            source={logo4}
            style={[
              styles.logo4,
              {
                opacity: 1,
                transform: [{ translateX: logo4X }],
              },
            ]}
            resizeMode="contain"
          />
        </>
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
  logo: {
    position: "absolute",
    width: width * 0.3,
    height: width * 0.3,
    top: height / 2 - width * 0.25,
    left: width / 2 - width * 0.25,
  },
  logo4: {
    position: "absolute",
    width: width * 0.3,
    height: width * 0.3,
    top: height / 2 - width * 0.25,
    left: width / 2 - width * 0.25 + width * 0.18, // start over logo1, then slide right
  },
});

import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Animated,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import InventoryScreen from "../screens/InventoryScreen";
import SalesReportScreen from "../screens/SalesReportScreen";
import PaymentHistoryScreen from "../screens/PaymentHistoryScreen";
import AddScreen from "../screens/AddScreen";
import houseIcon from "../../assets/images/house.png";
import inventoryIcon from "../../assets/images/inventory.png";
import reportIcon from "../../assets/images/report.png";
import receiptIcon from "../../assets/images/receipt.png";
import add from "../../assets/images/add.png";

const Tab = createBottomTabNavigator();

const CustomTabBar = ({ state, descriptors, navigation }) => {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  useEffect(() => {
    state.routes.forEach((route, index) => {
      Animated.spring(animatedValues[index], {
        toValue: state.index === index ? 1 : 0,
        useNativeDriver: true,
        tension: 20,
        friction: 7,
      }).start();
    });
  }, [state.index]);

  return (
    <View style={styles.tabBarContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        const icon = options.tabBarIcon;
        const label = options.tabBarLabel;

        const scale = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.2],
        });

        const opacity = animatedValues[index].interpolate({
          inputRange: [0, 1],
          outputRange: [0.7, 1],
        });

        return (
          <Pressable
            key={route.key}
            onPress={() => navigation.navigate(route.name)}
            style={[styles.tabItem, route.name === "Add" && styles.addTabItem]}
          >
            <Animated.View
              style={[
                styles.iconContainer,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            >
              {route.name === "Home" && (
                <Image
                  source={houseIcon}
                  style={{
                    width: 28,
                    height: 28,

                    opacity: isFocused ? 1 : 0.8,
                  }}
                  resizeMode="contain"
                />
              )}
              {route.name === "Inventory" && (
                <Image
                  source={inventoryIcon}
                  style={{
                    width: 28,
                    height: 28,

                    opacity: isFocused ? 1 : 0.8,
                  }}
                  resizeMode="contain"
                />
              )}
              {route.name === "Add" && (
                <Image
                  source={add}
                  style={{
                    width: 44,
                    height: 44,

                    opacity: isFocused ? 1 : 0.8,
                  }}
                  resizeMode="contain"
                />
              )}
              {route.name === "Report" && (
                <Image
                  source={reportIcon}
                  style={{
                    width: 28,
                    height: 28,

                    opacity: isFocused ? 1 : 0.8,
                  }}
                  resizeMode="contain"
                />
              )}
              {route.name === "History" && (
                <Image
                  source={receiptIcon}
                  style={{
                    width: 28,
                    height: 28,

                    opacity: isFocused ? 1 : 0.8,
                  }}
                  resizeMode="contain"
                />
              )}
            </Animated.View>
            <Animated.Text
              style={[
                styles.tabLabel,
                isFocused && styles.activeTabLabel,
                route.name === "Add" && styles.addTabLabel,
                {
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            >
              {label}
            </Animated.Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default function CustomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={houseIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={{
          tabBarLabel: "Inventory",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={inventoryIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Add"
        component={AddScreen}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              source={houseIcon}
              style={{
                width: 44,
                height: 44,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Report"
        component={SalesReportScreen}
        options={{
          tabBarLabel: "Report",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={reportIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={PaymentHistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={receiptIcon}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
                opacity: focused ? 1 : 0.7,
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    height: 120,
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    paddingBottom: 32,
  },
  tabItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 12,
    color: "#8E8E93",
    marginTop: 4,
  },
  activeTabLabel: {
    color: "#0D3A2D",
    fontWeight: "500",
  },
});

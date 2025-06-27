import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../context/UserContext";
import arrowIcon from "../../assets/images/greenArrow.png";
import HeaderComponent from "../components/HeaderComponent";

const InformationScreen = () => {
  const navigation = useNavigation();
  const { userInfo } = useUser();

  const userFullName =
    userInfo.firstName || userInfo.lastName
      ? `${userInfo.firstName} ${userInfo.lastName}`.trim()
      : "User";

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <HeaderComponent title="INFORMATION" onBack={() => navigation.goBack()} />

      {/* Account Details Card */}
      <View style={styles.accountCard}>
        <View style={styles.accountRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.accountName}>{userFullName}</Text>
            <Text style={styles.accountSubtext}>
              {userInfo.businessName || "Business Name"}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.editIconBtn}
            onPress={() => navigation.navigate("MyAccountScreen")}
          >
            <MaterialCommunityIcons name="pencil" size={22} color="#FFBB03" />
          </TouchableOpacity>
        </View>
        <View style={styles.accountAddress}>
          <Text style={styles.accountAddressText}>
            {userInfo.address || "No address set"}
          </Text>
        </View>
      </View>

      {/* Menu Section */}
      <View style={styles.menuSection}>
        <MenuItem
          icon={
            <MaterialCommunityIcons
              name="account-circle"
              size={28}
              color="#A18AFF"
            />
          }
          title="My Account"
          description="Make changes to your account"
          onPress={() => navigation.navigate("MyAccountScreen")}
        />
        <MenuItem
          icon={
            <MaterialCommunityIcons
              name="information-outline"
              size={28}
              color="#A18AFF"
            />
          }
          title="About App"
          onPress={() => {}}
        />
        <MenuItem
          icon={
            <MaterialCommunityIcons name="logout" size={28} color="#A18AFF" />
          }
          title="Log out"
          description="Further secure your account for safety"
          onPress={() => {
            Alert.alert("Log out", "Are you sure you want to log out?", [
              { text: "Cancel", style: "cancel" },
              {
                text: "Yes",
                style: "destructive",
                onPress: () =>
                  navigation.reset({
                    index: 0,
                    routes: [{ name: "SignIn" }],
                  }),
              },
            ]);
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const MenuItem = ({ icon, title, description, onPress }) => (
  <TouchableOpacity
    style={styles.menuItem}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <View style={styles.menuIcon}>{icon}</View>
    <View style={styles.menuTextContainer}>
      <Text style={styles.menuTitle}>{title}</Text>
      {description && <Text style={styles.menuDescription}>{description}</Text>}
    </View>
    <Ionicons name="chevron-forward" size={22} color="#B0B0B0" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  accountCard: {
    backgroundColor: "#083C2D",
    borderRadius: 16,
    margin: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  accountName: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 2,
  },
  accountSubtext: {
    color: "#FFBB03",
    fontSize: 15,
    fontWeight: "600",
  },
  editIconBtn: {
    padding: 6,
    marginLeft: 8,
  },
  accountAddress: {
    marginTop: 6,
  },
  accountAddressText: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,
  },
  menuSection: {
    backgroundColor: "#fff",
    borderRadius: 18,
    marginHorizontal: 20,
    paddingVertical: 8,
    paddingHorizontal: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  menuIcon: {
    marginRight: 16,
    backgroundColor: "#F3F0FF",
    borderRadius: 8,
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  menuTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#083C2D",
  },
  menuDescription: {
    fontSize: 13,
    color: "#6B9774",
    marginTop: 2,
  },
});

export default InformationScreen;

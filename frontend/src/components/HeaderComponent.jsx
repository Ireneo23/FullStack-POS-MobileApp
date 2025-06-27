import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import arrowIcon from "../../assets/images/greenArrow.png";

const HeaderComponent = ({ title, onBack }) => (
  <View style={styles.header}>
    <TouchableOpacity onPress={onBack} style={styles.backButton}>
      <Image
        source={arrowIcon}
        style={{
          width: 32,
          height: 24,
          transform: [{ scaleX: -1 }],
        }}
      />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <View style={styles.headerRight} />
  </View>
);

const styles = StyleSheet.create({
  header: {
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
    padding: 8,
  },
  headerTitle: {
    color: "#0D3A2D",
    fontSize: 12,
    fontWeight: "bold",
  },
  headerRight: {
    width: 40,
  },
});

export default HeaderComponent;

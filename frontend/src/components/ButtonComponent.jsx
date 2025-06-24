import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const ButtonComponent = ({ onPress, title, style, textStyle }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6B9774",
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 32,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ButtonComponent;

import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    marginBottom: 64,
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
    margin: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#171725",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderColor: "#6B9774",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    minHeight: 50,
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#171725",
    paddingVertical: 10,
  },
  proceedButton: {
    backgroundColor: "#6B9774",
    borderRadius: 25,
    paddingVertical: 15,
    marginTop: 20,
    elevation: 3,
  },
  proceedButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default styles; 
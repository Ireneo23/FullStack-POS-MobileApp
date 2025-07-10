import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  mainSection: {
    marginTop: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1E3A34",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    color: "#888",
    marginBottom: 22,
    lineHeight: 18,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1E3A34",
  },
  eyeIcon: {
    padding: 6,
  },
  button: {
    backgroundColor: "#6B9774",
    borderRadius: 22,
    paddingVertical: 16,
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default styles; 
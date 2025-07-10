import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  avatarContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  avatarCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    elevation: 2,
    shadowColor: "#A18AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
  },
  userName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E3A34",
    marginBottom: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: "#1E3A34",
    backgroundColor: "#F9F9F9",
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1E3A34",
    marginBottom: 8,
    marginLeft: 2,
  },

  changePasswordButton: {
    backgroundColor: "#6B9774",
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 8,
  },
  changePasswordButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#6B9774",
    borderRadius: 22,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    width: width - 40,
    alignSelf: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "bold",
    letterSpacing: 1,
  },
});

export default styles; 
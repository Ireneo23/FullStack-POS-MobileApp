import { StyleSheet } from "react-native";

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

export default styles; 
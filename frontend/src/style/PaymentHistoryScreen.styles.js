import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  listContainer: {
    paddingHorizontal: 8,
    paddingTop: 8,
  },
  card: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  receiptInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
  },
  receiptLabel: {
    fontSize: 12,
    color: "#fff",
  },
  receiptNumber: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 4,
  },
  date: {
    fontSize: 12,
    color: "#fff",
  },
  quantityLabel: {
    fontSize: 12,
    color: "#fff",
  },

  amount: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#FFBB03",
  },
  deleteButton: {
    padding: 8,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
    width: 36,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 12,
    color: "#666",
  },
});

export default styles; 
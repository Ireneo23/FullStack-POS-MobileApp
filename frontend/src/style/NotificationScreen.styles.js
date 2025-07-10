import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginBottom: 50,
  },
  card: {
    backgroundColor: "#FAF3EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  unreadCard: {
    backgroundColor: "#0D3A2D",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  date: {
    color: "#0D3A2D",
    fontSize: 12,
    fontWeight: "500",
  },
  unreadText: {
    color: "#fff",
  },
  deleteButton: {
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: "#0D3A2D",
    marginBottom: 12,
    lineHeight: 20,
  },
  markAsReadButton: {
    alignSelf: "flex-start",
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFBB03",
    borderRadius: 6,
  },
  markAsReadText: {
    color: "#0D3A2D",
    fontSize: 12,
    fontWeight: "600",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});

export default styles; 
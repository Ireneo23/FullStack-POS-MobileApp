import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#f5f5f5",
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
    tableHeader: {
      flexDirection: "row",
      backgroundColor: "#fff",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    headerCell: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#666",
    },
    tableContent: {
      flex: 1,
    },
    row: {
      flexDirection: "row",
      backgroundColor: "#fff",
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#e0e0e0",
    },
    cell: {
      fontSize: 13,
      color: "#333",
    },
    nameCell: {
      flex: 1,
    },
    quantityCell: {
      flex: 1,
      textAlign: "center",
    },
    costCell: {
      flex: 1,
      textAlign: "center",
    },
    dateCell: {
      flex: 1,
      textAlign: "right",
    },
    lowInventory: {
      color: "#ff0000",
    },
    boldText: {
      fontWeight: "bold",
    },
    emptyContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    emptyText: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
    },
    modal: {
      margin: 0,
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: "#fff",
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingBottom: 32,
    },
    modalHeader: {
      padding: 20,
      alignItems: "center",
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#333",
    },
    separator: {
      height: 1,
      backgroundColor: "#e0e0e0",
      width: "100%",
      marginTop: 16,
    },
    quantityContainer: {
      padding: 20,
      alignItems: "center",
    },
    quantityText: {
      fontSize: 18,
      color: "#333",
    },
    optionsContainer: {
      padding: 20,
    },
    optionsTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#666",
      marginBottom: 16,
    },
    buttonContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: 16,
      paddingHorizontal: 16,
    },
    button: {
      flex: 1,
      padding: 16,
      borderRadius: 8,
      alignItems: "center",
    },
    deleteButton: {
      backgroundColor: "#ff4444",
    },
    stockButton: {
      backgroundColor: "#8B4513",
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    inputContainer: {
      padding: 16,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#666",
      marginBottom: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: "#e0e0e0",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      backgroundColor: "#fff",
    },
    cancelButton: {
      backgroundColor: "#ff4444",
    },
    addButton: {
      backgroundColor: "#4CAF50",
    },
  });

  export default styles;
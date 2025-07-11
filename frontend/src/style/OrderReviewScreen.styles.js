import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
  
    receiptInfo: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: "#eee",
    },
    receiptNumber: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0D3A2D",
      marginBottom: 4,
    },
    dateTime: {
      fontSize: 14,
      color: "#666",
    },
    orderList: {
      padding: 16,
    },
    orderItem: {
      flexDirection: "row",
      marginBottom: 16,
      backgroundColor: "#fff",
      borderRadius: 8,
      padding: 12,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    orderItemImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    orderItemDetails: {
      flex: 1,
      marginLeft: 12,
      justifyContent: "center",
    },
    orderItemName: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 4,
    },
    orderItemPrice: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    quantityControls: {
      flexDirection: "row",
      alignItems: "center",
    },
    quantityButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: "#6B9774",
      justifyContent: "center",
      alignItems: "center",
    },
    quantityText: {
      fontSize: 16,
      fontWeight: "bold",
      marginHorizontal: 12,
      color: "#0D3A2D",
    },
    orderItemRight: {
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginLeft: 12,
    },
    orderItemTotal: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#B36718",
    },
    deleteButton: {
      padding: 8,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#eee",
      backgroundColor: "#fff",
    },
    totalContainer: {
      marginBottom: 16,
      backgroundColor: "#0D3A2D",
      padding: 16,
      borderRadius: 8,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    totalLabel: {
      fontSize: 16,
      color: "#fff",
    },
    totalValue: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#FFBB03",
    },
    confirmButton: {
      backgroundColor: "#6B9774",
      paddingVertical: 16,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 16,
    },
    confirmButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    }, 
});

export default styles;
import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    scrollView: {
      flex: 1,
    },
    receiptInfo: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 16,
      backgroundColor: "#fff",
    },
    businessInfo: {
      flexDirection: "column",
      flex: 1,
    },
    receiptTitle: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0D3A2D",
      marginBottom: 4,
    },
    businessAddress: {
      fontSize: 12,
      color: "#666",
      lineHeight: 16,
    },
    receiptNumber: {
      fontSize: 16,
      color: "#6B9774",
    },
    itemDetails: {
      backgroundColor: "#fff",
      padding: 16,
      marginTop: 8,
    },
    tableHeader: {
      flexDirection: "row",
      marginBottom: 8,
    },
    tableHeaderText: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#0D3A2D",
    },
    divider: {
      height: 1,
      backgroundColor: "#ddd",
      marginVertical: 8,
    },
    tableRow: {
      flexDirection: "row",
      marginVertical: 8,
    },
    tableCell: {
      fontSize: 14,
      color: "#333",
    },
    dateTimeContainer: {
      padding: 16,
      backgroundColor: "#fff",
      marginTop: 8,
    },
    dateTimeText: {
      fontSize: 14,
      color: "#666",
      textAlign: "center",
    },
    totalsSection: {
      backgroundColor: "#fff",
      padding: 16,
      marginTop: 8,
    },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 8,
    },
    totalLabel: {
      fontSize: 14,
      color: "#666",
    },
    totalValue: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#B36718",
    },
    customerInfo: {
      backgroundColor: "#fff",
      padding: 16,
      marginTop: 8,
    },
    customerLabel: {
      fontSize: 14,
      color: "#666",
      marginBottom: 8,
    },
    customerInput: {
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 12,
      fontSize: 16,
      color: "#333",
    },
    printButton: {
      backgroundColor: "#6B9774",
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
      marginHorizontal: 16,
      marginBottom: 64,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    printButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
    },
    footer: {
      padding: 16,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
    },
  });

export default styles
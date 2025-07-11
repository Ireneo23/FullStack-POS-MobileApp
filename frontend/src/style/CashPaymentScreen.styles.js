import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
    },
    mainContent: {
      flex: 1,
      paddingHorizontal: 16,
      paddingTop: 8,
    },
    amountSection: {
      paddingVertical: 4,
      alignItems: "center",
    },
    amountLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0D3A2D",
      marginBottom: 2,
    },
    amountValue: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#B36718",
    },
    inputSection: {
      paddingVertical: 8,
    },
    inputLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#0D3A2D",
      marginBottom: 4,
    },
    input: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#ddd",
      borderRadius: 8,
      padding: 8,
      fontSize: 16,
    },
    billSection: {
      paddingVertical: 4,
    },
    divider: {
      height: 1,
      backgroundColor: "#ddd",
      marginVertical: 8,
    },
    billLabel: {
      fontSize: 14,
      fontWeight: "bold",
      color: "#6B9774",
      textAlign: "center",
      marginVertical: 8,
    },
    billGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-between",
      marginBottom: 16,
    },
    billButton: {
      width: "30%",
      backgroundColor: "#6B9774",
      padding: 8,
      borderRadius: 8,
      alignItems: "center",
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    billButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
    },
    exactAmountButton: {
      backgroundColor: "#6B9774",
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
      marginBottom: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    exactAmountButtonText: {
      color: "#fff",
      fontSize: 14,
      fontWeight: "bold",
    },
    footer: {
      padding: 16,
      backgroundColor: "#fff",
      borderTopWidth: 1,
      borderTopColor: "#ddd",
      marginBottom: 32,
    },
    proceedButton: {
      backgroundColor: "#6B9774",
      padding: 12,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    proceedButtonText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "bold",
    },
    insufficientInput: {
      borderColor: "#ff0000",
      borderWidth: 2,
    },
    errorText: {
      color: "#ff0000",
      fontSize: 14,
      marginTop: 4,
    },
    changeSection: {
      paddingVertical: 4,
      alignItems: "center",
    },
    changeLabel: {
      fontSize: 14,
      color: "#666",
      marginBottom: 2,
    },
    changeValue: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#B36718",
    },
    disabledButton: {
      backgroundColor: "#cccccc",
      opacity: 0.7,
    },
  });
export default styles
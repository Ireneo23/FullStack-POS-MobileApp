import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      content: {
        flex: 1,
        padding: 24,
        alignItems: "center",
      },
      amountLabel: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0D3A2D",
        marginBottom: 8,
      },
      amountValue: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#B36718",
        marginBottom: 48,
      },
      paymentOptions: {
        width: "100%",
        alignItems: "center",
      },
      cashButton: {
        backgroundColor: "#6B9774",
        width: "100%",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      cashButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      orText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#6B9774",
        marginBottom: 16,
      },
      footer: {
        padding: 16,
        borderTopWidth: 1,
        borderTopColor: "#eee",
        backgroundColor: "#fff",
      },
      confirmButton: {
        backgroundColor: "#8B4513",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
        marginBottom: 32,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      confirmButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
      paymentButton: {
        backgroundColor: "#6B9774",
        width: "100%",
        padding: 12,
        borderRadius: 12,
        alignItems: "center",
        marginBottom: 16,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      paymentButtonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
      },
})


export default styles
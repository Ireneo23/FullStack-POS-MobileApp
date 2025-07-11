import { StyleSheet } from 'react-native'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    content: {
      flex: 1,
      alignItems: "center",
      padding: 24,
    },
    gcashLogo: {
      width: 200,
      height: 100,
      marginTop: 32,
    },
    confirmationText: {
      fontSize: 28,
      fontWeight: "bold",
      color: "#0D3A2D",
      marginTop: 40,
      fontFamily: "serif",
    },
    divider: {
      width: "80%",
      height: 1,
      backgroundColor: "#6B9774",
      marginTop: 16,
    },
    footer: {
      padding: 16,
      borderTopWidth: 1,
      borderTopColor: "#eee",
      backgroundColor: "#fff",
    },
    confirmButton: {
      backgroundColor: "#6B9774",
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
  });

export default styles
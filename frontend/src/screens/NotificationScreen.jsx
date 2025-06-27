import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Alert,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useNotifications } from "../context/NotificationContext";
import arrowIcon from "../../assets/images/greenArrow.png";
import HeaderComponent from "../components/HeaderComponent";

const NotificationCard = ({ notification, onDelete, onMarkAsRead }) => {
  return (
    <View style={[styles.card, !notification.read && styles.unreadCard]}>
      <View style={styles.cardHeader}>
        <Text style={[styles.date, !notification.read && styles.unreadText]}>
          {notification.date}
        </Text>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(notification.id)}
        >
          <MaterialCommunityIcons
            name="close"
            size={20}
            color="#0D3A2D"
            backgroundColor="#FFBB03"
            borderRadius={12}
            padding={2}
          />
        </TouchableOpacity>
      </View>
      <Text style={[styles.title, !notification.read && styles.unreadText]}>
        {notification.title}
      </Text>
      <Text style={[styles.message, !notification.read && styles.unreadText]}>
        {notification.message}
      </Text>
      {!notification.read && (
        <TouchableOpacity
          style={styles.markAsReadButton}
          onPress={() => onMarkAsRead(notification.id)}
        >
          <Text style={styles.markAsReadText}>Mark as Read</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default function NotificationScreen() {
  const navigation = useNavigation();
  const { notifications, deleteNotification, markAsRead } = useNotifications();

  const handleDelete = (id) => {
    Alert.alert(
      "Delete Notification",
      "Are you sure you want to delete this notification?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteNotification(id),
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="NOTIFICATION"
        onBack={() => navigation.goBack()}
      />

      {/* Notifications List */}
      <ScrollView style={styles.content}>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              onDelete={handleDelete}
              onMarkAsRead={markAsRead}
            />
          ))
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No notifications</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

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

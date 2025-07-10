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
import styles from "../style/NotificationScreen.styles";

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

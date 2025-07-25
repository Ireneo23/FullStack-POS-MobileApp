import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BarChartReport from "../charts/BarChartReport";
import PieChartReport from "../charts/PieChartReport";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card } from "react-native-paper";
import HeaderComponent from "../components/HeaderComponent";
import styles from "../style/SalesReportScreen.styles";

const { width } = Dimensions.get("window");

const DurationPicker = ({
  visible,
  onClose,
  selectedValue,
  onSelect,
  items,
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.modalOverlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Duration</Text>
            <TouchableOpacity onPress={onClose}>
              <MaterialCommunityIcons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.durationOptionsContainer}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={[
                  styles.durationOption,
                  selectedValue === item.value && styles.selectedDuration,
                ]}
                onPress={() => {
                  onSelect(item.value);
                  onClose();
                }}
              >
                <Text
                  style={[
                    styles.durationText,
                    selectedValue === item.value && styles.selectedDurationText,
                  ]}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const SalesReportScreen = () => {
  const navigation = useNavigation();
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showDurationPicker, setShowDurationPicker] = useState(false);
  const [duration, setDuration] = useState("Weekly");
  const [items] = useState([
    { label: "Single Day", value: "Single Day" },
    { label: "Daily", value: "Daily" },
    { label: "Weekly", value: "Weekly" },
    { label: "Monthly", value: "Monthly" },
    { label: "Yearly", value: "Yearly" },
  ]);

  const salesData = [500, 2300, 4000, 3700, 4673, 1200, 700];
  const totalSales = salesData.reduce((sum, value) => sum + value, 0);

  const barData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: salesData,
        colors: [
          (opacity = 1) => `rgba(107, 151, 116, ${opacity})`, // green
          (opacity = 1) => `rgba(13, 58, 45, ${opacity})`, // dark green
          (opacity = 1) => `rgba(179, 103, 24, ${opacity})`, // brown
          (opacity = 1) => `rgba(255, 187, 3, ${opacity})`, // yellow
          (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // blue
          (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // pink
          (opacity = 1) => `rgba(127, 0, 255, ${opacity})`, // light yellow
        ],
      },
    ],
  };

  const chartConfig = {
    backgroundColor: "#ffffff",
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#6B9774",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(13, 58, 45, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    formatYLabel: (value) => `₱${value}`,
    propsForLabels: {
      fontSize: 12,
    },
    barPercentage: 0.6,
    fillShadowGradient: "#6B9774",
    fillShadowGradientOpacity: 1,
    propsForBackgroundLines: {
      strokeDasharray: "",
      stroke: "#e0e0e0",
    },
  };

  const topSellers = [
    {
      name: "Ice Caramel Macchiato",
      value: 40,
      percentage: 40,
      color: "#6B9774",
    },
    { name: "Hot Dark Chocolate", value: 25, percentage: 25, color: "#0D3A2D" },
    { name: "Creamy Yogart", value: 20, percentage: 20, color: "#B36718" },
    { name: "Others", value: 15, percentage: 15, color: "#FFBB03" },
  ];

  const pieData = topSellers.map((item) => ({
    name: item.name,
    population: item.percentage,
    color: item.color,
    legendFontColor: "#7F7F7F",
    legendFontSize: 12,
  }));

  const handleDurationSelect = (selectedDuration) => {
    setDuration(selectedDuration);

    // Handle Single Day option
    if (selectedDuration === "Single Day") {
      // Set both dates to the start date
      setEndDate(startDate);
      // Automatically open the date picker
      setShowStartDatePicker(true);
    } else if (selectedDuration === "Daily") {
      // Set both dates to current day
      const today = new Date();
      setStartDate(today);
      setEndDate(today);
    } else if (selectedDuration === "Weekly") {
      // Set end date to 7 days after start date
      const newEndDate = new Date(startDate);
      newEndDate.setDate(startDate.getDate() + 6);
      setEndDate(newEndDate);
    } else if (selectedDuration === "Monthly") {
      // Set end date to last day of the month
      const newEndDate = new Date(
        startDate.getFullYear(),
        startDate.getMonth() + 1,
        0
      );
      setEndDate(newEndDate);
    } else if (selectedDuration === "Yearly") {
      // Set end date to last day of the year
      const newEndDate = new Date(startDate.getFullYear(), 11, 31);
      setEndDate(newEndDate);
    }
  };

  const onStartDateChange = (event, selectedDate) => {
    if (event?.type === "dismissed") {
      setShowStartDatePicker(false);
      return;
    }
    if (selectedDate) {
      if (duration === "Single Day") {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const picked = new Date(selectedDate);
        picked.setHours(0, 0, 0, 0);
        if (picked > today) {
          Alert.alert("Invalid Date", "You cannot select a future date.");
          setShowStartDatePicker(true); // keep picker open
          return;
        }
        setStartDate(selectedDate);
        setEndDate(selectedDate);
        setShowStartDatePicker(false);
      } else {
        setStartDate(selectedDate);
        setShowStartDatePicker(false);
      }
    } else {
      setShowStartDatePicker(false);
    }
  };

  const onEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
      // If duration is Single Day, update start date as well
      if (duration === "Single Day") {
        setStartDate(selectedDate);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <HeaderComponent
        title="SALES REPORT"
        onBack={() => navigation.goBack()}
      />

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Date Range and Report Filter */}
        <View style={styles.filterContainer}>
          <View style={styles.dateRangeContainer}>
            <Text style={styles.dateRangeLabel}>Date Range</Text>
            <View style={styles.dateButtonsContainer}>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowStartDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {startDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
              <Text style={styles.dateSeparator}>-</Text>
              <TouchableOpacity
                style={styles.dateButton}
                onPress={() => setShowEndDatePicker(true)}
              >
                <Text style={styles.dateButtonText}>
                  {endDate.toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.dropdownContainer}>
            <Text style={styles.dropdownLabel}>Select report duration</Text>
            <TouchableOpacity
              style={styles.durationButton}
              onPress={() => setShowDurationPicker(true)}
            >
              <Text style={styles.durationButtonText}>{duration}</Text>
              <MaterialCommunityIcons
                name="chevron-down"
                size={20}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Earnings History Section */}
        <Card style={styles.chartCard}>
          <View style={styles.chartHeader}>
            <Text style={styles.chartTitle}>Earnings History</Text>
            <Text style={styles.totalEarnings}>
              ₱{totalSales.toLocaleString()}
            </Text>
          </View>
          <View style={styles.chartContainer}>
            <BarChartReport
              data={barData}
              width={width - 46}
              height={220}
              chartConfig={{
                ...chartConfig,
                backgroundColor: "#fff",
                backgroundGradientFrom: "#fff",
                backgroundGradientTo: "#fff",
                propsForLabels: {
                  ...chartConfig.propsForLabels,
                  style: [
                    { ...chartConfig.propsForLabels?.style },
                    { marginLeft: 16 },
                  ],
                },
              }}
              style={styles}
            />
          </View>
        </Card>

        {/* Summary Cards */}
        <View style={styles.summaryGrid}>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Sales</Text>
            <Text style={styles.summaryValue}>
              ₱{totalSales.toLocaleString()}
            </Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Product Sold</Text>
            <Text style={styles.summaryValue}>100 items</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Total Transaction</Text>
            <Text style={styles.summaryValue}>80</Text>
          </Card>
          <Card style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Top-Selling Product</Text>
            <Text style={[styles.summaryValue, styles.topProductValue]}>
              Ice Caramel Macchiato
            </Text>
          </Card>
        </View>

        {/* Top Sellers Pie Chart */}
        <Card style={styles.pieChartCard}>
          <Text style={styles.pieChartTitle}>Top Sellers</Text>
          <View style={styles.pieChartContent}>
            <View style={styles.pieChartContainer}>
              <View style={styles.doughnutCenter}>
                <Text style={styles.pieChartCenter}>100</Text>
                <Text style={styles.pieChartCenterSubtitle}>
                  total products sold
                </Text>
              </View>
              <PieChartReport
                data={pieData}
                width={width + 40}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                center={[width / 4, 0]}
              />
            </View>
            <View style={styles.legendContainer}>
              {topSellers.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={styles.legendLeft}>
                    <View
                      style={[
                        styles.legendColor,
                        { backgroundColor: item.color },
                      ]}
                    />
                    <Text style={styles.legendText}>{item.name}</Text>
                  </View>
                  <View style={styles.legendRight}>
                    <Text style={styles.legendValue}>{item.value}</Text>
                    <Text style={styles.legendPercentage}>
                      {item.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </Card>
      </ScrollView>

      <DurationPicker
        visible={showDurationPicker}
        onClose={() => setShowDurationPicker(false)}
        selectedValue={duration}
        onSelect={handleDurationSelect}
        items={items}
      />

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate}
          mode="date"
          display="default"
          onChange={onStartDateChange}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate}
          mode="date"
          display="default"
          onChange={onEndDateChange}
        />
      )}
    </SafeAreaView>
  );
};

export default SalesReportScreen;

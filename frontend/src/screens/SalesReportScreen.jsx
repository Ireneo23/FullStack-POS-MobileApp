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
  Image,
  Alert,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LineChart, PieChart } from "react-native-chart-kit";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Card } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import arrowIcon from "../../assets/images/greenArrow.png";

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

  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: salesData,
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Blue color
        strokeWidth: 3,
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
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#0D3A2D",
    },
    formatYLabel: (value) => `₱${value}`,
    propsForLabels: {
      fontSize: 12,
    },
  };

  const renderDot = (props) => {
    const { x, y, index } = props;
    const isFriday = index === 4; // Friday is at index 4

    if (isFriday) {
      return (
        <View key={index}>
          <View
            style={[
              styles.tooltip,
              {
                left: x - 40,
                top: y - 60,
              },
            ]}
          >
            <Text style={styles.tooltipText}>₱4,673</Text>
          </View>
          <View
            style={[
              styles.dot,
              {
                left: x - 6,
                top: y - 6,
              },
            ]}
          />
        </View>
      );
    }
    return null;
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
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Image
            source={arrowIcon}
            style={{
              width: 32,
              height: 24,
              transform: [{ scaleX: -1 }],
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SALES REPORT</Text>
        <View style={styles.headerRight} />
      </View>

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
            <LineChart
              data={lineData}
              width={width - 48}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.lineChart}
              withInnerLines={false}
              withOuterLines={false}
              withVerticalLines={false}
              withHorizontalLines={false}
              renderDotContent={renderDot}
              segments={5}
              yAxisInterval={1}
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
              <PieChart
                data={pieData}
                width={width + 40}
                height={220}
                chartConfig={{
                  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                accessor="population"
                backgroundColor="transparent"
                paddingLeft="15"
                absolute
                hasLegend={false}
                center={[width / 4, 0]}
                avoidFalseZero
                doughnut
                showText={false}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
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
  content: {
    flex: 1,
    padding: 16,
  },
  filterContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  dateRangeContainer: {
    marginBottom: 16,
  },
  dateRangeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  dateButtonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateButton: {
    backgroundColor: "#6B9774",
    padding: 12,
    borderRadius: 12,
    flex: 1,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  dateButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
  },
  dateSeparator: {
    marginHorizontal: 12,
    color: "#666",
    fontSize: 16,
    fontWeight: "600",
  },
  dropdownContainer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    paddingTop: 16,
  },
  dropdownLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
    marginBottom: 8,
  },
  dropdown: {
    borderColor: "#ddd",
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: "#fff",
  },
  dropdownText: {
    fontSize: 14,
    color: "#333",
  },
  dropdownList: {
    borderColor: "#ddd",
    borderRadius: 12,
  },
  chartCard: {
    padding: 20,
    marginBottom: 24,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#fff",
  },
  chartHeader: {
    marginBottom: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  totalEarnings: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0D3A2D",
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  lineChart: {
    marginVertical: 4,
    borderRadius: 16,
  },
  summaryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  summaryCard: {
    width: "48%",
    padding: 20,
    marginBottom: 16,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#0D3A2D",
  },
  summaryTitle: {
    fontSize: 14,
    color: "#fff",
    marginBottom: 8,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFBB03",
  },
  topProductValue: {
    fontSize: 16,
  },
  pieChartCard: {
    padding: 20,
    borderRadius: 16,
    elevation: 3,
    backgroundColor: "#fff",
    marginBottom: 24,
  },
  pieChartTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  pieChartContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  pieChartContainer: {
    alignItems: "center",
    position: "relative",
    marginBottom: 20,
  },
  doughnutCenter: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: 18 }, { translateY: -40 }],
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex: 1,
  },
  pieChartCenter: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  pieChartCenterSubtitle: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
  },
  legendContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  legendLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  legendRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  legendText: {
    fontSize: 14,
    color: "#333",
    flex: 1,
  },
  legendValue: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  legendPercentage: {
    fontSize: 14,
    color: "#666",
    width: 45,
    textAlign: "right",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  durationOptionsContainer: {
    maxHeight: 400,
  },
  durationOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
  },
  selectedDuration: {
    backgroundColor: "#6B9774",
  },
  durationText: {
    fontSize: 16,
    color: "#333",
  },
  selectedDurationText: {
    color: "#fff",
    fontWeight: "600",
  },
  durationButton: {
    backgroundColor: "#6B9774",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  durationButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "#6B9774",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    zIndex: 1000,
  },
  tooltipText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  dot: {
    position: "absolute",
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0D3A2D",
    borderWidth: 2,
    borderColor: "#fff",
  },
});

export default SalesReportScreen;

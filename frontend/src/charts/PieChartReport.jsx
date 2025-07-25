import React from "react";
import { View } from "react-native";
import { PieChart } from "react-native-chart-kit";

const PieChartReport = ({ data, width, height, chartConfig, ...rest }) => (
  <View>
    <PieChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      accessor="population"
      backgroundColor="transparent"
      paddingLeft="15"
      absolute
      hasLegend={false}
      center={[width / 4, 0]}
      avoidFalseZero
      doughnut
      showText={false}
      {...rest}
    />
  </View>
);

export default PieChartReport;

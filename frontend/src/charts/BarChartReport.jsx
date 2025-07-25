import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";

const BarChartReport = ({ data, chartConfig, width, height, style }) => (
  <View style={style?.container}>
    <BarChart
      data={data}
      width={width}
      height={height}
      chartConfig={chartConfig}
      style={style?.barChart}
      fromZero
      showBarTops={false}
      withInnerLines={true}
      withHorizontalLabels={true}
      withCustomBarColorFromData={true}
      flatColor={true}
      yLabelsOffset={24}
    />
  </View>
);

export default BarChartReport;

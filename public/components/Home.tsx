import { View, ScrollView, Text, TouchableOpacity } from "react-native";
import { DataTable } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";
import { colors } from "../assets/colors";

const trades = [
  {
    ticker: "APPL",
    cost: "$300.00",
    pps: "$100.00",
    quantity: "3",
    politician: "Nancy Pelosi",
    type: "Buy",
  },
  {
    ticker: "GOOG",
    cost: "$942.00",
    pps: "$100.00",
    quantity: "3",
    politician: "Andrew Garbarino",
    type: "Buy",
  },
  {
    ticker: "APPL",
    cost: "$641.00",
    pps: "100",
    quantity: "3",
    politician: "Alan S. Lowenthal",
    type: "Sell",
  },
  {
    ticker: "TWTR",
    cost: "$340.00",
    pps: "100",
    quantity: "3",
    politician: "Marjorie Taylor Greene",
    type: "Sell",
  },
  {
    ticker: "GS",
    cost: "$2,927.00",
    pps: "100",
    quantity: "1",
    politician: "David Cheston Rouzer",
    type: "Sell",
  },
];

const graphData = Array.from({ length: 20 }, () =>
  Math.floor(Math.random() * 1200)
);

export default function Home() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: "#3498db",
      accent: "#f1c40f",
    },
  };
  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 70,
      }}
    >
      <Text style={{ fontSize: 40 }}>Performance</Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 250,
          width: "101%",
          marginTop: 10,
        }}
      >
        <LineChart
          data={graphData}
          style={{ height: 200, width: "100%", zIndex: 1 }}
          svg={{
            strokeWidth: 3,
            stroke:
              graphData[graphData.length - 1] >=
              graphData.reduce((a, b) => a + b) / graphData.length
                ? colors.BLUE
                : colors.RED,
          }}
        />
      </View>
      <View style={{ marginTop: -20, width: "90%", flexDirection: "row" }}>
        <Text style={{ fontSize: 25, fontWeight: "600", textAlign: "left", flex: 3, opacity: .7 }}>
         Hello, Elias 
        </Text>
        <Text style={{ fontSize: 25, fontWeight: "600", textAlign: "right", flex: 5 }}>
          $14,850.32
        </Text>
      </View>
      <ScrollView style={{ marginTop: 10, width: 400, paddingHorizontal: 5 }}>
        <PaperProvider theme={theme}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Ticker</DataTable.Title>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Cost</DataTable.Title>
              <DataTable.Title>Politican</DataTable.Title>
            </DataTable.Header>

            {trades.map((trade) => {
              return (
                <DataTable.Row>
                  <DataTable.Cell>{trade.ticker}</DataTable.Cell>
                  <DataTable.Cell>{trade.type}</DataTable.Cell>
                  <DataTable.Cell>{trade.cost}</DataTable.Cell>
                  <DataTable.Cell>{trade.politician}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </DataTable>
        </PaperProvider>
      </ScrollView>
    </View>
  );
}

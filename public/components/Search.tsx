import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { DataTable } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";
import { colors } from "../assets/colors";
import { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function setTrack(username: string, politician: string) {
  return fetch(
    `https://stockact-server.herokuapp.com/settrack/${username}/${politician}`
  )
    .then((result) => result.json())
    .then((result) => {
      storeItem("tracked", politician);
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getPolitician(name: string, setTradeData: Function) {
  return fetch(`https://stockact-server.herokuapp.com/politicians/${name}`)
    .then((result) => result.json())
    .then((result) => {
      setTradeData(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}

async function getPoliticianList(setPoliticians: Function) {
  return fetch(`https://stockact-server.herokuapp.com/listpoliticians`)
    .then((result) => result.json())
    .then((result) => {
      setPoliticians(result);
      return result;
    })
    .catch((err) => {
      console.error(err);
    });
}

const storeItem = async (key: string, value: any) => {
  try {
    const val = await AsyncStorage.setItem(key, value);
    return val;
  } catch (e: any) {
    console.log("error", e.message);
  }
};

const getItem = async (key: string, setItemState: Function) => {
  try {
    const val = await AsyncStorage.getItem(key);
    setItemState(val);
    return val;
  } catch (e: any) {
    console.log("error", e.message);
  }
};


const graphData = Array.from({length: 40}, () => Math.floor(Math.random() * 40));

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

  const [searchBG, setSearchBG] = useState(colors.PURPLE);
  const [wordEntered, setWordEntered] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [tracked, setTracked] = useState("");
  getItem("tracked", setTracked);
  const [tradeData, setTradeData] = useState([]);
  //const [graphData, setGraphData] = useState(["0"]);
  const [currentPolitician, setCurrentPolitician] = useState(
    tracked || "Nancy Pelosi"
  );
  const [politicians, setPoliticians] = useState([]);
  const [username, setUsername] = useState("");
  const [trackShow, setTrackShow] = useState(false)


  getPoliticianList(setPoliticians);
  getPolitician(currentPolitician, setTradeData);
  getItem("username", setUsername);
  getItem("tracked", setTracked)

  const handleSearch = (text: string) => {
    const searchWord = text;
    setWordEntered(searchWord);
    const newFilter: any = politicians.filter((p: string) => {
      return p.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === undefined) {
      setFilteredData(politicians);
    } else {
      setFilteredData(newFilter);
    }
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
      <Text style={{ fontSize: 40 }}>Search</Text>
      <View style={{ width: "80%", marginTop: 10 }}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 10,
          }}
        >
          <Icon
            name="search"
            style={{ opacity: 0.7 }}
            tvParallaxProperties={null}
          />
          <TextInput
            onChangeText={(data) => {
              handleSearch(data);
              setWordEntered(data === undefined ? "" : data);
            }}
            onFocus={() => {
              setSearchBG(colors.BLUE);
            }}
            onBlur={() => {
              setSearchBG(colors.PURPLE);
            }}
            value={wordEntered}
            placeholder="search for politician"
            style={[
              styles.inputStyles,
              { borderColor: searchBG, flex: 5, marginLeft: -30 },
            ]}
          />
        </View>
      </View>
      {filteredData.length != 0 && (
        <ScrollView
          style={{
            width: "100%",
            flexDirection: "column",
            height: "43%",
            position: "absolute",
            top: "18%",
            zIndex: 3,
            borderRadius: 10,
          }}
        >
          {filteredData.slice(0, 10).map((value: string) => {
            return (
              <TouchableOpacity
                style={styles.resultContainer}
                onPress={() => {
                  setCurrentPolitician(value);
                  setWordEntered(value);
                  setFilteredData([]);
                  getPolitician(currentPolitician, setTradeData);
                  /*setGraphData(
                    tradeData.map(
                      (trade: {
                        Amount: number;
                        Date: string;
                        Expiry: any;
                        Option_Type: any;
                        Options: any;
                        Range: string;
                        Representative: string;
                        Strike: any;
                        Ticker: string;
                        Transaction: string;
                      }) => trade.Amount
                    )
                  );*/
                  Keyboard.dismiss();
                }}
              >
                <Text style={styles.result}>{value}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}
      <View style={{ flexDirection: "column", width: "80%" }}>
        <Text style={{ fontSize: 40, marginBottom: 8, textAlign: "center" }}>
          {" " + currentPolitician}
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            backgroundColor:
              trackShow ? colors.GREEN : colors.RED,
            alignItems: "center",
            padding: 6,
            paddingHorizontal: 12,
            justifyContent: "center",
            shadowRadius: 0,
            shadowOpacity: 1,
            shadowOffset: { width: 2, height: 2 },
            shadowColor: colors.GREY,
          }}
          onPress={() => {
            console.log(tracked === currentPolitician);
            setTrack(
              username,
              tracked === currentPolitician ? "none" : currentPolitician
            );
            setTrackShow(!trackShow)
          }}
        >
          <Text
            style={{
              fontSize: 30,
              textAlign: "center",
              color: "white",
              fontWeight: "700",
            }}
          >
            {trackShow ? "Untrack" : "Track"}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 150,
          width: "101%",
          marginTop: 20,
          paddingBottom: 5,
          zIndex: "-1",
        }}
      >
        <LineChart
          data={graphData}
          style={{ height: "100%", width: "100%", zIndex: 1 }}
          svg={{
            strokeWidth: 3,
            stroke:
              graphData &&
              parseFloat(graphData[graphData.length - 1]) >=
                graphData.reduce((a, b) => a + b) / graphData.length
                ? colors.BLUE
                : colors.RED,
          }}
        />
      </View>
      <ScrollView style={{ width: 400, height: 240, paddingHorizontal: 10 }}>
        <PaperProvider theme={theme}>
          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Ticker</DataTable.Title>
              <DataTable.Title>Type</DataTable.Title>
              <DataTable.Title>Cost</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>

            {tradeData &&
              tradeData.map(
                (trade: {
                  Amount: number;
                  Date: string;
                  Expiry: any;
                  Option_Type: any;
                  Options: any;
                  Range: string;
                  Representative: string;
                  Strike: any;
                  Ticker: string;
                  Transaction: string;
                }) => {
                  return (
                    <DataTable.Row>
                      <DataTable.Cell>{trade.Ticker}</DataTable.Cell>
                      <DataTable.Cell>{trade.Transaction}</DataTable.Cell>
                      <DataTable.Cell>${trade.Amount}</DataTable.Cell>
                      <DataTable.Cell>{trade.Date}</DataTable.Cell>
                    </DataTable.Row>
                  );
                }
              )}
          </DataTable>
        </PaperProvider>
      </ScrollView>
    </View>
  );
}

const styles = {
  inputStyles: {
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    paddingLeft: 30,
    fontSize: 15,
  },
  resultContainer: {
    backgroundColor: colors.GRAY,
    padding: 8,
    width: "85%",
    borderWidth: 0.3,
    borderColor: "white",
    borderRadius: 10,
    left: 26,
  },
  result: {
    color: "white",
    fontSize: 15,
    padding: 10,
    paddingVertical: 5,
    paddingLeft: 4,
    fontWeight: "500",
    letterSpacing: 0.5,
  },
};

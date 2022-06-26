import { Text, TextInput, TouchableOpacity, View, Image } from "react-native";
import { colors } from "../assets/colors";
import React, { useState } from "react";
import { RootStackParamList } from "../RootStackParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import leaf from "../assets/leaf.png";

async function getUser(username: string, password: string, loggedIn: Function) {
  return fetch(
    `https://stockact-server.herokuapp.com/checkuser/${username}/${password}`
  )
    .then((result) => result.json())
    .then((result) => {
      loggedIn(true);
      storeItem("loggedIn", "true");
      storeItem(
        "tracked",
        result.track === "untracked" ? "none" : result.track
      );
      storeItem("name", result.name);
      storeItem("username", result.username);
      return result;
    })
    .catch((err) => {
      console.error(err);
      storeItem("loggedIn", "false");
      loggedIn(false);
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

type navScreenProp = NativeStackNavigationProp<RootStackParamList>;

export default function Account() {
  const [loggedIn, setLoggedIn] = useState("false");
  const [usernameBG, setUsernameBG] = useState(colors.PURPLE);
  const [passwordBG, setPasswordBG] = useState(colors.PURPLE);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [tracking, setTracking] = useState("none");
  const [name, setName] = useState("none");

  const navigation = useNavigation<navScreenProp>();

  getItem("loggedIn", setLoggedIn);
  getItem("tracked", setTracking);
  getItem("name", setName);

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40, marginTop: 70 }}>Account</Text>
      {loggedIn === "true" ? (
        <View style={{ alignItems: "center" }}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "60%",
            }}
          >
            <View
              style={{
                borderRadius: 8,
                backgroundColor: colors.GREEN,
                shadowColor: colors.GREY,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 0,
                shadowOpacity: 1,
              }}
            >
              <Text
                style={{
                  fontSize: 30,
                  color: "white",
                  padding: 10,
                  paddingHorizontal: 15,
                  fontWeight: "700",
                  letterSpacing: 1,
                }}
              >
                {name}
              </Text>
            </View>
            <View style={{ marginTop: 50, flexDirection: "column" }}>
              <Text style={{ fontSize: 20, padding: 10, textAlign: "center" }}>
                Currently Tracking
              </Text>
              <View
                style={{
                  borderRadius: 8,
                  backgroundColor: colors.GREEN,
                  shadowColor: colors.GREY,
                  shadowOffset: { width: 2, height: 2 },
                  shadowRadius: 0,
                  shadowOpacity: 1,
                }}
              >
                <Text
                  style={{
                    padding: 8,
                    paddingHorizontal: 12,
                    color: "white",
                    fontSize: 25,
                    fontWeight: "600",
                  }}
                >
                  {tracking}
                </Text>
              </View>
            </View>
            <Text style={{ fontSize: 20, padding: 10, textAlign: "center" }}>
              Unallocated Funds
            </Text>
            <View
              style={{
                borderRadius: 8,
                backgroundColor: colors.GREEN,
                shadowColor: colors.GREY,
                shadowOffset: { width: 2, height: 2 },
                shadowRadius: 0,
                shadowOpacity: 1,
              }}
            >
              <Text
                style={{
                  padding: 8,
                  paddingHorizontal: 12,
                  color: "white",
                  fontSize: 25,
                  fontWeight: "600",
                }}
              >
                $3,527.83
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              borderRadius: 8,
              backgroundColor: colors.RED,
              marginTop: 40,
              width: "60%",
              shadowColor: colors.GREY,
              shadowOffset: { width: 2, height: 2 },
              shadowRadius: 0,
              shadowOpacity: 1,
            }}
            onPress={() => {
              setLoggedIn("false");
              storeItem("loggedIn", "false");
            }}
          >
            <Text
              style={{
                fontSize: 35,
                padding: 10,
                paddingHorizontal: 35,
                color: "white",
                fontWeight: "600",
                textAlign: "center",
              }}
            >
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View
          style={{
            width: "90%",
            marginTop: 20,
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextInput
            onChangeText={(data) => {
              setUsername(data === undefined ? "" : data);
            }}
            onFocus={() => {
              setUsernameBG(colors.GREEN);
            }}
            onBlur={() => {
              setUsernameBG(colors.PURPLE);
            }}
            value={username}
            placeholder="Username"
            autoCapitalize="none"
            style={[
              styles.inputStyles,
              { borderColor: usernameBG, marginTop: 20, width: "80%" },
            ]}
          />
          <TextInput
            onChangeText={(data) => {
              setPassword(data === undefined ? "" : data);
            }}
            onFocus={() => {
              setPasswordBG(colors.GREEN);
            }}
            onBlur={() => {
              setPasswordBG(colors.PURPLE);
            }}
            value={password}
            placeholder="Password"
            autoCapitalize="none"
            secureTextEntry={true}
            style={[
              styles.inputStyles,
              { borderColor: passwordBG, marginTop: 20, width: "80%" },
            ]}
          />
          <TouchableOpacity
            style={{
              borderRadius: 8,
              backgroundColor: colors.GREEN,
              marginTop: 20,
              width: "60%",
              shadowColor: colors.GREY,
              shadowOpacity: 1,
              shadowRadius: 0,
              shadowOffset: { width: 2, height: 2 },
            }}
            onPress={() => {
              getUser(username, password, setLoggedIn);
            }}
          >
            <Text
              style={{
                fontSize: 35,
                padding: 10,
                paddingHorizontal: 35,
                color: "white",
                fontWeight: "600",
                textAlign: "center",
                letterSpacing: 2,
              }}
            >
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ marginTop: 10 }}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={{ color: colors.GREY }}>Don't have an account?</Text>
          </TouchableOpacity>
        </View>
      )}
      <Image
        source={leaf}
        style={{
          width: 300,
          height: 300,
          position: "absolute",
          zIndex: -1,
          left: -70,
          bottom: -80,
          opacity: 0.2,
        }}
      />
      <Image
        source={leaf}
        style={{
          width: 300,
          height: 300,
          position: "absolute",
          zIndex: -1,
          right: -50,
          top: -80,
          opacity: 0.2,
          transform: [{rotate: "160deg"}]
        }}
      />
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
};

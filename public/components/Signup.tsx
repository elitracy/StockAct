import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { colors } from "../assets/colors";
import React, { useState, useEffect } from "react";
import { RootStackParamList } from "../RootStackParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

async function createUser(username: string, password:string, email:string, name:string, setLoggedIn: Function) {
  return fetch(`https://stockact-server.herokuapp.com/createuser/${username}/${password}/${name}`)
    .then((result) => result.json())
    .then((result) => {
      setLoggedIn(true)
      storeItem("loggedIn", "true")
      storeItem("tracking", result.track === "untracked" ? "none" : result.track)
      storeItem("username", result.username)
      return result;
    })
    .catch((err) => {
      console.error(err);
      setLoggedIn(false)
      storeItem("loggedIn", "false")
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
  const navigation = useNavigation<navScreenProp>();

  const [emailBG, setEmailBG] = useState(colors.PURPLE);
  const [passwordBG, setPasswordBG] = useState(colors.PURPLE);
  const [verifyPasswordBG, setVerifyPasswordBG] = useState(colors.PURPLE);
  const [nameBG, setNameBG] = useState(colors.PURPLE);
  const [usernameBG, setUsernameBG] = useState(colors.PURPLE);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [loggedIn, setLoggedIn] = useState(false)

  loggedIn && navigation.navigate("Account")

  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 40, marginTop: 70 }}>Sign Up</Text>
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
            setEmail(data);
          }}
          onFocus={() => {
            setEmailBG(colors.GREEN);
          }}
          onBlur={() => {
            setEmailBG(colors.PURPLE);
          }}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          style={[
            styles.inputStyles,
            { borderColor: emailBG, marginTop: 20, width: "80%" },
          ]}
        />
        <TextInput
          onChangeText={(data) => {
            setPassword(data);
          }}
          onFocus={() => {
            setPasswordBG(colors.GREEN);
          }}
          onBlur={() => {
            setPasswordBG(colors.PURPLE);
          }}
          value={password}
          secureTextEntry={true}
          autoCapitalize="none"
          placeholder="Password"
          style={[
            styles.inputStyles,
            { borderColor: passwordBG, marginTop: 20, width: "80%" },
          ]}
        />
        <TextInput
          onChangeText={(data) => {
            setVerifyPassword(data);
          }}
          onFocus={() => {
            setVerifyPasswordBG(colors.GREEN);
          }}
          onBlur={() => {
            setVerifyPasswordBG(colors.PURPLE);
          }}
          value={verifyPassword}
          autoCapitalize="none"
          placeholder="Verify Password"
          secureTextEntry={true}
          style={[
            styles.inputStyles,
            { borderColor: verifyPasswordBG, marginTop: 20, width: "80%" },
          ]}
        />
        {password !== verifyPassword && (<Text style={{color: colors.RED, opacity: .8, marginTop: 5}}>
          Passwords do not match
        </Text>)}
        <TextInput
          onChangeText={(data) => {
            setName(data);
          }}
          onFocus={() => {
            setNameBG(colors.GREEN);
          }}
          onBlur={() => {
            setNameBG(colors.PURPLE);
          }}
          value={name}
          autoCapitalize="none"
          placeholder="Name"
          style={[
            styles.inputStyles,
            { borderColor: nameBG, marginTop: 20, width: "80%" },
          ]}
        />
        <TextInput
          onChangeText={(data) => {
            setUsername(data);
          }}
          onFocus={() => {
            setUsernameBG(colors.GREEN);
          }}
          onBlur={() => {
            setUsernameBG(colors.PURPLE);
          }}
          value={username}
          autoCapitalize="none"
          placeholder="Username"
          style={[
            styles.inputStyles,
            { borderColor: usernameBG, marginTop: 20, width: "80%" },
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
          onPress={() => createUser(username,password, email, name, setLoggedIn)}
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
            Sign Up
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => navigation.navigate("Account")}
        >
          <Text style={{ color: colors.GREY }}>Have an account?</Text>
        </TouchableOpacity>
      </View>
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

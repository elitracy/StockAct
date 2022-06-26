import { Image, StyleSheet, Pressable, View } from "react-native";
import { useState } from "react";
import { colors } from "../assets/colors";
import { RootStackParamList } from "../RootStackParams";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import stockIcon from "../assets/stockIcon.png";
import searchIcon from "../assets/searchIcon.png";
import accountIcon from "../assets/accountIcon.png";

type navScreenProp = NativeStackNavigationProp<RootStackParamList>;

export default function Navigation() {
  const navigation = useNavigation<navScreenProp>();
  const [navSelected, setNavSelected] = useState("home");

  return (
    <View style={styles.navContainer}>
      <Pressable
        onPress={() => {
          navigation.navigate("Home");
          setNavSelected("home");
        }}
        style={[
          navSelected === "home" && styles.pressed,
          {
            backgroundColor: "transparent",
            borderRadius: 50,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image
          source={stockIcon}
          style={{
            width: 34,
            height: 34,
            padding: 6,
            marginBottom: 3,
            transform: [{ rotate: "0deg" }],
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Search");
          setNavSelected("search");
        }}
        style={[
          navSelected === "search" && styles.pressed,
          {
            backgroundColor: "transparent",
            borderRadius: 50,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image
          source={searchIcon}
          style={{
            width: 34,
            height: 34,
            padding: 6,
            marginBottom: 3,
            transform: [{ rotate: "0deg" }],
          }}
        />
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate("Account");
          setNavSelected("account");
        }}
        style={[
          navSelected === "account" && styles.pressed,
          {
            backgroundColor: "transparent",
            borderRadius: 50,
            width: 60,
            height: 60,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
      >
        <Image
          source={accountIcon}
          style={{
            width: 34,
            height: 34,
            padding: 6,
            marginBottom: 3,
            transform: [{ rotate: "0deg" }],
          }}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    height: "12%",
    position: "absolute",
    zIndex: 100,
    bottom: 0,
    paddingBottom: 15,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  pressed: {
    borderWidth: 3,
    borderColor: colors.BLUE,
  },
});

import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import Home from "./components/Home";
import Search from "./components/Search";
import Navigation from "./components/Navigation";
import Account from "./components/Account";
import Signup from "./components/Signup";

const Stack = createNativeStackNavigator<RootStackParamList>();
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      <Navigation />
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Account" component={Account} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

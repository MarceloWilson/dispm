import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import GastronomiaStack from "./GastronomiaStack";
import TradicoesStack from "./TradicoesStack";
import ReceitasStack from "./ReceitasStack";

const Drawer = createDrawerNavigator();

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#fff",
        headerStyle: { backgroundColor: "#764937" },
        drawerActiveTintColor: "#3f51b5",
        drawerInactiveTintColor: "#333",
      }}
    >
      <Drawer.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Culturas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="GastronomiaStack"
        component={GastronomiaStack}
        options={{
          title: "Gastronomia",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="restaurant" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="TradicoesStack"
        component={TradicoesStack}
        options={{
          title: "Tradições",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={size} />
          ),
        }}
      />

      <Drawer.Screen
        name="ReceitasStack"
        component={ReceitasStack}
        options={{
          title: "Receitas",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="school" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
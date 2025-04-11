import { StatusBar } from "expo-status-bar";

import { StyleSheet, Button } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

import FavoritesContextProvider from "./store/context/favorites-context";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#dddddd" },
        headerTintColor: "#444444",
        sceneStyle: { backgroundColor: "#dddddd" },
        drawerContentStyle: { backgroundColor: "#dddddd" },
        drawerInactiveTintColor: "#555555",
        drawerActiveTintColor: "#222222",
      }}
    >
      <Drawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: "Categories",
          drawerIcon: ({ color, size }) => {
            <Ionicons name="list" size={22} color={"#222222"} />;
          },
        }}
      />
      <Drawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, size }) => {
            <Ionicons name="star" size={22} color={"#222222"} />;
          },
        }}
      />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <FavoritesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: "#dddddd" },
              headerTintColor: "#444444",
              contentStyle: { backgroundColor: "#dddddd" },
            }}
          >
            <Stack.Screen
              name="DrawerScreen"
              component={DrawerNavigation}
              options={{
                title: "All Categories",
                headerShown: false,
              }}
            />
            {/* <Stack.Screen
            name="MealsCategories"
            component={CategoriesScreen}
            options={{
              title: "Categories",
            }}
          /> */}
            <Stack.Screen
              name="MealsOverview"
              component={MealsOverviewScreen}
              // options={({ route, navigation }) => {
              //   const catId = route.params.categoryId;
              //   return {
              //     title: catId,
              //   };
              // }}
            />
            <Stack.Screen
              name="MealDetail"
              component={MealDetailScreen}
              options={{
                headerRight: () => {
                  return <Button title="Tap" />;
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoritesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});

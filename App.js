import { StatusBar } from "expo-status-bar";

import { StyleSheet, Button, Alert, Platform } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";

import CategoriesScreen from "./screens/CategoriesScreen";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";
import MealDetailScreen from "./screens/MealDetailScreen";
import FavoritesScreen from "./screens/FavoritesScreen";

// import FavoritesContextProvider from "./store/context/favorites-context";
import { store } from "./store/redux/store";

import * as Notifications from "expo-notifications"
import { useEffect } from "react";

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
  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      console.log("First status --->", status)
      
      if (finalStatus !== "granted") {
        const { status } = Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert("Permission required", "To receive push notifications you must accept permission.");
        return;
      }

      try {
        const pushTokenData = await Notifications.getExpoPushTokenAsync();
        console.log(pushTokenData)
      } catch (error) {
        console.log("Error getting push token data.")
        console.log(error)
      }

      if(Platform.OS === "android"){
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.DEFAULT
        });
      }
    }

    configurePushNotifications();
  }, [])

  return (
    <>
      <StatusBar style="dark" />
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
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
      {/* </FavoritesContextProvider> */}
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({});

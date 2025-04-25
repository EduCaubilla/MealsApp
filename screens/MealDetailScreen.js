import { useContext, useEffect, useLayoutEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";

import { MEALS } from "../data/dummy-data";
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";
import IconButton from "../components/IconButton";

import { useDispatch, useSelector } from "react-redux";
import { addFavorite, removeFavorite } from "../store/redux/favorites";

import * as Notifications from "expo-notifications";

// import { FavoritesContext } from "../store/context/favorites-context"

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// Get permissions for iOS
const allowsNotificationsAsync = async () => {
  const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted ||
    settings.ios?.status ===
      Notifications.IosAuthorizationStatus.PROVISIONAL
  );
};

const requestPermissionsAsync = async () => {
  return await Notifications.requestPermissionsAsync({
    ios: {
      allowAlert: true,
      allowBadge: true,
      allowSound: true,
      allowAnnouncements: true,
    },
  });
};

function MealDetailScreen({ route, navigation }) {
  //Handle received notification
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received");
        console.log(notification);
        const notiMealId = notification.request.content.data.mealId;
        console.log(notiMealId);
      }
    );

    //Handle notification response (when user taps on the noti)
    const responseSubscription =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("Notification response received");
        console.log(response);
        const notiMealId = response.notification.request.content.data.mealId;
        console.log(notiMealId);
      });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  // const favoriteMealsContext = useContext(FavoritesContext);
  const favoriteMealIds = useSelector((state) => state.favoriteMeals.ids);
  const dispatch = useDispatch();

  const mealId = route.params.mealId;
  const selectedMeal = MEALS.find((meal) => meal.id === mealId);

  // const mealIsFavorite = favoriteMealsContext.ids.includes(mealId);
  const mealIsFavorite = favoriteMealIds.includes(mealId);

  async function sendLocalNotification() {
    const hasPushNotificationPermissionGranted =
      await allowsNotificationsAsync();
 
    if (!hasPushNotificationPermissionGranted) {
      await requestPermissionsAsync();
    }

    console.log("Send noti ---------------------> ");
    Notifications.scheduleNotificationAsync({
      content: {
        title: "New meal added to favorites.",
        body: `You added ${selectedMeal.title}.`,
        data: { mealId: mealId },
        sound: "default",
      },
      trigger: {
        seconds: 5,
      },
    });
  }

  function headerButtonPressHandler() {
    if (mealIsFavorite) {
      // favoriteMealsContext.removeFavorite(mealId);
      dispatch(removeFavorite({ id: mealId }));
    } else {
      // favoriteMealsContext.addFavorite(mealId);
      dispatch(addFavorite({ id: mealId }));
      sendLocalNotification();
    }
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: selectedMeal.title,
      headerRight: () => {
        return (
          <IconButton
            onPress={headerButtonPressHandler}
            color={mealIsFavorite ? "#ffd024" : "gray"}
            icon={mealIsFavorite ? "star" : "star-outline"}
          />
        );
      },
    });
  }, [mealId, navigation, headerButtonPressHandler]);

  return (
    <ScrollView>
      <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
      <Text style={styles.title}>{selectedMeal.title}</Text>
      <View style={styles.details}>
        <Text style={styles.detailItem}>{selectedMeal.duration}'</Text>
        <Text style={styles.detailItem}>
          {selectedMeal.complexity.toUpperCase()}
        </Text>
        <Text style={styles.detailItem}>
          {selectedMeal.affordability.toUpperCase()}
        </Text>
      </View>
      <View style={styles.listOuterContainer}>
        <View style={styles.listContainer}>
          <Subtitle>Ingredients</Subtitle>
          <List data={selectedMeal.ingredients} />
          <Subtitle>Steps</Subtitle>
          <List data={selectedMeal.steps} />
        </View>
      </View>
    </ScrollView>
  );
}

export default MealDetailScreen;

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 24,
    margin: 10,
  },
  details: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    padding: 10,
  },
  subtitle: {
    color: "#444444",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleContainer: {
    margin: 5,
    marginBottom: 15,
    marginHorizontal: 25,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: "#444444",
  },
  detailItem: {
    marginHorizontal: 15,
    fontSize: 15,
  },
  listOuterContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  listContainer: {
    width: "80%",
  },
});

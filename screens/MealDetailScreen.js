import { useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native"

import { MEALS } from "../data/dummy-data"
import Subtitle from "../components/MealDetail/Subtitle";
import List from "../components/MealDetail/List";

function MealDetailScreen({ route, navigation }) {
    const mealId = route.params.mealId
    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    useEffect(() => {
        navigation.setOptions({
        title: selectedMeal.title,
        });
    }, [mealId, navigation]);

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

export default MealDetailScreen

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 300,
        resizeMode: "cover"
    },
    title:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 24,
        margin: 10
    },
    details: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        padding: 10
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
    detailItem:{
        marginHorizontal: 5,
        fontSize: 15
    },
    listOuterContainer: {
        alignItems: "center",
        marginBottom: 20
    },
    listContainer: {
        width: "80%",
    }
});

import { useEffect } from "react";
import { StyleSheet } from "react-native";

import { MEALS, CATEGORIES } from "../data/dummy-data";

import MealsList from "../components/MealsList/MealsList";

function MealsOverviewScreen({ route, navigation }) {
    const catId = route.params.categoryId

    const displayedMeals = MEALS.filter((mealItem) => {
      return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    useEffect(() => {
      const categoryTitle = CATEGORIES.find(
        (category) => category.id == catId
      ).title;

      navigation.setOptions({
        title: categoryTitle,
      });
    }, [catId, navigation]);

  return (
    <MealsList items={displayedMeals} />
  );
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
});

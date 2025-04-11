import { View, Text, StyleSheet, Pressable, Image, Platform } from "react-native"

import { useNavigation } from "@react-navigation/native";

function MealItem({ id, title, imageUrl, duration, complexity, affordability }) {
    const navigation = useNavigation();

    function selectMealItemHandler(){
        navigation.navigate("MealDetail", {
            mealId : id
        })
    }

  return (
    <View style={styles.mealItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPress : null)}
        onPress={selectMealItemHandler}
      >
        <View style={styles.innerContainer}>
          <View>
            <Image source={{ uri: imageUrl }} style={styles.image} />
            <Text style={styles.title}>{title}</Text>
          </View>
          <View style={styles.details}>
            <Text style={styles.detailItem}>{duration}'</Text>
            <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
            <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

export default MealItem;

const styles = StyleSheet.create({
    mealItem: {
        margin: 15,
        borderRadius: 12,
        overflow: Platform.OS === "android" ? "hidden" : "visible",
        backgroundColor: "#FFFFFF",
        elevation: 4,
        shadowColor: "#222222",
        shadowOffset: { width: 1, height: 0 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    buttonPress: {
        opacity: 0.75,
      },
    innerContainer: {
       borderRadius: 12,
       overflow: "hidden" 
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "cover"
    },
    title:{
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 18,
        margin: 10
    },
    details: {
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "center",
        padding: 10
    },
    detailItem:{
        marginHorizontal: 15,
        fontSize: 15
    }
})

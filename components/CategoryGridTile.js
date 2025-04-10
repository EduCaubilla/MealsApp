import { View, Pressable, Text, StyleSheet, Platform } from "react-native";

function CategoryGridTile({ title, color }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#aaaaaa" }}
        style={({ pressed }) => [styles.button, pressed ? styles.buttonPress : null]}
      >
        <View style={[styles.innerContainer, {backgroundColor: color}]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 12,
    elevation: 4,
    backgroundColor: "#FFFFFF",
    shadowColor: "#222222",
    shadowOffset: { width: 1, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPress: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 15,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});

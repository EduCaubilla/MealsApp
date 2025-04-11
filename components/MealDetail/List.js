import { View, Text, StyleSheet } from "react-native";

function List({ data }) {
  return data.map((dataPoint) => (
    <View key={dataPoint} style={styles.listItem}>
      <Text style={styles.itemText}>{dataPoint}</Text>
    </View>
  ));
}

export default List;

const styles = StyleSheet.create({
    listItem: {
        //borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal:10,
        //backgroundColor: "#444444"
    },
    itemText: {
        textAlign: "center"
    }
});

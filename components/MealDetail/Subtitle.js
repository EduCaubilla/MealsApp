import { View, Text, StyleSheet } from "react-native"

function Subtitle({ children }) {
    return <View style={styles.subtitleContainer}>
              <Text style={styles.subtitle}>{children}</Text>
            </View>
}

export default Subtitle

const styles = StyleSheet.create({
    subtitle: {
        color: "#444444",
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
    },
    subtitleContainer: {
        margin: 5,
        marginBottom: 15,
        marginHorizontal: 20,
        padding: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#444444",
    },
})
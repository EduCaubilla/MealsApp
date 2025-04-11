import { Pressable, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"

function IconButton({ icon, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: "#ccc" }}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.buttonPress : null,
      ]}
    >
      <Ionicons name={icon} size={22} color={color} />
    </Pressable>
  );
}

export default IconButton

const styles = StyleSheet.create({
    buttonPress: {
        opacity: 0.7
    }
})

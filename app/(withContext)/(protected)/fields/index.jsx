import { AppText } from "@/components/AppText";
import { StyleSheet, View } from "react-native";

export default function FieldsScreen() {
  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Fields Screen</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20
  }
});
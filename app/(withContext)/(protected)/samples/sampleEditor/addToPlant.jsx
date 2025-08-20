import { AppText } from "@/components/AppText";
import { StyleSheet, View } from "react-native";

export default function AddToPlantScreen() {
  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Add To Plant Screen</AppText>
      <AppText>Allow adding to existing plants, multiple allowed in one go as well</AppText>
      <AppText>Allow creating new plant to add it to, ask if user wants to add more samples to plant</AppText>
      <AppText>Follow up creation with asking if the plant should be assigned to any fields</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: 'pink'
  }
});
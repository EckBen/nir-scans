import { AppText } from "@/components/AppText";
import { StyleSheet, View } from "react-native";

export default function RemoveFromPlantScreen() {
  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Remove From Plant Screen</AppText>
      <AppText>Allow multiple allowed in one go</AppText>
      <AppText>If only sample in plant ask if user wants to delete plant/remove it from fields</AppText>
      <AppText>If only plant in field and removing, ask if user wants to delete field</AppText>
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
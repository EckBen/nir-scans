import { AppText } from "@/components/AppText";
import { StyleSheet, View } from "react-native";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Home</AppText>
      <AppText>Tiles for each page of interest</AppText>
      <AppText>Add scanner button linked to a modal if no scanners</AppText>
      <AppText>List of new/unassigned samples (maybe dont do this, instead a count of unassigned as badge on plants icon and tile...likewise unassigned plants for field icon/tile)</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  }
});
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SamplesScreen() {
  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Samples Screen</AppText>
      <AppText>Show list of samples not assigned to plants</AppText>
      <AppText>Show samples grouped by plant</AppText>
      <AppText>Allow clicking plant to go to plant page</AppText>
      <AppText>On sample click, open &quot;view sample&quot; modal with buttons to: Add to plant, Remove from plant, View Sample</AppText>
      <AppText>On button click send to relevant page</AppText>

      <Link href="/samples/sampleEditor" push asChild>
        <Button title="View Sample" />
      </Link>
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
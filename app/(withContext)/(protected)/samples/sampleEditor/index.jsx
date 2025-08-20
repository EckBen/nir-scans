import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SampleEditorModalScreen() {
  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Sample Editor Modal Screen</AppText>
      <AppText>Display sample information</AppText>
      <AppText>Allow plants to be clicked and navigate to that plant page</AppText>
      
      <Link href="/samples/sampleEditor/addToPlant" push asChild>
        <Button title="Add to Plant" />
      </Link>

      <Link href="/samples/sampleEditor/removeFromPlant" push asChild>
        <Button title="Remove from Plant" />
      </Link>
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
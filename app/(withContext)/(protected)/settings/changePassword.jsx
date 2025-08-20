import { AppText } from "@/components/AppText";
import { StyleSheet, View } from "react-native";

export default function ChangePasswordScreen() {
  return (
    <View style={styles.container}>
      <AppText>Change Password Screen</AppText>
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
import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { useAuth } from "@/contexts/authContext";
import { Link } from "expo-router";
import { StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const { logout } = useAuth();

  return (
    <View style={styles.container}>
      <AppText size='heading' bold>Settings Screen</AppText>
      
      <Link href="/settings/changePassword" push asChild>
        <Button title="Change Password" />
      </Link>
      <Button onPress={() => console.log('wishlist: clear data')} title="Clear data (link to alert/confirmation)" />
      <Button onPress={() => console.log('wishlist: delete account')} title="Delete Account (link to alert/confirmation)" />


      <Link href="/settings/addScanner" push asChild>
        <Button title="Add Scanner" />
      </Link>
      <Button onPress={() => console.log('wishlist: remove scanner')} title="Remove Scanner (link to modal)" />

      <Button onPress={logout} title="Log out" />
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
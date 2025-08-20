import { Stack, usePathname } from "expo-router";

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith("/settings") ? "default" : "none",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Settings" }} />
      <Stack.Screen name="changePassword" options={{ title: "Change Password" }} />
      <Stack.Screen name="addScanner" options={{ title: "Add Scanner" }} />
    </Stack>
  );
}

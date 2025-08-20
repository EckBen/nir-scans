import { Stack, usePathname } from "expo-router";

export default function Layout() {
  const pathname = usePathname();

  return (
    <Stack
      screenOptions={{
        animation: pathname.startsWith("/samples") ? "default" : "none",
      }}
    >
      <Stack.Screen name="index" options={{ title: "Samples" }} />
      <Stack.Screen name="sampleEditor" options={{ presentation: 'modal', headerShown: false }} />
    </Stack>
  );
}

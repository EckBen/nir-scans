import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useLoading } from "../../contexts/loadingContext";

import Loading from "../../components/Loading";

export default function Layout() {
  const [isInitialized, setIsInitialized] = useState(false);

  const { userAuth } = useAuth();
  const { isLoading } = useLoading();

  useEffect(() => {
    if (!isLoading && !isInitialized) {
      setIsInitialized(true);
    }
  }, [isLoading]);

  if (!isInitialized || isLoading) {
    return (
      <Loading />
    );
  } else {
    return (
      <Stack>
        <Stack.Protected guard={userAuth}>
          <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        </Stack.Protected>
        <Stack.Protected guard={!userAuth}>
          <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    );
  }
}
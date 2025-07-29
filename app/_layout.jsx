import { Stack } from "expo-router";
import HeaderLogout from "../components/LogoutButton";
import { AuthProvider } from "../contexts/authContext";

const RootLayout = () => {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff8c00',
          },
          headerTitleAlign: 'center',
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontSize: 20,
            fontWeight: 'bold'
          },
          headerRight: () => <HeaderLogout />,
          contentStyle: {
            paddingHorizontal: 10,
            paddingTop: 10,
            backgroundColor: '#fff'
          }
        }}
      >
        <Stack.Screen name='index' options={{ title: 'Home' }} />
        <Stack.Screen name='notes' options={{ headerTitle: 'Notes' }} />
        <Stack.Screen name='auth' options={{ headerTitle: 'Login' }} />
        <Stack.Screen name='api' options={{ headerTitle: 'Api Testing' }} />
      </Stack>
    </AuthProvider>
  );
}

export default RootLayout;
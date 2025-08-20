import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";
import { AuthProvider } from "../contexts/authContext";
import { DataProvider } from "../contexts/dataContext";
import { LoadingProvider } from "../contexts/loadingContext";
import '../global.css';

export default function RootLayout() {
  return (
    <LoadingProvider>
      <AuthProvider>
        <DataProvider>
          <StatusBar style="auto" />
          <Slot />
          <Toast/>
        </DataProvider>
      </AuthProvider>
    </LoadingProvider>
  );
}
import { StatusBar } from "expo-status-bar";
import { AuthProvider } from "@/contexts/AuthContext";
import NavigationGuard from "@/components/NavigationGuard";
import "../styles/globals.css";

export default function RootLayout() {
  return (
    <AuthProvider>
      <NavigationGuard />
      <StatusBar style="dark" />
    </AuthProvider>
  );
}

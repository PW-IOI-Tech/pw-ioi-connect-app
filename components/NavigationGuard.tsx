import { useAuth } from "@/hooks";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function NavigationGuard() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      // If not authenticated and not in auth group, redirect to login
      router.replace("/login");
    } else if (isAuthenticated && inAuthGroup) {
      // If authenticated and in auth group, redirect to protected area
      router.replace("/");
    }
  }, [isAuthenticated, isLoading, segments]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-app">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}

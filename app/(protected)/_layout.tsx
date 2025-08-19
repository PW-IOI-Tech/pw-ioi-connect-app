import { Stack } from "expo-router";

export default function ProtectedLayout() {
  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{
        title: "Home",
        headerShown: false,
      }} />
      <Stack.Screen name="profile" options={{
        title: "Profile",
      }} />
    </Stack>
  );
}

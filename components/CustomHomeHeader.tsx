import React from "react";
import { View, Text, Pressable, SafeAreaView } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { Button } from "./ui/Button";
import { useAuth } from "@/hooks";
import { router } from "expo-router";

export default function CustomHomeHeader() {
  const { user, signOut } = useAuth();

  const currentHour = new Date().getHours();
  let greeting = "Hello";
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 18) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const navigateToProfile = () => {
    router.push("/(protected)/profile");
  };

  return (
    <View className="bg-primary px-8 py-6 h-56 rounded-b-3xl">
      <SafeAreaView className="flex-1">
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-white text-2xl font-bold mb-2">
              {greeting}, {user?.name.split(" ")[0]}
            </Text>
            <Button onPress={() => signOut()} size="sm">
              <FontAwesome6
                name="right-from-bracket"
                size={24}
                color={Colors.white}
              />
            </Button>
          </View>

          <Pressable className="flex-1" onPress={() => navigateToProfile()}>
            <View className="flex-1 bg-white/10 border border-white/25 rounded-lg p-4 justify-center">
              <View className="flex-row items-center justify-between">
                <View className="h-full aspect-square bg-white/20 rounded-full items-center justify-center">
                  <Text className="text-white text-3xl font-bold">
                    {user?.name[0].toUpperCase()}
                  </Text>
                </View>
                <View className="flex-1 flex-row ml-4">
                  <View className="flex-1">
                    <Text className="text-white text-lg font-semibold">
                      {user?.name}
                    </Text>
                    <Text className="text-white/80 text-sm">
                      ID: {user?.id || "N/A"}
                    </Text>
                  </View>
                  <View className="flex items-end justify-center ml-4">
                    <View className="bg-white/20 border border-white/25 rounded-full px-3 py-1">
                      <Text className="text-white text-xs">
                        Semester: {(user as any)?.semester || "N/A"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        </View>
      </SafeAreaView>
    </View>
  );
}

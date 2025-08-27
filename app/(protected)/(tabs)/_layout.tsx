import { Tabs } from "expo-router";
import { FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import CustomHomeHeader from "@/components/CustomHomeHeader";

export default function TabsLayout() {
  return (
    <View className="flex-1">
      <StatusBar style="light" />
      <TabsLayoutContent />
    </View>
  );
}

function TabsLayoutContent() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size, focused }) => {
        let faIconName: keyof typeof FontAwesome6.glyphMap = "home";

        if (route.name === "index") {
        faIconName = focused ? "house-user" : "user";
        } else if (route.name === "attendance") {
        faIconName = focused ? "clipboard-check" : "clipboard-list";
        } else if (route.name === "timetable") {
        faIconName = focused ? "calendar-alt" : "calendar";
        }

        return <FontAwesome6 name={faIconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.placeholder,
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: '#fff',
      })}
    >
      <Tabs.Screen
      name="index"
      options={{
        title: "Home",
        header: () => <CustomHomeHeader />,
      }}
      />
      <Tabs.Screen
      name="attendance"
      options={{
        title: "Attendance",
      }}
      />
      <Tabs.Screen
      name="timetable"
      options={{
        title: "Timetable",
      }}
      />
    </Tabs>
  );
}

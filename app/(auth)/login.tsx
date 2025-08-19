import { GoogleIcon } from "@/components/icons";
import { Button } from "@/components/ui";
import { useAuth } from "@/hooks/useAuth";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginPage() {
  const { signIn, isLoading, error } = useAuth();
  return (
    <SafeAreaView className="flex-1 bg-app">
      <View className="flex-1 justify-center px-6">
        <View className="items-center mb-12">
          <View className="w-20 h-20 bg-primary rounded-full items-center justify-center mb-6">
            <Text className="text-white text-2xl font-extrabold">PW</Text>
          </View>
          <Text className="text-3xl font-bold text-primary mb-2">
            Welcome to PW Student
          </Text>
          <Text className="text-muted text-center">
            Simplified access to your student portal
          </Text>
        </View>

        <View className="bg-white p-6 rounded-2xl shadow-md w-11/12 self-center">
          {error && (
            <Text className="text-red-500 text-center mb-4">
              {error}
            </Text>
          )}
          <Button
            onPress={() => signIn("demo-auth-code")}
            icon={<GoogleIcon size={24} />}
            iconPlacement="right"
            className="bg-primary text-white py-4 rounded-xl mb-8"
            disabled={isLoading}
          >
            Sign In with Google
          </Button>

          <Text className="text-xs text-gray-500 text-center">
            By continuing, you agree to our{" "}
            <Text className="text-primary font-semibold">Terms of Service</Text>{" "}
            and{" "}
            <Text className="text-primary font-semibold">Privacy Policy</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

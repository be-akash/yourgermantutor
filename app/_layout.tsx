import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function Layout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#314b66", // Dark background for the top bar
          },
          headerTintColor: "#784894", // White text color
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 20,
          },
        }}
      >
        {/* Define specific screens with custom titles */}
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="learn" options={{ title: "Learning Hub" }} />
        <Stack.Screen name="test" options={{ title: "Testing Hub" }} />
        <Stack.Screen name="learn/verbs" options={{ title: "Learn Verbs" }} />
        <Stack.Screen name="learn/nouns" options={{ title: "Learn Nouns" }} />
        <Stack.Screen name="learn/adjectives" options={{ title: "Learn Adjectives" }} />
        <Stack.Screen name="learn/tables" options={{ title: "Useful Tables" }} />
        <Stack.Screen name="test/verbtest" options={{ title: "Test Your Verbs" }} />
        <Stack.Screen name="test/nountest" options={{ title: "Test Your Nouns" }} />
        <Stack.Screen name="test/adjectivestest" options={{ title: "Test Your Adjectives" }} />
      </Stack>
    </PaperProvider>
  );
}

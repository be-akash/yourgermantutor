import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter(); // Use router for navigation

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to the German Learning App!</Text>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Learn</Text>
          <Text style={styles.cardText}>Practice German verbs, nouns, adjectives, and words.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => router.push("/learn")}>
            Start Learning
          </Button>
        </Card.Actions>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.cardTitle}>Test</Text>
          <Text style={styles.cardText}>Test your German vocabulary with quizzes.</Text>
        </Card.Content>
        <Card.Actions>
          <Button mode="contained" onPress={() => router.push("/test")}>
            Start Test
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080808",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color :"#4c7eb0"
  },
  card: {
    width: "90%",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#2e2b2b",
    elevation: 4, // Adds shadow effect
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color :"#eb2348"
  },
  cardText: {
    fontSize: 14,
    color: "gray",
    marginBottom: 10,
  },
});

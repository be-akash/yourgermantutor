import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function TestScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category to Test</Text>

      <Card style={styles.card} onPress={() => router.push("/test/verbtest")}>
        <Card.Content>
          <Text style={styles.cardTitle}>📖 Verbs</Text>
          <Text style={styles.cardText}>Test your german verb skills</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push("/test/nountest")}>
        <Card.Content>
          <Text style={styles.cardTitle}>📝 Nouns</Text>
          <Text style={styles.cardText}>Test your german Noun skills</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push("/test/adjectivestest")}>
        <Card.Content>
          <Text style={styles.cardTitle}>🎨 Adjectives</Text>
          <Text style={styles.cardText}>Test your german Adjective skills</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push("/test/wordtest")}>
        <Card.Content>
          <Text style={styles.cardTitle}>📚 Words</Text>
          <Text style={styles.cardText}>Expand your vocabulary with useful words.</Text>
        </Card.Content>
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
  },
  card: {
    width: "90%",
    marginBottom: 15,
    backgroundColor: "#2e2b2b",
    elevation: 3, // Adds shadow effect
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});

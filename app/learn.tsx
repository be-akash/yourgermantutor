import React from "react";
import { View, StyleSheet } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { useRouter } from "expo-router";

export default function LearnScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Category to Learn</Text>

      <Card style={styles.card} onPress={() => router.push("/learn/verbs")}>
        <Card.Content>
          <Text style={styles.cardTitle}>📖 Verbs</Text>
          <Text style={styles.cardText}>Learn German verbs with their meanings.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push("/learn/nouns")}>
        <Card.Content>
          <Text style={styles.cardTitle}>📝 Nouns</Text>
          <Text style={styles.cardText}>Explore German nouns and their rules.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push("/learn/adjectives")}>
        <Card.Content>
          <Text style={styles.cardTitle}>🎨 Adjectives</Text>
          <Text style={styles.cardText}>Learn adjectives and their opposites.</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card} onPress={() => router.push("/learn/words")}>
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
    color :"#eb2348"
  },
  cardText: {
    fontSize: 14,
    color: "gray",
    marginTop: 5,
  },
});

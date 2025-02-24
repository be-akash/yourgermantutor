import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Picker } from "@react-native-picker/picker";

const jsonFiles: Record<string, any> = {
  alladjective: require("../../assets/adjectives/adjective.json"),
  A1: require("../../assets/adjectives/adjective1.json"),
};

export default function AdjectiveScreen() {
  const [words, setWords] = useState<any[]>([]);
  const [currentWord, setCurrentWord] = useState<any | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("A1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFile(selectedFile);
  }, [selectedFile]);


   // Load JSON data based on selection
   const loadFile = (fileName: string) => {
    setLoading(true);
    const jsonData = jsonFiles[fileName];
    setWords(jsonData);
    getRandomWord(jsonData);
    setLoading(false);
  };

  const getRandomWord = (wordList: any[] = words) => {
    if (wordList.length > 0) {
      setCurrentWord(wordList[Math.floor(Math.random() * wordList.length)]);
      setShowMeaning(false);
    }
  };
  const speakWord = (word: string) => {
    if (currentWord) {
      Speech.speak(word, { language: "de-DE" });
    }
  };
  const renderPlural = () => {
    return (
      <Card style={styles.pluralCard}>
        <Card.Content>
          <View style={styles.iconContainer}>
            <TouchableOpacity
              onPress={() => speakWord(currentWord.Opposite)}
              style={styles.speakerButton}
            >
              <Ionicons name="volume-medium-outline" size={28} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.pluralText}>
            {currentWord.Opposite}{" "}
            <Text style={styles.ruleText}>
              ({currentWord.Opposite_Meaning})
            </Text>
          </Text>
        </Card.Content>
      </Card>
    );
  };
  return (
    <View style={styles.container}>
      <Picker
        selectedValue={selectedFile}
        onValueChange={(itemValue) => setSelectedFile(itemValue)}
        style={styles.picker}
      >
        {Object.keys(jsonFiles).map((file, index) => (
          <Picker.Item key={index} label={file} value={file} />
        ))}
      </Picker>
      <Text style={styles.title}>Learn Adjective and their Opposite</Text>
      {currentWord ? (
        <View style={styles.card}>
          <Text style={styles.word}>{currentWord.German_Adjective}</Text>
          <TouchableOpacity
            onPress={() => speakWord(currentWord.German_Adjective)}
            style={styles.iconButton}
          >
            <Ionicons name="volume-high" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.meaning}>{currentWord.Meaning}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowMeaning(!showMeaning)}
            // disabled={showMeaning}
          >
            <Text style={styles.buttonText}>
              {showMeaning ? "Hide Opposite" : "Show Opposite"}
            </Text>
          </TouchableOpacity>
          {showMeaning && renderPlural()}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
      {/* <Card style={styles.card}> */}
      <TouchableOpacity
        onPress={() => getRandomWord()}
        style={styles.nextButton}
      >
        <Ionicons name="refresh" size={24} color="white" />
        <Text style={styles.nextButtonText}>Next Word</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Total words: {words.length}</Text>
      {/* </Card> */}
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
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#28A745",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    marginTop: 20,
  },
  picker: {
    width: "80%",
    backgroundColor: "#133770",
    marginBottom: 20,
    color :"#eb2348"
  },
  pluralCard: {
    width: "100%",
    backgroundColor: "#E3F2FD", // Light blue background
    borderRadius: 15,
    padding: 15,
    marginTop: 20,
    elevation: 6, // Adds a shadow effect
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: "center",
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  speakerButton: {
    backgroundColor: "#007AFF", // Blue button
    padding: 12,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // Adds depth
  },

  pluralText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    textAlign: "center",
  },

  ruleText: {
    fontSize: 18,
    fontWeight: "600",
    color :"#eb2348"
  },

  nextButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color :"#eb2348"
  },
  card: {
    width: "90%",
    backgroundColor: "#2e2b2b",
    padding: 20,
    borderRadius: 10,
    elevation: 4,
    alignItems: "center",
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007AFF",
  },
  plural: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#007AFF",
  },
  meaning: {
    fontSize: 18,
    marginTop: 10,
    color :"#eb2348"
  },
  verbform: {
    fontSize: 18,
    marginTop: 10,
    color: "#ad4c45",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  iconButton: {
    marginTop: 10,
  },
  footer: {
    marginTop: 20,
    fontSize: 14,
    color: "gray",
  },
  konjugationTable: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f1f1f1",
    padding: 10,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
  },
});

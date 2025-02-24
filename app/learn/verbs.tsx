import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity,ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Speech from "expo-speech";
import { Picker } from "@react-native-picker/picker";
// import wordsData from "../../assets/verb.json"

// Define TypeScript type
// type GermanWord = {
//   word: string;
//   meaning: string;
// };

// Mock Data
// const mockWords: GermanWord[] = [
//   { word: "Haus", meaning: "House" },
//   { word: "Baum", meaning: "Tree" },
//   { word: "Wasser", meaning: "Water" },
//   { word: "Buch", meaning: "Book" },
//   { word: "Auto", meaning: "Car" },
// ];

const jsonFiles: Record<string, any> = {
  allVerb: require("../../assets/verbs/verb.json"),
  A1: require("../../assets/verbs/verb1.json"),
};

export default function LearnGermanScreen() {
  const [words, setWords] = useState<any[]>([]);
  const [currentWord, setCurrentWord] = useState<any | null>(null);
  const [showMeaning, setShowMeaning] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string>("A1");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadFile(selectedFile);
  }, [selectedFile]);

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

  const speakWord = () => {
    if (currentWord) {
      Speech.speak(currentWord.Word, { language: "de-DE" });
    }
  };

  const renderKonjugationTable = () => {
    // if (!currentWord || !currentWord.konjugation) return null;

    // const { konjugation } = currentWord;

    return (
      <View style={styles.konjugationTable}>
        <Text style={styles.tableHeader}>Conjugation Table</Text>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Rule</Text>
          <Text style={styles.tableCell}>{currentWord.Rule}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Ich</Text>
          <Text style={styles.tableCell}>{currentWord.ich}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Du</Text>
          <Text style={styles.tableCell}>{currentWord.du}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Er/Sie/Es</Text>
          <Text style={styles.tableCell}>{currentWord.er_es_sie}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Wir</Text>
          <Text style={styles.tableCell}>{currentWord.wir}</Text>
        </View>

        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Ihr</Text>
          <Text style={styles.tableCell}>{currentWord.ihr}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>Sie/sie</Text>
          <Text style={styles.tableCell}>{currentWord.Sie_sie}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Learn Verb</Text>
      <Picker
        selectedValue={selectedFile}
        onValueChange={(itemValue) => setSelectedFile(itemValue)}
        style={styles.picker}
      >
        {Object.keys(jsonFiles).map((file, index) => (
          <Picker.Item key={index} label={file} value={file} />
        ))}
      </Picker>
      {loading ? (
              <ActivityIndicator size="large" color="#007AFF" />
            ) :currentWord ? (
        <View style={styles.card}>
          <Text style={styles.word}>{currentWord.Word}</Text>
          <TouchableOpacity onPress={speakWord} style={styles.iconButton}>
            <Ionicons name="volume-high" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.meaning}>{currentWord.Meaning}</Text>
          <Text style={styles.verbform}>{currentWord.Akkusative_Dativ}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => setShowMeaning(!showMeaning)}
            // disabled={showMeaning}
          >
            <Text style={styles.buttonText}>
              {showMeaning ? "Hide Konjugation" : "Show Konjugation"}
            </Text>
          </TouchableOpacity>

          {showMeaning && renderKonjugationTable()}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}

      <TouchableOpacity
        onPress={() => getRandomWord()}
        style={styles.nextButton}
      >
        <Ionicons name="refresh" size={24} color="white" />
        <Text style={styles.nextButtonText}>Next Word</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Total words: {words.length}</Text>
    </View>
  );
}
// GermanApplication2025
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#080808",
    padding: 20,
  },
  picker: {
    width: "80%",
    backgroundColor: "#133770",
    marginBottom: 20,
    color: "#eb2348",
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
    color: "#eb2348",
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
  meaning: {
    fontSize: 18,
    marginTop: 10,
    color: "#eb2348",
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
    color: "#eb2348",
  },
  tableHeader: {
    fontWeight: "bold",
    backgroundColor: "#f1f1f1",
    padding: 10,
    textAlign: "center",
    color: "#eb2348",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    color: "#8c1b30",
  },
  tableCell: {
    flex: 1,
    padding: 10,
    textAlign: "center",
    borderRightWidth: 1,
    borderRightColor: "#ddd",
    color: "#8c1b30",
  },
});

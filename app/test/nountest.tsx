import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { Picker } from "@react-native-picker/picker";

const jsonFiles: Record<string, any> = {
  allNouns: require("../../assets/nouns/nouns.json"),
  A1: require("../../assets/nouns/nouns1.json"),
};

export default function NounTest() {
  const [words, setWords] = useState<any[]>([]);
  const [currentWord, setCurrentWord] = useState<{
    Meaning: string;
    Singular: string;
    Plural: string;
    Rules: string;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState("A1");
  const [selectedTest, setSelectedTest] = useState("article");
  const [selectedArticle, setSelectedArticle] = useState("");
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState("");
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

  const getRandomWord = (wordList:any[] = words) => {
    // console.log(wordList)
    const newWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(newWord);
    setSelectedArticle("");
    setUserInput("");
    setFeedback("");
  };

  const checkArticleAnswer = () => {
    if (currentWord) {
      const correctArticle = currentWord.Singular.split(" ")[0];
      if (selectedArticle === correctArticle) {
        setFeedback("✅ Correct!");
        setTimeout(getRandomWord, 1000);
      } else {
        setFeedback(`❌ Wrong! Correct answer: ${correctArticle}`);
      }
    }
  };

  const checkMeaningAnswer = () => {
    if (currentWord) {
      const correctMeanings = currentWord.Meaning.toLowerCase().split("/").map(m => m.trim());
      if (correctMeanings.includes(userInput.trim().toLowerCase())) {
        setFeedback("✅ Correct!");
        setTimeout(getRandomWord, 1000);
      } else {
        setFeedback(`❌ Wrong! Correct answer: ${currentWord.Meaning}`);
      }
    }
  };

  const checkGermanAnswer = () => {
    if (currentWord) {
      if (userInput.trim().toLowerCase() === currentWord.Singular.toLowerCase()) {
        setFeedback("✅ Correct!");
        setTimeout(getRandomWord, 1000);
      } else {
        setFeedback(`❌ Wrong! Correct answer: ${currentWord.Singular}`);
      }
    }
  };

  const checkPluralAnswer = () => {
    if (currentWord) {
      if (userInput.trim().toLowerCase() === currentWord.Plural.toLowerCase()) {
        setFeedback("✅ Correct!");
        setTimeout(getRandomWord, 1000);
      } else {
        setFeedback(`❌ Wrong! Correct answer: ${currentWord.Plural}`);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select File</Text>
      <Picker
              selectedValue={selectedFile}
              onValueChange={(itemValue) => setSelectedFile(itemValue)}
              style={styles.picker}
            >
              {Object.keys(jsonFiles).map((file, index) => (
                <Picker.Item key={index} label={file} value={file} />
              ))}
            </Picker>
      <Text style={styles.title}>Select Test Type</Text>
      <Picker
        selectedValue={selectedTest}
        onValueChange={(itemValue) => setSelectedTest(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Guess the Article" value="article" />
        <Picker.Item label="German to English" value="germanToEnglish" />
        <Picker.Item label="English to German" value="englishToGerman" />
        <Picker.Item label="Singular to Plural" value="singularToPlural" />
      </Picker>

      {currentWord && selectedTest === "article" && (
        <View style={styles.card}>
          <Text style={styles.word}>{currentWord.Singular.split(" ")[1]}</Text>
          <Text style={styles.word}>{currentWord.Meaning}</Text>
          <Picker
            selectedValue={selectedArticle}
            onValueChange={(itemValue) => setSelectedArticle(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Select article" value="" />
            <Picker.Item label="der" value="der" />
            <Picker.Item label="die" value="die" />
            <Picker.Item label="das" value="das" />
          </Picker>
          <TouchableOpacity style={styles.button} onPress={checkArticleAnswer}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentWord && selectedTest === "germanToEnglish" && (
        <View style={styles.card}>
          <Text style={styles.word}>{currentWord.Singular}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter English meaning"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.button} onPress={checkMeaningAnswer}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentWord && selectedTest === "englishToGerman" && (
        <View style={styles.card}>
          <Text style={styles.word}>{currentWord.Meaning}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter German noun"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.button} onPress={checkGermanAnswer}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      )}

      {currentWord && selectedTest === "singularToPlural" && (
        <View style={styles.card}>
          <Text style={styles.word}>{currentWord.Singular}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter Plural form"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.button} onPress={checkPluralAnswer}>
            <Text style={styles.buttonText}>Check</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.loadButton} onPress={() => getRandomWord()}>
        <Text style={styles.buttonText}>Load New Word</Text>
      </TouchableOpacity>

      {feedback && <Text style={styles.feedback}>{feedback}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6b6b",
    marginBottom: 10,
  },
  picker: {
    width: 300,
    marginBottom: 20,
    color: "#ff6b6b",
    backgroundColor: "#1e1e1e",
  },
  card: {
    width: "90%",
    backgroundColor: "#242424",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  word: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4db6ac",
    marginBottom: 10,
  },
  hint: {
    fontSize: 18,
    color: "#bbb",
    marginBottom: 10,
  },
  input: {
    width: "80%",
    borderColor: "#4db6ac",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    color: "#ff6b6b",
    textAlign: "center",
    backgroundColor: "#1e1e1e",
  },
  button: {
    backgroundColor: "#4db6ac",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadButton: {
    marginTop: 20,
    backgroundColor: "#ff6b6b",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  feedback: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6b6b",
  },
});

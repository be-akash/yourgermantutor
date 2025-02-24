import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import wordsData from "../../assets/verb.json";

export default function VerbTestScreen() {
  const [testType, setTestType] = useState("german-to-english");
  const [currentWord, setCurrentWord] = useState<any | null>(null);
  const [userInput, setUserInput] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("black");
  
  useEffect(() => {
    loadNewWord();
  }, [testType]);

  const loadNewWord = () => {
    const randomWord = wordsData[Math.floor(Math.random() * wordsData.length)];
    setCurrentWord(randomWord);
    setUserInput("");
    setFeedbackText("");
  };

  const checkAnswer = () => {
    if (!currentWord) return;
    const correctAnswers = testType === "german-to-english" 
      ? currentWord.Meaning.toLowerCase().split("/")
      : currentWord.Word.toLowerCase().split("/");

    if (correctAnswers.includes(userInput.trim().toLowerCase())) {
      setFeedbackText("Correct! 🎉");
      setFeedbackColor("green");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          loadNewWord();
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 1000);
      });
    } else {
      setFeedbackText(`Wrong! ❌ The correct answer is: ${correctAnswers.join(" / ")}`);
      setFeedbackColor("red");
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 2000);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>German Verb Test</Text>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[styles.dropdownButton, testType === "german-to-english" && styles.activeButton]}
          onPress={() => setTestType("german-to-english")}
        >
          <Text style={styles.buttonText}>German → English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.dropdownButton, testType === "english-to-german" && styles.activeButton]}
          onPress={() => setTestType("english-to-german")}
        >
          <Text style={styles.buttonText}>English → German</Text>
        </TouchableOpacity>
      </View>

      {currentWord && (
        <View style={styles.testCard}>
          <Text style={styles.testWord}>{testType === "german-to-english" ? currentWord.Word : currentWord.Meaning}</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            value={userInput}
            onChangeText={setUserInput}
          />
          <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
            <Text style={styles.buttonText}>Check Answer</Text>
          </TouchableOpacity>
          <Animated.Text style={[styles.feedbackText, { color: feedbackColor, opacity: fadeAnim }]}> 
            {feedbackText}
          </Animated.Text>
          <TouchableOpacity style={styles.nextButton} onPress={loadNewWord}>
            <Ionicons name="refresh" size={24} color="white" />
            <Text style={styles.buttonText}>Next Word</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#080808",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dropdownContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  dropdownButton: {
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: "#007AFF",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  testCard: {
    width: "90%",
    padding: 20,
    backgroundColor: "#2e2b2b",
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
  },
  testWord: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color :"#eb2348",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    color :"#eb2348",
  },
  checkButton: {
    backgroundColor: "#28A745",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  feedbackText: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
});

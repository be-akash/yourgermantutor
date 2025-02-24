import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

const jsonFiles: Record<string, any> = {
  alladjective: require("../../assets/adjectives/adjective.json"),
  A1: require("../../assets/adjectives/adjective1.json"),
};

export default function adjectiveTestScreen() {
  const [testType, setTestType] = useState("german-to-english");
  const [words, setWords] = useState<any[]>([]);
  const [currentWord, setCurrentWord] = useState<any | null>(null);
  const [userInput, setUserInput] = useState("");
  const [oppositeInput, setoppositeInput] = useState("");
  const [fadeAnim] = useState(new Animated.Value(0));
  const [feedbackText, setFeedbackText] = useState("");
  const [feedbackColor, setFeedbackColor] = useState("black");
  const [selectedFile, setSelectedFile] = useState("A1");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    loadFile(selectedFile);
  }, [selectedFile]);
  const loadFile = (fileName: string) => {
    setLoading(true);
    const jsonData = jsonFiles[fileName];
    setWords(jsonData);
    loadNewWord(jsonData);
    setLoading(false);
  };
  const loadNewWord = (wordList: any[] = words) => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
    setCurrentWord(randomWord);
    setUserInput("");
    setoppositeInput("");
    setFeedbackText("");
  };
  const checkAnswer = () => {
    if (!currentWord) return;
    if (testType === "opposite-test") {
      
      const correctanswerforopposite= currentWord.Opposite.toLowerCase().split("/")
      if(correctanswerforopposite.includes(userInput.trim().toLowerCase())){
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
      }else{
        setFeedbackText(
            `Wrong! ❌ The correct answer is: ${correctanswerforopposite.join(
              " / "
            )} `
          );
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
    } else {
      const correctAnswers =
        testType === "german-to-english"
          ? currentWord.Meaning.toLowerCase().split("/")
          : currentWord.German_Adjective.toLowerCase().split("/");
      const correctOppositeAnswers =
        testType === "german-to-english"
          ? currentWord.Opposite_Meaning.toLowerCase().split("/")
          : currentWord.Opposite.toLowerCase().split("/");

      if (
        correctAnswers.includes(userInput.trim().toLowerCase()) &&
        correctOppositeAnswers.includes(oppositeInput.trim().toLowerCase())
      ) {
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
      } else if (
        correctAnswers.includes(userInput.trim().toLowerCase()) &&
        !correctOppositeAnswers.includes(oppositeInput.trim().toLowerCase())
      ) {
        setFeedbackText(
          `✅ Your first answer is correct!  \n ❌ But the opposite should be: ${correctOppositeAnswers.join(
            " / "
          )}`
        );
        setFeedbackColor("orange");
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
      } else if (
        !correctAnswers.includes(userInput.trim().toLowerCase()) &&
        correctOppositeAnswers.includes(oppositeInput.trim().toLowerCase())
      ) {
        setFeedbackText(
          `❌ The main word should be:${correctAnswers.join(
            " / "
          )} \n ✅ But your opposite answer is correct!`
        );
        setFeedbackColor("orange");
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
      } else {
        setFeedbackText(
          `Wrong! ❌ The correct answer is: ${correctAnswers.join(
            " / "
          )} and ${correctOppositeAnswers.join(" / ")}`
        );
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
      <Text style={styles.title}>German Verb Test</Text>
      <View style={styles.dropdownContainer}>
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            testType === "german-to-english" && styles.activeButton,
          ]}
          onPress={() => setTestType("german-to-english")}
        >
          <Text style={styles.buttonText}>German → English</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            testType === "english-to-german" && styles.activeButton,
          ]}
          onPress={() => setTestType("english-to-german")}
        >
          <Text style={styles.buttonText}>English → German</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            testType === "opposite-test" && styles.activeButton,
          ]}
          onPress={() => setTestType("opposite-test")}
        >
          <Text style={styles.buttonText}>Opposite Test</Text>
        </TouchableOpacity>
      </View>

      {currentWord && (
        <View style={styles.testCard}>
          {testType === "opposite-test" ? (
            <>
              <Text style={styles.testWord}>
                {currentWord.German_Adjective}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter the opposite"
                value={userInput}
                onChangeText={setUserInput}
              />
            </>
          ) : (
            <>
              <Text style={styles.testWord}>
                {testType === "german-to-english"
                  ? currentWord.German_Adjective
                  : currentWord.Meaning}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your answer"
                value={userInput}
                onChangeText={setUserInput}
              />
              <Text style={styles.testWord}>
                {testType === "german-to-english"
                  ? currentWord.Opposite
                  : currentWord.Opposite_Meaning}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your answer"
                value={oppositeInput}
                onChangeText={setoppositeInput}
              />
            </>
          )}
          {/* <Text style={styles.testWord}>
            
            {testType === "german-to-english"
              ? currentWord.German_Adjective
              : currentWord.Meaning}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            value={userInput}
            onChangeText={setUserInput}
          />
          <Text style={styles.testWord}>
            {testType === "german-to-english"
              ? currentWord.Opposite
              : currentWord.Opposite_Meaning}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your answer"
            value={oppositeInput}
            onChangeText={setoppositeInput}
          /> */}
          <TouchableOpacity style={styles.checkButton} onPress={checkAnswer}>
            <Text style={styles.buttonText}>Check Answer</Text>
          </TouchableOpacity>
          <Animated.Text
            style={[
              styles.feedbackText,
              { color: feedbackColor, opacity: fadeAnim },
            ]}
          >
            {feedbackText}
          </Animated.Text>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => loadNewWord()}
          >
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
    color: "#eb2348",
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
    color: "#eb2348",
  },
  picker: {
    width: 300,
    marginBottom: 20,
    color: "#ff6b6b",
    backgroundColor: "#1e1e1e",
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    textAlign: "center",
    color: "#eb2348",
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

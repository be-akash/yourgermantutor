








































// import React, { useEffect, useState } from "react";
// import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
// import * as FileSystem from "expo-file-system";
// import { Asset } from "expo-asset";
// import Papa from "papaparse";
// import { Ionicons } from "@expo/vector-icons";

// // Define the GermanWord type
// type GermanWord = { word: string; meaning: string };

// export default function LearnGermanScreen() {
//   const [words, setWords] = useState<GermanWord[]>([]);
//   const [currentWord, setCurrentWord] = useState<GermanWord | null>(null);
//   const [showMeaning, setShowMeaning] = useState(false);

//   useEffect(() => {
//     loadCSV();
//   }, []);

//   const loadCSV = async () => {
//     try {
//       // Load CSV file from assets folder
//       const asset = Asset.fromModule(require("./testData.csv"));
//       await asset.downloadAsync();
//       const fileUri = asset.localUri || asset.uri;
//       const fileContent = await FileSystem.readAsStringAsync(fileUri, {
//         encoding: FileSystem.EncodingType.UTF8,
//       });

//       // Parse CSV file
//       const parsedResult = Papa.parse<string[]>(fileContent, {
//         header: false, // No column names in CSV
//         skipEmptyLines: true,
//       });

//       if (!parsedResult.data || parsedResult.data.length === 0) {
//         throw new Error("CSV file is empty or invalid.");
//       }

//       // Format the words
//       const formattedWords: GermanWord[] = parsedResult.data.map((row) => ({
//         word: row[0] || "Unknown",
//         meaning: row[1] || "Unknown",
//       }));

//       setWords(formattedWords);
//       getRandomWord(formattedWords);
//     } catch (error) {
//       console.error("Error loading CSV:", error);
//     }
//   };

//   const getRandomWord = (wordList: GermanWord[] = words) => {
//     if (wordList.length > 0) {
//       setCurrentWord(wordList[Math.floor(Math.random() * wordList.length)]);
//       setShowMeaning(false);
//     }
//   };

//   const speakWord = () => {
//     if (currentWord) {
//       const utterance = new SpeechSynthesisUtterance(currentWord.word);
//       utterance.lang = "de-DE";
//       window.speechSynthesis.speak(utterance);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Learn German</Text>

//       {currentWord ? (
//         <View style={styles.card}>
//           <Text style={styles.word}>{currentWord.word}</Text>
//           <TouchableOpacity onPress={speakWord} style={styles.iconButton}>
//             <Ionicons name="volume-high" size={24} color="#007AFF" />
//           </TouchableOpacity>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => setShowMeaning(true)}
//             disabled={showMeaning}
//           >
//             <Text style={styles.buttonText}>Show Meaning</Text>
//           </TouchableOpacity>

//           {showMeaning && <Text style={styles.meaning}>{currentWord.meaning}</Text>}
//         </View>
//       ) : (
//         <Text>Loading...</Text>
//       )}

//       <TouchableOpacity style={styles.button} onPress={() => getRandomWord()}>
//         <Text style={styles.buttonText}>🔄 Next Word</Text>
//       </TouchableOpacity>

//       <Text style={styles.footer}>Total words: {words.length}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#F4F4F4",
//     padding: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: "bold",
//     marginBottom: 20,
//   },
//   card: {
//     width: "90%",
//     backgroundColor: "#FFF",
//     padding: 20,
//     borderRadius: 10,
//     elevation: 4,
//     alignItems: "center",
//   },
//   word: {
//     fontSize: 24,
//     fontWeight: "bold",
//     color: "#007AFF",
//   },
//   meaning: {
//     fontSize: 18,
//     marginTop: 10,
//   },
//   button: {
//     marginTop: 20,
//     backgroundColor: "#007AFF",
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 10,
//   },
//   buttonText: {
//     color: "#FFF",
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   iconButton: {
//     marginTop: 10,
//   },
//   footer: {
//     marginTop: 20,
//     fontSize: 14,
//     color: "gray",
//   },
// });

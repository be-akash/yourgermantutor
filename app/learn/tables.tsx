import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  Dimensions
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import * as FileSystem from "expo-file-system";

const images = {
  "Haben and Sein Verb": require("../../assets/tables/haben and sein.png"),
  Nationality: require("../../assets/tables/nationality.jpg"),
  "Possessive Pronoun": require("../../assets/tables/possessivepronomen.jpg"),
  Article: require("../../assets/tables/pronoun.jpg"),
  "Verb Konjugation Special Rules": require("../../assets/tables/verb konjugation special rules.jpg"),
};
const { width, height } = Dimensions.get("window");
const folderUri = FileSystem.documentDirectory
console.log(folderUri)

export default function ImageGalleryScreen() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Gallery</Text>
      <Picker
        selectedValue={selectedImage}
        onValueChange={(itemValue) => setSelectedImage(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Select an Image" value={null} />
        {Object.keys(images).map((name, index) => (
          <Picker.Item key={index} label={name} value={name} />
        ))}
      </Picker>

      {selectedImage && (
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={images[selectedImage as keyof typeof images]}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}

      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
          {selectedImage && (
            <Image
              source={images[selectedImage as keyof typeof images]}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </View>
      </Modal>
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
      color: "#eb2348",
      marginBottom: 20,
    },
    picker: {
      width: "80%",
      backgroundColor: "#133770",
      marginBottom: 20,
      color: "#eb2348",
    },
    image: {
      width: width *.7,
      height: height*.5 ,
      marginTop: 20,
      borderRadius: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
    },
    fullImage: {
      width: "90%",
      height: "80%",
      resizeMode: "contain",
    },
    closeButton: {
      position: "absolute",
      top: 40,
      right: 20,
      zIndex: 1,
      padding: 10,
    },
  });

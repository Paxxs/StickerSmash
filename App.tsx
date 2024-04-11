import { StatusBar } from "expo-status-bar";
import { StyleSheet, type ImageSourcePropType, View } from "react-native";

import PlaceholderImage from "@/assets/images/background-image.png";
import ImageViewer from "@/ui/ImageViewer";
import Button from "@/ui/Button";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import CircleButton from "./ui/CircleButton";
import IconButton from "./ui/IconButton";
import EmojiPicker from "./ui/EmojiPicker";
import EmojiList from "./ui/EmojiList";
import EmojiSticker from "./ui/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  const [selectImage, setSelectImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedEmoji, setPickedEmoji] = useState<ImageSourcePropType>(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (!result.canceled) {
      console.log(result);
      setSelectImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      alert("You did not select any image");
    }
  };

  function onRest() {}

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  async function onSaveImageAsync() {}

  function onModalClose() {
    setIsModalVisible(false);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <ImageViewer
            placeholderImageSource={PlaceholderImage}
            selectedImage={selectImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
        {showAppOptions ? (
          <View style={styles.optionButtonRow}>
            <IconButton label="Rest" icon="refresh" onPress={onRest} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              label="Rest"
              icon="save-alt"
              onPress={onSaveImageAsync}
            />
          </View>
        ) : (
          <View style={styles.footerContainer}>
            <Button
              label="Choose a photo"
              icon="picture-o"
              primary
              onPress={pickImageAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
        <StatusBar style="auto" />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionButtonRow: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    bottom: 80,
  },
});

import { MaterialIcons } from "@expo/vector-icons";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";

export default function EmojiPicker({
  isVisible,
  onClose,
  children,
}: {
  isVisible: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={style.modalContainer}>
        <View style={style.titleContainer}>
          <Text style={style.title}>Emoji Picker</Text>
          <Pressable onPress={onClose}>
            <MaterialIcons name="close" size={22} color="white" />
          </Pressable>
        </View>
        {children}
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    height: "30%",
    width: "100%",
    backgroundColor: "#464C55",
    bottom: 0,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
  },
  titleContainer: {
    height: "16%",
    // backgroundColor: "#464C55",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
});

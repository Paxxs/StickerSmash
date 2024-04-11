import { useState } from "react";
import {
  FlatList,
  Platform,
  Pressable,
  Image,
  StyleSheet,
  type ImageSourcePropType,
} from "react-native";

// 定义 Emoji 类型
type Emoji = ImageSourcePropType;

export default function EmojiList({
  onSelect,
  onCloseModal,
}: {
  onSelect?: (item: Emoji) => void;
  onCloseModal?: () => void;
}) {
  const [emoji] = useState<Emoji[]>([
    require("@/assets/images/emoji1.png"),
    require("@/assets/images/emoji2.png"),
    require("@/assets/images/emoji3.png"),
    require("@/assets/images/emoji4.png"),
    require("@/assets/images/emoji5.png"),
    require("@/assets/images/emoji6.png"),
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      contentContainerStyle={style.listContainer}
      renderItem={({ item, index }) => {
        return (
          <Pressable
            onPress={() => {
              onSelect?.(item);
              onCloseModal?.();
            }}
          >
            <Image style={style.image} source={item} key={index} />
          </Pressable>
        );
      }}
    />
  );
}

const style = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});

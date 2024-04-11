import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type IconType = React.ComponentProps<typeof MaterialIcons>["name"];

export default function IconButton({
  label,
  onPress,
  icon,
}: {
  label: string;
  onPress?: () => void;
  icon: IconType;
}) {
  return (
    <Pressable style={style.iconButton} onPress={onPress}>
      <MaterialIcons name={icon} size={38} color="#fff" />
      <Text style={style.iconButtonLabel}>{label}</Text>
    </Pressable>
  );
}

const style = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});

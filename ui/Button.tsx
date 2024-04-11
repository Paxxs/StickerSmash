import { Pressable, View, Text, StyleSheet } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import React from "react";
// import {} from '@expo/vector-icons'

type FontAwesomeName = React.ComponentProps<typeof FontAwesome>["name"];

export default function Button({
  label,
  icon,
  primary = false,
  onPress,
}: {
  label: string;
  icon?: FontAwesomeName;
  primary?: boolean;
  onPress?: () => void;
}) {
  if (primary) {
    return (
      <View
        style={[
          style.buttonContainer,
          {
            borderWidth: 4,
            borderColor: "#ffd33d",
            borderRadius: 18,
          },
        ]}
      >
        <Pressable
          style={[style.button, { backgroundColor: "#fff" }]}
          onPress={() => onPress?.()}
        >
          {icon && (
            <FontAwesome
              name={icon}
              style={style.buttonIcon}
              size={18}
              color="#25292e"
            />
          )}
          <Text style={[style.buttonLabel, { color: "#25292e" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={style.buttonContainer}>
        <Pressable style={style.button} onPress={() => onPress?.()}>
          {icon && (
            <FontAwesome
              name={icon}
              style={style.buttonIcon}
              size={18}
              color="#25292e"
            />
          )}
          <Text style={style.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }
}

const style = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    // marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    // backgroundColor: "#F5F5F5",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "white",
    fontSize: 16,
  },
});

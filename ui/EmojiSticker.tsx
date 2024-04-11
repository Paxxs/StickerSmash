import { Image, View, type ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

export default function EmojiSticker({
  imageSize,
  stickerSource,
}: {
  imageSize: number;
  stickerSource: ImageSourcePropType;
}) {
  const scaleImage = useSharedValue(imageSize);

  const doubleTapped = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value <= imageSize * 4) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  return (
    <Animated.View style={{ top: -350 }}>
      <GestureDetector gesture={doubleTapped}>
        <Animated.Image
          source={stickerSource}
          resizeMethod="auto"
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </GestureDetector>
    </Animated.View>
  );
}

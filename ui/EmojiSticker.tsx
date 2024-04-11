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
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const doubleTapped = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scaleImage.value <= imageSize * 4) {
        scaleImage.value = scaleImage.value * 2;
      }
    });

  const drag = Gesture.Pan().onChange((e) => {
    translateX.value += e.changeX;
    translateY.value += e.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      width: withSpring(scaleImage.value),
      height: withSpring(scaleImage.value),
    };
  });
  return (
    <GestureDetector gesture={drag}>
      <Animated.View style={[containerStyle, { top: -250 }]}>
        <GestureDetector gesture={doubleTapped}>
          <Animated.Image
            source={stickerSource}
            resizeMethod="auto"
            style={[imageStyle, { width: imageSize, height: imageSize }]}
          />
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}

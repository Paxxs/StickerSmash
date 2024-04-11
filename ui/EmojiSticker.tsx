import type { ViewStyle, ImageSourcePropType } from "react-native";
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
  const scaleImage = useSharedValue<number>(imageSize);
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

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
    } as ViewStyle; //https://github.com/facebook/react-native/issues/41869#issuecomment-1868278536
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

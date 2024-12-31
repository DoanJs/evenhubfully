import React from "react";
import {
  Image,
  ImageProps,
  StyleProp,
  TouchableOpacity,
  View,
} from "react-native";
import { appColor } from "../constants/appColor";
import { globalStyles } from "../styles/gloabalStyles";
import TextComponent from "./TextComponent";

interface Props {
  photoURL?: string;
  name: string;
  size?: number;
  styles?: StyleProp<ImageProps>;
  onPress?: () => void;
}

const AvatarComponent = (props: Props) => {
  const { photoURL, name, size, styles, onPress } = props;
  return (
    <TouchableOpacity disabled={!onPress} onPress={onPress}>
      {photoURL ? (
        <Image
          source={{ uri: photoURL }}
          style={[
            {
              height: size ?? 40,
              width: size ?? 40,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColor.white,
              // marginLeft: index === 0 ? 0 : -8,
              // zIndex: zIndex ? zIndex - index : -index,
            },
            styles,
          ]}
        />
      ) : (
        <View
          style={[
            globalStyles.center,
            {
              height: size ?? 56,
              width: size ?? 56,
              borderRadius: 100,
              borderWidth: 1,
              borderColor: appColor.white,
              backgroundColor: appColor.gray2,
            },
          ]}
        >
          <TextComponent
            color={appColor.white}
            size={size ? size / 3 : 14}
            text={name?.split(" ")[name?.split(" ").length - 1].substring(0, 1)}
          />
        </View>
      )}
    </TouchableOpacity>
  );
};

export default AvatarComponent;

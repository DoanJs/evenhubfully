import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleProp,
  ViewStyle,
} from "react-native";
import React, { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../styles/gloabalStyles";
import Splash from "../assets/images/splash-img.png";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "iconsax-react-native";
import { appColor } from "../constants/appColor";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { fontFamilies } from "../constants/fontFamilies";
import AvatarComponent from "./AvatarComponent";

interface Props {
  isImageBackground?: boolean;
  isScroll?: boolean;
  title?: string;
  children: ReactNode;
  back?: boolean;
  right?: ReactNode;
  avatar?: ReactNode;
  statusAction?: ReactNode;
  styles?: StyleProp<ViewStyle>;
}

const ContainerComponent = (props: Props) => {
  const {
    isImageBackground,
    isScroll,
    title,
    children,
    back,
    right,
    avatar,
    statusAction,
  } = props;
  const navigation = useNavigation();

  const headerComponent = () => {
    return (
      <View style={{ flex: 1 }}>
        {(back || title || right) && (
          <RowComponent
            styles={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              minHeight: 48,
              minWidth: 48,
            }}
          >
            {back && (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <ArrowLeft size={24} color={appColor.text} />
              </TouchableOpacity>
            )}

            <View style={{ flex: 1, flexDirection: avatar ? "row" : "column" }}>
              {avatar && avatar}
              <View style={{ marginLeft: 8 }}>
                {title && (
                  <TextComponent text={title} font={fontFamilies.medium} />
                )}
                {statusAction && statusAction}
              </View>
            </View>
            {right && right}
          </RowComponent>
        )}
        {returnContainer}
      </View>
    );
  };

  const returnContainer = isScroll ? (
    <ScrollView showsVerticalScrollIndicator={false}>{children}</ScrollView>
  ) : (
    <View style={{ flex: 1 }}>{children}</View>
  );

  return isImageBackground ? (
    <ImageBackground
      source={Splash}
      style={{ flex: 1 }}
      imageStyle={{ flex: 1 }}
    >
      <SafeAreaView>{headerComponent()}</SafeAreaView>
    </ImageBackground>
  ) : (
    <SafeAreaView style={[globalStyles.container]}>
      <StatusBar barStyle={"dark-content"} />
      <View style={{ flex: 1 }}>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;

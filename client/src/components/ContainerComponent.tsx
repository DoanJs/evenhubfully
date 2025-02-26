import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "iconsax-react-native";
import React, { ReactNode } from "react";
import {
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Splash from "../assets/images/splash-img.png";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import { globalStyles } from "../styles/gloabalStyles";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";

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
    styles,
  } = props;
  const navigation = useNavigation();

  const headerComponent = () => {
    return (
      <View style={styles}>
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
    <View style={styles}>{children}</View>
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
      <View style={styles}>{headerComponent()}</View>
    </SafeAreaView>
  );
};

export default ContainerComponent;

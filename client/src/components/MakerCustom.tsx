import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { ImageBackground, View } from "react-native";

interface Props {
  type: string;
}

const MakerCustom = (props: Props) => {
  const { type } = props;

  const renderIcon = (type: string) => {
    let icon;

    switch (type) {
      case "Music":
        icon = <FontAwesome5 name="music" color={"#f59762"} size={20} />;
        break;
      case "Color":
        icon = <Ionicons name="color-palette" color={"#46cdf8"} size={20} />;
        break;
      case "Food":
        icon = (
          <MaterialCommunityIcons
            name="silverware-fork-knife"
            color={"#29d697"}
            size={20}
          />
        );
        break;

      default:
        icon = (
          <FontAwesome5 name="basketball-ball" color={"#f0635a"} size={20} />
        );
        break;
    }
    return icon;
  };

  return (
    <ImageBackground
      source={require("../assets/images/Union.png")}
      imageStyle={{ resizeMode: "contain" }}
      style={{
        padding: 8,
        height: 56,
        width: 56,
        justifyContent: "center",
        borderRadius: 12,
      }}
    >
      <View
        style={{
          backgroundColor: "#f0635a",
          padding: 8,
          borderRadius: 12,
        }}
      >
        {renderIcon(type)}
      </View>
    </ImageBackground>
  );
};

export default MakerCustom;

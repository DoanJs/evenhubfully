import React from "react";
import { View } from "react-native";
import { AvatarComponent, TextComponent } from "../../components";

const MessageCircle = () => {
  return (
    <View style={{ alignItems: "center", marginHorizontal:8 }}>
      <View>
        <AvatarComponent
          size={80}
          photoURL="http://3.bp.blogspot.com/-ic11smjdIiI/U71Kx478QRI/AAAAAAAAjWY/TDhzGrYCxfw/s1600/dong-vat-hoang-da+(1).jpeg"
          name=""
        />
        <View
          style={{
            backgroundColor: "#02e9fe",
            width: 18,
            height: 18,
            borderRadius: 100,
            borderWidth: 2,
            borderColor: "#ffffff",
            position: "absolute",
            bottom: 2,
            right: 2,
          }}
        />
      </View>

      <TextComponent text="asd" />
    </View>
  );
};

export default MessageCircle;

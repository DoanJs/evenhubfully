import React from "react";
import { Image, StyleProp, ViewStyle } from "react-native";
import { appColor } from "../constants/appColor";
import { fontFamilies } from "../constants/fontFamilies";
import { UserModel } from "../models/UserModel";
import RowComponent from "./RowComponent";
import SpaceComponent from "./SpaceComponent";
import TextComponent from "./TextComponent";

interface Props {
  styles?: StyleProp<ViewStyle>;
  size?: number;
  zIndex?: number;
  users?: UserModel[];
}

const AvatarGroup = (props: Props) => {
  const { styles, size, zIndex, users } = props;

  return (
    <RowComponent
      justify="flex-start"
      styles={[
        {
          marginVertical: 12,
        },
        styles,
      ]}
    >
      {users && (
        <>
          {users.map((item: any, index) => {
            if (index < 3) {
              return (
                <Image
                  key={`img${item.UserID}`}
                  source={{ uri: item.PhotoUrl }}
                  style={{
                    height: size ?? 24,
                    width: size ?? 24,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: appColor.white,
                    marginLeft: index === 0 ? 0 : -8,
                    zIndex: zIndex ? zIndex - index : -index,
                  }}
                />
              );
            }
          })}
          <SpaceComponent width={12} />
          <TextComponent
            text={users.length > 3 ? `+${users.length - 3} Going` : "Going"}
            color={appColor.primary}
            font={fontFamilies.semiBold}
          />
        </>
      )}
    </RowComponent>
  );
};

export default AvatarGroup;

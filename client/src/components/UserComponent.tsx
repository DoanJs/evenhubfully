import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import RowComponent from "./RowComponent";
import TextComponent from "./TextComponent";
import { useQuery } from "@apollo/client";
import { GetUserIdDocument } from "../gql/graphql";
import { UserModel } from "../models/UserModel";
import { Image } from "react-native";
import SpaceComponent from "./SpaceComponent";
import CardComponent from "./CardComponent";
import { globalStyles } from "../styles/gloabalStyles";
import { appColor } from "../constants/appColor";
interface Props {
  userId: number;
  type: "Notification" | "Invite";
  onPress: () => void;
}

const UserComponent = (props: Props) => {
  const { userId, type, onPress } = props;
  const [user, setUser] = useState<UserModel>();
  const { data: data_getUserId } = useQuery(GetUserIdDocument, {
    variables: {
      userId,
    },
  });

  useEffect(() => {
    if (data_getUserId) {
      setUser(data_getUserId.getUserId as UserModel);
    }
  }, [data_getUserId]);

  return (
    <RowComponent
      styles={{ flex: 1, marginHorizontal: 10, marginVertical: 10 }}
      onPress={onPress}
    >
      <Image
        source={{ uri: user?.PhotoUrl }}
        style={{
          resizeMode: "cover",
          borderRadius: 12,
          height: 48,
          width: 48,
        }}
      />
      <SpaceComponent width={24} />
      <View
        style={{
          flex: 1,
          height: 48,
          justifyContent: "space-around",
        }}
      >
        <TextComponent size={16} text={user?.Username as string} title />
        <TextComponent size={14} text={user?.type ? user?.type : "Personal"} />
      </View>
    </RowComponent>
  );
};

export default UserComponent;

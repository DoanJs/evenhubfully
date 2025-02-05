import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { globalStyles } from "../styles/gloabalStyles";
import {
  AvatarComponent,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from ".";
import { NotificationModel } from "../models/NotificationModel";
import { appColor } from "../constants/appColor";
import { useQuery } from "@apollo/client";
import { GetUserIdDocument } from "../gql/graphql";
import { UserModel } from "../models/UserModel";
import { DateTime } from "../utils/DateTime";

interface Props {
  notification: NotificationModel;
}

const NotificationItem = (props: Props) => {
  const { notification } = props;
  const [user, setUser] = useState<UserModel>();
  const { data: data_user } = useQuery(GetUserIdDocument, {
    variables: {
      userId: notification.from,
    },
  });

  useEffect(() => {
    if (data_user) {
      setUser(data_user.getUserId as UserModel);
    }
  }, [data_user]);

  return (
    <RowComponent
      styles={{
        paddingHorizontal: 16,
        marginBottom: 20,
        alignItems: "flex-start",
      }}
    >
      <AvatarComponent
        size={45}
        name=""
        photoURL={
          user?.PhotoUrl ??
          "https://cckl.bacgiang.gov.vn/uploads/DOI2112-21.jpg"
        }
      />
      <View style={{ flex: 1, paddingHorizontal: 12, paddingRight: 28 }}>
        <Text style={[globalStyles.text, { color: "coral" }]}>
          {user?.Username ?? "User"}
          <TextComponent
            styles={[
              globalStyles.text,
              { color: notification.isRead ? appColor.gray : appColor.text },
            ]}
            text={" " + notification.content}
          />
        </Text>
        <SpaceComponent height={16} />

        <RowComponent justify="center">
          <ButtonComponent
            text="Reject"
            type="primary"
            styles={{ width: "50%" }}
            color={appColor.white}
            textColor={appColor.gray}
          />
          <SpaceComponent width={16} />
          <ButtonComponent
            text="Accept"
            type="primary"
            styles={{ width: "50%" }}
          />
        </RowComponent>
      </View>

      <TextComponent color={appColor.gray} text={DateTime.GetDateUpdate(notification.createAt)} />
    </RowComponent>
  );
};

export default NotificationItem;

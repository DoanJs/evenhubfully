import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import {
  AvatarComponent,
  ButtonComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from ".";
import { appColor } from "../constants/appColor";
import { GetUserIdDocument } from "../gql/graphql";
import { NotificationModel } from "../models/NotificationModel";
import { UserModel } from "../models/UserModel";
import { globalStyles } from "../styles/gloabalStyles";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

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

  const handleRemoveNotification = async () => {
    try {
      await deleteDoc(doc(db, "notifications", notification.id));
    } catch (error) {
      console.log(error);
    }
  };

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
            onPress={() =>
              Alert.alert(
                "Confirm",
                "Are yiu sure you want to reject this invite ?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel remove"),
                  },
                  {
                    text: "Reject",
                    style: "destructive",
                    onPress: () => handleRemoveNotification(),
                  },
                ]
              )
            }
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

      <TextComponent
        color={appColor.gray}
        styles={{ backgroundColor: "coral", width: "25%" }}
        numberOfLine={1}
        text={moment(notification.createAt).fromNow()}
      />
    </RowComponent>
  );
};

export default NotificationItem;

import React from "react";
import { View } from "react-native";
import {
  AvatarComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { ConversationModel } from "../../models/ConversationModel";
import { MessageModel } from "../../models/MessageModel";
import { handleSelectedFromArr } from "../../utils/handleSelected";

interface Props {
  conversation: ConversationModel;
  message: MessageModel;
  user: any;
  grMsg: boolean;
  msgCenter: boolean;
  msgTop: boolean;
  msgBottom: boolean;
}

const MessageSub = (props: Props) => {
  const { conversation, message, user, grMsg, msgCenter, msgTop, msgBottom } =
    props;
  return (
    <View>
      <RowComponent
        justify={message.senderId === user.UserID ? "flex-end" : "flex-start"}
        styles={{
          alignItems: "flex-end",
          marginVertical: 1,
        }}
      >
        {message.senderId !== user.UserID &&
          (grMsg ? (
            <AvatarComponent
              photoURL={handleSelectedFromArr(
                conversation.avatar,
                user?.UserID as number
              )}
              size={26}
              name=""
            />
          ) : (
            <SpaceComponent width={25} />
          ))}
        <SpaceComponent width={6} />
        <TextComponent
          styles={{
            backgroundColor: appColor.gray8,
            padding: 10,
            borderTopLeftRadius:
              (msgCenter && message.senderId !== user.UserID) ||
              (msgBottom && message.senderId !== user.UserID)
                ? 5
                : 16,
            borderBottomLeftRadius:
              (msgCenter && message.senderId !== user.UserID) ||
              (msgTop && message.senderId !== user.UserID)
                ? 5
                : 16,
            borderTopRightRadius:
              (msgCenter && message.senderId === user.UserID) ||
              (msgBottom && message.senderId === user.UserID)
                ? 5
                : 16,
            borderBottomRightRadius:
              (msgCenter && message.senderId === user.UserID) ||
              (msgTop && message.senderId === user.UserID)
                ? 5
                : 16,
            maxWidth: "80%",
          }}
          numberOfLine={5}
          text={message.message}
        />
      </RowComponent>
      {/* <RowComponent justify="flex-end">
        <AvatarComponent
          photoURL="https://tainguyenvamoitruong.vn/images/image/ho-37125.jpg"
          size={16}
          name=""
        />
      </RowComponent> */}
    </View>
  );
};

export default MessageSub;

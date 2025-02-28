import { FontAwesome6 } from "@expo/vector-icons";
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
  msgLast: boolean;
  msgFinal: boolean;
}

const MessageSub = (props: Props) => {
  const {
    conversation,
    message,
    user,
    grMsg,
    msgCenter,
    msgTop,
    msgBottom,
    msgLast,
    msgFinal,
  } = props;

  const handleIconSeen = () => {
    let url = "";
    conversation.avatar.map((item: any) => {
      if (item.id !== user.UserID) {
        url = item.data;
      }
    });
    return url;
  };
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
      {((message.senderId === user.UserID && msgLast) || msgFinal) && (
        <RowComponent justify="flex-end">
          {message.status === "seen" ? (
            <AvatarComponent photoURL={handleIconSeen()} size={16} name="" />
          ) : message.status === "sent" && message.senderId === user.UserID ? (
            <FontAwesome6 name="check-double" size={10} color="black" />
          ) : (
            <></>
          )}
        </RowComponent>
      )}
    </View>
  );
};

export default MessageSub;

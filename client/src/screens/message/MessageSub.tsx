import React from "react";
import {
  AvatarComponent,
  RowComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { ConversationModel } from "../../models/ConversationModel";

interface Props {
  conversation: ConversationModel;
}

const MessageSub = (props: Props) => {
  const { conversation } = props;
  const dataMsg = {
    mediaUrl: "",
    message: "Hello, I am Js",
    receiverId: 2,
    senderId: 16,
    status: "send",
    createAt: Date.now(),
    updateAt: Date.now(),
    deleteAt: Date.now(),
    type: "text",
  };
  return (
    <RowComponent justify="flex-start" styles={{ alignItems: "flex-end", marginVertical: 1 }}>
      <AvatarComponent photoURL={conversation.avatar} size={26} name="" />
      <SpaceComponent width={6} />
      <TextComponent
        styles={{
          backgroundColor: appColor.gray8,
          padding: 10,
          borderRadius: 16,
          maxWidth: "80%",
        }}
        numberOfLine={5}
        text="ads xin chao ban nhe ads xin chao ban nhe ads xin chao ban nhe ads xin chao ban nhe ads xin chao ban nhe "
        // text="ads xin chao ban "
      />
    </RowComponent>
  );
};

export default MessageSub;

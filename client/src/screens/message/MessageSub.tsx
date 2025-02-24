import React from "react";
import {
  AvatarComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { ConversationModel } from "../../models/ConversationModel";
import { MessageModel } from "../../models/MessageModel";
import { View } from "react-native";

interface Props {
  conversation: ConversationModel;
  message: MessageModel;
}

const MessageSub = (props: Props) => {
  const { conversation, message } = props;
  return (
    <View>
      <RowComponent
        justify="flex-start"
        styles={{
          alignItems: "flex-end",
          marginVertical: 1,
        }}
      >
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

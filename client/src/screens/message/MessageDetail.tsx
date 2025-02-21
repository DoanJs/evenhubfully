import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";
import {
  AvatarComponent,
  ButtonComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import { ConversationModel } from "../../models/ConversationModel";
import MessageSub from "./MessageSub";

const MessageDetail = ({ route }: any) => {
  const { conversation }: { conversation: ConversationModel } = route.params;
  // goi vao CSDL load data ra
  return (
    <ContainerComponent
      back
      avatar={<AvatarComponent photoURL={conversation.avatar} name="" />}
      statusAction={
        <TextComponent
          text="Hoạt động 15 phút trước"
          styles={{ fontSize: 10 }}
          color={appColor.gray}
        />
      }
      title={conversation.title}
      right={
        <RowComponent>
          <FontAwesome name="phone" size={20} color={appColor.primary} />
          <SpaceComponent width={14} />
          <FontAwesome5 name="video" size={20} color={appColor.primary} />
        </RowComponent>
      }
    >
      <SectionComponent>
        <MessageSub conversation={conversation} />
        <MessageSub conversation={conversation} />
        <MessageSub conversation={conversation} />
      </SectionComponent>

      <View
        style={{
          position: "absolute",
          bottom: -500,
          right: 0,
          left: 0,
          padding: 12,
          alignItems: "center",
        }}
      >
        <ButtonComponent
          type="primary"
          text="EXPLORE EVENTS"
          styles={{
            backgroundColor: appColor.primary,
            width: undefined,
          }}
        />
      </View>
    </ContainerComponent>
  );
};

export default MessageDetail;

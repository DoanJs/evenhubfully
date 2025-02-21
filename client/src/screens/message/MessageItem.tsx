import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  AvatarComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../components";
import { ConverstationModel } from "../../models/ConversationModel";

const MessageItem = ({
  conversation,
}: {
  conversation: ConverstationModel;
}) => {
  const navigation: any = useNavigation();

  return (
    <RowComponent
      styles={{ marginVertical: 10 }}
      onPress={() =>
        navigation.navigate("MessageDetail", {
          conversation,
        })
      }
    >
      <AvatarComponent size={60} name="" photoURL={conversation.avatar} />
      <SectionComponent styles={{ paddingBottom: "auto" }}>
        <TextComponent title text={conversation.title} />
        <RowComponent>
          <TextComponent size={18} text="Bạn: " />
          <TextComponent
            size={18}
            numberOfLine={1}
            styles={{ width: "60%" }}
            text="Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki "
          />
          <TextComponent text=" Th 3" />
        </RowComponent>
      </SectionComponent>
    </RowComponent>
  );
};

export default MessageItem;

import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
} from "../../components";

const MessageDetail = ({ route }: any) => {
  const { conversation } = route.params;
  // goi vao CSDL load data ra
  return (
    <ContainerComponent
      back
      title={conversation.title}
      right={
        <RowComponent>
          <FontAwesome name="phone" size={20} color="black" />
          <SpaceComponent width={14} />
          <FontAwesome5 name="video" size={20} color="black" />
        </RowComponent>
      }
    >
      <SectionComponent>
        <TextComponent text="ads" />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default MessageDetail;

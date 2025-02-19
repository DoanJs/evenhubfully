import React from "react";
import { Text } from "react-native";
import {
  AvatarComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from "../../components";

const MessageItem = () => {
  return (
    <RowComponent styles={{ marginVertical: 10 }}>
      <AvatarComponent
        size={90}
        name=""
        photoURL="https://static.tuoitre.vn/tto/i/s626/2016/10/28/hinh-12-1477639225.jpg"
      />
      <SectionComponent styles={{ paddingBottom: "auto" }}>
        <TextComponent title text="Nguyen Van A" />
        <RowComponent>
          <TextComponent size={18} text="Bạn: " />
          <TextComponent size={18} numberOfLine={1} styles={{width: '60%'}} text="Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki Bạn Oki Oki Oki Oki " />
          <TextComponent text=" Th 3" />
        </RowComponent>
      </SectionComponent>
    </RowComponent>
  );
};

export default MessageItem;

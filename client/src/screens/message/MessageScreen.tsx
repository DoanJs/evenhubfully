import { useRoute } from "@react-navigation/native";
import { SearchNormal1 } from "iconsax-react-native";
import React, { useState } from "react";
import { TextInput, View } from "react-native";
import {
  ContainerComponent,
  RowComponent,
  SectionComponent,
} from "../../components";
import { appColor } from "../../constants/appColor";
import MessageItem from "./MessageItem";

interface Props {}

const MessageScreen = (props: Props) => {
  const {} = props;
  const route: any = useRoute();
  const { userId }: { userId: number } = route.params;
  const [searchKey, setSearchKey] = useState('')
  console.log(userId);

  return (
    <ContainerComponent back title="Message">
      <SectionComponent>
        <RowComponent styles={{ backgroundColor: appColor.gray8, paddingHorizontal: 10, paddingVertical: 8, borderRadius: 10 }}>
          <SearchNormal1 variant="TwoTone" color={appColor.gray} size={24} />
          <View
            style={{
              width: 1,
              height: 24,
              backgroundColor: appColor.gray2,
              marginHorizontal: 10,
            }}
          />
          <TextInput
            value={searchKey}
            style={{ color: appColor.text, flex: 1 }}
            onChangeText={(val) => setSearchKey(val)}
            placeholder="Tìm kiếm..."
          />
        </RowComponent>
      </SectionComponent>

      <SectionComponent>
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
        <MessageItem />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default MessageScreen;
